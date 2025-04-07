import React, { useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { PreviewPane, Preview as PreviewContainer } from './styles';
import { saveSvgFile, savePngFile, convertSvgToPngDataUrl } from './utils';

interface PreviewProps {
    markdown: string;
    onUpdateMarkdown?: (newMarkdown: string) => void;
}

export const Preview: React.FC<PreviewProps> = ({ markdown, onUpdateMarkdown }) => {
    const handleSvgClick = useCallback(async (event: React.MouseEvent) => {
        const target = event.target as Element;
        const svgElement = target.closest('svg');
        
        if (!svgElement) return;
        event.preventDefault();

        try {
            // Generate PNG data URL
            const pngDataUrl = await convertSvgToPngDataUrl(svgElement);
            
            // Replace the SVG markdown with PNG markdown
            const newMarkdown = markdown.replace(
                /!\[.*?\]\(data:image\/svg\+xml;.*?\)/,
                `![diagram](${pngDataUrl})`
            );
            
            onUpdateMarkdown?.(newMarkdown);
        } catch (error) {
            console.error('Failed to convert SVG to PNG:', error);
        }
    }, [markdown, onUpdateMarkdown]);

    return (
        <PreviewPane>
            <PreviewContainer onClick={handleSvgClick}>
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </PreviewContainer>
        </PreviewPane>
    );
};
