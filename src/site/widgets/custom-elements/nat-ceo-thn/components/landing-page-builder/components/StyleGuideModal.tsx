import React, { useState } from 'react';
import styled from 'styled-components';
import { StyleGuide } from '../landing-page-builder-types';
import { ColorPicker } from './ColorPicker';

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  max-width: 500px;
  width: 90%;

  h2 {
    color: #1A1A1A;
    font-size: 24px;
    margin-bottom: 1.5rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #1A1A1A;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    border-color: #0066ff;
    outline: none;
  }
`;

const ColorInputGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const HexInput = styled(Input)`
  width: 100px;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #EDF2F7;
  border-radius: 4px;
  font-size: 14px;
  color: #4A5568;
  background: white;
  
  &:focus {
    border-color: #9333EA;
    outline: none;
    box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
  }
`;

const RangeInput = styled.input`
  &[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    background: #EDF2F7;
    border-radius: 2px;
    outline: none;
    padding: 0;
    margin: 10px 0;
  }

  &[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #9333EA;
    cursor: pointer;
    transition: background .15s ease-in-out;
    
    &:hover {
      background: #7928CA;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button<{ variant?: 'secondary' }>`
  padding: 0.75rem 1.5rem;
  background: ${props => props.variant === 'secondary' ? '#fff' : '#9333EA'};
  color: ${props => props.variant === 'secondary' ? '#9333EA' : '#fff'};
  border: ${props => props.variant === 'secondary' ? '2px solid #9333EA' : 'none'};
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.variant === 'secondary' ? '#F3E5F5' : '#7928CA'};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
  }
`;

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
    <Overlay>
      <Modal>
        <h2>Edit Style Guide</h2>
        <Form onSubmit={handleSubmit} role="form">
          <InputGroup>
            <Label htmlFor="primaryColor">Primary Color</Label>
            <ColorPicker
              id="primaryColor"
              value={localStyleGuide.primaryColor}
              onChange={(value) => handleColorChange('primaryColor', value)}
              data-testid="primary-color"
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <ColorPicker
              id="secondaryColor"
              value={localStyleGuide.secondaryColor}
              onChange={(value) => handleColorChange('secondaryColor', value)}
              data-testid="secondary-color"
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="fontFamily">Font Family</Label>
            <Select
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
            </Select>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="spacing">Spacing ({localStyleGuide.spacing}px)</Label>
            <RangeInput
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
          </InputGroup>

          <InputGroup>
            <Label htmlFor="borderRadius">Border Radius ({localStyleGuide.borderRadius}px)</Label>
            <RangeInput
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
          </InputGroup>

          <ButtonGroup>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
};

