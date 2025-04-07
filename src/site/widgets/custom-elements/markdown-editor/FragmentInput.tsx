import React, { useState, useEffect } from 'react';
import { Fragment, FragmentType } from './types';
import { FragmentForm, StyledSelect, StyledTextArea, ActionButton } from './styles';
import { preprocessContent, extractSvgContent } from './utils';

interface FragmentInputProps {
    onAddFragment: (fragment: Omit<Fragment, 'id' | 'processed'>) => void;
}

export const FragmentInput: React.FC<FragmentInputProps> = ({ onAddFragment }) => {
    const [content, setContent] = useState('');
    const [type, setType] = useState<FragmentType>('TEXT');

    useEffect(() => {
        // Automatically detect SVG content and switch type
        if (content.includes('<svg')) {
            const { svg } = extractSvgContent(content);
            if (svg) {
                setType('SVG');
            }
        }
    }, [content]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            const processedContent = preprocessContent(content);
            onAddFragment({ type, content: processedContent });
            setContent('');
            setType('TEXT');
        }
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setContent(newContent);
    };

    return (
        <FragmentForm onSubmit={handleSubmit}>
            <StyledSelect
                value={type}
                onChange={(e) => setType(e.target.value as FragmentType)}
            >
                <option value="TEXT">Text</option>
                <option value="SVG">SVG</option>
                <option value="CODE">Code</option>
                <option value="LINK">Link</option>
                <option value="HEADER">Header</option>
            </StyledSelect>
            <StyledTextArea
                value={content}
                onChange={handleContentChange}
                placeholder="Enter fragment content..."
            />
            <ActionButton type="submit">
                Add Fragment
            </ActionButton>
        </FragmentForm>
    );
};
