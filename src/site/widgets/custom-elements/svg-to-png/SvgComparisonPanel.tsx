import React from 'react';

interface SvgComparisonPanelProps {
    originalSvg: string;
    cleanedSvg: string;
    onConvertToPng: () => void;
}

const SvgComparisonPanel: React.FC<SvgComparisonPanelProps> = ({
    originalSvg,
    cleanedSvg,
    onConvertToPng
}) => {
    return (
        <div className="svg-comparison" role="region" aria-label="SVG comparison">
            <div className="svg-panel">
                <h3>Original SVG</h3>
                <div className="svg-preview" aria-label="Original SVG preview" dangerouslySetInnerHTML={{ __html: originalSvg }} />
                <details>
                    <summary>View Code</summary>
                    <pre className="svg-code" aria-label="Original SVG code">{originalSvg}</pre>
                </details>
            </div>
            <div className="svg-panel">
                <h3>Cleaned SVG</h3>
                <div className="svg-preview" aria-label="Cleaned SVG preview" dangerouslySetInnerHTML={{ __html: cleanedSvg }} />
                <details>
                    <summary>View Code</summary>
                    <pre className="svg-code" aria-label="Cleaned SVG code">{cleanedSvg}</pre>
                </details>
                <button 
                    className="convert-button" 
                    onClick={onConvertToPng}
                    aria-label="Convert SVG to PNG"
                >
                    Convert to PNG
                </button>
            </div>
        </div>
    );
};

export default SvgComparisonPanel;

