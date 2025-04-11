import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { DiscIcon } from '@radix-ui/react-icons';
import {FileData} from "../../../types";
import {ToolIconStyled, ToolIconWrapperStyled, TooltipStyled} from "../../../styledComponents";

interface SaveToolProps {
    file: FileData;
}

export const SaveTool: React.FC<SaveToolProps> = ({ file }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleSave = () => {
        const blob = dataURItoBlob(file.content);
        const defaultPath = '/Users/terrelltrapperkeepersingleton/IdeaProjects/agile-ceremonies/saved-svgs';
        saveAs(blob, file.name);
    };

    const dataURItoBlob = (dataURI: string): Blob => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    };

    return (
        <ToolIconWrapperStyled
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <TooltipStyled $visible={showTooltip}>Save file</TooltipStyled>
            <ToolIconStyled onClick={handleSave}>
                <DiscIcon width={20} height={20} />
            </ToolIconStyled>
        </ToolIconWrapperStyled>
    );
};
