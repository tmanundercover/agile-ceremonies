import React from 'react';
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
    }

    svg {
        max-width: 100%;
        height: auto;
    }
`;

interface LayeredPreviewProps {
    originalSvgShell: string | null;
    selectedThumbnails: SvgThumbnail[];
    parentSvgProps: {[key: string]: string};
}

const LayeredPreview: React.FC<LayeredPreviewProps> = ({
    originalSvgShell,
    selectedThumbnails,
    parentSvgProps
}) => {
    if (!originalSvgShell) return null;

    return (
        <LayeredPreviewContainer>
            <h3>Layered Preview</h3>
            <div>
                <svg {...parentSvgProps}>
                    <g dangerouslySetInnerHTML={{ __html: originalSvgShell }} />
                    {selectedThumbnails.map((thumbnail) => {
                        const svgContent = decodeURIComponent(thumbnail.src.split(',')[1]);
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(svgContent, 'image/svg+xml');
                        const element = doc.querySelector('svg > *');
                        
                        return element ? (
                            <g 
                                key={thumbnail.id}
                                dangerouslySetInnerHTML={{ __html: element.outerHTML }}
                            />
                        ) : null;
                    })}
                </svg>
            </div>
        </LayeredPreviewContainer>
    );
};

export default LayeredPreview;
