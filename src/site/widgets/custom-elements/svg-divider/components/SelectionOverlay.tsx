import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const SelectionBox = styled.div`
    position: absolute;
    border: 1px solid #007bff;
    background: rgba(0, 123, 255, 0.1);
    pointer-events: none;
`;

const OverlayContainer = styled.div<{ $enabled: boolean }>`
    position: absolute;
    inset: 0;
    pointer-events: ${props => props.$enabled ? 'auto' : 'none'};
    user-select: none;
`;

interface SelectionOverlayProps {
    enabled: boolean;
    svgRef: React.RefObject<SVGSVGElement>;
    onSelectionChange: (selectedElements: Element[]) => void;
}

const SelectionOverlay: React.FC<SelectionOverlayProps> = ({
    enabled,
    svgRef,
    onSelectionChange
}) => {
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
    const [selectionBox, setSelectionBox] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!enabled || !containerRef.current) return;

        const containerBounds = containerRef.current.getBoundingClientRect();
        const x = e.clientX - containerBounds.left;
        const y = e.clientY - containerBounds.top;

        setIsSelecting(true);
        setSelectionStart({ x, y });
        setSelectionBox({ x, y, width: 0, height: 0 });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isSelecting || !enabled || !containerRef.current) return;

        const containerBounds = containerRef.current.getBoundingClientRect();
        const currentX = e.clientX - containerBounds.left;
        const currentY = e.clientY - containerBounds.top;

        const x = Math.min(currentX, selectionStart.x);
        const y = Math.min(currentY, selectionStart.y);
        const width = Math.abs(currentX - selectionStart.x);
        const height = Math.abs(currentY - selectionStart.y);

        setSelectionBox({ x, y, width, height });
    };

    const handleMouseUp = () => {
        if (!isSelecting || !enabled || !svgRef.current) return;

        // Convert selection box coordinates to SVG coordinates
        const svgBounds = svgRef.current.getBoundingClientRect();
        const svgViewBox = svgRef.current.viewBox.baseVal;
        
        const scaleX = svgViewBox.width / svgBounds.width;
        const scaleY = svgViewBox.height / svgBounds.height;

        const selectionBounds = {
            x: (selectionBox.x - svgBounds.left) * scaleX + svgViewBox.x,
            y: (selectionBox.y - svgBounds.top) * scaleY + svgViewBox.y,
            width: selectionBox.width * scaleX,
            height: selectionBox.height * scaleY
        };

        // Find elements within the selection bounds
        const selectableElements = svgRef.current.querySelectorAll('path, rect, circle, ellipse, polygon, polyline, line');
        const selectedElements = Array.from(selectableElements).filter(element => {
            const bbox = (element as SVGGraphicsElement).getBBox();
            return (
                bbox.x >= selectionBounds.x &&
                bbox.y >= selectionBounds.y &&
                (bbox.x + bbox.width) <= (selectionBounds.x + selectionBounds.width) &&
                (bbox.y + bbox.height) <= (selectionBounds.y + selectionBounds.height)
            );
        });

        onSelectionChange(selectedElements);
        setIsSelecting(false);
        setSelectionBox({ x: 0, y: 0, width: 0, height: 0 });
    };

    const handleMouseLeave = () => {
        if (isSelecting) {
            handleMouseUp();
        }
    };

    return (
        <OverlayContainer
            ref={containerRef}
            $enabled={enabled}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            {isSelecting && (
                <SelectionBox
                    style={{
                        left: selectionBox.x,
                        top: selectionBox.y,
                        width: selectionBox.width,
                        height: selectionBox.height
                    }}
                />
            )}
        </OverlayContainer>
    );
};

export default SelectionOverlay;
