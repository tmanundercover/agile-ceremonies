import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Button, TextField, Dialog } from '@radix-ui/themes';
import { FileData } from '../../types';

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
`;

const StickerCanvas = styled.div`
    width: 100%;
    height: 500px;
    border: 2px dashed var(--gray-7);
    border-radius: 8px;
    margin: 16px 0;
    position: relative;
`;

const StickerPreview = styled.svg`
    width: 100%;
    height: 100%;
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
    padding: 24px;
    text-align: center;
    background: ${props => props.$isDragging ? 'var(--purple-3)' : 'transparent'};
    transition: all 0.3s ease;
    cursor: pointer;
`;

const FileGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 16px;
`;

const FileCard = styled.div`
    padding: 16px;
    border: 1px solid var(--gray-7);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        border-color: var(--purple-7);
        transform: translateY(-2px);
    }
`;

const FilePreview = styled.div`
    max-height: 500px;
    overflow: auto;

    img {
        max-width: 100%;
        height: auto;
    }

    pre {
        background: var(--gray-3);
        padding: 16px;
        border-radius: 8px;
        overflow: auto;
    }
`;

export const StickerBuilder: React.FC = () => {
    const [images, setImages] = useState<StickerImage[]>([]);
    const [selectedPieces, setSelectedPieces] = useState<StickerPiece[]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [files, setFiles] = useState<FileData[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

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

    const renderFileContent = (file: FileData) => {
        if (isImageFile(file.type)) {
            return <img src={file.content} alt={file.name} />;
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
                        : reader.result?.toString() || ''
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
                        <h3>{file.name}</h3>
                        <p>{Math.round(file.size / 1024)} KB</p>
                    </FileCard>
                ))}
            </FileGrid>

            <Dialog.Root open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
                <Dialog.Content>
                    <Dialog.Title>{selectedFile?.name}</Dialog.Title>
                    <FilePreview>
                        {selectedFile && renderFileContent(selectedFile)}
                    </FilePreview>
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
                                <path key={index} d={path} />
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
                                            <path key={index} d={path} />
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
                    <Dialog.Content style={{ maxWidth: '500px' }}>
                        <Dialog.Title>Chat with Josh</Dialog.Title>
                        <div style={{
                            height: '400px',
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
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            marginTop: '16px'
                        }}>
                            <TextField.Input
                                placeholder="Type your message..."
                                style={{ flex: 1 }}
                            />
                            <Button>Send</Button>
                        </div>
                        <Dialog.Close>
                            <Button variant="soft" style={{ marginTop: '16px' }}>
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
