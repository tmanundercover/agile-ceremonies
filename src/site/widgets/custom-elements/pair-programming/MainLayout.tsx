// ...existing imports...
import DeveloperCarousel from "./DeveloperCarousel";
import InteractiveTaskItem from "./InteractiveTaskItem";
import { LayoutContainer, Sidebar, Content, BacklogContainer } from "./styles";
import { tasks } from "./mockData";
// ...existing imports...

const MainLayout: React.FC = () => {
    // ...existing state and handler for task selection...
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

