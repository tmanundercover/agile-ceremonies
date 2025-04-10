import React, { useState } from 'react';
import Slider from 'react-slick';
import { SwimlaneStyled, SwimlaneSectionStyled, TaskListStyled, TaskItemStyled, DropdownStyled, ToggleSwitchStyled, RadioButtonLabelStyled, AddTaskButtonStyled } from './StyledComponents';
import { Task } from './models';
import {CalendarIcon} from "@radix-ui/react-icons";

interface SwimlanesProps {
  tasksCompleted: Task[];
  setTasksCompleted: (value: Task[]) => void;
  tasksInProgress: Task[];
  setTasksInProgress: (value: Task[]) => void;
  tasksPlanned: Task[];
  setTasksPlanned: (value: Task[]) => void;
}

const Swimlanes: React.FC<SwimlanesProps> = ({ tasksCompleted, setTasksCompleted, tasksInProgress, setTasksInProgress, tasksPlanned, setTasksPlanned }) => {
  const [newTask, setNewTask] = useState<string>('');

  const handleAddTask = (setTasks: (value: Task[]) => void, tasks: Task[]) => {
    if (newTask.trim()) {
      const newTaskObj: Task = {
          assignedTeammates: [],
          comments: [],
          dependencies: [],
          description: '',
          icon: CalendarIcon,
          id: `${Date.now()}`,
          priority: "Low",
          requirementId: '',
          status: 'To Do',
          title: newTask,
          type: 'feature'
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <SwimlaneSectionStyled>
      <Slider {...settings}>
        <Swimlane
          title="Completed"
          tasks={tasksCompleted}
          setTasks={setTasksCompleted}
          handleAddTask={handleAddTask}
        />
        <Swimlane
          title="In Progress"
          tasks={tasksInProgress}
          setTasks={setTasksInProgress}
          handleAddTask={handleAddTask}
        />
        <Swimlane
          title="Planned"
          tasks={tasksPlanned}
          setTasks={setTasksPlanned}
          handleAddTask={handleAddTask}
        />
      </Slider>
    </SwimlaneSectionStyled>
  );
};

interface SwimlaneProps {
  title: string;
  tasks: Task[];
  setTasks: (value: Task[]) => void;
  handleAddTask: (setTasks: (value: Task[]) => void, tasks: Task[]) => void;
}

const Swimlane: React.FC<SwimlaneProps> = ({ title, tasks, setTasks, handleAddTask }) => {
  const [isTaskSelected, setIsTaskSelected] = useState<boolean>(true);

  return (
    <div>
      <SwimlaneStyled>
        <h3>{title}</h3>
        <ToggleSwitch isTaskSelected={isTaskSelected} setIsTaskSelected={setIsTaskSelected} />
        <TaskListStyled>
          {tasks.map((task, index) => (
            <TaskItemStyled key={index}>{task.title}</TaskItemStyled>
          ))}
        </TaskListStyled>
        <DropdownStyled onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleAddTask(setTasks, [...tasks, { ...tasks[tasks.length - 1], title: e.target.value }])}>
          <option value="">Select {isTaskSelected ? 'Task' : 'Requirement'}</option>
          {/* Add task or requirement options here */}
        </DropdownStyled>
        <AddTaskButtonStyled onClick={() => handleAddTask(setTasks, tasks)}>Add Task</AddTaskButtonStyled>
      </SwimlaneStyled>
    </div>
  );
};

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
