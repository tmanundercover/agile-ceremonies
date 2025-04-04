import React, { useState } from 'react';
import { SwimlaneStyled, SwimlaneSectionStyled, TaskListStyled, TaskItemStyled, DropdownStyled, VerticalLineStyled, ToggleSwitchStyled, RadioButtonLabelStyled } from './StyledComponents';

interface SwimlanesProps {
  tasksCompleted: string[];
  setTasksCompleted: (value: string[]) => void;
  tasksInProgress: string[];
  setTasksInProgress: (value: string[]) => void;
  tasksPlanned: string[];
  setTasksPlanned: (value: string[]) => void;
}

const Swimlanes: React.FC<SwimlanesProps> = ({ tasksCompleted, setTasksCompleted, tasksInProgress, setTasksInProgress, tasksPlanned, setTasksPlanned }) => {
  const [newTask, setNewTask] = useState<string>('');
  const [isTaskSelected, setIsTaskSelected] = useState<boolean>(true);

  const handleAddTask = (setTasks: (value: string[]) => void, tasks: string[]) => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  return (
    <SwimlaneSectionStyled>
      <SwimlaneStyled>
        <h3>Completed</h3>
        <ToggleSwitchStyled>
          <RadioButtonLabelStyled>
            <label>
              <input type="radio" checked={isTaskSelected} onChange={() => setIsTaskSelected(true)} />
              Tasks
            </label>
          </RadioButtonLabelStyled>
          <RadioButtonLabelStyled>
            <label>
              <input type="radio" checked={!isTaskSelected} onChange={() => setIsTaskSelected(false)} />
              Requirements
            </label>
          </RadioButtonLabelStyled>
        </ToggleSwitchStyled>
        <TaskListStyled>
          {tasksCompleted.map((task, index) => (
            <TaskItemStyled key={index}>{task}</TaskItemStyled>
          ))}
        </TaskListStyled>
        <DropdownStyled onChange={(e) => handleAddTask(setTasksCompleted, [...tasksCompleted, e.target.value])}>
          <option value="">Select {isTaskSelected ? 'Task' : 'Requirement'}</option>
          {/* Add task or requirement options here */}
        </DropdownStyled>
      </SwimlaneStyled>
      <VerticalLineStyled />
      <SwimlaneStyled>
        <h3>In Progress</h3>
        <ToggleSwitchStyled>
          <RadioButtonLabelStyled>
            <label>
              <input type="radio" checked={isTaskSelected} onChange={() => setIsTaskSelected(true)} />
              Tasks
            </label>
          </RadioButtonLabelStyled>
          <RadioButtonLabelStyled>
            <label>
              <input type="radio" checked={!isTaskSelected} onChange={() => setIsTaskSelected(false)} />
              Requirements
            </label>
          </RadioButtonLabelStyled>
        </ToggleSwitchStyled>
        <TaskListStyled>
          {tasksInProgress.map((task, index) => (
            <TaskItemStyled key={index}>{task}</TaskItemStyled>
          ))}
        </TaskListStyled>
        <DropdownStyled onChange={(e) => handleAddTask(setTasksInProgress, [...tasksInProgress, e.target.value])}>
          <option value="">Select {isTaskSelected ? 'Task' : 'Requirement'}</option>
          {/* Add task or requirement options here */}
        </DropdownStyled>
      </SwimlaneStyled>
      <VerticalLineStyled />
      <SwimlaneStyled>
        <h3>Planned</h3>
        <ToggleSwitchStyled>
          <RadioButtonLabelStyled>
            <label>
              <input type="radio" checked={isTaskSelected} onChange={() => setIsTaskSelected(true)} />
              Tasks
            </label>
          </RadioButtonLabelStyled>
          <RadioButtonLabelStyled>
            <label>
              <input type="radio" checked={!isTaskSelected} onChange={() => setIsTaskSelected(false)} />
              Requirements
            </label>
          </RadioButtonLabelStyled>
        </ToggleSwitchStyled>
        <TaskListStyled>
          {tasksPlanned.map((task, index) => (
            <TaskItemStyled key={index}>{task}</TaskItemStyled>
          ))}
        </TaskListStyled>
        <DropdownStyled onChange={(e) => handleAddTask(setTasksPlanned, [...tasksPlanned, e.target.value])}>
          <option value="">Select {isTaskSelected ? 'Task' : 'Requirement'}</option>
          {/* Add task or requirement options here */}
        </DropdownStyled>
      </SwimlaneStyled>
    </SwimlaneSectionStyled>
  );
};

export default Swimlanes;

