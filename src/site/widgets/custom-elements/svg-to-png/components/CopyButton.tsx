import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
    padding: 8px 16px;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;

    &:hover {
        background: #357abd;
    }

    &:disabled {
        background: #88b7e8;
        cursor: default;
    }
`;

interface CopyButtonProps {
    content: string;
    label: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ content, label }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <Button onClick={handleCopy} disabled={isCopied}>
            {isCopied ? 'Copied!' : label}
        </Button>
    );
};

export default CopyButton;
