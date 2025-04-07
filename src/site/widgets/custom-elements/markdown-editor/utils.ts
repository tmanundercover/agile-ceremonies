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

export const processFragment = async (fragment: Fragment): Promise<string> => {
    switch (fragment.type) {
        case 'SVG': {
            const svgContent = extractSvgContent(fragment.content);
            if (!svgContent) return fragment.content;
            
            const filename = fragment.filename || `svg-${fragment.id}.svg`;
            await saveSvgFile(svgContent, filename);
            return `![${filename}](${filename})`;
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
