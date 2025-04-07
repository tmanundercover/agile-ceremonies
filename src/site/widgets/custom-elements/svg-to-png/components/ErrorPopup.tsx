import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #ff4444;
    color: white;
    padding: 15px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    max-width: 400px;
    z-index: 1000;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
`;

interface ErrorPopupProps {
    error: string | null;
    onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ error, onClose }) => {
    if (!error) return null;

    return (
        <ErrorContainer>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <pre>{error}</pre>
        </ErrorContainer>
    );
};

export default ErrorPopup;
