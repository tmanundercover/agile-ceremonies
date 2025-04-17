import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../theme';

const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.xs};
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Checkbox = styled.div`
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
  
  ${props => props.checked && `
    background-color: ${theme.colors.primary};
    
    &:after {
      content: '✓';
      color: white;
      font-size: 10px;
    }
  `}
`;

const TodoText = styled.div`
  font-size: 12px;
  color: ${theme.colors.textColor};
  ${props => props.checked && `
    text-decoration: line-through;
    opacity: 0.7;
  `}
`;

const TodoItem = ({ text, initialChecked = false }) => {
  const [checked, setChecked] = useState(initialChecked);
  
  return (
    <TodoItemContainer>
      <Checkbox 
        checked={checked} 
        onClick={() => setChecked(!checked)}
      />
      <TodoText checked={checked}>{text}</TodoText>
    </TodoItemContainer>
  );
};

export default TodoItem;
