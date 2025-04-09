import styled from "styled-components";
import {Text, TextField} from "@radix-ui/themes";
import {Step} from "./components/welcome-steps/StepProgressIndicator";

export const ErrorText = styled(Text)`
    color: var(--red-9);
    margin-top: 4px;
    display: block; // Ensure consistent display
`;

export const ErrorTextField = styled(TextField.Input)<{ $hasError: boolean }>`
    &:focus {
        box-shadow: ${props => props.$hasError ? '0 0 0 2px var(--red-7)' : '0 0 0 2px var(--purple-7)'};
    }

    border-color: ${props => props.$hasError ? 'var(--red-7)' : 'var(--gray-7)'};
`;

export const FormContainer = styled.div`
    background: white;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const FormFieldWrapper = styled.div<{ $width: string }>`
    flex: 1 1 ${props => props.$width};
    width: ${props => props.$width};
    min-width: 250px;
`;

interface StyledProgressBarProps {
    progress?: number;
}

export const StyledProgressBar = styled.div<StyledProgressBarProps>`
  position: relative;
  width: 100%;
  height: 32px;
  margin-bottom: 24px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 8px;
    background: var(--gray-4);
    border-radius: 4px;
    transform: translateY(-50%);
  }

  .progress {
    position: absolute;
    top: 50%;
    left: 0;
    width: ${props => props.progress || 20}%;
    height: 8px;
    background: linear-gradient(90deg, #9333EA 0%, #A855F7 100%);
    border-radius: 4px;
    transform: translateY(-50%);
    transition: width 0.3s ease;
  }
`;

interface StepProgressIndicatorProps {
    steps: Step[];
    progress?: number;
}

export const StepperContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  margin: 0;
  width: 100%;
`;

export const StepIndicatorWrapper = styled.div<{ $position: number }>`
  position: absolute;
  left: ${props => props.$position}%;
  transform: translateX(-50%);
`;

export const StepIndicator = styled.div<{ $active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$active ?
    'linear-gradient(90deg, ' +
    '#9333EA' +
    ' 0%, ' +
    '#A855F7' +
    ' 100%)' :
    'var(--gray-4)'};
  color: ${props => props.$active ? 'white' : 'var(--gray-9)'};
  position: relative;
  z-index: 1;
`;

export const StepLabel = styled(Text)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  white-space: nowrap;
`;