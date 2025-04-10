import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@radix-ui/themes';

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

export const StickerBuilder: React.FC = () => {
    const [images, setImages] = useState<StickerImage[]>([]);
    const [selectedPieces, setSelectedPieces] = useState<StickerPiece[]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        // Load and parse SVG images
        // This would typically fetch from your assets and parse them
        const loadImages = async () => {
            // Example structure - replace with actual image loading logic
            const mockImages: StickerImage[] = [
                {
                    id: '1',
                    name: 'Basic Avatar',
                    pieces: [
                        {
                            id: 'head1',
                            type: 'head',
                            paths: ['M10,10 L20,20...'],
                            transform: '',
                            selected: false
                        },
                        // Add more pieces...
                    ]
                }
            ];
            setImages(mockImages);
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

    return (
        <StickerBuilderContainer>
            <h1>Sticker Builder</h1>
            
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
                <div>
                    {/* Implement chat interface here */}
                </div>
            )}
        </StickerBuilderContainer>
    );
};

export default StickerBuilder;
