import React, { useState } from 'react';
import { SwimlaneStyled, SwimlaneSectionStyled, TaskListStyled, TaskItemStyled, DropdownStyled, VerticalLineStyled, ToggleSwitchStyled, RadioButtonLabelStyled, SwimlaneTitleStyled } from './StyledComponents';

interface SwimlanesProps {
  tasksCompleted: string[];
  setTasksCompleted: (value: string[]) => void;
  tasksInProgress: string[];
  setTasksInProgress: (value: string[]) => void;
  tasksPlanned: string[];
  setTasksPlanned: (value: string[]) => void;
}

const Swimlanes: React.FC<SwimlanesProps> = ({ tasksCompleted, setTasksCompleted, tasksInProgress, setTasksInProgress, tasksPlanned, setTasksPlanned }) => {
  const [newTaskCompleted, setNewTaskCompleted] = useState<string>('');
  const [newTaskInProgress, setNewTaskInProgress] = useState<string>('');
  const [newTaskPlanned, setNewTaskPlanned] = useState<string>('');
  const [isTaskSelected, setIsTaskSelected] = useState<boolean>(true);

  const handleAddTask = (setTasks: (value: string[]) => void, tasks: string[], newTask: string, setNewTask: (value: string) => void) => {
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
        newTask={newTaskCompleted}
        setNewTask={setNewTaskCompleted}
        isTaskSelected={isTaskSelected}
        setIsTaskSelected={setIsTaskSelected}
        handleAddTask={handleAddTask}
      />
      <VerticalLineStyled />
      <Swimlane
        title="In Progress"
        tasks={tasksInProgress}
        setTasks={setTasksInProgress}
        newTask={newTaskInProgress}
        setNewTask={setNewTaskInProgress}
        isTaskSelected={isTaskSelected}
        setIsTaskSelected={setIsTaskSelected}
        handleAddTask={handleAddTask}
      />
      <VerticalLineStyled />
      <Swimlane
        title="Planned"
        tasks={tasksPlanned}
        setTasks={setTasksPlanned}
        newTask={newTaskPlanned}
        setNewTask={setNewTaskPlanned}
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
  newTask: string;
  setNewTask: (value: string) => void;
  isTaskSelected: boolean;
  setIsTaskSelected: (value: boolean) => void;
  handleAddTask: (setTasks: (value: string[]) => void, tasks: string[], newTask: string, setNewTask: (value: string) => void) => void;
}

const Swimlane: React.FC<SwimlaneProps> = ({ title, tasks, setTasks, newTask, setNewTask, isTaskSelected, setIsTaskSelected, handleAddTask }) => (
  <SwimlaneStyled>
    <SwimlaneTitleStyled>{title}</SwimlaneTitleStyled>
    <ToggleSwitch isTaskSelected={isTaskSelected} setIsTaskSelected={setIsTaskSelected} />
    <TaskListStyled>
      {tasks.map((task, index) => (
        <TaskItemStyled key={index}>{task}</TaskItemStyled>
      ))}
    </TaskListStyled>
    <DropdownStyled onChange={(e) => handleAddTask(setTasks, tasks, e.target.value, setNewTask)}>
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
