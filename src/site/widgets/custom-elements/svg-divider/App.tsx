import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Container,
    Error,
    InputSection,
    SettingsButton,
    SvgPreview,
    SvgPreviewContainer,
    SvgPreviewTitle
} from './styledComponents';
import {ReactSVG} from 'react-svg';
import {Settings} from '@wix/wix-ui-icons-common';

const App: React.FC = () => {
    const [inputFile, setInputFile] = useState<File | null>(null);
    const [inputFileContent, setInputFileContent] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const svgPreviewRef = useRef<HTMLDivElement>(null);
    const [componentCount, setComponentCount] = useState<number>(0);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

    useEffect(() => {
        if (inputFileContent) {
            const svgPreviewElement = svgPreviewRef.current;
            if (svgPreviewElement) {
                svgPreviewElement.innerHTML = inputFileContent;
                const svgElement = svgPreviewElement.querySelector('svg');
                if (svgElement) {
                    svgPreviewElement.style.width = svgElement.getAttribute('width') || '100%';
                    svgPreviewElement.style.height = svgElement.getAttribute('height') || 'auto';
                    const elements = Array.from(svgElement.children);
                    setComponentCount(elements.length);
                }
            }
        }
    }, [inputFileContent]);

    useEffect(() => {
        if (inputFile) {
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                const svgData = event.target?.result as string;
                setInputFileContent(svgData);
            };
            fileReader.readAsText(inputFile);
        }
    }, [inputFile]);

    const handleProcessSVG = () => {
        if (!inputFile) {
            alert('Please provide an input SVG file.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                const svgData = event.target?.result as string;
                setInputFileContent(svgData);
            };
            fileReader.readAsText(inputFile);
        } catch (error) {
            console.error('Error processing SVG file:', error);
            setError('Error processing SVG file.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className={isDarkTheme ? 'dark' : ''}>
            <h1>SVG Processor</h1>
            <InputSection>
                <label htmlFor="fileInput">
                    Input File:
                </label>
                <input id="fileInput" type="file" accept=".svg"
                       onChange={(e) => setInputFile(e.target.files?.[0] || null)}/>
                <Button onClick={handleProcessSVG} disabled={loading}>
                    {loading ? 'Processing...' : 'Process SVG'}
                </Button>
                {error && <Error>{error}</Error>}
            </InputSection>
            <SettingsButton onClick={() => setIsDarkTheme(!isDarkTheme)}>
                <Settings/>
            </SettingsButton>
            {inputFileContent && (
                <SvgPreviewContainer>
                    <SvgPreviewTitle>SVG Preview</SvgPreviewTitle>
                    <SvgPreview ref={svgPreviewRef}>
                        <ReactSVG src={`data:image/svg+xml;utf8,${encodeURIComponent(inputFileContent)}`} responsive/>
                    </SvgPreview>
                    <p>Number of logical components: {componentCount}</p>
                </SvgPreviewContainer>
            )}
        </Container>
    );
};

export default App;
