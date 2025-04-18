import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProjectMilestoneData } from '../data/ProjectMilestoneData';

// Types
interface TeamMemberType {
  id: string;
  name: string;
  avatar?: string;
}

interface AssignmentType {
  itemId: string;
  itemType: 'phase' | 'task' | 'todo';
  memberId: string;
}

interface TaskItem {
  title: string;
  description?: string;
  services?: string[];
  todos?: TodoItem[];
}

interface TodoItem {
  title: string;
  status?: string;
  services?: string[];
}

interface PhaseData {
  phase_id: number;
  title: string;
  timelineEst: string;
  description?: string;
  goals?: string[];
  tasks?: TaskItem[];
  agentImplementation?: any;
  agentLinks?: any[];
  additionalInfo?: any;
}

// Props
interface MilestoneTrackerProps {
  teamMembers?: TeamMemberType[];
}

interface PhaseProps {
  phase: PhaseData;
  isExpanded: boolean;
  onToggle: () => void;
  onTaskCheck: (taskIndex: number, isChecked: boolean) => void;
  onTodoCheck: (taskIndex: number, todoIndex: number, isChecked: boolean) => void;
  completedTasks: Record<string, boolean>;
  completedTodos: Record<string, boolean>;
  assignments: AssignmentType[];
  onAssign: (assignment: AssignmentType) => void;
  teamMembers: TeamMemberType[];
}

interface TaskProps {
  task: TaskItem;
  taskIndex: number;
  isCompleted: boolean;
  onCheck: (isChecked: boolean) => void;
  onTodoCheck: (todoIndex: number, isChecked: boolean) => void;
  completedTodos: Record<string, boolean>;
  assignments: AssignmentType[];
  onAssign: (assignment: AssignmentType) => void;
  teamMembers: TeamMemberType[];
}

interface TodoItemProps {
  todo: TodoItem;
  todoId: string;
  isCompleted: boolean;
  onCheck: (isChecked: boolean) => void;
  assignments: AssignmentType[];
  onAssign: (assignment: AssignmentType) => void;
  teamMembers: TeamMemberType[];
}

// Styled Components
const TrackerContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
`;

const MilestoneHeaderStyled = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const MilestoneTitleStyled = styled.h1`
  color: #333;
  margin-bottom: 0.5rem;
`;

const MilestoneDescriptionStyled = styled.p`
  color: #666;
  max-width: 800px;
  margin: 0 auto;
`;

const TimelineContainerStyled = styled.div`
  position: relative;
  padding: 1rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(120px + 1rem);
    width: 4px;
    background: #e0e0e0;
    z-index: 0;
  }
`;

const PhaseContainerStyled = styled.div<{ isActive?: boolean }>`
  position: relative;
  margin-bottom: 1.5rem;
  background: ${props => props.isActive ? '#f8f9fa' : 'white'};
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const PhaseHeaderStyled = styled.div`
  display: flex;
  padding: 1rem;
  cursor: pointer;
  align-items: center;
  border-bottom: 1px solid #eee;
`;

const PhaseTimelineStyled = styled.div`
  width: 120px;
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
  flex-shrink: 0;
`;

const PhaseMarkerStyled = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #5AB5F7;
  margin: 0 1rem;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
`;

const PhaseTitleStyled = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  flex-grow: 1;
`;

const ExpandIconStyled = styled.span<{ isExpanded: boolean }>`
  transform: ${props => props.isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.3s ease;
  margin-left: 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const PhaseContentStyled = styled.div<{ isExpanded: boolean }>`
  max-height: ${props => props.isExpanded ? '5000px' : '0'};
  overflow: hidden;
  transition: max-height 0.5s ease;
  padding: ${props => props.isExpanded ? '1rem' : '0 1rem'};
`;

const PhaseDescriptionStyled = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const PhaseGoalsStyled = styled.div`
  margin-bottom: 1.5rem;
`;

const GoalTitleStyled = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #444;
`;

const GoalListStyled = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
`;

const GoalItemStyled = styled.li`
  margin-bottom: 0.25rem;
  color: #555;
`;

const TasksContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TaskItemStyled = styled.div`
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  border-left: 3px solid #7FCF87;
`;

const TaskHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CheckboxStyled = styled.input`
  margin-right: 0.75rem;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const TaskTitleStyled = styled.h4<{ isCompleted: boolean }>`
  margin: 0;
  font-size: 1rem;
  color: #333;
  text-decoration: ${props => props.isCompleted ? 'line-through' : 'none'};
  color: ${props => props.isCompleted ? '#999' : '#333'};
  flex-grow: 1;
`;

const AssignButtonStyled = styled.button`
  background: #f1f1f1;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  margin-left: 0.5rem;
  
  &:hover {
    background: #e1e1e1;
  }
`;

const TaskDescriptionStyled = styled.p`
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
`;

const ServiceTagsStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0;
`;

const ServiceTagStyled = styled.span`
  background: #f1f3f5;
  color: #495057;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const TodosContainerStyled = styled.div`
  margin-top: 0.75rem;
  padding-left: 2rem;
`;

const TodoItemStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #eee;
`;

const TodoTitleStyled = styled.span<{ isCompleted: boolean }>`
  text-decoration: ${props => props.isCompleted ? 'line-through' : 'none'};
  color: ${props => props.isCompleted ? '#999' : '#333'};
  flex-grow: 1;
  font-size: 0.9rem;
`;

const AssigneeStyled = styled.div`
  display: flex;
  align-items: center;
  background: #e9ecef;
  border-radius: 20px;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const AssigneeAvatarStyled = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #adb5bd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.7rem;
  margin-right: 0.25rem;
`;

const AssignmentModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContentStyled = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 300px;
  max-width: 90%;
`;

const ModalTitleStyled = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
`;

const TeamMemberListStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MemberItemStyled = styled.div`
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    background: #f1f1f1;
  }
`;

// Component implementations
const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  todoId,
  isCompleted, 
  onCheck, 
  assignments, 
  onAssign, 
  teamMembers 
}) => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  
  const assignee = assignments.find(a => a.itemId === todoId && a.itemType === 'todo');
  const assignedMember = assignee ? teamMembers.find(m => m.id === assignee.memberId) : null;
  
  return (
    <TodoItemStyled>
      <CheckboxStyled 
        type="checkbox" 
        checked={isCompleted} 
        onChange={(e) => onCheck(e.target.checked)} 
      />
      <TodoTitleStyled isCompleted={isCompleted}>{todo.title}</TodoTitleStyled>
      
      {assignedMember && (
        <AssigneeStyled>
          <AssigneeAvatarStyled>{assignedMember.name.charAt(0)}</AssigneeAvatarStyled>
          {assignedMember.name}
        </AssigneeStyled>
      )}
      
      <AssignButtonStyled onClick={() => setShowAssignModal(true)}>
        {assignedMember ? 'Reassign' : 'Assign'}
      </AssignButtonStyled>
      
      {showAssignModal && (
        <AssignmentModalStyled onClick={() => setShowAssignModal(false)}>
          <ModalContentStyled onClick={(e) => e.stopPropagation()}>
            <ModalTitleStyled>Assign Todo</ModalTitleStyled>
            <TeamMemberListStyled>
              {teamMembers.map((member) => (
                <MemberItemStyled 
                  key={member.id}
                  onClick={() => {
                    onAssign({
                      itemId: todoId,
                      itemType: 'todo',
                      memberId: member.id
                    });
                    setShowAssignModal(false);
                  }}
                >
                  <AssigneeAvatarStyled>{member.name.charAt(0)}</AssigneeAvatarStyled>
                  {member.name}
                </MemberItemStyled>
              ))}
            </TeamMemberListStyled>
          </ModalContentStyled>
        </AssignmentModalStyled>
      )}
    </TodoItemStyled>
  );
};

const Task: React.FC<TaskProps> = ({ 
  task, 
  taskIndex, 
  isCompleted, 
  onCheck, 
  onTodoCheck, 
  completedTodos, 
  assignments, 
  onAssign, 
  teamMembers 
}) => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const taskId = `task-${taskIndex}`;
  
  const assignee = assignments.find(a => a.itemId === taskId && a.itemType === 'task');
  const assignedMember = assignee ? teamMembers.find(m => m.id === assignee.memberId) : null;
  
  return (
    <TaskItemStyled>
      <TaskHeaderStyled>
        <CheckboxStyled 
          type="checkbox" 
          checked={isCompleted} 
          onChange={(e) => onCheck(e.target.checked)} 
        />
        <TaskTitleStyled isCompleted={isCompleted}>{task.title}</TaskTitleStyled>
        
        {assignedMember && (
          <AssigneeStyled>
            <AssigneeAvatarStyled>{assignedMember.name.charAt(0)}</AssigneeAvatarStyled>
            {assignedMember.name}
          </AssigneeStyled>
        )}
        
        <AssignButtonStyled onClick={() => setShowAssignModal(true)}>
          {assignedMember ? 'Reassign' : 'Assign'}
        </AssignButtonStyled>
      </TaskHeaderStyled>
      
      {task.description && <TaskDescriptionStyled>{task.description}</TaskDescriptionStyled>}
      
      {task.services && task.services.length > 0 && (
        <ServiceTagsStyled>
          {task.services.map((service: string, index: number) => (
            <ServiceTagStyled key={index}>{service}</ServiceTagStyled>
          ))}
        </ServiceTagsStyled>
      )}
      
      {task.todos && task.todos.length > 0 && (
        <TodosContainerStyled>
          {task.todos.map((todo: TodoItem, todoIndex: number) => {
            const todoId = `task-${taskIndex}-todo-${todoIndex}`;
            return (
              <TodoItem 
                key={todoIndex}
                todo={todo}
                todoId={todoId}
                isCompleted={completedTodos[todoId] || false}
                onCheck={(isChecked) => onTodoCheck(todoIndex, isChecked)}
                assignments={assignments}
                onAssign={onAssign}
                teamMembers={teamMembers}
              />
            );
          })}
        </TodosContainerStyled>
      )}
      
      {showAssignModal && (
        <AssignmentModalStyled onClick={() => setShowAssignModal(false)}>
          <ModalContentStyled onClick={(e) => e.stopPropagation()}>
            <ModalTitleStyled>Assign Task</ModalTitleStyled>
            <TeamMemberListStyled>
              {teamMembers.map((member) => (
                <MemberItemStyled 
                  key={member.id}
                  onClick={() => {
                    onAssign({
                      itemId: taskId,
                      itemType: 'task',
                      memberId: member.id
                    });
                    setShowAssignModal(false);
                  }}
                >
                  <AssigneeAvatarStyled>{member.name.charAt(0)}</AssigneeAvatarStyled>
                  {member.name}
                </MemberItemStyled>
              ))}
            </TeamMemberListStyled>
          </ModalContentStyled>
        </AssignmentModalStyled>
      )}
    </TaskItemStyled>
  );
};

const Phase: React.FC<PhaseProps> = ({ 
  phase, 
  isExpanded, 
  onToggle, 
  onTaskCheck, 
  onTodoCheck, 
  completedTasks, 
  completedTodos, 
  assignments, 
  onAssign, 
  teamMembers 
}) => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const phaseId = `phase-${phase.phase_id}`;
  
  const assignee = assignments.find(a => a.itemId === phaseId && a.itemType === 'phase');
  const assignedMember = assignee ? teamMembers.find(m => m.id === assignee.memberId) : null;
  
  return (
    <PhaseContainerStyled isActive={isExpanded}>
      <PhaseHeaderStyled onClick={onToggle}>
        <PhaseTimelineStyled>{phase.timelineEst}</PhaseTimelineStyled>
        <PhaseMarkerStyled />
        <PhaseTitleStyled>{phase.title}</PhaseTitleStyled>
        
        {assignedMember && (
          <AssigneeStyled>
            <AssigneeAvatarStyled>{assignedMember.name.charAt(0)}</AssigneeAvatarStyled>
            {assignedMember.name}
          </AssigneeStyled>
        )}
        
        <AssignButtonStyled onClick={(e) => {
          e.stopPropagation();
          setShowAssignModal(true);
        }}>
          {assignedMember ? 'Reassign' : 'Assign'}
        </AssignButtonStyled>
        
        <ExpandIconStyled isExpanded={isExpanded}>▼</ExpandIconStyled>
      </PhaseHeaderStyled>
      
      <PhaseContentStyled isExpanded={isExpanded}>
        {phase.description && (
          <PhaseDescriptionStyled>{phase.description}</PhaseDescriptionStyled>
        )}
        
        {phase.goals && phase.goals.length > 0 && (
          <PhaseGoalsStyled>
            <GoalTitleStyled>Goals:</GoalTitleStyled>
            <GoalListStyled>
              {phase.goals.map((goal, index) => (
                <GoalItemStyled key={index}>{goal}</GoalItemStyled>
              ))}
            </GoalListStyled>
          </PhaseGoalsStyled>
        )}
        
        {phase.tasks && phase.tasks.length > 0 && (
          <TasksContainerStyled>
            {phase.tasks.map((task, taskIndex) => {
              const taskId = `task-${phase.phase_id}-${taskIndex}`;
              return (
                <Task 
                  key={taskIndex}
                  task={task}
                  taskIndex={taskIndex}
                  isCompleted={completedTasks[taskId] || false}
                  onCheck={(isChecked) => onTaskCheck(taskIndex, isChecked)}
                  onTodoCheck={(todoIndex, isChecked) =>
                    onTodoCheck(taskIndex, todoIndex, isChecked)
                  }
                  completedTodos={completedTodos}
                  assignments={assignments}
                  onAssign={onAssign}
                  teamMembers={teamMembers}
                />
              );
            })}
          </TasksContainerStyled>
        )}
      </PhaseContentStyled>
      
      {showAssignModal && (
        <AssignmentModalStyled onClick={() => setShowAssignModal(false)}>
          <ModalContentStyled onClick={(e) => e.stopPropagation()}>
            <ModalTitleStyled>Assign Phase</ModalTitleStyled>
            <TeamMemberListStyled>
              {teamMembers.map((member) => (
                <MemberItemStyled 
                  key={member.id}
                  onClick={() => {
                    onAssign({
                      itemId: phaseId,
                      itemType: 'phase',
                      memberId: member.id
                    });
                    setShowAssignModal(false);
                  }}
                >
                  <AssigneeAvatarStyled>{member.name.charAt(0)}</AssigneeAvatarStyled>
                  {member.name}
                </MemberItemStyled>
              ))}
            </TeamMemberListStyled>
          </ModalContentStyled>
        </AssignmentModalStyled>
      )}
    </PhaseContainerStyled>
  );
};

// Main component
const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ teamMembers = [] }) => {
  // If no teamMembers provided, use default team members
  const defaultTeamMembers: TeamMemberType[] = [
    { id: 'brian', name: 'Brian' },
    { id: 'james', name: 'James' },
    { id: 'terrell', name: 'Terrell' }
  ];
  
  const actualTeamMembers = teamMembers.length > 0 ? teamMembers : defaultTeamMembers;
  
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({0: true});
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [completedTodos, setCompletedTodos] = useState<Record<string, boolean>>({});
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  
  const togglePhase = (phaseId: number) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };
  
  const handleTaskCheck = (phaseIndex: number, taskIndex: number, isChecked: boolean) => {
    const taskId = `task-${phaseIndex}-${taskIndex}`;
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: isChecked
    }));
    
    // If a task is marked as completed, mark all its todos as completed
    const phases:PhaseData[] = ProjectMilestoneData.phases;
    if (phases && phases.length > phaseIndex && phases[phaseIndex]) {
      const phase = phases[phaseIndex];
      const tasks = phase.tasks;

      if (tasks && tasks.length > taskIndex) {
        const task = tasks[taskIndex];
        const todos = task.todos;

        if (todos && Array.isArray(todos)) {
          const newCompletedTodos = {...completedTodos};

          todos.forEach((_, todoIndex) => {
            const todoId = `task-${phaseIndex}-${taskIndex}-todo-${todoIndex}`;
            newCompletedTodos[todoId] = isChecked;
          });

          setCompletedTodos(newCompletedTodos);
        }
      }
    }
  };
  
  const handleTodoCheck = (phaseIndex: number, taskIndex: number, todoIndex: number, isChecked: boolean) => {
    const todoId = `task-${phaseIndex}-${taskIndex}-todo-${todoIndex}`;
    setCompletedTodos(prev => ({
      ...prev,
      [todoId]: isChecked
    }));
    
    // Check if all todos in this task are completed
    const phases:PhaseData[] = ProjectMilestoneData.phases;
    if (phases && phases.length > phaseIndex && phases[phaseIndex]) {
      const phase = phases[phaseIndex];
      const tasks = phase.tasks;

      if (tasks && tasks.length > taskIndex) {
        const task = tasks[taskIndex];
        const todos = task.todos;

        if (todos && Array.isArray(todos)) {
          const taskId = `task-${phaseIndex}-${taskIndex}`;

          const allTodosCompleted = todos.every((_, idx) => {
            const id = `task-${phaseIndex}-${taskIndex}-todo-${idx}`;
            return idx === todoIndex ? isChecked : completedTodos[id];
          });

          setCompletedTasks(prev => ({
            ...prev,
            [taskId]: allTodosCompleted
          }));
        }
      }
    }
  };
  
  const handleAssign = (assignment: AssignmentType) => {
    // Remove any existing assignment for this item
    const filteredAssignments = assignments.filter(
      a => !(a.itemId === assignment.itemId && a.itemType === assignment.itemType)
    );
    
    // Add the new assignment
    setAssignments([...filteredAssignments, assignment]);
  };
  
  return (
    <TrackerContainerStyled>
      <MilestoneHeaderStyled>
        <MilestoneTitleStyled>{ProjectMilestoneData.milestone}</MilestoneTitleStyled>
        <MilestoneDescriptionStyled>{ProjectMilestoneData.description}</MilestoneDescriptionStyled>
      </MilestoneHeaderStyled>
      
      <TimelineContainerStyled>
        {ProjectMilestoneData.phases.map((phase, index) => (
          <Phase 
            key={phase.phase_id}
            phase={phase}
            isExpanded={expandedPhases[phase.phase_id] || false}
            onToggle={() => togglePhase(phase.phase_id)}
            onTaskCheck={(taskIndex, isChecked) => 
              handleTaskCheck(index, taskIndex, isChecked)
            }
            onTodoCheck={(taskIndex, todoIndex, isChecked) => 
              handleTodoCheck(index, taskIndex, todoIndex, isChecked)
            }
            completedTasks={completedTasks}
            completedTodos={completedTodos}
            assignments={assignments}
            onAssign={handleAssign}
            teamMembers={actualTeamMembers}
          />
        ))}
      </TimelineContainerStyled>
    </TrackerContainerStyled>
  );
};

export default MilestoneTracker;

