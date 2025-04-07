import React, { useState } from 'react';
import { Fragment, FragmentType } from './types';
import { FragmentForm, StyledSelect, StyledTextArea, ActionButton } from './styles';

interface FragmentInputProps {
    onAddFragment: (fragment: Omit<Fragment, 'id' | 'processed'>) => void;
}

export const FragmentInput: React.FC<FragmentInputProps> = ({ onAddFragment }) => {
    const [content, setContent] = useState('');
    const [type, setType] = useState<FragmentType>('TEXT');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            onAddFragment({ type, content });
            setContent('');
        }
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
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter fragment content..."
            />
            <ActionButton type="submit">
                Add Fragment
            </ActionButton>
        </FragmentForm>
    );
};
