import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Container,
    Error,
    InputSection,
    SettingsButton,
    SvgPreview,
    SvgPreviewContainer,
    SvgPreviewTitle,
    Thumbnail,
    Sidebar,
    SelectedThumbnailsWrapper,
    Modal,
    ModalContent,
    ModalToggle,
    Badge
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
    const [thumbnails, setThumbnails] = useState<string[]>([]);
    const [disabledThumbnails, setDisabledThumbnails] = useState<number[]>([]);
    const [subThumbnails, setSubThumbnails] = useState<{ [key: number]: string[] }>({});
    const [selectedThumbnails, setSelectedThumbnails] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
                    const svgContainer = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgElement.getAttribute('width')}" height="${svgElement.getAttribute('height')}" viewBox="${svgElement.getAttribute('viewBox')}">`;
                    setComponentCount(elements.length);
                    setThumbnails(elements.map((el, index) => `data:image/svg+xml;utf8,${encodeURIComponent(svgContainer + el.outerHTML + '</svg>')}`));
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

    const handleSubThumbnailClick = (index: number, subIndex: number) => {
        const svgElement = svgPreviewRef.current?.querySelector('svg');
        if (svgElement) {
            const elements = Array.from(svgElement.children);
            const clickedElement = elements[index];
            const subElements = Array.from(clickedElement.children);
            const clickedSubElement = subElements[subIndex];
            const svgContainer = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgElement.getAttribute('width')}" height="${svgElement.getAttribute('height')}" viewBox="${svgElement.getAttribute('viewBox')}">`;
            const newThumbnail = `data:image/svg+xml;utf8,${encodeURIComponent(svgContainer + clickedSubElement.outerHTML + '</svg>')}`;
            if (!selectedThumbnails.includes(newThumbnail)) {
                setSelectedThumbnails([...selectedThumbnails, newThumbnail]);
            }
        }
    };
    
    const handleThumbnailClick = (index: number) => {
        if (disabledThumbnails.includes(index)) {
            setDisabledThumbnails(disabledThumbnails.filter(i => i !== index));
            setSubThumbnails(prev => {
                const newSubThumbnails = { ...prev };
                delete newSubThumbnails[index];
                return newSubThumbnails;
            });
        } else {
            const svgElement = svgPreviewRef.current?.querySelector('svg');
            if (svgElement) {
                const elements = Array.from(svgElement.children);
                const clickedElement = elements[index];
                const subElements = Array.from(clickedElement.children);
                const svgContainer = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgElement.getAttribute('width')}" height="${svgElement.getAttribute('height')}" viewBox="${svgElement.getAttribute('viewBox')}">`;
                setSubThumbnails(prev => ({
                    ...prev,
                    [index]: subElements.map((el, subIndex) => `data:image/svg+xml;utf8,${encodeURIComponent(svgContainer + el.outerHTML + '</svg>')}`)
                }));
                setDisabledThumbnails([...disabledThumbnails, index]);
            }
        }
    };

    return (
        <Container className={isDarkTheme ? 'dark' : ''}>
            <Sidebar>
                <SettingsButton onClick={() => setIsDarkTheme(!isDarkTheme)}>
                    <Settings/>
                </SettingsButton>
                <h2>Thumbnails</h2>
                <div className="thumbnails-wrapper">
                    {thumbnails.map((thumbnail, index) => (
                        <Thumbnail
                            key={index}
                            src={thumbnail}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => handleThumbnailClick(index)}
                            className={disabledThumbnails.includes(index) ? 'disabled' : ''}
                        />
                    ))}
                </div>
                {/* Removed Selected Thumbnails section from Sidebar */}
            </Sidebar>
            <div className="main-content">
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
                {inputFileContent && (
                    <SvgPreviewContainer>
                        <SvgPreviewTitle>SVG Preview</SvgPreviewTitle>
                        <SvgPreview ref={svgPreviewRef}>
                            <ReactSVG src={`data:image/svg+xml;utf8,${encodeURIComponent(inputFileContent)}`} />
                        </SvgPreview>
                        <p>Number of logical components: {componentCount}</p>
                        <div className="sub-thumbnails-wrapper">
                            {Object.keys(subThumbnails).map((key) => (
                                <div key={key}>
                                    {subThumbnails[Number(key)].map((subThumbnail, subIndex) => (
                                        <Thumbnail
                                            key={subIndex}
                                            src={subThumbnail}
                                            alt={`Sub-thumbnail ${subIndex + 1}`}
                                            onClick={() => handleSubThumbnailClick(Number(key), subIndex)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </SvgPreviewContainer>
                )}
            </div>
            <ModalToggle onClick={() => setIsModalOpen(!isModalOpen)}>
                {isModalOpen ? 'Hide Exported Elements' : 'Show Exported Elements'}
                <Badge>{selectedThumbnails.length}</Badge>
            </ModalToggle>
            <Modal className={isModalOpen ? 'open' : ''}>
                <ModalContent>
                    <h2>Selected Thumbnails</h2>
                    <SelectedThumbnailsWrapper>
                        {selectedThumbnails.map((thumbnail, index) => (
                            <Thumbnail key={index} src={thumbnail} alt={`Selected Thumbnail ${index + 1}`} />
                        ))}
                    </SelectedThumbnailsWrapper>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default App;

