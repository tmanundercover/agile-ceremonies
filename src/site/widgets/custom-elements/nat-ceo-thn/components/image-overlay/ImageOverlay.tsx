import React, {useState} from 'react';
import {ImageOverlayContainer, ToolIcon, ToolIconWrapper, Tooltip} from "../../styledComponents";

interface ImageOverlayProps {
    $visible: boolean;
    handleConvertToSvg: (event: React.MouseEvent<HTMLButtonElement>) => void;
    fileType: string;
    handleSplitSvg: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleStickerify: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleSaveFile: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ImageOverlay: React.FunctionComponent<ImageOverlayProps> = ({
                                                                             $visible,
                                                                             handleConvertToSvg,
                                                                             fileType,
                                                                             handleSplitSvg,
                                                                             handleStickerify,
                                                                             handleSaveFile
                                                                         }) => {
    const [hoveredTool, setHoveredTool] = useState<string | null>(null);

    return (
        <ImageOverlayContainer $visible={$visible}>
            <ToolIconWrapper
                onMouseEnter={() => setHoveredTool('convert')}
                onMouseLeave={() => setHoveredTool(null)}>
                <Tooltip $visible={hoveredTool === 'convert'}>
                    Convert to SVG
                </Tooltip>
                <ToolIcon onClick={handleConvertToSvg}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 14h8v-4H4v4zm8 0h8v-4h-8v4z"/>
                        <path d="M12 6v12"/>
                    </svg>
                </ToolIcon>
            </ToolIconWrapper>
            {fileType.startsWith('image/svg') && (
                <ToolIconWrapper
                    onMouseEnter={() => setHoveredTool('split')}
                    onMouseLeave={() => setHoveredTool(null)}>
                    <Tooltip $visible={hoveredTool === 'split'}>
                        Split SVG
                    </Tooltip>
                    <ToolIcon onClick={handleSplitSvg}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 20h16M4 4h16M12 4v16"/>
                        </svg>
                    </ToolIcon>
                </ToolIconWrapper>
            )}
            <ToolIconWrapper
                onMouseEnter={() => setHoveredTool('stickerify')}
                onMouseLeave={() => setHoveredTool(null)}>
                <Tooltip $visible={hoveredTool === 'stickerify'}>
                    Sticker-fy
                </Tooltip>
                <ToolIcon onClick={handleStickerify}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                        <line x1="9" y1="9" x2="9.01" y2="9"/>
                        <line x1="15" y1="9" x2="15.01" y2="9"/>
                    </svg>
                </ToolIcon>
            </ToolIconWrapper>
            <ToolIconWrapper
                onMouseEnter={() => setHoveredTool('save')}
                onMouseLeave={() => setHoveredTool(null)}>
                <Tooltip $visible={hoveredTool === 'save'}>
                    Save File
                </Tooltip>
                <ToolIcon onClick={handleSaveFile}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                        <path d="M17 21v-8H7v8"/>
                        <path d="M7 3v5h8"/>
                    </svg>
                </ToolIcon>
            </ToolIconWrapper>
        </ImageOverlayContainer>
    );
};

export default ImageOverlay;
