import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button, Dialog, Text, TextField} from '@radix-ui/themes';
import {FileData, FileVersion} from '../../types';
import {saveAs} from 'file-saver';
import {ImageOverlay} from '../image-overlay/ImageOverlay';
import {v4 as uuidv4} from 'uuid';

interface StickerPiece {
    id: string;
    type: 'head' | 'hair' | 'headphones' | 'facial' | 'eyes';
    paths: string[];
    transform: string;
    selected: boolean;
}

interface StickerImage {
    id: string;
    name: string;
    pieces: StickerPiece[];
}

const StickerBuilderContainer = styled.div`
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 0 auto;
    height: 800px;
    max-height: 800px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const StickerCanvas = styled.div`
    width: 100%;
    height: 30vh;
    max-height: 240px;
    border: 2px dashed var(--gray-7);
    border-radius: 16px;
    margin: 16px 0;
    position: relative;
    overflow: hidden;
`;

const StickerPreview = styled.svg`
    width: 1024px;
    height: 1024px;
    cursor: pointer;

    .sticker-piece {
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.05);
        }

        &.selected {
            outline: 2px solid var(--purple-7);
        }
    }
`;

const PieceSelector = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 16px;
    overflow-y: auto;
    max-height: 15vh;
`;

const ChatButton = styled(Button)`
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: linear-gradient(90deg, #9333EA 0%, #A855F7 100%);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

const DropZone = styled.div<{ $isDragging: boolean }>`
    border: 2px dashed ${props => props.$isDragging ? 'var(--purple-7)' : 'var(--gray-7)'};
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    background: ${props => props.$isDragging ? 'var(--purple-3)' : 'transparent'};
    transition: all 0.3s ease;
    cursor: pointer;
    margin-bottom: 16px;
`;

const FileGrid = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 16px;
    overflow-y: auto;
    max-height: 25vh;
`;

const FileCard = styled.div`
    padding: 16px;
    border: 1px solid var(--gray-7);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &:hover {
        border-color: var(--purple-7);
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
`;

const ThumbnailContainer = styled.div`
    width: 100%;
    height: 120px;
    border-radius: 4px;
    overflow: hidden;
    background: var(--gray-3);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    svg {
        width: 40px;
        height: 40px;
        color: var(--gray-7);
    }
`;

const FileInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const FilePreview = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0 auto;
    background: #f8f9fa;
    border: 1px solid var(--gray-7);
    border-radius: 16px;
    box-sizing: border-box;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    pre {
        background: var(--gray-3);
        padding: 16px;
        border-radius: 8px;
        width: 100%;
        height: 100%;
    }
`;

const ImageContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const CategoryPill = styled.div`
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--purple-9);
    color: white;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
    z-index: 1;
`;

const LoadingOverlay = styled.div<{ $visible: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    opacity: ${props => props.$visible ? 1 : 0};
    transition: opacity 0.3s ease;
    pointer-events: ${props => props.$visible ? 'auto' : 'none'};
`;

const LoadingSpinner = styled.div`
    width: 40px;
    height: 40px;
    border: 3px solid var(--purple-3);
    border-radius: 50%;
    border-top-color: var(--purple-9);
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const ChatFooter = styled.div`
    display: flex;
    gap: 8px;
    padding: 16px;
    border-top: 1px solid var(--gray-5);
    background: white;
    width: 100%;
    box-sizing: border-box;
`;

const ChatInput = styled(TextField.Input)`
    flex: 1;
    min-width: 0; // Prevents flex items from overflowing
`;

const TabList = styled.div`
    display: flex;
    gap: 8px;
    padding: 0 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--gray-5);
`;

const TabButton = styled.button<{ $active: boolean }>`
    padding: 8px 16px;
    border: none;
    background: none;
    color: ${props => props.$active ? 'var(--purple-9)' : 'var(--gray-9)'};
    border-bottom: 2px solid ${props => props.$active ? 'var(--purple-9)' : 'transparent'};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        color: var(--purple-9);
    }
`;

const TabContent = styled.div`
    flex: 1;
    overflow: auto;
`;

export const StickerBuilder: React.FC = () => {
    const [images, setImages] = useState<StickerImage[]>([]);
    const [selectedPieces, setSelectedPieces] = useState<StickerPiece[]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [files, setFiles] = useState<FileData[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
    const [isHoveringImage, setIsHoveringImage] = useState(false);
    const [isConverting, setIsConverting] = useState(false);
    const [activeTab, setActiveTab] = useState('preview');

    useEffect(() => {
        const loadImages = async () => {
            try {
                // Example of loading SVG data - in production this would come from your assets
                const mockImages: StickerImage[] = [
                    {
                        id: '1',
                        name: 'Basic Avatar',
                        pieces: [
                            {
                                id: 'head1',
                                type: 'head',
                                paths: ['M50,50 C50,30 70,20 90,20 C110,20 130,30 130,50 C130,70 110,90 90,90 C70,90 50,70 50,50'],
                                transform: 'translate(0,0) scale(1)',
                                selected: false
                            },
                            {
                                id: 'eyes1',
                                type: 'eyes',
                                paths: [
                                    'M70,40 C70,35 75,35 75,40 C75,45 70,45 70,40',
                                    'M110,40 C110,35 115,35 115,40 C115,45 110,45 110,40'
                                ],
                                transform: 'translate(0,0) scale(1)',
                                selected: false
                            },
                            {
                                id: 'hair1',
                                type: 'hair',
                                paths: ['M40,30 C60,10 120,10 140,30 C140,40 130,50 120,45 C110,40 70,40 60,45 C50,50 40,40 40,30'],
                                transform: 'translate(0,0) scale(1)',
                                selected: false
                            }
                        ]
                    }
                ];
                setImages(mockImages);
            } catch (error) {
                console.error('Error loading sticker images:', error);
            }
        };

        loadImages();
    }, []);

    const handlePieceClick = (piece: StickerPiece) => {
        if (piece.selected) {
            setSelectedPieces(prev => prev.filter(p => p.id !== piece.id));
        } else {
            setSelectedPieces(prev => [...prev, piece]);
        }
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const isImageFile = (type: string) => {
        return type.startsWith('image/');
    };

    const handleConvertToSvg = async (file: FileData) => {
        if (!file.content.startsWith('data:image')) return;

        setIsConverting(true);

        try {
            // Create an image element to load the file
            const img = new Image();
            img.src = file.content;

            await new Promise((resolve) => {
                img.onload = resolve;
            });

            // Create a canvas to draw the image
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Draw the image on canvas
            ctx.drawImage(img, 0, 0);

            // TODO: Add proper SVG conversion logic here
            // This is a placeholder that creates a basic SVG wrapper
            const svgContent = `
                <svg width="${img.width}" height="${img.height}" xmlns="http://www.w3.org/2000/svg">
                    <image href="${file.content}" width="${img.width}" height="${img.height}"/>
                </svg>
            `;

            // Update the file with SVG content
            const newFile: FileData = {
                ...file,
                type: 'image/svg+xml',
                content: `data:image/svg+xml;base64,${btoa(svgContent)}`,
                name: file.name.replace(/\.(jpg|jpeg|png)$/i, '.svg')
            };

            setFiles(prev => prev.map(f => f.id === file.id ? newFile : f));
        } finally {
            setIsConverting(false);
        }
    };

    const handleSplitSvg = async (file: FileData) => {
        if (!file.content.includes('svg')) return;

        setIsConverting(true);

        try {
            // Create a parser for SVG content
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(file.content, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');

            if (!svgElement) return;

            // Find all major elements in the SVG
            const layers = Array.from(svgElement.children).filter(el =>
                ['path', 'g', 'rect', 'circle', 'ellipse'].includes(el.tagName)
            );

            // Create separate SVG files for each layer
            const newVersions: FileVersion[] = layers.map((layer, index) => {
                const newSvg = svgElement.cloneNode(false) as SVGElement;
                newSvg.appendChild(layer.cloneNode(true));

                return {
                    id: uuidv4(),
                    name: `Layer ${index + 1}`,
                    content: `data:image/svg+xml;base64,${btoa(newSvg.outerHTML)}`,
                    type: 'image/svg+xml',
                    createdAt: new Date()
                };
            });

            // Update the file with new versions
            const updatedFile = {
                ...file,
                versions: [...(file.versions || []), ...newVersions]
            };

            setFiles(prev => prev.map(f => f.id === file.id ? updatedFile : f));
        } catch (error) {
            console.error('Error splitting SVG:', error);
        } finally {
            setIsConverting(false);
        }
    };

    const getFileCategory = (type: string): string => {
        if (type.startsWith('image/svg')) return 'SVG Vector';
        if (type.startsWith('image/')) return 'Image';
        return 'Document';
    };

    const handleStickerify = async (file: FileData) => {
        setIsConverting(true);

        try {
            const img = new Image();
            img.src = file.content;

            await new Promise((resolve) => {
                img.onload = resolve;
            });

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Apply sticker effect
            ctx.drawImage(img, 0, 0);
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(img.width / 2, img.height / 2, Math.min(img.width, img.height) / 2, 0, Math.PI * 2);
            ctx.fill();

            const newVersion: FileVersion = {
                id: uuidv4(),
                name: 'Sticker Version',
                content: canvas.toDataURL(file.type),
                type: file.type,
                createdAt: new Date()
            };

            const updatedFile = {
                ...file,
                versions: [...(file.versions || []), newVersion]
            };

            setFiles(prev => prev.map(f => f.id === file.id ? updatedFile : f));
        } finally {
            setIsConverting(false);
        }
    };

    const handleSaveFile = (file: FileData) => {
        const blob = dataURItoBlob(file.content);
        const defaultPath = '/Users/terrelltrapperkeepersingleton/IdeaProjects/agile-ceremonies/saved-svgs';
        const savePath = `${defaultPath}/${file.name}`;

        saveAs(blob, file.name);

        // Update the file with the save location
        const updatedFile = {
            ...file,
            savedSvgLocation: savePath
        };

        setFiles(prev => prev.map(f => f.id === file.id ? updatedFile : f));
    };

    const dataURItoBlob = (dataURI: string): Blob => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], {type: mimeString});
    };

    const renderFileContent = (file: FileData) => {
        if (isImageFile(file.type)) {
            return (
                <div style={{ width: '100%', height: '100%' }}>
                    <CategoryPill>{getFileCategory(file.type)}</CategoryPill>
                    <ImageContainer
                        onMouseEnter={() => setIsHoveringImage(true)}
                        onMouseLeave={() => setIsHoveringImage(false)}>
                        <img
                            src={file.content}
                            alt={file.name}
                        />
                        <ImageOverlay
                            $visible={isHoveringImage}
                            fileType={file.type}
                            handleSaveFile={() => handleSaveFile(file)}
                            handleStickerify={() => handleStickerify(file)}
                            handleSplitSvg={() => handleSplitSvg(file)}
                            handleConvertToSvg={() => handleConvertToSvg(file)}
                        />
                        <LoadingOverlay $visible={isConverting}>
                            <LoadingSpinner/>
                            <Text>Converting image...</Text>
                        </LoadingOverlay>
                    </ImageContainer>
                </div>
            );
        }
        return (
            <pre>
                <code>{file.content}</code>
            </pre>
        );
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);

        droppedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const newFile: FileData = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    lastModified: file.lastModified,
                    content: isImageFile(file.type)
                        ? reader.result as string
                        : reader.result?.toString() || '',
                    versions: []
                };
                setFiles(prev => [...prev, newFile]);
            };

            if (isImageFile(file.type)) {
                reader.readAsDataURL(file);
            } else {
                reader.readAsText(file);
            }
        });
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    return (
        <StickerBuilderContainer>
            <h1>Sticker Builder</h1>

            <DropZone
                $isDragging={isDragging}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                Drop files here to import
            </DropZone>

            <FileGrid>
                {files.map(file => (
                    <FileCard
                        key={file.id}
                        onClick={() => setSelectedFile(file)}
                    >
                        <ThumbnailContainer>
                            {isImageFile(file.type) ? (
                                <img src={file.content} alt={`Thumbnail of ${file.name}`}/>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                                    <path d="M13 2v7h7"/>
                                </svg>
                            )}
                        </ThumbnailContainer>
                        <FileInfo>
                            <Text weight="medium">{file.name}</Text>
                            <Text size="1" color="gray">{Math.round(file.size / 1024)} KB</Text>
                        </FileInfo>
                    </FileCard>
                ))}
            </FileGrid>

            <Dialog.Root open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
                <Dialog.Content>
                    <Dialog.Title>{selectedFile?.name}</Dialog.Title>
                    <TabList>
                        <TabButton
                            $active={activeTab === 'preview'}
                            onClick={() => setActiveTab('preview')}
                        >
                            Preview
                        </TabButton>
                        <TabButton
                            $active={activeTab === 'versions'}
                            onClick={() => setActiveTab('versions')}
                        >
                            Versions ({selectedFile?.versions?.length || 0})
                        </TabButton>
                    </TabList>
                    <TabContent>
                        {activeTab === 'preview' && (
                            <FilePreview>
                                {selectedFile && renderFileContent(selectedFile)}
                            </FilePreview>
                        )}
                        {activeTab === 'versions' && (
                            <FileGrid>
                                {selectedFile?.versions?.map((version) => (
                                    <FileCard key={version.id}>
                                        <ThumbnailContainer>
                                            {isImageFile(version.type) && (
                                                <img src={version.content} alt={`Version ${version.name}`} />
                                            )}
                                        </ThumbnailContainer>
                                        <FileInfo>
                                            <Text weight="medium">{version.name}</Text>
                                            <Text size="1" color="gray">
                                                {new Date(version.createdAt).toLocaleDateString()}
                                            </Text>
                                        </FileInfo>
                                    </FileCard>
                                ))}
                            </FileGrid>
                        )}
                    </TabContent>
                    <Dialog.Close>
                        <Button>Close</Button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Root>

            <StickerCanvas>
                <StickerPreview>
                    {selectedPieces.map(piece => (
                        <g
                            key={piece.id}
                            className={`sticker-piece ${piece.selected ? 'selected' : ''}`}
                            transform={piece.transform}
                            onClick={() => handlePieceClick(piece)}
                        >
                            {piece.paths.map((path, index) => (
                                <path key={index} d={path}/>
                            ))}
                        </g>
                    ))}
                </StickerPreview>
            </StickerCanvas>

            <PieceSelector>
                {images.map(image => (
                    <div key={image.id}>
                        {image.pieces.map(piece => (
                            <div
                                key={piece.id}
                                onClick={() => handlePieceClick(piece)}
                            >
                                <svg width="50" height="50">
                                    <g transform={piece.transform}>
                                        {piece.paths.map((path, index) => (
                                            <path key={index} d={path}/>
                                        ))}
                                    </g>
                                </svg>
                            </div>
                        ))}
                    </div>
                ))}
            </PieceSelector>

            <ChatButton onClick={toggleChat}>
                <span role="img" aria-label="Chat with Josh">💬</span>
            </ChatButton>

            {isChatOpen && (
                <Dialog.Root open={isChatOpen} onOpenChange={toggleChat}>
                    <Dialog.Content
                        style={{maxWidth: '500px', display: 'flex', flexDirection: 'column', height: '600px'}}>
                        <Dialog.Title>Chat with Josh</Dialog.Title>
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <div className="message assistant">
                                Hi! I'm Josh, your design assistant. How can I help you with your sticker?
                            </div>
                            {/* Add message history here */}
                        </div>
                        <ChatFooter>
                            <ChatInput
                                placeholder="Type your message..."
                            />
                            <Button>Send</Button>
                        </ChatFooter>
                        <Dialog.Close>
                            <Button variant="soft" style={{margin: '0 16px 16px'}}>
                                Close Chat
                            </Button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Root>
            )}
        </StickerBuilderContainer>
    );
};

export default StickerBuilder;

