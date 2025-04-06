import React, {useState} from 'react';
import './App.css';

function App() {
    const [svgInput, setSvgInput] = useState(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/>
</svg>`);
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const [pngOutput, setPngOutput] = useState('');
    const [error, setError] = useState('');

    const svgToPng = (svgString: string, width: number, height: number) => {
        return new Promise((resolve, reject) => {
            try {
                const svgBlob = new Blob([svgString], {type: 'image/svg+xml'});
                const url = URL.createObjectURL(svgBlob);

                const img = new Image();
                img.onload = () => {
                    try {
                        const canvas = document.createElement('canvas');
                        canvas.width = width || img.width;
                        canvas.height = height || img.height;

                        const ctx = canvas.getContext('2d');
                        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

                        const pngData = canvas.toDataURL('image/png');

                        URL.revokeObjectURL(url);

                        resolve(pngData);
                    } catch (err) {
                        reject(err);
                    }
                };

                img.onerror = (err) => {
                    URL.revokeObjectURL(url);
                    reject(err);
                };

                img.src = url;
            } catch (err) {
                reject(err);
            }
        });
    };

    const handleConvert = async () => {
        setError('');
        setPngOutput('');

        if (!svgInput.trim()) {
            setError('Please enter SVG code');
            return;
        }

        try {
            const pngData: any = await svgToPng(svgInput, width, height);
            setPngOutput(pngData);
        } catch (err: any) {
            setError('Error converting SVG to PNG: ' + err.message);
        }
    };

    const handleDownload = () => {
        if (pngOutput) {
            const link = document.createElement('a');
            link.download = 'converted-image.png';
            link.href = pngOutput;
            link.click();
        }
    };

    return (
        <div className="container">
            <h2>SVG to PNG Converter</h2>

            <div className="input-section">
                <label htmlFor="svgInput">Paste your SVG code here:</label>
                <textarea
                    id="svgInput"
                    value={svgInput}
                    onChange={(e) => setSvgInput(e.target.value)}
                    placeholder="<svg>...</svg>"
                />
            </div>

            <div className="dimensions">
                <div className="input-group">
                    <label htmlFor="width">Width:</label>
                    <input
                        type="number"
                        id="width"
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="height">Height:</label>
                    <input
                        type="number"
                        id="height"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                    />
                </div>
            </div>

            <button onClick={handleConvert} className="convert-button">
                Convert to PNG
            </button>

            {error && <div className="error">{error}</div>}

            <div className="preview">
                <h3>Preview:</h3>

                <div className="preview-section">
                    <h4>SVG Input:</h4>
                    <div dangerouslySetInnerHTML={{__html: svgInput}}/>
                </div>

                {pngOutput && (
                    <div className="preview-section">
                        <h4>PNG Output:</h4>
                        <img src={pngOutput} alt="Converted PNG"/>
                        <button onClick={handleDownload} className="download-button">
                            Download PNG
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;