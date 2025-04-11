import React from 'react';
import {ImageOverlayContainerStyled} from '../../../styledComponents';
import {SaveTool} from './SaveTool';
import {SvgSplitTool} from './SvgSplitTool';
import {StickerifyTool} from './StickerifyTool';
import {FileData} from '../../../types';

interface ImageToolKitOverlayProps {
    $visible: boolean;
    file: FileData;
    onSave: (file: FileData) => void;
    onSplit: (file: FileData) => void;
    onStickerify: (file: FileData) => void;
}

export const ImageToolKitOverlay: React.FC<ImageToolKitOverlayProps> = ({
    $visible,
    file,
    onSave,
    onSplit,
    onStickerify,
}) => {
    const isSvg = file.type === 'image/svg+xml';

    return (
        <ImageOverlayContainerStyled $visible={$visible}>
            <SaveTool file={file} />
            {isSvg && <SvgSplitTool file={file} onSplit={onSplit} />}
            <StickerifyTool file={file} onStickerify={onStickerify} />
        </ImageOverlayContainerStyled>
    );
};
