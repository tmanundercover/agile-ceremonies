import React, { useState, useRef } from 'react';
import { SvgThumbnail, LayeredPreviewProps } from '../types';
import styled from 'styled-components';
import CropOverlay from "./CropOverlay";
import CroppedThumbnails from './CroppedThumbnails';
import SelectionOverlay from './SelectionOverlay';

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

const PreviewWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const LayeredPreview: React.FC<LayeredPreviewProps> = ({
    originalSvgShell,
    selectedThumbnails,
    parentSvgProps,
    svgContent,
    componentCount,
    originalContainer,
    onCropProcess = () => {}, // Provide default empty function
    croppedComponents,
    onSelectionChange = () => {},
}) => {
    const [showOriginal, setShowOriginal] = useState(false);
    const [cropEnabled, setCropEnabled] = useState(false);
    const [selectionEnabled, setSelectionEnabled] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);

    const handleCropChange = (cropValues: { x: number, y: number, width: number, height: number }) => {
        if (onCropProcess) {
            onCropProcess(cropValues);
        }
    };

    const handleSelectionChange = (selectedElements: Element[]) => {
        if (!selectedElements.length) return;

        const selectedComponents = selectedElements.map(element => {
            const clonedElement = element.cloneNode(true) as Element;
            return {
                id: element.id || `selected-${Math.random().toString(36).substr(2, 9)}`,
                svg: clonedElement.outerHTML
            };
        });

        onSelectionChange(selectedComponents);
    };

    if (!originalSvgShell && !svgContent) return null;

    return (
        <LayeredPreviewContainer>
            <h3>
                {showOriginal ? 'Original SVG Preview' : 'Layered Preview'}
                <div>
                    <ToggleButton onClick={() => setCropEnabled(!cropEnabled)}>
                        {cropEnabled ? 'Cancel Crop' : 'Enable Crop'}
                    </ToggleButton>
                    <ToggleButton onClick={() => setShowOriginal(!showOriginal)}>
                        {showOriginal ? 'Show Layered' : 'Show Original'}
                    </ToggleButton>
                    <ToggleButton onClick={() => setSelectionEnabled(!selectionEnabled)}>
                        {selectionEnabled ? 'Cancel Selection' : 'Enable Selection'}
                    </ToggleButton>
                </div>
            </h3>
            <PreviewWrapper>
                <div>
                    {showOriginal ? (
                        <div dangerouslySetInnerHTML={{ __html: svgContent || '' }} />
                    ) : (
                        <svg {...parentSvgProps} ref={svgRef}>
                            {originalSvgShell && (
                                <g dangerouslySetInnerHTML={{ __html: originalSvgShell }} />
                            )}
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
                    )}
                </div>
                <CropOverlay
                    onCropChange={handleCropChange}
                    svgRef={svgRef}
                    enabled={cropEnabled}
                />
                <SelectionOverlay
                    enabled={selectionEnabled}
                    svgRef={svgRef}
                    onSelectionChange={handleSelectionChange}
                />
            </PreviewWrapper>
            <CroppedThumbnails
                croppedComponents={croppedComponents}
                onSelect={(index) => {
                    // Handle thumbnail selection
                    console.log('Selected cropped component:', index);
                }}
            />
        </LayeredPreviewContainer>
    );
};

export default LayeredPreview;

