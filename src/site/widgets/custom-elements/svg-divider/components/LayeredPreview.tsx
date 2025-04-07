import React, { useState } from 'react';
import { SvgThumbnail } from '../types';
import styled from 'styled-components';

const LayeredPreviewContainer = styled.div`
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: white;

    .dark & {
        background-color: #444;
        border-color: #555;
    }

    h3 {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    svg {
        max-width: 100%;
        height: auto;
    }
`;

const ToggleButton = styled.button`
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: white;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;

    &:hover {
        background-color: #f5f5f5;
    }

    .dark & {
        background-color: #555;
        border-color: #666;
        color: white;

        &:hover {
            background-color: #666;
        }
    }
`;

interface LayeredPreviewProps {
    originalSvgShell: string | null;
    selectedThumbnails: SvgThumbnail[];
    parentSvgProps: {[key: string]: string};
    svgContent: string | null;
    componentCount: number;
    originalContainer: string | null;
}

const LayeredPreview: React.FC<LayeredPreviewProps> = ({
    originalSvgShell,
    selectedThumbnails,
    parentSvgProps,
    svgContent,
    componentCount,
    originalContainer
}) => {
    const [showOriginal, setShowOriginal] = useState(false);

    if (!originalSvgShell && !svgContent) return null;

    // Create a template SVG element from the original SVG content
    const parser = new DOMParser();
    const originalDoc = parser.parseFromString(svgContent || '', 'image/svg+xml');
    const originalSvg = originalDoc.querySelector('svg');
    const svgTemplate = originalSvg ? originalSvg.outerHTML.split('>')[0] + '>' : '';

    const renderNestedContent = (content: string, containers: string[]) => {
        let wrappedContent = content;
        
        // Wrap the content in its container hierarchy
        containers.forEach((container) => {
            wrappedContent = `${container}${wrappedContent}</g>`;
        });
        
        return wrappedContent;
    };

    return (
        <LayeredPreviewContainer>
            <h3>
                {showOriginal ? 'Original SVG Preview' : 'Layered Preview'}
                <ToggleButton onClick={() => setShowOriginal(!showOriginal)}>
                    {showOriginal ? 'Show Layered' : 'Show Original'}
                </ToggleButton>
            </h3>
            <div>
                {showOriginal ? (
                    <div dangerouslySetInnerHTML={{ __html: svgContent || '' }} />
                ) : (
                    <svg {...parentSvgProps}>
                        <g dangerouslySetInnerHTML={{ __html: originalSvgShell || '' }} />
                        {selectedThumbnails.map((thumbnail) => {
                            const svgContent = decodeURIComponent(thumbnail.src.split(',')[1]);
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(svgContent, 'image/svg+xml');
                            const element = doc.querySelector('svg > *:last-child');
                            
                            if (!element) return null;

                            const nestedContent = renderNestedContent(
                                element.outerHTML,
                                thumbnail.containers
                            );

                            return (
                                <g 
                                    key={thumbnail.id}
                                    dangerouslySetInnerHTML={{ __html: nestedContent }}
                                />
                            );
                        })}
                    </svg>
                )}
            </div>
        </LayeredPreviewContainer>
    );
};

export default LayeredPreview;

