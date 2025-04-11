import React from 'react';
import styled from 'styled-components';
import {Text} from '@radix-ui/themes';
import {FileData} from '../../types';

const FileGridContainer = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 16px;
    overflow-y: auto;
    max-height: 25vh;
`;

const FileCard = styled.div`
    padding: 16px;
    border: 1px solid var(--gray-7);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &:hover {
        border-color: var(--purple-7);
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
`;

const ThumbnailContainer = styled.div`
    width: 100%;
    height: 120px;
    border-radius: 4px;
    overflow: hidden;
    background: var(--gray-3);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    svg {
        width: 40px;
        height: 40px;
        color: var(--gray-7);
    }
`;

const FileInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

interface FileGridProps {
    files: FileData[];
    onFileSelect: (file: FileData) => void;
}

export const FileGrid: React.FC<FileGridProps> = ({ files, onFileSelect }) => {
    const isImageFile = (type: string) => type.startsWith('image/');

    return (
        <FileGridContainer>
            {files.map(file => (
                <FileCard
                    key={file.id}
                    onClick={() => onFileSelect(file)}
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
        </FileGridContainer>
    );
};

export default FileGrid;