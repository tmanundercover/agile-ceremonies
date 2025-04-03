import React, { useState } from 'react';
import { LayoutContainer, Sidebar, Content, BacklogContainer } from "./styles";
import DeveloperCarousel from "./DeveloperCarousel";
import InteractiveTaskItem from "./InteractiveTaskItem";
import { tasks } from "./mockData";

const MainLayout: React.FC = () => {
    // Added state and handler for task selection
    const [selectedTask, setSelectedTask] = useState<string>("");
    const handleTaskClick = (task: string) => {
        setSelectedTask(task);
    };

    return (
        <LayoutContainer>
            <Sidebar>
                {/* Added DeveloperCarousel above tasks list */}
                <DeveloperCarousel />
                {/* Bottom part: List of tasks with updated styling */}
                <div>
                    <h3>Tasks</h3>
                    <BacklogContainer>
                        {tasks.map((task, idx) => (
                            <div key={idx} onClick={() => handleTaskClick(task)}>
                                <InteractiveTaskItem title={task} detail={`Detail for ${task}`} />
                            </div>
                        ))}
                    </BacklogContainer>
                </div>
            </Sidebar>
            <Content>
                {/* Display for selected task */}
                <div>
                  <h2>Selected Task</h2>
                  <p>{selectedTask}</p>
                </div>
            </Content>
        </LayoutContainer>
    );
};

export default MainLayout;
