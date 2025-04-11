import React, {useCallback, useState} from 'react';
import {Button, Dialog, Text} from '@radix-ui/themes';
import {FileData, FileVersion, StickerImage, StickerPiece} from '../../types';
import {saveAs} from 'file-saver';
import {ImageToolKitOverlay} from '../image-overlay/ImageToolKitOverlay';
import {v4 as uuidv4} from 'uuid';
import {Chat} from '../chat/Chat';
import {ToolBar} from '../tools/tool-bar/ToolBar';
import {
    CategoryPillStyled,
    DropZoneStyled,
    FileCardStyled,
    FileGridStyled,
    FileInfoStyled,
    FilePreviewStyled,
    ImageContainerStyled,
    LoadingOverlayStyled,
    LoadingSpinnerStyled,
    PieceSelectorStyled,
    StickerBuilderContainerStyled,
    StickerCanvasStyled,
    StickerPreviewStyled,
    TabButtonStyled,
    TabContentStyled,
    TabListStyled,
    ThumbnailContainerStyled
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
                <div style={{width: '100%', height: '100%'}}>
                    <CategoryPillStyled>{getFileCategory(file.type)}</CategoryPillStyled>
                    <ImageContainerStyled
                        onMouseEnter={() => setIsHoveringImage(true)}
                        onMouseLeave={() => setIsHoveringImage(false)}>
                        <img src={file.content} alt={file.name}/>
                        <ImageToolKitOverlay
                            $visible={isHoveringImage}
                            file={file}
                            onSave={(updatedFile) => {
                                setFiles(prev => prev.map(f => f.id === file.id ? updatedFile : f));
                            }}
                            onSplit={(updatedFile) => {
                                setFiles(prev => prev.map(f => f.id === file.id ? updatedFile : f));
                            }}
                            onStickerify={(updatedFile) => {
                                setFiles(prev => prev.map(f => f.id === file.id ? updatedFile : f));
                            }}
                        />
                        <LoadingOverlayStyled $visible={isConverting}>
                            <LoadingSpinnerStyled/>
                            <Text>Converting image...</Text>
                        </LoadingOverlayStyled>
                    </ImageContainerStyled>
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

    const handleFileCreated = (newFile: FileData) => {
        setFiles(prev => [...prev, newFile]);
    };

    const handleMockImagesLoad = (stickerImages: StickerImage[]) => {
        setImages(stickerImages);
        
        // Create files from the mock images
        stickerImages.forEach(image => {
            const svgContent = createSvgFromPieces(image.pieces);
            const newFile: FileData = {
                id: `mock-${image.id}`,
                name: `${image.name}.svg`,
                type: 'image/svg+xml',
                size: svgContent.length,
                lastModified: Date.now(),
                content: svgContent,
                versions: []
            };
            setFiles(prev => [...prev, newFile]);
        });
    };

    const createSvgFromPieces = (pieces: StickerImage['pieces']): string => {
        const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                ${pieces.map(piece => `
                    <g transform="${piece.transform}">
                        ${piece.paths.map(path => `<path d="${path}" fill="#000" />`).join('\n')}
                    </g>
                `).join('\n')}
            </svg>
        `;
        return `data:image/svg+xml;base64,${btoa(svgContent)}`;
    };

    const handleFileOpen = (newFile: FileData) => {
        setFiles(prev => [...prev, newFile]);
    };

    return (
        <StickerBuilderContainerStyled>
            <h1>Sticker Builder</h1>
            
            <ToolBar
                onLoadMockImages={handleMockImagesLoad}
                onFileOpen={handleFileOpen}
            />

            <DropZoneStyled
                $isDragging={isDragging}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                Drop files here to import
            </DropZoneStyled>

            <FileGridStyled>
                {files.map(file => (
                    <FileCardStyled
                        key={file.id}
                        onClick={() => setSelectedFile(file)}
                    >
                        <ThumbnailContainerStyled>
                            {isImageFile(file.type) ? (
                                <img src={file.content} alt={`Thumbnail of ${file.name}`}/>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                                    <path d="M13 2v7h7"/>
                                </svg>
                            )}
                        </ThumbnailContainerStyled>
                        <FileInfoStyled>
                            <Text weight="medium">{file.name}</Text>
                            <Text size="1" color="gray">{Math.round(file.size / 1024)} KB</Text>
                        </FileInfoStyled>
                    </FileCardStyled>
                ))}
            </FileGridStyled>

            <Dialog.Root open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
                <Dialog.Content>
                    <Dialog.Title>{selectedFile?.name}</Dialog.Title>
                    <TabListStyled>
                        <TabButtonStyled
                            $active={activeTab === 'preview'}
                            onClick={() => setActiveTab('preview')}
                        >
                            Preview
                        </TabButtonStyled>
                        <TabButtonStyled
                            $active={activeTab === 'versions'}
                            onClick={() => setActiveTab('versions')}
                        >
                            Versions ({selectedFile?.versions?.length || 0})
                        </TabButtonStyled>
                    </TabListStyled>
                    <TabContentStyled>
                        {activeTab === 'preview' && (
                            <FilePreviewStyled>
                                {selectedFile && renderFileContent(selectedFile)}
                            </FilePreviewStyled>
                        )}
                        {activeTab === 'versions' && (
                            <>
                                {selectedFile?.versions?.length ? (
                                    <FileGridStyled>
                                        {selectedFile.versions.map((version) => (
                                            <FileCardStyled key={version.id}>
                                                <ThumbnailContainerStyled>
                                                    {isImageFile(version.type) && (
                                                        <img src={version.content} alt={`Version ${version.name}`}/>
                                                    )}
                                                </ThumbnailContainerStyled>
                                                <FileInfoStyled>
                                                    <Text weight="medium">{version.name}</Text>
                                                    <Text size="1" color="gray">
                                                        {new Date(version.createdAt).toLocaleDateString()}
                                                    </Text>
                                                </FileInfoStyled>
                                            </FileCardStyled>
                                        ))}
                                    </FileGridStyled>
                                ) : (
                                    <FilePreviewStyled>
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
                                    </FilePreviewStyled>
                                )}
                            </>
                        )}
                    </TabContentStyled>
                    <Dialog.Close>
                        <Button>Close</Button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Root>

            <StickerCanvasStyled>
                <StickerPreviewStyled>
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
                </StickerPreviewStyled>
            </StickerCanvasStyled>

            <PieceSelectorStyled>
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
            </PieceSelectorStyled>

            <Chat isOpen={isChatOpen} onToggle={toggleChat}/>
        </StickerBuilderContainerStyled>
    );
};

export default StickerBuilder;

