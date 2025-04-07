import React, {useState, useEffect, useCallback} from 'react';
import ErrorBoundary from './ErrorBoundary';
import './App.css';
import DiagnosticsPanel, { DiagnosticsInfo } from './DiagnosticsPanel';
import { cleanSvgWithNewStrategy } from './svgUtils';
import SvgComparisonPanel from './SvgComparisonPanel';

function App() {
    const [svgInput, setSvgInput] = useState('');
    const [cleanedSvg, setCleanedSvg] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [diagnostics, setDiagnostics] = useState<DiagnosticsInfo | null>(null);
    const [activeTab, setActiveTab] = useState<'input' | 'comparison' | 'preview'>('input');
    const [convertedImage, setConvertedImage] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSvgInput(event.target.value);
        setCleanedSvg('');
        setError(null);
        setDiagnostics(null);
        setConvertedImage(null);
    };

    const handleClean = useCallback(() => {
        try {
            const { cleanedSvg, diagnostics } = cleanSvgWithNewStrategy(svgInput);
            setCleanedSvg(cleanedSvg);
            setDiagnostics(diagnostics);
            setError(null);
            setActiveTab('comparison');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setDiagnostics(null);
        }
    }, [svgInput]);

    const convertToImage = useCallback(() => {
        if (!cleanedSvg) return;

        const blob = new Blob([cleanedSvg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob) {
                        setConvertedImage(URL.createObjectURL(blob));
                        setActiveTab('preview');
                    }
                }, 'image/png');
            }
            URL.revokeObjectURL(url);
        };

        img.onerror = () => {
            setError('Failed to convert SVG to PNG');
            URL.revokeObjectURL(url);
        };

        img.src = url;
    }, [cleanedSvg]);

    return (
        <ErrorBoundary>
            <div className="container">
                <div className="tabs">
                    <button 
                        className={`tab ${activeTab === 'input' ? 'active' : ''}`}
                        onClick={() => setActiveTab('input')}
                    >
                        Input
                    </button>
                    <button 
                        className={`tab ${activeTab === 'comparison' ? 'active' : ''}`}
                        onClick={() => setActiveTab('comparison')}
                        disabled={!cleanedSvg}
                    >
                        Comparison
                    </button>
                    <button 
                        className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('preview')}
                        disabled={!convertedImage}
                    >
                        PNG Preview
                    </button>
                </div>

                {activeTab === 'input' && (
                    <div className="input-section">
                        <textarea 
                            value={svgInput}
                            onChange={handleInputChange}
                            placeholder="Paste your SVG code here..."
                        />
                        <button 
                            className="convert-button"
                            onClick={handleClean}
                            disabled={!svgInput}
                        >
                            Clean SVG
                        </button>
                    </div>
                )}

                {activeTab === 'comparison' && (
                    <div className="comparison-section">
                        <SvgComparisonPanel 
                            originalSvg={svgInput}
                            cleanedSvg={cleanedSvg}
                            onConvertToPng={convertToImage}
                        />
                    </div>
                )}

                {activeTab === 'preview' && convertedImage && (
                    <div className="preview-section">
                        <div>
                            <img src={convertedImage} alt="Converted SVG" />
                            <a
                                href={convertedImage}
                                download="converted.png"
                                className="download-button"
                            >
                                Download PNG
                            </a>
                        </div>
                    </div>
                )}
                
                {error && <div className="error">{error}</div>}
                <DiagnosticsPanel diagnostics={diagnostics} />
            </div>
        </ErrorBoundary>
    );
}

export default App;
