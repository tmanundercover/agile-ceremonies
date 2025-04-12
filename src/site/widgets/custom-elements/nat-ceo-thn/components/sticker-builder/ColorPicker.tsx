import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const ColorInputGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ColorSwatch = styled.button`
  width: 50px;
  height: 50px;
  padding: 0;
  border: 2px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.color};
  
  &:hover {
    border-color: #0066ff;
  }
  
  &:focus {
    outline: none;
    border-color: #0066ff;
  }
`;

const ColorInput = styled.input`
  width: 50px;
  height: 50px;
  padding: 0;
  border: 2px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0;
  position: absolute;
  pointer-events: none;
`;

const HexInput = styled.input`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100px;
  
  &:focus {
    border-color: #0066ff;
    outline: none;
  }
`;

interface ColorPickerProps {
  id: string;
  value: string;
  onChange: (color: string) => void;
  'data-testid'?: string;
}

const isValidHexColor = (color: string): boolean => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(color);
};

const isPartialHexColor = (color: string): boolean => {
  return /^#[0-9A-F]{0,6}$/i.test(color);
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  id,
  value,
  onChange,
  'data-testid': testId
}) => {
  const [tempHexValue, setTempHexValue] = useState(value);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleSwatchClick = () => {
    if (colorInputRef.current) {
      // This will trigger the native color picker in gradient view
      colorInputRef.current.click();
    }
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.startsWith('#')) {
      setTempHexValue(newValue);

      if (isValidHexColor(newValue)) {
        onChange(newValue);
      } else if (!isPartialHexColor(newValue)) {
        setTempHexValue(value);
      }
    }
  };

  const handleHexBlur = () => {
    if (!isValidHexColor(tempHexValue)) {
      setTempHexValue(value);
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTempHexValue(newValue);
    onChange(newValue);
  };

  return (
    <ColorInputGroup>
      <ColorSwatch
        type="button"
        color={value}
        onClick={handleSwatchClick}
        data-testid={`${testId}-swatch`}
        aria-label="Open color picker"
      />
      <ColorInput
        ref={colorInputRef}
        id={id}
        type="color"
        value={value}
        onChange={handleColorPickerChange}
        data-testid={`${testId}-picker`}
      />
      <HexInput
        type="text"
        value={tempHexValue}
        onChange={handleHexChange}
        onBlur={handleHexBlur}
        data-testid={`${testId}-hex`}
      />
    </ColorInputGroup>
  );
};

