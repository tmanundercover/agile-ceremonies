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
      <Swimlane
        title="Completed"
        tasks={tasksCompleted}
        setTasks={setTasksCompleted}
        isTaskSelected={isTaskSelected}
        setIsTaskSelected={setIsTaskSelected}
        handleAddTask={handleAddTask}
      />
      <VerticalLineStyled />
      <Swimlane
        title="In Progress"
        tasks={tasksInProgress}
        setTasks={setTasksInProgress}
        isTaskSelected={isTaskSelected}
        setIsTaskSelected={setIsTaskSelected}
        handleAddTask={handleAddTask}
      />
      <VerticalLineStyled />
      <Swimlane
        title="Planned"
        tasks={tasksPlanned}
        setTasks={setTasksPlanned}
        isTaskSelected={isTaskSelected}
        setIsTaskSelected={setIsTaskSelected}
        handleAddTask={handleAddTask}
      />
    </SwimlaneSectionStyled>
  );
};

interface SwimlaneProps {
  title: string;
  tasks: string[];
  setTasks: (value: string[]) => void;
  isTaskSelected: boolean;
  setIsTaskSelected: (value: boolean) => void;
  handleAddTask: (setTasks: (value: string[]) => void, tasks: string[]) => void;
}

const Swimlane: React.FC<SwimlaneProps> = ({ title, tasks, setTasks, isTaskSelected, setIsTaskSelected, handleAddTask }) => (
  <SwimlaneStyled>
    <h3>{title}</h3>
    <ToggleSwitch isTaskSelected={isTaskSelected} setIsTaskSelected={setIsTaskSelected} />
    <TaskListStyled>
      {tasks.map((task, index) => (
        <TaskItemStyled key={index}>{task}</TaskItemStyled>
      ))}
    </TaskListStyled>
    <DropdownStyled onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleAddTask(setTasks, [...tasks, e.target.value])}>
      <option value="">Select {isTaskSelected ? 'Task' : 'Requirement'}</option>
      {/* Add task or requirement options here */}
    </DropdownStyled>
  </SwimlaneStyled>
);

interface ToggleSwitchProps {
  isTaskSelected: boolean;
  setIsTaskSelected: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isTaskSelected, setIsTaskSelected }) => (
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
);

export default Swimlanes;
