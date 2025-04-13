import React, { useState } from 'react';
import { StyleGuide } from '../landing-page-builder-types';
import { ColorPicker } from './ColorPicker';
import {
  ModalStyled,
  FormStyled,
  InputGroupStyled,
  LabelStyled,
  ButtonStyled, OverlayStyled, SelectStyled, RangeInputStyled, ButtonGroupStyled
} from "../landing-page-builder-styled-components";

interface StyleGuideModalProps {
  styleGuide: StyleGuide;
  onClose: () => void;
  onSave: (newStyleGuide: StyleGuide) => void;
}

export const StyleGuideModal: React.FC<StyleGuideModalProps> = ({
  styleGuide,
  onClose,
  onSave,
}) => {
  const [localStyleGuide, setLocalStyleGuide] = useState<StyleGuide>(styleGuide);
  const fontOptions = ['Inter, system-ui, sans-serif', 'Roboto, sans-serif', 'Montserrat, sans-serif'];

  const handleColorChange = (field: 'primaryColor' | 'secondaryColor', value: string) => {
    setLocalStyleGuide({
      ...localStyleGuide,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localStyleGuide);
    onClose();
  };

  return (
    <OverlayStyled>
      <ModalStyled>
        <h2>Edit Style Guide</h2>
        <FormStyled onSubmit={handleSubmit} role="form">
          <InputGroupStyled>
            <LabelStyled htmlFor="primaryColor">Primary Color</LabelStyled>
            <ColorPicker
              id="primaryColor"
              value={localStyleGuide.primaryColor}
              onChange={(value) => handleColorChange('primaryColor', value)}
              data-testid="primary-color"
            />
          </InputGroupStyled>

          <InputGroupStyled>
            <LabelStyled htmlFor="secondaryColor">Secondary Color</LabelStyled>
            <ColorPicker
              id="secondaryColor"
              value={localStyleGuide.secondaryColor}
              onChange={(value) => handleColorChange('secondaryColor', value)}
              data-testid="secondary-color"
            />
          </InputGroupStyled>

          <InputGroupStyled>
            <LabelStyled htmlFor="fontFamily">Font Family</LabelStyled>
            <SelectStyled
              id="fontFamily"
              value={localStyleGuide.fontFamily}
              onChange={(e) => setLocalStyleGuide({
                ...localStyleGuide,
                fontFamily: e.target.value
              })}
              data-testid="font-family-select"
            >
              {fontOptions.map(font => (
                <option key={font} value={font}>{font.split(',')[0]}</option>
              ))}
            </SelectStyled>
          </InputGroupStyled>

          <InputGroupStyled>
            <LabelStyled htmlFor="spacing">Spacing ({localStyleGuide.spacing}px)</LabelStyled>
            <RangeInputStyled
              id="spacing"
              type="range"
              min="0"
              max="48"
              step="4"
              value={localStyleGuide.spacing}
              onChange={(e) => setLocalStyleGuide({
                ...localStyleGuide,
                spacing: Number(e.target.value)
              })}
              data-testid="spacing-slider"
            />
          </InputGroupStyled>

          <InputGroupStyled>
            <LabelStyled htmlFor="borderRadius">Border Radius ({localStyleGuide.borderRadius}px)</LabelStyled>
            <RangeInputStyled
              id="borderRadius"
              type="range"
              min="0"
              max="32"
              step="4"
              value={localStyleGuide.borderRadius}
              onChange={(e) => setLocalStyleGuide({
                ...localStyleGuide,
                borderRadius: Number(e.target.value)
              })}
              data-testid="border-radius-slider"
            />
          </InputGroupStyled>

          <ButtonGroupStyled>
            <ButtonStyled type="button" variant="secondary" onClick={onClose}>
              Cancel
            </ButtonStyled>
            <ButtonStyled type="submit">
              Save Changes
            </ButtonStyled>
          </ButtonGroupStyled>
        </FormStyled>
      </ModalStyled>
    </OverlayStyled>
  );
};

