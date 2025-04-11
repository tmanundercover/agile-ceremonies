import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {LoadMockImagesTool} from './LoadMockImagesTool';
import {OpenFileTool} from './OpenFileTool';
import {FileData, StickerImage} from '../../../types';

const ToolBarContainer = styled.div<{ $isVisible: boolean }>`
    display: ${props => props.$isVisible ? 'flex' : 'none'};
    position: absolute;
    top: 100%; // Remove the gap
    left: 0; // Changed from 'right: 0' to 'left: 0'
    flex-direction: column;
    padding: 8px;
    background: white;
    border-radius: 8px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 180px;
    z-index: 1000;

    &:before {
        display: none; // Remove the arrow since menu is touching button
    }
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
        background-color: var(--gray-3);
    }

    &:active {
        background-color: var(--gray-4);
    }
`;

const ToolLabel = styled.span`
    font-size: 14px;
    color: var(--gray-11);
    user-select: none;
`;

interface ToolBarProps {
    isVisible: boolean;
    onLoadMockImages: (stickerImages: StickerImage[]) => void;
    onFileOpen: (file: FileData) => void;
    onClose: () => void;
}

export const ToolBar: React.FC<ToolBarProps> = ({ 
    isVisible, 
    onLoadMockImages, 
    onFileOpen,
    onClose 
}) => {
    const toolbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    return (
        <ToolBarContainer $isVisible={isVisible} ref={toolbarRef}>
            <MenuItem onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}>
                <OpenFileTool onFileOpen={onFileOpen} />
                <ToolLabel>Open File</ToolLabel>
            </MenuItem>
            <MenuItem>
                <LoadMockImagesTool onLoad={onLoadMockImages} />
                <ToolLabel>Load Mock Images</ToolLabel>
            </MenuItem>
        </ToolBarContainer>
    );
};

