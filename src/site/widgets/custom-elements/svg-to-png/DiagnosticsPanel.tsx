import React from 'react';

export interface DiagnosticsInfo {
    originalLength: number;
    cleanedLength: number;
    hasSvgTag: boolean;
    hasXmlns: boolean;
    parseSuccess: boolean;
    svgElement: boolean;
    processingStep: string;
    cleanedSvg?: string;
    metrics?: {
        elementCount: number;
        depth: number;
        uniqueElements: string[];
        attributeCount: number;
        fileSize: number;
    };
    security?: {
        hasScripts: boolean;
        hasExternalRefs: boolean;
        hasEventHandlers: boolean;
        hasSuspiciousUrls: boolean;
        suspiciousAttributes: string[];
    };
    workflow?: {
        hasFrontend: boolean;
        hasBackend: boolean;
        hasTesting: boolean;
        hasWorkflow: boolean;
        sections: {
            name: string;
            found: boolean;
            required: boolean;
        }[];
    };
    error?: {
        message: string;
        stack?: string;
        timestamp: number;
    };
    operations: {
        step: string;
        success: boolean;
        details?: string;
        timestamp: number;
    }[];
    validationDetails?: {
        structure: {
            hasSvgTag: boolean;
            hasValidNamespace: boolean;
            hasValidViewBox: boolean;
            hasValidDimensions: boolean;
        };
        content: {
            elementCount: number;
            hasDefinitions: boolean;
            hasScripts: boolean;
            hasExternalRefs: boolean;
        };
        optimization: {
            originalSize: number;
            optimizedSize: number;
            compressionRatio: number;
            removedElements: string[];
        };
        errors: string[];
        warnings: string[];
    };
}

interface DiagnosticsPanelProps {
    diagnostics: DiagnosticsInfo | null;
}

const DiagnosticsPanel: React.FC<DiagnosticsPanelProps> = ({ diagnostics }) => {
    if (!diagnostics) return null;

    const downloadLog = () => {
        const logContent = JSON.stringify({
            timestamp: new Date().toISOString(),
            metrics: {
                originalLength: diagnostics.originalLength,
                cleanedLength: diagnostics.cleanedLength,
                compressionRatio: ((diagnostics.cleanedLength / diagnostics.originalLength) * 100).toFixed(2) + '%'
            },
            validations: {
                hasSvgTag: diagnostics.hasSvgTag,
                hasXmlns: diagnostics.hasXmlns,
                parseSuccess: diagnostics.parseSuccess,
                svgElement: diagnostics.svgElement
            },
            operations: diagnostics.operations
        }, null, 2);

        const blob = new Blob([logContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `svg-cleaning-log-${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="diagnostics-panel" role="complementary" aria-label="SVG Diagnostics">
            <h3>SVG Diagnostics</h3>
            <div className="diagnostics-content">
                <div>Current step: {diagnostics.processingStep}</div>
                <div>Original input length: {diagnostics.originalLength}</div>
                <div>Cleaned input length: {diagnostics.cleanedLength}</div>
                <div className={diagnostics.hasSvgTag ? 'success' : 'error'}>
                    Has SVG tag: {diagnostics.hasSvgTag ? '✓' : '✗'}
                </div>
                <div className={diagnostics.hasXmlns ? 'success' : 'error'}>
                    Has xmlns attribute: {diagnostics.hasXmlns ? '✓' : '✗'}
                </div>
                <div className={diagnostics.parseSuccess ? 'success' : 'error'}>
                    Parse successful: {diagnostics.parseSuccess ? '✓' : '✗'}
                </div>
                <div className={diagnostics.svgElement ? 'success' : 'error'}>
                    SVG element found: {diagnostics.svgElement ? '✓' : '✗'}
                </div>
                {diagnostics.cleanedSvg && (
                    <div className="cleaned-svg">
                        <h4>Cleaned SVG:</h4>
                        <pre>{diagnostics.cleanedSvg}</pre>
                    </div>
                )}
                {diagnostics.error && (
                    <div className="error-details">
                        <h4>Error Details</h4>
                        <div className="error">
                            <strong>Message:</strong> {diagnostics.error.message}
                            {diagnostics.error.stack && (
                                <pre className="error-stack">{diagnostics.error.stack}</pre>
                            )}
                            <div className="error-timestamp">
                                Time: {new Date(diagnostics.error.timestamp).toLocaleString()}
                            </div>
                        </div>
                    </div>
                )}
                <div className="operations-log">
                    <h4>Operations Log</h4>
                    {diagnostics.operations?.map((op, index) => (
                        <div key={index} className={op.success ? 'success' : 'error'}>
                            <span>{new Date(op.timestamp).toLocaleTimeString()}</span>
                            <strong> {op.step}</strong>
                            {op.details && <p>{op.details}</p>}
                        </div>
                    ))}
                </div>
                <button 
                    onClick={downloadLog} 
                    className="download-log-button"
                    aria-label="Download diagnostics log"
                >
                    Download Diagnostics Log
                </button>
            </div>
        </div>
    );
};

export default DiagnosticsPanel;

