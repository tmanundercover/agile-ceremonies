import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../theme';
import TodoServicesTag from './TodoServicesTag';
import {CheckboxProps} from "../task-track/MilestoneTracker.types";

export interface TodoItemProps {
  title: string;
  status: string;
  services: string[];
}

const TodoContainer = styled.div`
  padding: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xs};
  background-color: ${theme.colors.cardBg}; 
  border-radius: ${theme.borderRadius};
  border-left: 3px solid ${theme.colors.primary};
  box-shadow: ${theme.shadows.sm};
  transition: all ${theme.transitionSpeed} ${theme.animations.easeOutBack};
  
  &:hover {
    transform: translateX(3px);
    box-shadow: ${theme.shadows.md};
    border-left-width: 5px;
  }
`;

const TodoTitle = styled.div`
  font-size: 14px;
  margin-bottom: 6px;
  color: ${theme.colors.textColor};
  display: flex;
  align-items: flex-start;
`;

const StatusIndicator = styled.span<{ status: string }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 8px;
  margin-top: 4px;
  border-radius: 50%;
  background-color: ${props => 
    props.status.toLowerCase() === 'completed' ? theme.colors.success :
    props.status.toLowerCase() === 'in progress' ? theme.colors.warning :
    theme.colors.neutral500
  };
`;

const Checkbox = styled.div<CheckboxProps>`
  width: 16px;
  height: 16px;
  border: 1.5px solid ${theme.colors.primary};
  border-radius: 3px;
  margin-right: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  ${props => props.checked && `
    background-color: ${theme.colors.primary};
    
    &:after {
      content: '✓';
      color: white;
      font-size: 10px;
    }
  `}
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 0 2px ${theme.colors.primaryLight}20;
  }
`;

const ServiceTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 6px;
  margin-left: 16px;
  gap: 2px;
`;

const TodoItem: React.FC<TodoItemProps> = ({ title, status, services }) => {
  const [checked, setChecked] = useState<boolean>()
    return (
    <TodoContainer>
      <TodoTitle>
          <Checkbox
              checked={checked}
              onClick={() => setChecked(!checked)}
          />
        <StatusIndicator status={status} />
        {title}
      </TodoTitle>
      {services && services.length > 0 && (
        <ServiceTagsContainer>
          {services.map((service, index) => (
            <TodoServicesTag key={`${service}-${index}`} service={service} />
          ))}
        </ServiceTagsContainer>
      )}
    </TodoContainer>
  );
};

export default TodoItem;
