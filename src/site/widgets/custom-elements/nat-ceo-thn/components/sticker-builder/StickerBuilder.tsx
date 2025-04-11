import React, {useCallback, useEffect, useState} from 'react';
import {Button, Dialog, Text} from '@radix-ui/themes';
import {FileData, FileVersion, StickerImage, StickerPiece} from '../../types';
import {saveAs} from 'file-saver';
import {ImageOverlay} from '../image-overlay/ImageOverlay';
import {v4 as uuidv4} from 'uuid';
import {Chat} from '../chat/Chat';
import {
    CategoryPill,
    DropZone,
    FileCard,
    FileGrid,
    FileInfo,
    FilePreview,
    ImageContainer,
    LoadingOverlay,
    LoadingSpinner,
    PieceSelector,
    StickerBuilderContainer,
    StickerCanvas,
    StickerPreview,
    TabButton,
    TabContent,
    TabList,
    ThumbnailContainer
} from '../../styledComponents';

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
                            <>
                                {selectedFile?.versions?.length ? (
                                    <FileGrid>
                                        {selectedFile.versions.map((version) => (
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
                                ) : (
                                    <FilePreview>
                                        <svg
                                            width={selectedFile?.content ? "100%" : "200"}
                                            height={selectedFile?.content ? "100%" : "200"}
                                            viewBox="0 0 200 200"
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "100%"
                                            }}
                                        >
                                            <rect
                                                x="10"
                                                y="10"
                                                width="180"
                                                height="180"
                                                fill="#f0f0f0"
                                                stroke="#cccccc"
                                                strokeWidth="2"
                                                strokeDasharray="5,5"
                                            />
                                            <text
                                                x="100"
                                                y="100"
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fill="#666666"
                                                fontSize="14"
                                            >
                                                No versions yet
                                            </text>
                                        </svg>
                                    </FilePreview>
                                )}
                            </>
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

            <Chat isOpen={isChatOpen} onToggle={toggleChat} />
        </StickerBuilderContainer>
    );
};

export default StickerBuilder;

