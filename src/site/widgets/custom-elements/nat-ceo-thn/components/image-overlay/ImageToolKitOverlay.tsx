import React from 'react';
import {ImageOverlayContainerStyled} from '../../styledComponents';
import {SaveTool} from '../tools/SaveTool';
import {SvgSplitTool} from '../tools/SvgSplitTool';
import {StickerifyTool} from '../tools/StickerifyTool';
import {LoadMockImagesTool} from '../tools/LoadMockImagesTool';
import {FileData, StickerImage} from '../../types';

interface ImageToolKitOverlayProps {
    $visible: boolean;
    file: FileData;
    onSave: (file: FileData) => void;
    onSplit: (file: FileData) => void;
    onStickerify: (file: FileData) => void;
    onLoad: (stickerImages: StickerImage[]) => void;
}

export const ImageToolKitOverlay: React.FC<ImageToolKitOverlayProps> = ({
    $visible,
    file,
    onSave,
    onSplit,
    onStickerify,
    onLoad,
}) => {
    const isSvg = file.type === 'image/svg+xml';

    return (
        <ImageOverlayContainerStyled $visible={$visible}>
            <SaveTool file={file} />
            {isSvg && <SvgSplitTool file={file} onSplit={onSplit} />}
            <StickerifyTool file={file} onStickerify={onStickerify} />
            <LoadMockImagesTool onLoad={onLoad} />
        </ImageOverlayContainerStyled>
    );
};
