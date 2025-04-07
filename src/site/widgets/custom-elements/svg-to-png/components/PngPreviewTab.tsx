import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;

    .image-container {
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 16px;
        background: #fff;
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    
    .controls {
        display: flex;
        gap: 16px;
        align-items: center;
    }

    .download-button {
        padding: 8px 16px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background: #45a049;
        }
    }
`;

interface PngPreviewTabProps {
    svgContent: string;
}

const sanitizeXml = (content: string): string => {
    return content
        .replace(/&(?!(amp;|lt;|gt;|quot;|#\d+;|#x[\da-f]+;))/gi, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
};

const convertSvgToDataUrl = (svgContent: string): string => {
    // Create a Base64 encoded version of the SVG
    const svgBase64 = btoa(unescape(encodeURIComponent(svgContent)));
    return `data:image/svg+xml;base64,${svgBase64}`;
};

const PngPreviewTab: React.FC<PngPreviewTabProps> = ({ svgContent }) => {
    const [pngUrl, setPngUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [conversionDiagnostics, setConversionDiagnostics] = useState<any>(null);

    useEffect(() => {
        const convertToPng = async () => {
            if (!svgContent) return;
            setIsConverting(true);
            setError(null);
            
            const diagnostics = {
                startTime: Date.now(),
                duration: 0,
                endTime: 0,
                steps: [] as any[],
                svgSize: svgContent.length,
                xmlValidation: null as any,
            };
            
            try {
                // Sanitize XML content first
                const sanitizedSvg = sanitizeXml(svgContent);
                
                // Convert SVG to data URL first
                const svgDataUrl = convertSvgToDataUrl(sanitizedSvg);

                diagnostics.steps.push({
                    name: 'SVG to Data URL',
                    success: true,
                    timestamp: Date.now(),
                    dataUrlLength: svgDataUrl.length
                });

                // Create a new image with the data URL
                const img = new Image();
                img.crossOrigin = 'anonymous';

                const imageLoadPromise = new Promise((resolve, reject) => {
                    img.onload = () => {
                        diagnostics.steps.push({
                            name: 'Image Load',
                            success: true,
                            timestamp: Date.now(),
                            dimensions: {
                                width: img.width,
                                height: img.height
                            }
                        });
                        resolve(img);
                    };
                    img.onerror = (event) => {
                        diagnostics.steps.push({
                            name: 'Image Load',
                            success: false,
                            timestamp: Date.now(),
                            error: 'Failed to load SVG image'
                        });
                        reject(new Error('Failed to load SVG image: ' + (event as ErrorEvent).message));
                    };
                });

                img.src = svgDataUrl;

                // Wait for image to load
                const loadedImg = await imageLoadPromise;
                
                // Create canvas with proper dimensions
                const canvas = document.createElement('canvas');
                const width = (loadedImg as HTMLImageElement).naturalWidth;
                const height = (loadedImg as HTMLImageElement).naturalHeight;
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) throw new Error('Could not get canvas context');

                // Fill white background
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Draw the image
                ctx.drawImage(loadedImg as HTMLImageElement, 0, 0);

                // Convert directly to data URL
                const pngDataUrl = canvas.toDataURL('image/png');
                setPngUrl(pngDataUrl);
                setError(null);

                diagnostics.steps.push({
                    name: 'PNG Conversion',
                    success: true,
                    timestamp: Date.now(),
                    pngDataUrlLength: pngDataUrl.length
                });

            } catch (err) {
                console.error('Conversion error:', err);
                const errorMessage = err instanceof Error ? err.message : 'Failed to convert SVG to PNG';
                setError(errorMessage);
                
                diagnostics.steps.push({
                    name: 'Error',
                    success: false,
                    timestamp: Date.now(),
                    error: errorMessage
                });
            } finally {
                diagnostics.endTime = Date.now();
                diagnostics.duration = diagnostics.endTime - diagnostics.startTime;
                setConversionDiagnostics(diagnostics);
                setIsConverting(false);
            }
        };

        convertToPng();
    }, [svgContent]);

    const handleDownload = () => {
        if (!pngUrl) return;
        const link = document.createElement('a');
        link.download = 'converted-image.png';
        link.href = pngUrl;
        link.click();
    };

    return (
        <PreviewContainer>
            <div className="image-container">
                {error ? (
                    <div className="error-message" style={{ color: 'red' }}>{error}</div>
                ) : isConverting ? (
                    <div>Converting SVG to PNG...</div>
                ) : pngUrl ? (
                    <img 
                        src={pngUrl} 
                        alt="Converted PNG" 
                        style={{ maxWidth: '100%', height: 'auto' }} 
                    />
                ) : (
                    <div>No SVG content to convert</div>
                )}
            </div>
            {pngUrl && !error && (
                <button className="download-button" onClick={handleDownload}>
                    Download PNG
                </button>
            )}
        </PreviewContainer>
    );
};

export default PngPreviewTab;

