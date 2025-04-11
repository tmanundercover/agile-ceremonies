import React, {useRef} from 'react';
import {FileIcon} from '@radix-ui/react-icons';
import {ToolIconStyled} from '../../../styledComponents';
import {FileData} from '../../../types';

interface OpenFileToolProps {
    onFileOpen: (file: FileData) => void;
}

export const OpenFileTool: React.FC<OpenFileToolProps> = ({onFileOpen}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const newFile: FileData = {
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                type: file.type,
                size: file.size,
                lastModified: file.lastModified,
                content: reader.result as string,
                versions: []
            };
            onFileOpen(newFile);
        };

        if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file);
        }
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileChange}
                accept="image/*,.svg"
            />
            <FileIcon width={20} height={20} />
        </>
    );
};

export default OpenFileTool;
