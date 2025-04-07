import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`;

const ButtonContainer = styled.button`
  position: sticky;
  top: 8px;
  right: 8px;
  float: right;
  background: #f0f0f0;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;

  &:hover {
    background: #e0e0e0;
    transform: scale(1.1);
  }

  svg {
    width: 18px;
    height: 18px;
    fill: #4a90e2;
    animation: ${fadeIn} 0.2s ease;
  }

  .parent-container:hover & {
    opacity: 1;
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
        <ButtonContainer onClick={handleCopy} aria-label={label} title={label}>
            {isCopied ? (
                <svg viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
            ) : (
                <svg viewBox="0 0 24 24">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
            )}
        </ButtonContainer>
    );
};

export default CopyButton;
