import React from 'react';
import styled from 'styled-components';

const WorkflowContainer = styled.div`
  margin: 1rem 0;
`;

const WorkflowTitle = styled.h3`
  margin-bottom: 1rem;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const WorkflowStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const StepNumber = styled.div`
  background-color: #7928CA;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepAgent = styled.div`
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const StepAction = styled.div`
  color: #444;
`;

const WorkflowSteps = ({ title, steps }) => {
  return (
    <WorkflowContainer>

        {title && <WorkflowTitle>{title}</WorkflowTitle>}
      
      <StepsContainer className="workflow-steps">
        {steps.map((step, index) => (
          <WorkflowStep key={index} className="workflow-step">
            <StepNumber className="step-number">{step.number || index + 1}</StepNumber>
            <StepContent className="step-content">
              <StepAgent className="step-agent">{step.agent}</StepAgent>
              <StepAction className="step-action">{step.action}</StepAction>
            </StepContent>
          </WorkflowStep>
        ))}
      </StepsContainer>
    </WorkflowContainer>
  );
};

export default WorkflowSteps;
