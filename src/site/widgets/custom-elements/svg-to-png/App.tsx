import React, {useState, useEffect, useCallback} from 'react';
import ErrorBoundary from './ErrorBoundary';
import './App.css';
import DiagnosticsPanel, { DiagnosticsInfo } from './DiagnosticsPanel';
import { cleanSvgWithNewStrategy } from './svgUtils';
import SvgComparisonPanel from './SvgComparisonPanel';
import {AppContainer} from "./styledComponents";

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

        const blob = new Blob([cleanedSvg], { type: '[image/svg+xml;charset=utf-8]' });
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
        <AppContainer><ErrorBoundary>
            <div className="container">
                <div className="tabs" role="tablist">
                    <button 
                        className={`tab ${activeTab === 'input' ? 'active' : ''}`}
                        onClick={() => setActiveTab('input')}
                        role="tab"
                        aria-selected={activeTab === 'input'}
                        aria-controls="input-panel"
                    >
                        Input
                    </button>
                    <button 
                        className={`tab ${activeTab === 'comparison' ? 'active' : ''}`}
                        onClick={() => setActiveTab('comparison')}
                        disabled={!cleanedSvg}
                        role="tab"
                        aria-selected={activeTab === 'comparison'}
                        aria-controls="comparison-panel"
                    >
                        Comparison
                    </button>
                    <button 
                        className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('preview')}
                        disabled={!convertedImage}
                        role="tab"
                        aria-selected={activeTab === 'preview'}
                        aria-controls="preview-panel"
                    >
                        PNG Preview
                    </button>
                </div>

                {activeTab === 'input' && (
                    <div className="input-section" id="input-panel" role="tabpanel">
                        <textarea 
                            value={svgInput}
                            onChange={handleInputChange}
                            placeholder="Paste your SVG code here..."
                            aria-label="SVG input"
                        />
                        <button 
                            className="convert-button"
                            onClick={handleClean}
                            disabled={!svgInput}
                            aria-label="Clean SVG code"
                        >
                            Clean SVG
                        </button>
                    </div>
                )}

                {activeTab === 'comparison' && (
                    <div className="comparison-section" id="comparison-panel" role="tabpanel">
                        <SvgComparisonPanel 
                            originalSvg={svgInput}
                            cleanedSvg={cleanedSvg}
                            onConvertToPng={convertToImage}
                        />
                    </div>
                )}

                {activeTab === 'preview' && convertedImage && (
                    <div className="preview-section" id="preview-panel" role="tabpanel">
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
        </ErrorBoundary></AppContainer>
    );
}

export default App;

