import React from 'react';
import { Text } from '@radix-ui/themes';
import styled from 'styled-components';
import {
    StepIndicator,
    StepIndicatorWrapper,
    StepLabel,
    StepperContainer,
    StyledProgressBar
} from '../../styledComponents';

export interface Step {
    number: number;
    name: string;
    active: boolean;
}

interface StepProgressIndicatorProps {
    steps: Step[];
    progress?: number;
}

export const StepProgressIndicator: React.FC<StepProgressIndicatorProps> = ({ steps, progress }) => {
    return (
        <StyledProgressBar progress={progress}>
            <div className="progress" />
            <StepperContainer>
                {steps.map((step, index) => {
                    const position = (index / (steps.length - 1)) * 100;
                    return (
                        <StepIndicatorWrapper key={step.number} $position={position}>
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
                        </StepIndicatorWrapper>
                    );
                })}
            </StepperContainer>
        </StyledProgressBar>
    );
};
