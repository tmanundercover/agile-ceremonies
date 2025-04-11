import React, { useState } from 'react';
import { FileInput, Error, ActionButton } from '../styledComponents';
import styled from 'styled-components';
import {SvgProcessorProps} from "../types";

const InputToggle = styled.div`
    margin-bottom: 16px;
    display: flex;
    gap: 8px;
`;

const TextArea = styled.textarea`
    width: 100%;
    min-height: 150px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: monospace;
    resize: vertical;

    .dark & {
        background-color: #555;
        color: #f9f9f9;
        border-color: #444;
    }
`;

const SvgProcessor: React.FC<SvgProcessorProps> = ({ onFileSelect, onTextInput, loading, error }) => {
    const [inputMode, setInputMode] = useState<'file' | 'text'>('file');
    const [svgText, setSvgText] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    const handleTextSubmit = () => {
        if (svgText.trim()) {
            onTextInput(svgText.trim());
        }
    };

    return (
        <FileInput>
            <InputToggle>
                <ActionButton 
                    onClick={() => setInputMode('file')} 
                    className={inputMode === 'file' ? 'active' : ''}
                >
                    Upload File
                </ActionButton>
                <ActionButton 
                    onClick={() => setInputMode('text')} 
                    className={inputMode === 'text' ? 'active' : ''}
                >
                    Paste SVG
                </ActionButton>
            </InputToggle>

            {inputMode === 'file' ? (
                <>
                    <label htmlFor="svg-file">Upload SVG File:</label>
                    <input
                        type="file"
                        id="svg-file"
                        accept=".svg"
                        onChange={handleFileChange}
                        disabled={loading}
                    />
                </>
            ) : (
                <>
                    <label htmlFor="svg-text">Paste SVG Content:</label>
                    <TextArea
                        id="svg-text"
                        value={svgText}
                        onChange={(e) => setSvgText(e.target.value)}
                        placeholder="<svg>...</svg>"
                        disabled={loading}
                    />
                    <ActionButton 
                        onClick={handleTextSubmit}
                        disabled={loading || !svgText.trim()}
                    >
                        Process SVG
                    </ActionButton>
                </>
            )}
            {error && <Error>{error}</Error>}
        </FileInput>
    );
};

export default SvgProcessor;
