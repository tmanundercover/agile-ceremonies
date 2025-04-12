import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ColorPicker } from '../ColorPicker';

describe('ColorPicker', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders color swatch with initial value and correct styling', () => {
    render(
      <ColorPicker
        id="testColor"
        value="#ff0000"
        onChange={mockOnChange}
        data-testid="test-color"
      />
    );

    const swatch = screen.getByTestId('test-color-swatch');
    expect(swatch).toHaveStyle({ backgroundColor: '#ff0000' });
    expect(screen.getByTestId('test-color-hex')).toHaveValue('#ff0000');
  });

  it('opens color picker when swatch is clicked', () => {
    render(
      <ColorPicker
        id="testColor"
        value="#ff0000"
        onChange={mockOnChange}
        data-testid="test-color"
      />
    );

    const swatch = screen.getByTestId('test-color-swatch');
    const colorInput = screen.getByTestId('test-color-picker');

    // Mock the click method of the color input
    const mockClick = jest.fn();
    colorInput.click = mockClick;

    fireEvent.click(swatch);
    expect(mockClick).toHaveBeenCalled();
  });

  describe('hex input behavior', () => {
    it('allows valid hex color input', () => {
      render(
        <ColorPicker
          id="testColor"
          value="#ff0000"
          onChange={mockOnChange}
          data-testid="test-color"
        />
      );

      const hexInput = screen.getByTestId('test-color-hex');
      fireEvent.change(hexInput, { target: { value: '#00ff00' } });

      expect(hexInput).toHaveValue('#00ff00');
      expect(mockOnChange).toHaveBeenCalledWith('#00ff00');
    });

  describe('hex input validation', () => {
    it('allows valid hex color input', () => {
      render(
        <ColorPicker
          id="testColor"
          value="#ff0000"
          onChange={mockOnChange}
          data-testid="test-color"
        />
      );

      const hexInput = screen.getByTestId('test-color-hex');
      fireEvent.change(hexInput, { target: { value: '#00ff00' } });

      expect(hexInput).toHaveValue('#00ff00');
      expect(mockOnChange).toHaveBeenCalledWith('#00ff00');
    });

    it('allows partial hex input while typing', () => {
      render(
        <ColorPicker
          id="testColor"
          value="#ff0000"
          onChange={mockOnChange}
          data-testid="test-color"
        />
      );

      const hexInput = screen.getByTestId('test-color-hex');
      fireEvent.change(hexInput, { target: { value: '#ff' } });

      expect(hexInput).toHaveValue('#ff');
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('reverts to previous value on blur if hex is invalid', () => {
      render(
        <ColorPicker
          id="testColor"
          value="#ff0000"
          onChange={mockOnChange}
          data-testid="test-color"
        />
      );

      const hexInput = screen.getByTestId('test-color-hex');
      fireEvent.change(hexInput, { target: { value: '#ff' } });
      fireEvent.blur(hexInput);

      expect(hexInput).toHaveValue('#ff0000');
    });
  });

  it('updates all inputs when using the color picker input', () => {
    render(
      <ColorPicker
        id="testColor"
        value="#ff0000"
        onChange={mockOnChange}
        data-testid="test-color"
      />
    );

    const colorPicker = screen.getByTestId('test-color-picker');
    fireEvent.change(colorPicker, { target: { value: '#00ff00' } });

      expect(screen.getByTestId('test-color-hex')).toHaveValue('#00ff00');
      expect(screen.getByTestId('test-color-swatch')).toHaveStyle({ backgroundColor: '#00ff00' });
      expect(mockOnChange).toHaveBeenCalledWith('#00ff00');
    });

    it('ignores non-hex inputs', () => {
      render(
        <ColorPicker
          id="testColor"
          value="#ff0000"
          onChange={mockOnChange}
          data-testid="test-color"
        />
      );

      const hexInput = screen.getByTestId('test-color-hex');
      fireEvent.change(hexInput, { target: { value: 'not a color' } });

      expect(hexInput).toHaveValue('#ff0000');
      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  it('renders with proper styled-components structure', () => {
    render(
      <ColorPicker
        id="testColor"
        value="#ff0000"
        onChange={mockOnChange}
        data-testid="test-color"
      />
    );

    const container = screen.getByTestId('test-color-swatch').closest('div');
    expect(container).toHaveStyle({
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    });
  });
});
