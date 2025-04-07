import { saveAs } from 'file-saver';
import {Fragment, FragmentType} from "./types";

const removeXmlDeclaration = (content: string): string => {
    return content.replace(/^\s*<\?xml[^>]*\?>\s*/i, '');
};

const removeMarkdownWrapper = (content: string): string => {
    return content
        .replace(/```markdown\s*/g, '')
        .replace(/```\s*$/g, '')
        .trim();
};

const cleanSvgContent = (svgContent: string): string => {
    return svgContent
        .replace(/<!DOCTYPE.*?>/gi, '') // Remove DOCTYPE
        .replace(/<!--.*?-->/gs, '') // Remove comments
        .replace(/xmlns:xlink=".*?"/g, '') // Remove xlink namespace
        .replace(/version=".*?"/g, '') // Remove version attribute
        .replace(/encoding=".*?"/g, '') // Remove encoding attribute
        .trim();
};

export const extractSvgContent = (content: string): { svg: string | null; remainingText: string } => {
    // First remove XML declaration if present
    content = removeXmlDeclaration(content);
    
    // Then remove markdown wrapper if present
    content = removeMarkdownWrapper(content);
    
    // Extract SVG content
    const svgMatch = content.match(/<svg[\s\S]*?<\/svg>/i);
    if (!svgMatch) {
        return { svg: null, remainingText: content };
    }
    
    const remainingText = content
        .replace(svgMatch[0], '')
        .trim();
    
    const cleanedSvg = cleanSvgContent(svgMatch[0]);
    
    return {
        svg: cleanedSvg,
        remainingText
    };
};

export const saveSvgFile = async (svgContent: string, filename: string): Promise<string> => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    await saveAs(blob, filename);
    return filename;
};

export const savePngFile = async (svgElement: SVGElement, filename: string): Promise<void> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();
    
    return new Promise((resolve, reject) => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            
            canvas.toBlob((blob) => {
                if (blob) {
                    saveAs(blob, filename);
                    resolve();
                } else {
                    reject(new Error('Failed to create PNG'));
                }
            }, 'image/png');
        };
        
        img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    });
};

export const generateSvgDataUrl = (svgElement: SVGElement): string => {
    const svgString = new XMLSerializer().serializeToString(svgElement);
    return 'data:image/svg+xml;base64,' + btoa(svgString);
};

export const convertSvgToPngDataUrl = (svgElement: SVGElement): Promise<string> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        const svgString = new XMLSerializer().serializeToString(svgElement);
        
        img.onload = () => {
            // Get SVG dimensions
            const bbox = (svgElement as SVGGraphicsElement).getBBox();
            const width = bbox.width;
            const height = bbox.height;

            // Set max width to viewport width or original width, whichever is smaller
            const maxWidth = Math.min(window.innerWidth, width);
            const scale = maxWidth / width;
            
            // Set canvas dimensions maintaining aspect ratio
            canvas.width = maxWidth;
            canvas.height = height * scale;
            
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/png'));
        };
        
        img.onerror = reject;
        img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    });
};

const findNearestHeader = (fragments: Fragment[], currentIndex: number): string | null => {
    for (let i = currentIndex; i >= 0; i--) {
        const fragment = fragments[i];
        if (fragment.type === 'HEADER') {
            return fragment.content.replace(/^#+\s*/, '').trim();
        }
    }
    return null;
};

const sanitizeFilename = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

export const processFragment = async (fragment: Fragment, allFragments?: Fragment[]): Promise<string> => {
    switch (fragment.type) {
        case 'SVG': {
            let content = fragment.content;
            // Extract and clean SVG content
            const { svg: svgContent } = extractSvgContent(content);
            if (!svgContent) return '';
            
            // Clean up the SVG and return it directly 
            const cleanedSvg = cleanSvgContent(svgContent)
                .replace(/^\s*<\?xml[^>]*\?>\s*/i, '') // Remove XML declaration
                .replace(/\n\s*/g, ' '); // Remove newlines and extra spaces
            
            return cleanedSvg;
        }
        case 'CODE': {
            const language = detectLanguage(fragment.content);
            return `\`\`\`${language}\n${fragment.content}\n\`\`\``;
        }
        
        case 'TEXT': {
            const content = fragment.content.trim();
            // Skip URL processing if content contains an image
            if (content.includes('<img') || content.includes('<svg')) {
                return content;
            }
            
            // Enhanced text processing
            if (content.match(/^[#]{1,6}\s/)) return content; // Already a header
            if (content.match(/^\d+\.\s/)) return content; // Numbered list
            if (content.match(/^[-*]\s/)) return content; // Bullet list
            if (content.match(/^>.+/)) return content; // Blockquote
            
            // Auto-link URLs
            return content.replace(
                /\b(https?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
                '[$1]($1)'
            );
        }
        
        case 'LINK': {
            const url = fragment.content.trim();
            const title = extractUrlTitle(url);
            // Links are rendered inline
            return `[${title}](${url})`;
        }
        
        case 'HEADER': {
            const level = detectHeaderLevel(fragment.content);
            const content = fragment.content.replace(/^#+\s*/, '');
            return `${'#'.repeat(level)} ${content}`;
        }
        
        default:
            return fragment.content;
    }
};

const detectLanguage = (code: string): string => {
    // Simple language detection based on common patterns
    if (code.includes('function') || code.includes('const')) return 'javascript';
    if (code.includes('class') && code.includes('public')) return 'java';
    if (code.includes('<html') || code.includes('<!DOCTYPE')) return 'html';
    if (code.includes('SELECT') || code.includes('FROM')) return 'sql';
    return '';
};

const extractUrlTitle = (url: string): string => {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace(/^www\./, '');
    } catch {
        return url;
    }
};

const detectHeaderLevel = (content: string): number => {
    const match = content.match(/^(#+)\s/);
    return match ? Math.min(match[1].length, 6) : 1;
};

export const parseMarkdownToFragments = (markdown: string): Omit<Fragment, 'id' | 'processed'>[] => {
    const fragments: Omit<Fragment, 'id' | 'processed'>[] = [];
    const lines = markdown.split('\n');
    let currentBlock = '';
    let currentType: FragmentType = 'TEXT';

    const addFragment = () => {
        if (currentBlock.trim()) {
            fragments.push({
                type: currentType,
                content: currentBlock.trim()
            });
        }
        currentBlock = '';
        currentType = 'TEXT';
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.startsWith('```')) {
            if (currentType === 'CODE') {
                addFragment();
            } else {
                addFragment();
                currentType = 'CODE';
            }
            continue;
        }

        if (line.match(/^#{1,6}\s/)) {
            addFragment();
            currentType = 'HEADER';
            currentBlock = line;
            addFragment();
            continue;
        }

        if (line.match(/<svg[\s\S]*?<\/svg>/i)) {
            addFragment();
            currentType = 'SVG';
            currentBlock = line;
            addFragment();
            continue;
        }

        if (line.match(/^https?:\/\//)) {
            addFragment();
            currentType = 'LINK';
            currentBlock = line;
            addFragment();
            continue;
        }

        currentBlock += (currentBlock ? '\n' : '') + line;
    }

    addFragment();
    return fragments;
};

export const getSvgDimensions = (svgContent: string): { width: number; height: number } => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svgElement = svgDoc.documentElement;
    
    let width = parseInt(svgElement.getAttribute('width') || '0');
    let height = parseInt(svgElement.getAttribute('height') || '0');
    
    if (!width || !height) {
        const viewBox = svgElement.getAttribute('viewBox')?.split(' ');
        if (viewBox) {
            width = parseInt(viewBox[2]) || 300;
            height = parseInt(viewBox[3]) || 200;
        } else {
            // Default dimensions if no width/height/viewBox is found
            width = 300;
            height = 200;
        }
    }
    
    return { width, height };
};

export const preprocessContent = (content: string): string => {
    // Remove XML declaration
    content = content.replace(/^\s*<\?xml[^>]*\?>\s*/i, '');
    
    // Remove markdown wrapper
    content = content.replace(/```markdown\s*/g, '').replace(/```\s*$/g, '').trim();
    
    // Extract and process SVG if present
    const { svg: svgContent } = extractSvgContent(content);
    if (svgContent) {
        const { width, height } = getSvgDimensions(svgContent);
        const aspectRatio = height / width;
        const newHeight = Math.round(550 * aspectRatio);
        
        // Convert SVG to data URL
        const dataUrl = svgToDataUrl(svgContent);
        return `<img src="${dataUrl}" width="550" height="${newHeight}" style="height:auto;" alt="SVG diagram" />`;
    }
    
    return content;
};

export const svgToDataUrl = (svgContent: string): string => {
    // Add XML declaration if not present
    if (!svgContent.includes('<?xml')) {
        svgContent = '<?xml version="1.0" encoding="UTF-8"?>' + svgContent;
    }
    
    // URI encode the SVG content
    const encodedSvg = encodeURIComponent(svgContent)
        .replace(/%20/g, ' ')  // Keep spaces readable
        .replace(/%3D/g, '=')  // Keep equals signs
        .replace(/%3A/g, ':')  // Keep colons
        .replace(/%2F/g, '/')  // Keep forward slashes
        .replace(/%22/g, "'"); // Replace double quotes with single quotes
    
    return `data:image/svg+xml,${encodedSvg}`;
};

