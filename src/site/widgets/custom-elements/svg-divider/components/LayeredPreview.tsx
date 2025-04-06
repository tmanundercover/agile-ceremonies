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
}

const LayeredPreview: React.FC<LayeredPreviewProps> = ({
    originalSvgShell,
    selectedThumbnails,
    parentSvgProps,
    svgContent,
    componentCount
}) => {
    const [showOriginal, setShowOriginal] = useState(false);

    if (!originalSvgShell && !svgContent) return null;

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
                            const svgElement = doc.querySelector('svg');
                            
                            if (!svgElement) return null;
                            
                            const element = svgElement.querySelector('*');
                            if (!element) return null;
                            
                            let currentElement: Element | null = element;
                            const containers: Element[] = [];
                            
                            while (currentElement && currentElement !== svgElement) {
                                containers.unshift(currentElement.cloneNode(false) as Element);
                                currentElement = currentElement.parentElement;
                            }
                            
                            let content = element.outerHTML;
                            containers.forEach((container) => {
                                content = `<${container.tagName.toLowerCase()} ${Array.from(container.attributes)
                                    .map(attr => `${attr.name}="${attr.value}"`)
                                    .join(' ')}>${content}</${container.tagName.toLowerCase()}>`;
                            });
                            
                            return (
                                <g 
                                    key={thumbnail.id}
                                    dangerouslySetInnerHTML={{ __html: content }}
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
