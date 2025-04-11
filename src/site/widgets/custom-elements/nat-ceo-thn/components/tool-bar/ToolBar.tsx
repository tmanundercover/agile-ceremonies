import React from 'react';
import styled from 'styled-components';
import {LoadMockImagesTool} from '../tools/LoadMockImagesTool';
import {StickerImage} from '../../types';

const ToolBarContainer = styled.div`
    display: flex;
    gap: 16px;
    padding: 12px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;
    align-items: center;
`;

const ToolWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ToolLabel = styled.span`
    font-size: 14px;
    color: var(--gray-11);
    user-select: none;
`;

interface ToolBarProps {
    onLoadMockImages: (stickerImages: StickerImage[]) => void;
}

export const ToolBar: React.FC<ToolBarProps> = ({ onLoadMockImages }) => {
    return (
        <ToolBarContainer>
            <ToolWrapper>
                <LoadMockImagesTool onLoad={onLoadMockImages} />
                <ToolLabel>Load Mock Images</ToolLabel>
            </ToolWrapper>
        </ToolBarContainer>
    );
};
