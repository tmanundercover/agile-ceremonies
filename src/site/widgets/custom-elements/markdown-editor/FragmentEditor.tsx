import React, { useState } from 'react';
import { Fragment } from './types';
import { StyledTextArea, ActionButton, FragmentForm, StyledSelect } from './styles';

interface FragmentEditorProps {
    fragment: Fragment;
    onSave: (id: string, updates: Partial<Pick<Fragment, 'type' | 'content'>>) => void;
    onCancel: () => void;
}

export const FragmentEditor: React.FC<FragmentEditorProps> = ({ fragment, onSave, onCancel }) => {
    const [content, setContent] = useState(fragment.content);
    const [type, setType] = useState(fragment.type);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(fragment.id, { type, content });
    };

    return (
        <FragmentForm onSubmit={handleSubmit}>
            <StyledSelect
                value={type}
                onChange={(e) => setType(e.target.value as Fragment['type'])}
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
                placeholder="Edit fragment content..."
            />
            <div>
                <ActionButton type="submit">Save</ActionButton>
                <ActionButton type="button" onClick={onCancel}>Cancel</ActionButton>
            </div>
        </FragmentForm>
    );
};
