import React from 'react';
import { SectionTitle } from './StyledComponents';
import theme from './theme';
import { Task } from './models';
import styled from "styled-components";

interface BacklogSectionProps {
  tasks: Task[];
}

export const BacklogSectionStyled = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden; /* Prevent horizontal scrolling */
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.neutral200};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.neutral500};
    border-radius: 3px;
    
    &:hover {
      background-color: ${theme.colors.neutral700};
    }
  }
`;

const BacklogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};
  width: 100%;
  box-sizing: border-box;
`;

const BacklogCounter = styled.span`
  font-size: 13px;
  color: ${theme.colors.neutral700};
  background-color: ${theme.colors.neutral200};
  padding: 2px 8px;
  border-radius: 12px;
  white-space: nowrap; /* Prevent wrapping */
`;

// Define prop interfaces for styled components that use props
interface PriorityProps {
  $priority: string;
}

const BacklogTaskCard = styled.div<PriorityProps>`
  padding: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  background-color: ${theme.colors.cardBg};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  border-left: 3px solid ${(props) => 
    props.$priority === 'High' ? theme.colors.error : 
    props.$priority === 'Medium' ? theme.colors.warning : 
    theme.colors.info};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  box-sizing: border-box;
  
  &:hover {
    transform: translateX(3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const TaskTitle = styled.div`
  font-weight: 600;
  color: ${theme.colors.textColor};
  margin-bottom: 3px;
  word-break: break-word; /* Allow long titles to break properly */
  overflow-wrap: break-word;
`;

const TaskDetails = styled.div`
  font-size: 12px;
  color: ${theme.colors.neutral700};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* Allow wrapping if space is limited */
  gap: ${theme.spacing.xs};
`;

interface StatusProps {
  $status: string;
}

const TaskStatus = styled.span<StatusProps>`
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background-color: ${props => 
    props.$status === 'To Do' ? theme.colors.info + '20' : 
    props.$status === 'In Progress' ? theme.colors.warning + '20' : 
    props.$status === 'Done' ? theme.colors.success + '20' : 
    theme.colors.neutral200};
  color: ${props => 
    props.$status === 'To Do' ? theme.colors.info : 
    props.$status === 'In Progress' ? theme.colors.warning : 
    props.$status === 'Done' ? theme.colors.success : 
    theme.colors.neutral700};
`;

const TaskPriority = styled.span`
  font-size: 11px;
  color: ${theme.colors.neutral700};
`;

const EmptyBacklog = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  color: ${theme.colors.neutral500};
  font-style: italic;
  border: 1px dashed ${theme.colors.neutral300};
  border-radius: ${theme.borderRadius};
  margin-top: ${theme.spacing.md};
  box-sizing: border-box;
  width: 100%;
`;

const BacklogSection: React.FC<BacklogSectionProps> = ({ tasks }) => {
  return (
    <BacklogSectionStyled>
      <BacklogHeader>
        <SectionTitle>Backlog</SectionTitle>
        <BacklogCounter>{tasks.length} tasks</BacklogCounter>
      </BacklogHeader>

      {tasks.length > 0 ? (
        tasks.map(task => (
          <BacklogTaskCard key={task.id} $priority={task.priority}>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskDetails>
              <TaskStatus $status={task.status}>{task.status}</TaskStatus>
              <TaskPriority>{task.priority} Priority</TaskPriority>
            </TaskDetails>
          </BacklogTaskCard>
        ))
      ) : (
        <EmptyBacklog>No backlog items available</EmptyBacklog>
      )}
    </BacklogSectionStyled>
  );
};

export default BacklogSection;

