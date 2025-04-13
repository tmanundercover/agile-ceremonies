import React, {useRef, useState} from 'react';
import {
    ColorInputGroupStyled,
    ColorInputStyled,
    ColorSwatchStyled,
    HexInputStyled
} from "../landing-page-builder-styled-components";

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
        <ColorInputGroupStyled>
            <ColorSwatchStyled
                type="button"
                color={value}
                onClick={handleSwatchClick}
                data-testid={`${testId}-swatch`}
                aria-label="Open color picker"
            />
            <ColorInputStyled
                ref={colorInputRef}
                id={id}
                type="color"
                value={value}
                onChange={handleColorPickerChange}
                data-testid={`${testId}-picker`}
            />
            <HexInputStyled
                type="text"
                value={tempHexValue}
                onChange={handleHexChange}
                onBlur={handleHexBlur}
                data-testid={`${testId}-hex`}
            />
        </ColorInputGroupStyled>
    );
};

