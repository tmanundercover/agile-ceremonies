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
}

interface DiagnosticsPanelProps {
    diagnostics: DiagnosticsInfo | null;
}

const DiagnosticsPanel: React.FC<DiagnosticsPanelProps> = ({ diagnostics }) => {
    if (!diagnostics) return null;

    return (
        <div className="diagnostics-panel">
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
            </div>
        </div>
    );
};

export default DiagnosticsPanel;
