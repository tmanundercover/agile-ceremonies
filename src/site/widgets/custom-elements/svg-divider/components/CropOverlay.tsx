import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const OverlayContainer = styled.div<{ $enabled: boolean }>`
    position: absolute;
    inset: 0;
    pointer-events: ${props => props.$enabled ? 'auto' : 'none'};
    user-select: none;
`;

const CropBox = styled.div`
    position: absolute;
    border: 2px solid #007bff;
    background: rgba(0, 123, 255, 0.1);
    cursor: move;
`;

const Handle = styled.div`
    position: absolute;
    width: 10px;
    height: 10px;
    background: white;
    border: 2px solid #007bff;
    
    &.top-left { top: -5px; left: -5px; cursor: nw-resize; }
    &.top-right { top: -5px; right: -5px; cursor: ne-resize; }
    &.bottom-left { bottom: -5px; left: -5px; cursor: sw-resize; }
    &.bottom-right { bottom: -5px; right: -5px; cursor: se-resize; }
`;

interface CropOverlayProps {
    enabled: boolean;
    svgRef: React.RefObject<SVGSVGElement>;
    onCropChange?: (values: { x: number; y: number; width: number; height: number }) => void;
}

const CropOverlay: React.FC<CropOverlayProps> = ({ 
    enabled, 
    svgRef, 
    onCropChange = () => {} // Provide default empty function
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cropBox, setCropBox] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeHandle, setResizeHandle] = useState<string | null>(null);

    useEffect(() => {
        if (enabled && svgRef.current && containerRef.current) {
            const svg = svgRef.current;
            const bounds = svg.getBoundingClientRect();
            const initialWidth = bounds.width * 0.8;
            const initialHeight = bounds.height * 0.8;
            
            setCropBox({
                x: (bounds.width - initialWidth) / 2,
                y: (bounds.height - initialHeight) / 2,
                width: initialWidth,
                height: initialHeight
            });
        }
    }, [enabled]);

    useEffect(() => {
        if (enabled && svgRef.current) {
            const svg = svgRef.current;
            const bounds = svg.getBoundingClientRect();
            const viewBox = svg.viewBox.baseVal;
            
            const scaleX = viewBox.width / bounds.width;
            const scaleY = viewBox.height / bounds.height;
            
            onCropChange({
                x: cropBox.x * scaleX + viewBox.x,
                y: cropBox.y * scaleY + viewBox.y,
                width: cropBox.width * scaleX,
                height: cropBox.height * scaleY
            });
        }
    }, [cropBox, enabled, onCropChange]);

    const handleMouseDown = (e: React.MouseEvent, handle?: string) => {
        if (!enabled) return;
        
        setIsDragging(true);
        setDragStart({
            x: e.clientX - cropBox.x,
            y: e.clientY - cropBox.y
        });
        
        if (handle) {
            setResizeHandle(handle);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !enabled || !containerRef.current) return;

        const container = containerRef.current.getBoundingClientRect();
        
        if (resizeHandle) {
            // Handle resizing
            const newBox = { ...cropBox };
            
            switch (resizeHandle) {
                case 'top-left':
                    newBox.width += newBox.x - (e.clientX - container.left);
                    newBox.height += newBox.y - (e.clientY - container.top);
                    newBox.x = e.clientX - container.left;
                    newBox.y = e.clientY - container.top;
                    break;
                case 'top-right':
                    newBox.width = e.clientX - container.left - newBox.x;
                    newBox.height += newBox.y - (e.clientY - container.top);
                    newBox.y = e.clientY - container.top;
                    break;
                case 'bottom-left':
                    newBox.width += newBox.x - (e.clientX - container.left);
                    newBox.height = e.clientY - container.top - newBox.y;
                    newBox.x = e.clientX - container.left;
                    break;
                case 'bottom-right':
                    newBox.width = e.clientX - container.left - newBox.x;
                    newBox.height = e.clientY - container.top - newBox.y;
                    break;
            }
            
            // Enforce minimum size
            if (newBox.width >= 20 && newBox.height >= 20) {
                setCropBox(newBox);
            }
        } else {
            // Handle dragging
            setCropBox(prev => ({
                ...prev,
                x: Math.max(0, Math.min(e.clientX - dragStart.x, container.width - prev.width)),
                y: Math.max(0, Math.min(e.clientY - dragStart.y, container.height - prev.height))
            }));
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setResizeHandle(null);
    };

    return (
        <OverlayContainer
            ref={containerRef}
            $enabled={enabled}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {enabled && (
                <CropBox
                    style={{
                        left: cropBox.x,
                        top: cropBox.y,
                        width: cropBox.width,
                        height: cropBox.height
                    }}
                    onMouseDown={e => handleMouseDown(e)}
                >
                    <Handle
                        className="top-left"
                        onMouseDown={e => handleMouseDown(e, 'top-left')}
                    />
                    <Handle
                        className="top-right"
                        onMouseDown={e => handleMouseDown(e, 'top-right')}
                    />
                    <Handle
                        className="bottom-left"
                        onMouseDown={e => handleMouseDown(e, 'bottom-left')}
                    />
                    <Handle
                        className="bottom-right"
                        onMouseDown={e => handleMouseDown(e, 'bottom-right')}
                    />
                </CropBox>
            )}
        </OverlayContainer>
    );
};

export default CropOverlay;

