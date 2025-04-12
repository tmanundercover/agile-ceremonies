import React from 'react';
import styled from 'styled-components';

interface ToggleButtonProps {
    isSelected: boolean;
    onClick: () => void;
    disabled?: boolean;
    color: string;
    children: React.ReactNode;
    'data-testid'?: string;
    title?: string;
}

const StyledButton = styled.button<{ $color: string }>`
    background: none;
    border: none;
    font-size: 2.5rem;
    cursor: pointer;
    transition: transform 0.2s;
    padding: 0.5rem;
    color: ${props => props.$color};

    &:hover:not(:disabled) {
        transform: scale(1.1);
    }

    &:active:not(:disabled) {
        transform: scale(0.95);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const ToggleButton: React.FC<ToggleButtonProps> = ({
    isSelected,
    onClick,
    disabled,
    color,
    children,
    'data-testid': dataTestId,
    title
}) => {
    return (
        <StyledButton
            onClick={onClick}
            disabled={disabled}
            $color={color}
            data-testid={dataTestId}
            title={title}
        >
            {children}
        </StyledButton>
    );
};
