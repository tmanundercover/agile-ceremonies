import React, { useState } from 'react';
import { FileData, FileVersion } from '../../../types';
import { ToolIconStyled, ToolIconWrapperStyled, TooltipStyled } from '../../../styledComponents';
import { v4 as uuidv4 } from 'uuid';
import { TargetIcon } from '@radix-ui/react-icons';

interface StickerifyToolProps {
    file: FileData;
    onStickerify: (file: FileData) => void;
}

export const StickerifyTool: React.FC<StickerifyToolProps> = ({ file, onStickerify }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleStickerify = async () => {
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

            onStickerify(updatedFile);
        } catch (error) {
            console.error('Error creating sticker:', error);
        }
    };

    return (
        <ToolIconWrapperStyled
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <TooltipStyled $visible={showTooltip}>Create sticker</TooltipStyled>
            <ToolIconStyled onClick={handleStickerify}>
                <TargetIcon width={20} height={20} />
            </ToolIconStyled>
        </ToolIconWrapperStyled>
    );
};

