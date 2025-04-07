import React, { useEffect, useRef, useState } from 'react';

interface PngPreviewTabProps {
    svgContent: string;
}

const PngPreviewTab: React.FC<PngPreviewTabProps> = ({ svgContent }) => {
    const [pngUrl, setPngUrl] = useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!svgContent) {
            setPngUrl('');
            return;
        }

        const svg = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svg);
        const img = new Image();

        img.onload = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                    setPngUrl(canvas.toDataURL('image/png'));
                }
            }
            URL.revokeObjectURL(url);
        };

        img.src = url;
    }, [svgContent]);

    const handleDownload = () => {
        if (pngUrl) {
            const link = document.createElement('a');
            link.download = 'converted-image.png';
            link.href = pngUrl;
            link.click();
        }
    };

    return (
        <div className="png-preview-tab">
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {pngUrl && (
                <>
                    <div className="preview-container">
                        <img src={pngUrl} alt="PNG preview" />
                    </div>
                    <button onClick={handleDownload} className="download-button">
                        Download PNG
                    </button>
                </>
            )}
        </div>
    );
};

export default PngPreviewTab;
