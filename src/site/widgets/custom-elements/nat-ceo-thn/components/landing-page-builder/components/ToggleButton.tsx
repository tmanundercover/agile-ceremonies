import React from 'react';
import {StyledButtonStyled} from "../landing-page-builder-styled-components";

interface ToggleButtonProps {
    isSelected: boolean;
    onClick: () => void;
    disabled?: boolean;
    color: string;
    children: React.ReactNode;
    'data-testid'?: string;
    title?: string;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
    onClick,
    disabled,
    color,
    children,
    'data-testid': dataTestId,
    title
}) => {
    return (
        <StyledButtonStyled
            onClick={onClick}
            disabled={disabled}
            $color={color}
            data-testid={dataTestId}
            title={title}
        >
            {children}
        </StyledButtonStyled>
    );
};

