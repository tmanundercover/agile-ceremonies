import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToggleButton } from '../ToggleButton';

describe('ToggleButton', () => {
    const mockOnClick = jest.fn();

    beforeEach(() => {
        mockOnClick.mockClear();
    });

    it('renders with provided content', () => {
        render(
            <ToggleButton
                isSelected={false}
                onClick={mockOnClick}
                color="#000000"
                data-testid="test-button"
            >
                👍
            </ToggleButton>
        );

        expect(screen.getByTestId('test-button')).toHaveTextContent('👍');
    });

    it('calls onClick when clicked', () => {
        render(
            <ToggleButton
                isSelected={false}
                onClick={mockOnClick}
                color="#000000"
                data-testid="test-button"
            >
                👍
            </ToggleButton>
        );

        fireEvent.click(screen.getByTestId('test-button'));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('applies disabled state correctly', () => {
        render(
            <ToggleButton
                isSelected={false}
                onClick={mockOnClick}
                disabled={true}
                color="#000000"
                data-testid="test-button"
            >
                👍
            </ToggleButton>
        );

        expect(screen.getByTestId('test-button')).toBeDisabled();
        
        fireEvent.click(screen.getByTestId('test-button'));
        expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('applies the correct color', () => {
        const testColor = '#FF0000';
        render(
            <ToggleButton
                isSelected={false}
                onClick={mockOnClick}
                color={testColor}
                data-testid="test-button"
            >
                👍
            </ToggleButton>
        );

        expect(screen.getByTestId('test-button')).toHaveStyle(`color: ${testColor}`);
    });
});
