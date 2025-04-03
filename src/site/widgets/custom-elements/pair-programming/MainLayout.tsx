import React from "react";
import DeveloperCarousel from "./DeveloperCarousel";
import { tasks } from "./mockData";
import { LayoutContainer, Sidebar, Content, BacklogContainer } from "./styles";

// Added a simple placeholder for InteractiveTaskItem.
const InteractiveTaskItem: React.FC<{ title: string; detail?: string }> = ({ title, detail }) => (
  <div title={detail}>{title}</div>
);

const MainLayout: React.FC = () => {
    // ...existing state and handlers...
    return (
        <LayoutContainer>
            <Sidebar>
                {/* Developer Carousel moved to its own component */}
                <DeveloperCarousel />
                {/* Bottom part: List of tasks with updated styling */}
                <div>
                    <h3>Tasks</h3>
                    <BacklogContainer>
                        {tasks.map((task, idx) => (
                            <InteractiveTaskItem key={idx} title={task} detail={`Detail for ${task}`} />
                        ))}
                    </BacklogContainer>
                </div>
            </Sidebar>
            <Content>
                {/* ...existing content... */}
            </Content>
        </LayoutContainer>
    );
};

export default MainLayout;
