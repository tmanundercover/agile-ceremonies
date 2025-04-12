import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StyleGuideModal } from '../StyleGuideModal';
import { StyleGuide } from '../../sticker-builder-types';

const mockStyleGuide: StyleGuide = {
  primaryColor: '#0066ff',
  secondaryColor: '#00cc88',
  fontFamily: 'Inter, system-ui, sans-serif',
  spacing: 24,
  borderRadius: 8
};

describe('StyleGuideModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with initial style guide values', () => {
    render(
      <StyleGuideModal
        styleGuide={mockStyleGuide}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByLabelText(/Primary Color/i)).toHaveValue(mockStyleGuide.primaryColor);
    expect(screen.getByLabelText(/Secondary Color/i)).toHaveValue(mockStyleGuide.secondaryColor);
    expect(screen.getByLabelText(/Font Family/i)).toHaveValue(mockStyleGuide.fontFamily);
    expect(screen.getByLabelText(/Spacing/i)).toHaveValue(String(mockStyleGuide.spacing));
    expect(screen.getByLabelText(/Border Radius/i)).toHaveValue(String(mockStyleGuide.borderRadius));
  });

  it('handles color input changes', () => {
    render(
      <StyleGuideModal
        styleGuide={mockStyleGuide}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    const primaryColorInput = screen.getByLabelText(/Primary Color/i);
    fireEvent.change(primaryColorInput, { target: { value: '#ff0000' } });
    expect(primaryColorInput).toHaveValue('#ff0000');

    const secondaryColorInput = screen.getByLabelText(/Secondary Color/i);
    fireEvent.change(secondaryColorInput, { target: { value: '#00ff00' } });
    expect(secondaryColorInput).toHaveValue('#00ff00');
  });

  it('handles form submission with updated values', () => {
    render(
      <StyleGuideModal
        styleGuide={mockStyleGuide}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    // Update some values
    fireEvent.change(screen.getByLabelText(/Primary Color/i), { target: { value: '#ff0000' } });
    fireEvent.change(screen.getByLabelText(/Spacing/i), { target: { value: '32' } });

    // Submit the form
    fireEvent.click(screen.getByText('Save Changes'));

    expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
      primaryColor: '#ff0000',
      spacing: 32
    }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('handles cancel button click', () => {
    render(
      <StyleGuideModal
        styleGuide={mockStyleGuide}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    // Make some changes
    fireEvent.change(screen.getByLabelText(/Primary Color/i), { target: { value: '#ff0000' } });

    // Click cancel
    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnSave).not.toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('validates numeric inputs', () => {
    render(
      <StyleGuideModal
        styleGuide={mockStyleGuide}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    const spacingInput = screen.getByLabelText(/Spacing/i);
    const form = screen.getByRole('form');

    // Test invalid input - negative numbers should be converted to 0
    fireEvent.change(spacingInput, { target: { value: '-1' } });
    expect(spacingInput).toHaveValue('0');

    // Submit form using form submission
    fireEvent.submit(form);

    // Verify the form submission triggered the save callback with valid value
    expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
      ...mockStyleGuide,
      spacing: 0
    }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  describe('Color Inputs', () => {
    it('renders and handles color pickers correctly', () => {
      render(
        <StyleGuideModal
          styleGuide={mockStyleGuide}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      // Check swatches
      const primarySwatch = screen.getByTestId('primary-color-swatch');
      const secondarySwatch = screen.getByTestId('secondary-color-swatch');
      expect(primarySwatch).toHaveStyle({ backgroundColor: mockStyleGuide.primaryColor });
      expect(secondarySwatch).toHaveStyle({ backgroundColor: mockStyleGuide.secondaryColor });

      // Test color changes
      const primaryPicker = screen.getByTestId('primary-color-picker');
      fireEvent.change(primaryPicker, { target: { value: '#ff5500' } });

      // Submit and verify
      fireEvent.click(screen.getByText('Save Changes'));
      expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
        primaryColor: '#ff5500',
        secondaryColor: mockStyleGuide.secondaryColor
      }));
    });

    it('handles invalid color inputs gracefully', () => {
      render(
        <StyleGuideModal
          styleGuide={mockStyleGuide}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const hexInput = screen.getByTestId('primary-color-hex');

      // Invalid hex should not update the form
      fireEvent.change(hexInput, { target: { value: '#xyz123' } });
      expect(hexInput).toHaveValue(mockStyleGuide.primaryColor);

      // Form should not submit with invalid colors
      fireEvent.click(screen.getByText('Save Changes'));
      expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
        primaryColor: mockStyleGuide.primaryColor
      }));
    });
  });

  describe('Font Family Dropdown', () => {
    it('renders font family dropdown with correct options', () => {
      render(
        <StyleGuideModal
          styleGuide={mockStyleGuide}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const select = screen.getByTestId('font-family-select');
      const options = Array.from(select.getElementsByTagName('option'));

      expect(options).toHaveLength(3);
      expect(options[0].value).toBe('Inter, system-ui, sans-serif');
      expect(options[1].value).toBe('Roboto, sans-serif');
      expect(options[2].value).toBe('Montserrat, sans-serif');
    });

    it('updates font family when selection changes', () => {
      render(
        <StyleGuideModal
          styleGuide={mockStyleGuide}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const select = screen.getByTestId('font-family-select');
      fireEvent.change(select, { target: { value: 'Roboto, sans-serif' } });

      expect(select).toHaveValue('Roboto, sans-serif');
    });
  });

  describe('Range Sliders', () => {
    it('configures spacing slider correctly', () => {
      render(
        <StyleGuideModal
          styleGuide={mockStyleGuide}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const slider = screen.getByTestId('spacing-slider');
      expect(slider).toHaveAttribute('type', 'range');
      expect(slider).toHaveAttribute('min', '0');
      expect(slider).toHaveAttribute('max', '48');
      expect(slider).toHaveAttribute('step', '4');
    });

    it('configures border radius slider correctly', () => {
      render(
        <StyleGuideModal
          styleGuide={mockStyleGuide}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const slider = screen.getByTestId('border-radius-slider');
      expect(slider).toHaveAttribute('type', 'range');
      expect(slider).toHaveAttribute('min', '0');
      expect(slider).toHaveAttribute('max', '32');
      expect(slider).toHaveAttribute('step', '4');
    });

    it('updates values when sliders change', () => {
      render(
        <StyleGuideModal
          styleGuide={mockStyleGuide}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const spacingSlider = screen.getByTestId('spacing-slider');
      fireEvent.change(spacingSlider, { target: { value: '32' } });
      expect(spacingSlider).toHaveValue('32');

      const borderRadiusSlider = screen.getByTestId('border-radius-slider');
      fireEvent.change(borderRadiusSlider, { target: { value: '16' } });
      expect(borderRadiusSlider).toHaveValue('16');
    });
  });
});

