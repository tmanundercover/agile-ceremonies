import React from 'react';
import { SvgProcessorProps } from '../types';
import { FileInput, Error } from '../styledComponents';

const SvgProcessor: React.FC<SvgProcessorProps> = ({ onFileSelect, loading, error }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <FileInput>
            <label htmlFor="svg-file">Upload SVG File:</label>
            <input
                type="file"
                id="svg-file"
                accept=".svg"
                onChange={handleFileChange}
                disabled={loading}
            />
            {error && <Error>{error}</Error>}
        </FileInput>
    );
};

export default SvgProcessor;
