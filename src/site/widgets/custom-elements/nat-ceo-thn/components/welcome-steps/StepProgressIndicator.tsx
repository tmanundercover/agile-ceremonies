import React from 'react';
import { Text } from '@radix-ui/themes';
import styled from 'styled-components';

export interface Step {
    number: number;
    name: string;
    active: boolean;
}

interface StepProgressIndicatorProps {
    steps: Step[];
    progress?: number;
}

const StyledProgressBar = styled.div`
  position: relative;
  width: 100%;
  padding: 16px 0;
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

const StepperContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0 16px;
`;

const StepIndicator = styled.div<{ $active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$active ? 
    'linear-gradient(90deg, #9333EA 0%, #A855F7 100%)' : 
    'var(--gray-4)'};
  color: ${props => props.$active ? 'white' : 'var(--gray-9)'};
  position: relative;
  z-index: 1;
`;

const StepLabel = styled(Text)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  white-space: nowrap;
`;

export const StepProgressIndicator: React.FC<StepProgressIndicatorProps> = ({ steps, progress }) => {
    return (
        <StyledProgressBar progress={progress}>
            <div className="progress" />
            <StepperContainer>
                {steps.map((step) => (
                    <div key={step.number} style={{ position: 'relative' }}>
                        <StepIndicator $active={step.active}>
                            {step.number}
                        </StepIndicator>
                        <StepLabel
                            size="2"
                            weight={step.active ? "bold" : "regular"}
                            color={step.active ? "purple" : "gray"}
                        >
                            {step.name}
                        </StepLabel>
                    </div>
                ))}
            </StepperContainer>
        </StyledProgressBar>
    );
};
