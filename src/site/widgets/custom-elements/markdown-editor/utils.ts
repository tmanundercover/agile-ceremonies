import { saveAs } from 'file-saver';
import {Fragment} from "./types";

export const extractSvgContent = (content: string): string | null => {
    const svgMatch = content.match(/<svg[\s\S]*?<\/svg>/i);
    return svgMatch ? svgMatch[0] : null;
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
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
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
            const svgContent = extractSvgContent(fragment.content);
            if (!svgContent) return fragment.content;
            
            // Create temporary SVG element to convert to PNG
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = svgContent;
            const svgElement = tempDiv.querySelector('svg');
            if (!svgElement) return fragment.content;

            const pngDataUrl = await convertSvgToPngDataUrl(svgElement as SVGElement);
            return `![${fragment.filename || 'diagram'}](${pngDataUrl})`;
        }
        
        case 'CODE': {
            const language = detectLanguage(fragment.content);
            return `\`\`\`${language}\n${fragment.content}\n\`\`\``;
        }
        
        case 'TEXT': {
            const content = fragment.content.trim();
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

