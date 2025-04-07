import React, { useState } from 'react';
import styled from 'styled-components';
import { CropSettings } from '../types';

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

const CropControls = styled.div`
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    .dark & {
        border-color: #555;
    }
`;

const CropInputGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 10px;
`;

const CropInput = styled.input`
    width: 100%;
    padding: 4px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    .dark & {
        background: #333;
        border-color: #555;
        color: white;
    }
`;

interface ProcessingOptionsProps {
    onProcessLayered: (cropSettings?: CropSettings) => void;
    onProcessOriginal: (cropSettings?: CropSettings) => void;
    onProcessCropped: (cropSettings?: CropSettings) => void;
    onSave: (type: 'layered' | 'original' | 'cropped') => void;
}

// Remove CropSettings interface as it's now imported from types.ts

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
    onProcessCropped,
    onSave
}) => {
    const [cropEnabled, setCropEnabled] = useState(false);
    const [cropSettings, setCropSettings] = useState<CropSettings>({
        enabled: false,
        x: 0,
        y: 0,
        width: 100,
        height: 100
    });

    const handleCropChange = (field: keyof CropSettings, value: number | boolean) => {
        setCropSettings((prev:any) => ({
            ...prev,
            [field]: value,
            enabled: field === 'enabled' ? value : prev.enabled
        }));
    };

    return (
        <>
            <OptionsContainer>
                <ButtonGroup>
                    <OptionButton onClick={() => onProcessLayered(cropSettings)}>
                        Process Layered View
                    </OptionButton>
                    <SaveButton onClick={() => onSave('layered')}>
                        Save Layered View
                    </SaveButton>
                </ButtonGroup>

                <ButtonGroup>
                    <OptionButton onClick={() => onProcessOriginal(cropSettings)}>
                        Process Original SVG
                    </OptionButton>
                    <SaveButton onClick={() => onSave('original')}>
                        Save Original SVG
                    </SaveButton>
                </ButtonGroup>

                <ButtonGroup>
                    <OptionButton onClick={() => onProcessCropped(cropSettings)}>
                        Process Cropped SVG
                    </OptionButton>
                    <SaveButton onClick={() => onSave('cropped')}>
                        Save Cropped SVG
                    </SaveButton>
                </ButtonGroup>
            </OptionsContainer>

            <CropControls>
                <label>
                    <input 
                        type="checkbox" 
                        checked={cropEnabled} 
                        onChange={(e) => {
                            setCropEnabled(e.target.checked);
                            handleCropChange('enabled', e.target.checked);
                        }}
                    />
                    Enable Cropping
                </label>

                {cropEnabled && (
                    <CropInputGroup>
                        <label>
                            X:
                            <CropInput
                                type="number"
                                value={cropSettings.x}
                                onChange={(e) => handleCropChange('x', Number(e.target.value))}
                            />
                        </label>
                        <label>
                            Y:
                            <CropInput
                                type="number"
                                value={cropSettings.y}
                                onChange={(e) => handleCropChange('y', Number(e.target.value))}
                            />
                        </label>
                        <label>
                            Width:
                            <CropInput
                                type="number"
                                value={cropSettings.width}
                                onChange={(e) => handleCropChange('width', Number(e.target.value))}
                            />
                        </label>
                        <label>
                            Height:
                            <CropInput
                                type="number"
                                value={cropSettings.height}
                                onChange={(e) => handleCropChange('height', Number(e.target.value))}
                            />
                        </label>
                    </CropInputGroup>
                )}
            </CropControls>
        </>
    );
};

export default ProcessingOptions;

