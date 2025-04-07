import React, { useState, useRef, useEffect } from 'react';
import CopyButton from './CopyButton';
import { calculateSize } from '../utils/sizeUtils';

interface PreviewTabProps {
    svgContent: string;
}


const PreviewTab: React.FC<PreviewTabProps> = ({ svgContent }) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const previewRef = useRef<HTMLDivElement>(null);
    const size = calculateSize(svgContent);
    const isDragging = useRef(false);
    const lastPosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const element = previewRef.current;
        if (!element) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault();
                const delta = e.deltaY * -0.01;
                setScale(prevScale => Math.min(Math.max(0.1, prevScale + delta), 3));
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                isDragging.current = true;
                lastPosition.current = {
                    x: e.touches[0].clientX - position.x,
                    y: e.touches[0].clientY - position.y
                };
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isDragging.current && e.touches.length === 1) {
                e.preventDefault();
                const newX = e.touches[0].clientX - lastPosition.current.x;
                const newY = e.touches[0].clientY - lastPosition.current.y;
                setPosition({ x: newX, y: newY });
            }
        };

        const handleTouchEnd = () => {
            isDragging.current = false;
        };

        element.addEventListener('wheel', handleWheel, { passive: false });
        element.addEventListener('touchstart', handleTouchStart);
        element.addEventListener('touchmove', handleTouchMove, { passive: false });
        element.addEventListener('touchend', handleTouchEnd);

        return () => {
            element.removeEventListener('wheel', handleWheel);
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchmove', handleTouchMove);
            element.removeEventListener('touchend', handleTouchEnd);
        };
    }, [position]);

    return (
        <div className="preview-tab">
            <div className="preview-header" style={{ marginBottom: '16px' }}>
                <div className="preview-controls" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span className="size-info">Size: {size}</span>
                    <span className="zoom-info">Zoom: {Math.round(scale * 100)}%</span>
                </div>
            </div>
            <div
                ref={previewRef}
                className="preview-container parent-container"
                style={{
                    position: 'relative',
                    flex: 1,
                    overflow: 'auto',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    padding: '16px',
                    touchAction: 'none'
                }}
            >
                <CopyButton content={svgContent} label="Copy SVG" />
                <div
                    className="svg-preview"
                    style={{
                        transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                        transformOrigin: 'center center',
                        cursor: 'grab'
                    }}
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                />
            </div>
        </div>
    );
};

export default PreviewTab;

