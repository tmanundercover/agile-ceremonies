import React, {useState, useEffect, useRef} from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.css';
import ErrorBoundary from './ErrorBoundary';
import './App.css';
import PreviewTab from './components/PreviewTab';
import ReactComponentTab from './components/ReactComponentTab';
import PngPreviewTab from './components/PngPreviewTab';
import ConversionsTab from './components/ConversionsTab';
import {AppContainer} from "./styledComponents";
import ErrorPopup from './components/ErrorPopup';
import {validateSvg} from './svgValidator';
import DiagnosticsPanel, { DiagnosticsInfo } from './DiagnosticsPanel';
import ImagesTab from "./components/ImagesTab";

function App() {
    const [svgInput, setSvgInput] = useState('');
    const [activeTab, setActiveTab] = useState<'preview' | 'react' | 'png' | 'conversions' | 'diagnostics' | 'images'>('preview');
    const [error, setError] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);
    const [diagnostics, setDiagnostics] = useState<DiagnosticsInfo | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const preRef = useRef<HTMLPreElement>(null);

    const syncScroll = (event: React.UIEvent<HTMLElement>) => {
        const source = event.currentTarget;
        const target = source === textareaRef.current ? preRef.current : textareaRef.current;
        
        if (target) {
            target.scrollTop = source.scrollTop;
            target.scrollLeft = source.scrollLeft;
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = event.target.value;
        setSvgInput(input);

        // Generate diagnostics info with enhanced validation
        const validation = validateSvg(input);
        const newDiagnostics: DiagnosticsInfo = {
            originalLength: input.length,
            cleanedLength: input.trim().length,
            hasSvgTag: validation.details.structure.hasSvgTag,
            hasXmlns: validation.details.structure.hasValidNamespace,
            parseSuccess: validation.isValid,
            svgElement: validation.details.structure.hasSvgTag,
            processingStep: 'Initial validation',
            metrics: validation.details.metrics,
            security: validation.details.security,
            workflow: validation.details.workflow,
            operations: [
                {
                    step: 'Input received',
                    success: true,
                    timestamp: Date.now()
                }
            ]
        };

        if (!validation.isValid) {
            setError(validation.details.errors.join('\n'));
            setShowError(true);
            newDiagnostics.error = {
                message: validation.details.errors.join('\n'),
                timestamp: Date.now()
            };
        } else {
            setError(null);
            setShowError(false);
        }

        setDiagnostics(newDiagnostics);
    };

    const handleCloseError = () => {
        setShowError(false);
    };

    useEffect(() => {
        Prism.highlightAll();
    }, [svgInput, activeTab]);

    return (
        <AppContainer>
            <ErrorBoundary>
                <div className="container">
                    <div className="editor-section">
                        <div className="code-editor">
                            <pre 
                                ref={preRef}
                                className="language-markup" 
                                onScroll={syncScroll}
                            >
                                <code className="language-markup">{svgInput}</code>
                            </pre>
                            <textarea
                                ref={textareaRef}
                                value={svgInput}
                                onChange={handleInputChange}
                                onScroll={syncScroll}
                                placeholder="Paste your SVG code here..."
                                aria-label="SVG input"
                                spellCheck="false"
                            />
                        </div>
                    </div>

                    <div className="preview-section">
                        <nav className="tab-navigation">
                            <div className="tab-list" role="tablist">
                                <button
                                    className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('preview')}
                                    role="tab"
                                >
                                    SVG Preview
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'react' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('react')}
                                    role="tab"
                                >
                                    React Component
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'png' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('png')}
                                    role="tab"
                                >
                                    PNG Preview
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'conversions' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('conversions')}
                                    role="tab"
                                >
                                    Conversions
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'diagnostics' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('diagnostics')}
                                    role="tab"
                                >
                                    Diagnostics
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'images' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('images')}
                                    role="tab"
                                >
                                    Images
                                </button>

                            </div>
                        </nav>

                        <div className="tab-content-container">
                            {activeTab === 'preview' && <PreviewTab svgContent={svgInput}/>}
                            {activeTab === 'react' && <ReactComponentTab svgContent={svgInput}/>}
                            {activeTab === 'png' && <PngPreviewTab svgContent={svgInput}/>}
                            {activeTab === 'conversions' && <ConversionsTab svgContent={svgInput}/>}
                            {activeTab === 'diagnostics' && <DiagnosticsPanel diagnostics={diagnostics}/>}
                            {activeTab === 'images' && <ImagesTab svgContent={svgInput}/>}
                        </div>
                    </div>

                    {showError && <ErrorPopup error={error} onClose={handleCloseError}/>}
                </div>
            </ErrorBoundary>
        </AppContainer>
    );
}

export default App;

