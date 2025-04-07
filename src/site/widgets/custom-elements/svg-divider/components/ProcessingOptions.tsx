import React, { useState } from 'react';
import styled from 'styled-components';

const OptionsContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

const OptionButton = styled.button`
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #f5f5f5;
    }

    .dark & {
        background-color: #444;
        border-color: #555;
        color: white;

        &:hover {
            background-color: #555;
        }
    }
`;

interface ProcessingOptionsProps {
    onProcessLayered: () => void;
    onProcessOriginal: () => void;
    onSave: (type: 'layered' | 'original') => void;
}

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: stretch;
`;

const SaveButton = styled(OptionButton)`
    background-color: #28a745;
    color: white;
    border: none;

    &:hover {
        background-color: #218838;
    }

    .dark & {
        background-color: #218838;
        
        &:hover {
            background-color: #1e7e34;
        }
    }
`;

const ProcessingOptions: React.FC<ProcessingOptionsProps> = ({
    onProcessLayered,
    onProcessOriginal,
    onSave
}) => {
    return (
        <OptionsContainer>
            <ButtonGroup>
                <OptionButton onClick={onProcessLayered}>
                    Process Layered View
                </OptionButton>
                <SaveButton onClick={() => onSave('layered')}>
                    Save Layered View
                </SaveButton>
            </ButtonGroup>

            <ButtonGroup>
                <OptionButton onClick={onProcessOriginal}>
                    Process Original SVG
                </OptionButton>
                <SaveButton onClick={() => onSave('original')}>
                    Save Original SVG
                </SaveButton>
            </ButtonGroup>
        </OptionsContainer>
    );
};

export default ProcessingOptions;

