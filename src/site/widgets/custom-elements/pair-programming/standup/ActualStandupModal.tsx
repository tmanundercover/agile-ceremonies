import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import theme from '../theme';
import { StandupModalProps, StandupData, Task, HelpRequest } from './types';
import { Teammate } from '../models';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-20px); }
  to { transform: translateY(0); }
`;

// Main modal container with backdrop
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;

interface ModalContainerProps {
  isEntering: boolean;
}

const ModalContainer = styled.div<ModalContainerProps>`
  background-color: ${theme.colors.cardBg};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  padding: ${theme.spacing.lg};
  width: 90%;
  max-width: 600px;
  max-height: 85vh; /* Adjusted to better fit screen while allowing some space */
  overflow-y: auto;
  color: ${theme.colors.textColor};
  animation: ${fadeIn} 0.3s ease, ${slideIn} 0.3s ease;
  opacity: 1; /* Ensure fully opaque background */
  
  /* Add a solid background to ensure opacity */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.colors.cardBg};
    z-index: -1;
    border-radius: ${theme.borderRadius};
  }
  
  ${theme.mediaQueries.mobile} {
    width: 95%;
    padding: ${theme.spacing.md};
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.neutral500};
  padding-bottom: ${theme.spacing.sm};
`;

const ModalTitle = styled.h2`
  font-size: ${theme.typography.heading2.fontSize};
  font-weight: ${theme.typography.heading2.fontWeight};
  color: ${theme.colors.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${theme.colors.neutral700};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: ${theme.colors.error};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const FormSection = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.heading3.fontSize};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 18px;
    background-color: ${theme.colors.primary};
    margin-right: ${theme.spacing.sm};
    border-radius: 2px;
  }
`;

const FormRow = styled.div`
  margin-bottom: ${theme.spacing.sm};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.xs};
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.neutral500};
  border-radius: ${theme.borderRadius};
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.textColor};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.neutral500};
  border-radius: ${theme.borderRadius};
  font-size: 16px;
  min-height: 80px;
  resize: vertical;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.textColor};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.neutral500};
  border-radius: ${theme.borderRadius};
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.textColor};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.2);
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background-color: rgba(0, 0, 0, 0.05);
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius};
  border-left: 3px solid ${theme.colors.primary};
`;

const TaskInput = styled.input`
  flex-grow: 1;
  padding: ${theme.spacing.xs};
  border: 1px solid transparent;
  border-radius: ${theme.borderRadius};
  background-color: transparent;
  color: ${theme.colors.textColor};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.error};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
    background-color: rgba(239, 68, 68, 0.1);
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background-color: transparent;
  border: 1px dashed ${theme.colors.neutral500};
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  cursor: pointer;
  margin-top: ${theme.spacing.xs};
  width: fit-content;
  color: ${theme.colors.primary};
  
  &:hover {
    background-color: rgba(147, 51, 234, 0.1);
    border-color: ${theme.colors.primary};
  }
`;

const HelpRequestCheckbox = styled.input`
  margin-right: ${theme.spacing.sm};
`;

const HelpRequestLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: ${theme.spacing.sm};
`;

const HelpRequestDetails = styled.div`
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  background-color: rgba(147, 51, 234, 0.05);
  border-radius: ${theme.borderRadius};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

interface ButtonProps {
  primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${props => props.primary ? theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.primary ? theme.colors.primaryDark : 'rgba(147, 51, 234, 0.1)'};
    transform: translateY(-2px);
    box-shadow: ${theme.boxShadow};
  }
`;

const ErrorText = styled.div`
  color: ${theme.colors.error};
  font-size: 14px;
  margin-top: ${theme.spacing.xs};
`;

// The actual standup modal component
const ActualStandupModal: React.FC<StandupModalProps> = ({ 
  teammate, 
  onClose, 
  isEntering 
}) => {
  const [status, setStatus] = useState<'On Track' | 'Blocked' | 'At Risk'>('On Track');
  const [blockers, setBlockers] = useState<string[]>(['']);
  
  // Tasks state
  const [tasksCompleted, setTasksCompleted] = useState<Partial<Task>[]>([{ id: '1', title: '', status: 'Completed' }]);
  const [tasksInProgress, setTasksInProgress] = useState<Partial<Task>[]>([{ id: '1', title: '', status: 'In Progress' }]);
  const [tasksPlanned, setTasksPlanned] = useState<Partial<Task>[]>([{ id: '1', title: '', status: 'Planned' }]);
  
  // Help request state
  const [needsHelp, setNeedsHelp] = useState<boolean>(false);
  const [helpRequest, setHelpRequest] = useState<HelpRequest>({
    topic: '',
    description: '',
    urgency: 'low'
  });

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Handle clicking outside to close (if needed)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      // Only close if they click the backdrop
      onClose({ name: '' });  // Return empty data to indicate cancel
    }
  };

  const handleCancel = () => {
    onClose({ name: '' });
  };

  // Handle task updates
  const updateTaskItem = (
    index: number, 
    value: string, 
    taskList: Partial<Task>[], 
    setTaskList: React.Dispatch<React.SetStateAction<Partial<Task>[]>>
  ) => {
    const newList = [...taskList];
    newList[index] = { ...newList[index], title: value };
    setTaskList(newList);
  };

  // Add new tasks
  const addTaskItem = (
    taskList: Partial<Task>[], 
    setTaskList: React.Dispatch<React.SetStateAction<Partial<Task>[]>>,
    status: string
  ) => {
    const newId = `task-${Date.now()}`;
    setTaskList([...taskList, { id: newId, title: '', status }]);
  };

  // Remove tasks
  const removeTaskItem = (
    index: number, 
    taskList: Partial<Task>[], 
    setTaskList: React.Dispatch<React.SetStateAction<Partial<Task>[]>>
  ) => {
    const newList = [...taskList];
    newList.splice(index, 1);
    setTaskList(newList);
  };

  // Update blockers
  const updateBlocker = (index: number, value: string) => {
    const newBlockers = [...blockers];
    newBlockers[index] = value;
    setBlockers(newBlockers);
  };

  const addBlocker = () => {
    setBlockers([...blockers, '']);
  };

  const removeBlocker = (index: number) => {
    const newBlockers = [...blockers];
    newBlockers.splice(index, 1);
    setBlockers(newBlockers);
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    // Check that at least one task has content
    const hasTaskContent = [...tasksCompleted, ...tasksInProgress, ...tasksPlanned]
      .some(task => task.title && task.title.trim() !== '');
      
    if (!hasTaskContent) {
      newErrors.tasks = 'Please add at least one task with a description';
    }
    
    // Check help request if needed
    if (needsHelp) {
      if (!helpRequest.topic) newErrors.helpTopic = 'Please specify a topic for your help request';
      if (!helpRequest.description) newErrors.helpDescription = 'Please provide details for your help request';
    }
    
    setErrors(newErrors);
    
    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) return;
    
    // Format and filter the data to remove empty items
    const formattedTasksCompleted = tasksCompleted
      .filter(task => task.title && task.title.trim() !== '')
      .map(task => ({
        id: task.id || `completed-${Date.now()}-${Math.random()}`,
        title: task.title || '',
        status: 'Completed'
      }));
      
    const formattedTasksInProgress = tasksInProgress
      .filter(task => task.title && task.title.trim() !== '')
      .map(task => ({
        id: task.id || `inprogress-${Date.now()}-${Math.random()}`,
        title: task.title || '',
        status: 'In Progress'
      }));
      
    const formattedTasksPlanned = tasksPlanned
      .filter(task => task.title && task.title.trim() !== '')
      .map(task => ({
        id: task.id || `planned-${Date.now()}-${Math.random()}`,
        title: task.title || '',
        status: 'Planned'
      }));
      
    const formattedBlockers = blockers.filter(blocker => blocker.trim() !== '');
      
    // Create the standup data object
    const standupData: StandupData = {
      name: teammate?.name || 'Anonymous',
      status: status,
      blockers: formattedBlockers,
      tasksCompleted: formattedTasksCompleted as Task[],
      tasksInProgress: formattedTasksInProgress as Task[],
      tasksPlanned: formattedTasksPlanned as Task[]
    };
    
    // Add help request if needed
    if (needsHelp && helpRequest.topic && helpRequest.description) {
      standupData.helpRequest = helpRequest;
    }
    
    // Submit the data
    onClose(standupData);
  };

  return (
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContainer isEntering={isEntering}>
        <ModalHeader>
          <ModalTitle>Daily Standup: {teammate?.name}</ModalTitle>
          <CloseButton onClick={handleCancel}>&times;</CloseButton>
        </ModalHeader>
        
        <Form onSubmit={handleSubmit}>
          {/* Status Section */}
          <FormSection>
            <SectionTitle>Current Status</SectionTitle>
            <FormRow>
              <Label htmlFor="status">How is your work progressing?</Label>
              <Select 
                id="status" 
                value={status} 
                onChange={(e) => setStatus(e.target.value as 'On Track' | 'Blocked' | 'At Risk')}
              >
                <option value="On Track">On Track</option>
                <option value="At Risk">At Risk</option>
                <option value="Blocked">Blocked</option>
              </Select>
            </FormRow>
          </FormSection>
          
          {/* Tasks Completed Section */}
          <FormSection>
            <SectionTitle>Tasks Completed</SectionTitle>
            <Label>What have you completed since the last standup?</Label>
            <TaskList>
              {tasksCompleted.map((task, index) => (
                <TaskItem key={task.id || index}>
                  <TaskInput 
                    value={task.title || ''} 
                    onChange={(e) => updateTaskItem(index, e.target.value, tasksCompleted, setTasksCompleted)}
                    placeholder="Enter completed task..."
                  />
                  {tasksCompleted.length > 1 && (
                    <RemoveButton 
                      type="button" 
                      onClick={() => removeTaskItem(index, tasksCompleted, setTasksCompleted)}
                    >
                      ✕
                    </RemoveButton>
                  )}
                </TaskItem>
              ))}
            </TaskList>
            <AddButton 
              type="button" 
              onClick={() => addTaskItem(tasksCompleted, setTasksCompleted, 'Completed')}
            >
              + Add another completed task
            </AddButton>
          </FormSection>
          
          {/* Tasks In Progress Section */}
          <FormSection>
            <SectionTitle>Tasks In Progress</SectionTitle>
            <Label>What are you currently working on?</Label>
            <TaskList>
              {tasksInProgress.map((task, index) => (
                <TaskItem key={task.id || index}>
                  <TaskInput 
                    value={task.title || ''} 
                    onChange={(e) => updateTaskItem(index, e.target.value, tasksInProgress, setTasksInProgress)}
                    placeholder="Enter in-progress task..."
                  />
                  {tasksInProgress.length > 1 && (
                    <RemoveButton 
                      type="button" 
                      onClick={() => removeTaskItem(index, tasksInProgress, setTasksInProgress)}
                    >
                      ✕
                    </RemoveButton>
                  )}
                </TaskItem>
              ))}
            </TaskList>
            <AddButton 
              type="button" 
              onClick={() => addTaskItem(tasksInProgress, setTasksInProgress, 'In Progress')}
            >
              + Add another in-progress task
            </AddButton>
          </FormSection>
          
          {/* Tasks Planned Section */}
          <FormSection>
            <SectionTitle>Tasks Planned</SectionTitle>
            <Label>What do you plan to work on next?</Label>
            <TaskList>
              {tasksPlanned.map((task, index) => (
                <TaskItem key={task.id || index}>
                  <TaskInput 
                    value={task.title || ''} 
                    onChange={(e) => updateTaskItem(index, e.target.value, tasksPlanned, setTasksPlanned)}
                    placeholder="Enter planned task..."
                  />
                  {tasksPlanned.length > 1 && (
                    <RemoveButton 
                      type="button" 
                      onClick={() => removeTaskItem(index, tasksPlanned, setTasksPlanned)}
                    >
                      ✕
                    </RemoveButton>
                  )}
                </TaskItem>
              ))}
            </TaskList>
            <AddButton 
              type="button" 
              onClick={() => addTaskItem(tasksPlanned, setTasksPlanned, 'Planned')}
            >
              + Add another planned task
            </AddButton>
            {errors.tasks && <ErrorText>{errors.tasks}</ErrorText>}
          </FormSection>
          
          {/* Blockers Section */}
          <FormSection>
            <SectionTitle>Blockers</SectionTitle>
            <Label>Any blockers or impediments?</Label>
            <TaskList>
              {blockers.map((blocker, index) => (
                <TaskItem key={index}>
                  <TaskInput 
                    value={blocker} 
                    onChange={(e) => updateBlocker(index, e.target.value)}
                    placeholder="Describe blocker..."
                  />
                  {blockers.length > 1 && (
                    <RemoveButton 
                      type="button" 
                      onClick={() => removeBlocker(index)}
                    >
                      ✕
                    </RemoveButton>
                  )}
                </TaskItem>
              ))}
            </TaskList>
            <AddButton type="button" onClick={addBlocker}>
              + Add another blocker
            </AddButton>
          </FormSection>
          
          {/* Help Request Section */}
          <FormSection>
            <SectionTitle>Help Request</SectionTitle>
            <HelpRequestLabel>
              <HelpRequestCheckbox 
                type="checkbox" 
                checked={needsHelp} 
                onChange={() => setNeedsHelp(!needsHelp)} 
              />
              I need help from the team
            </HelpRequestLabel>
            
            {needsHelp && (
              <HelpRequestDetails>
                <FormRow>
                  <Label htmlFor="helpTopic">Topic</Label>
                  <Input 
                    id="helpTopic" 
                    value={helpRequest.topic} 
                    onChange={(e) => setHelpRequest({...helpRequest, topic: e.target.value})}
                    placeholder="Brief topic description"
                  />
                  {errors.helpTopic && <ErrorText>{errors.helpTopic}</ErrorText>}
                </FormRow>
                
                <FormRow>
                  <Label htmlFor="helpDescription">Details</Label>
                  <Textarea 
                    id="helpDescription" 
                    value={helpRequest.description} 
                    onChange={(e) => setHelpRequest({...helpRequest, description: e.target.value})}
                    placeholder="Describe what you need help with..."
                  />
                  {errors.helpDescription && <ErrorText>{errors.helpDescription}</ErrorText>}
                </FormRow>
                
                <FormRow>
                  <Label htmlFor="helpUrgency">Urgency</Label>
                  <Select 
                    id="helpUrgency" 
                    value={helpRequest.urgency} 
                    onChange={(e) => setHelpRequest({...helpRequest, urgency: e.target.value as 'low' | 'medium' | 'high'})}
                  >
                    <option value="low">Low - When someone has time</option>
                    <option value="medium">Medium - Today would be good</option>
                    <option value="high">High - Blocking my progress</option>
                  </Select>
                </FormRow>
              </HelpRequestDetails>
            )}
          </FormSection>
          
          <ButtonGroup>
            <Button type="button" onClick={handleCancel}>Cancel</Button>
            <Button type="submit" primary>Submit Standup</Button>
          </ButtonGroup>
        </Form>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default ActualStandupModal;

