import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";


// Theme configuration
const theme = {
    primary: "#00ff41", // Matrix-like green
    secondary: "#0ff", // Cyan
    background: "#1a1a1a",
    surface: "#2d2d2d",
    text: "#00ff41",
    textDim: "#00802b",
    border: "#00ff41",
    hover: "#003300",
};

// Base styled components
const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: ${theme.background};
  color: ${theme.text};
  font-family: "VT323", "Courier New", monospace;
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      ${theme.background} 0px,
      ${theme.background} 1px,
      transparent 2px,
      transparent 4px
    );
    opacity: 0.1;
    pointer-events: none;
  }
`;

const Sidebar = styled(motion.div)<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? "300px" : "0px")};
  background: ${theme.surface};
  border-right: 1px solid ${theme.border};
  padding: ${(props) => (props.isOpen ? "20px" : "0px")};
  transition: all 0.3s ease;
  overflow-y: auto;
  height: 100vh;
  position: relative;
  box-shadow: inset -2px 0 10px rgba(0, 255, 65, 0.1);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.primary};
    border-radius: 4px;
  }
`;

const Office = styled.div`
  flex: 1;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.primary};
    border-radius: 4px;
  }
`;

const DeskComponent = styled(motion.div)`
  background: ${theme.surface};
  border-radius: 12px;
  padding: 25px;
  position: relative;
  min-height: 220px;
  border: 1px solid ${theme.border};
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.1);

  &:hover {
    box-shadow: 0 0 30px rgba(0, 255, 65, 0.2);
  }

  &.can-drop {
    border: 2px dashed ${theme.secondary};
    background: ${theme.hover};
  }
`;

// Update the styled component
const DeveloperSeat = styled.div<{ $isoccupied: boolean; $isover?: boolean }>`
  background: ${(props) => (props.$isover ? theme.hover : theme.surface)};
  padding: 15px;
  border-radius: 8px;
  margin: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid
    ${(props) => (props.$isover ? theme.secondary : theme.border)};
  box-shadow: ${(props) =>
    props.$isoccupied ? "0 0 15px rgba(0, 255, 65, 0.2)" : "none"};

  &:hover {
    transform: ${(props) => (props.$isoccupied ? "scale(1.02)" : "none")};
    border-color: ${theme.secondary};
  }
`;

const StyledButton = styled(motion.button)`
  padding: 8px 16px;
  background: ${theme.primary};
  color: ${theme.background};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: "VT323", monospace;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SearchInput = styled.input`
  background: ${theme.surface};
  border: 1px solid ${theme.border};
  color: ${theme.text};
  padding: 8px 12px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
  font-family: "VT323", monospace;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: ${theme.secondary};
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);
  }

  &::placeholder {
    color: ${theme.textDim};
  }
`;

const FilterButton = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? theme.primary : theme.surface)};
  color: ${(props) => (props.active ? theme.background : theme.text)};
  border: 1px solid ${theme.border};
  padding: 6px 12px;
  margin-right: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-family: "VT323", monospace;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.primary};
    color: ${theme.background};
  }
`;

// Modal styling
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 999;
`;

const ModalContent = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${theme.surface};
  padding: 30px;
  border-radius: 12px;
  border: 1px solid ${theme.border};
  box-shadow: 0 0 30px rgba(0, 255, 65, 0.2);
  z-index: 1000;
  min-width: 500px;
  max-width: 80vw;
  max-height: 80vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.primary};
    border-radius: 4px;
  }
`;

// Task card styling
const TaskCard = styled.div`
  padding: 15px;
  margin: 10px 0;
  background: ${theme.surface};
  border: 1px solid ${theme.border};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 0 15px rgba(0, 255, 65, 0.1);
  }
`;

// Developer card styling for the sidebar
const DeveloperCard = styled(motion.div)`
  padding: 12px;
  margin: 8px 0;
  background: ${theme.surface};
  border-radius: 8px;
  border: 1px solid ${theme.border};
  display: flex;
  align-items: center;
  cursor: move;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.secondary};
    box-shadow: 0 0 15px rgba(0, 255, 65, 0.1);
  }
`;

// Section headers
const SectionHeader = styled.h2`
  color: ${theme.primary};
  margin: 0 0 20px 0;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid ${theme.border};
  padding-bottom: 10px;
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
`;

// Interfaces/Types
interface Developer {
    id: string;
    name: string;
    avatar: string;
    skills: string[];
    status: "available" | "busy";
}

interface Task {
    id: string;
    title: string;
    type: "bug" | "feature" | "spike";
    description: string;
    status: "todo" | "in-progress" | "review" | "done";
    points: number;
    comments: Comment[];
    reactions: { [key: string]: string[] };
}

interface Desk {
    id: string;
    position: number;
    developers: [Developer | null, Developer | null];
    currentTask: Task | null;
}

interface Comment {
    id: string;
    author: string;
    content: string;
    timestamp: Date;
}

interface Filter {
    type: "all" | "requirements" | "tasks";
    searchTerm: string;
    status: string[];
}

// Demo Data Generator
const generateDemoData = () => {
    const developers: Developer[] = Array.from({ length: 10 }, (_, i) => ({
        id: `dev-${i}`,
        name: `Developer ${i + 1}`,
        avatar: `https://i.pravatar.cc/150?img=${i}`,
        skills: ["React", "TypeScript", "Node.js"],
        status: "available",
    }));

    const tasks: Task[] = Array.from({ length: 15 }, (_, i) => ({
        id: `task-${i}`,
        title: `Task ${i + 1}`,
        type: ["bug", "feature", "spike"][Math.floor(Math.random() * 3)] as
            | "bug"
            | "feature"
            | "spike",
        description: `This is a detailed description for task ${
            i + 1
        }. It includes acceptance criteria and technical requirements.`,
        status: ["todo", "in-progress", "review", "done"][
            Math.floor(Math.random() * 4)
            ] as Task["status"],
        points: Math.floor(Math.random() * 8) + 1,
        comments: [],
        reactions: {},
    }));

    const desks: Desk[] = Array.from({ length: 6 }, (_, i) => ({
        id: `desk-${i}`,
        position: i,
        developers: [null, null],
        currentTask: null,
    }));

    return { developers, tasks, desks };
};

const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
    const [data, setData] = useState(generateDemoData());

    const handleDeveloperAssignment = (
        deskId: string,
        devId: string,
        seatIndex: 0 | 1
    ) => {
        setData((prev) => {
            const newData = { ...prev };
            const desk = newData.desks.find((d) => d.id === deskId);
            const developer = newData.developers.find((d) => d.id === devId);

            if (desk && developer) {
                // Remove developer from any other desk first
                newData.desks.forEach((d) => {
                    d.developers = d.developers.map((dev, idx) =>
                        dev?.id === devId ? null : dev
                    ) as [Developer | null, Developer | null];
                });

                // Assign to new position
                desk.developers[seatIndex] = developer;
            }

            return newData;
        });
    };

    const handleDeveloperRemove = (deskId: string, seatIndex: 0 | 1) => {
        setData((prev) => {
            const newData = { ...prev };
            const desk = newData.desks.find((d) => d.id === deskId);
            if (desk) {
                desk.developers[seatIndex] = null;
            }
            return newData;
        });
    };

    const handleTaskAssignment = (deskId: string, taskId: string) => {
        setData((prev) => {
            const newData = { ...prev };
            const desk = newData.desks.find((d) => d.id === deskId);
            const task = newData.tasks.find((t) => t.id === taskId);

            if (desk && task) {
                desk.currentTask = task;
            }

            return newData;
        });
    };

    return (
        // <DndProvider backend={HTML5Backend}>
        //     <AppContainer>
                <>
                {/*    <Sidebar*/}
                {/*    isOpen={sidebarOpen}*/}
                {/*    initial={false}*/}
                {/*    animate={{ width: sidebarOpen ? 300 : 0 }}*/}
                {/*>*/}
                {/*    <div style={{ padding: "20px" }}>*/}
                {/*        <div*/}
                {/*            style={{*/}
                {/*                display: "flex",*/}
                {/*                justifyContent: "space-between",*/}
                {/*                alignItems: "center",*/}
                {/*                marginBottom: "20px",*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <h2*/}
                {/*                style={{*/}
                {/*                    color: theme.primary,*/}
                {/*                    margin: 0,*/}
                {/*                    textTransform: "uppercase",*/}
                {/*                    letterSpacing: "1px",*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                Developers*/}
                {/*            </h2>*/}
                {/*            <StyledButton*/}
                {/*                onClick={() => setSidebarOpen(!sidebarOpen)}*/}
                {/*                whileHover={{ scale: 1.05 }}*/}
                {/*                whileTap={{ scale: 0.95 }}*/}
                {/*            >*/}
                {/*                {sidebarOpen ? "←" : "→"}*/}
                {/*            </StyledButton>*/}
                {/*        </div>*/}

                {/*        {data.developers.map((developer) => (*/}
                {/*            <DraggableDeveloper key={developer.id} developer={developer} />*/}
                {/*        ))}*/}

                {/*        <div style={{ marginTop: "30px" }}>*/}
                {/*            <h2*/}
                {/*                style={{*/}
                {/*                    color: theme.primary,*/}
                {/*                    textTransform: "uppercase",*/}
                {/*                    letterSpacing: "1px",*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                Backlog*/}
                {/*            </h2>*/}
                {/*            <BacklogSection data={data} />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</Sidebar>*/}

                <Office>
                    {/*{data.desks.map((desk) => (*/}
                    {/*    <DeskItem*/}
                    {/*        key={desk.id}*/}
                    {/*        desk={desk}*/}
                    {/*        onDeveloperDrop={handleDeveloperAssignment}*/}
                    {/*        onDeveloperRemove={handleDeveloperRemove}*/}
                    {/*        onTaskAssign={handleTaskAssignment}*/}
                    {/*        onMaximize={() => setSelectedDesk(desk)}*/}
                    {/*    />*/}
                    {/*))}*/}
                </Office></>

                // <AnimatePresence>
                //     {selectedDesk && (
                //         <Modal
                //             desk={selectedDesk}
                //             onClose={() => setSelectedDesk(null)}
                //             onDeveloperAssign={handleDeveloperAssignment}
                //             onTaskAssign={handleTaskAssignment}
                //         />
                //     )}
                // </AnimatePresence>
            // </AppContainer>
        // </DndProvider>
    );
};

// DraggableDeveloper Component
const DraggableDeveloper: React.FC<{ developer: Developer }> = ({
                                                                    developer,
                                                                }) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: "developer",
            item: developer,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [developer]
    ); // Add dependency array

    return (
        <motion.div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: "move",
                padding: "12px",
                margin: "8px 0",
                background: theme.surface,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                border: `1px solid ${theme.border}`,
                boxShadow: "0 0 10px rgba(0, 255, 65, 0.1)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <img
                src={developer.avatar}
                alt={developer.name}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    marginRight: "12px",
                    border: `2px solid ${theme.border}`,
                }}
            />
            <div>
                <div style={{ color: theme.text }}>{developer.name}</div>
                <div style={{ fontSize: "12px", color: theme.textDim }}>
                    {developer.status}
                </div>
            </div>
        </motion.div>
    );
};

const DeskItem: React.FC<{
    desk: Desk;
    onDeveloperDrop: (deskId: string, devId: string, seatIndex: 0 | 1) => void;
    onDeveloperRemove: (deskId: string, seatIndex: 0 | 1) => void;
    onTaskAssign: (deskId: string, taskId: string) => void;
    onMaximize: () => void;
}> = ({
          desk,
          onDeveloperDrop,
          onDeveloperRemove,
          onTaskAssign,
          onMaximize,
      }) => {
    const [dropTarget, setDropTarget] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: "developer",
            drop: (item: Developer) => {
                onDeveloperDrop(desk.id, item.id, dropTarget ?? 0);
                setDropTarget(null);
            },
            hover: (item, monitor) => {
                const hoverBoundingRect = ref.current?.getBoundingClientRect();
                const clientOffset = monitor.getClientOffset();

                if (hoverBoundingRect && clientOffset) {
                    const hoverMiddleY =
                        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                    setDropTarget(hoverClientY < hoverMiddleY ? 0 : 1);
                }
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        }),
        [desk.id, onDeveloperDrop]
    ); // Add dependency array

    drop(ref);

    return (
        <DeskComponent
            ref={ref}
            animate={{
                scale: isOver ? 1.02 : 1,
                borderColor: isOver ? theme.secondary : theme.border,
            }}
        >
            {[0, 1].map((seatIndex) => (
                <DeveloperSeat
                    key={seatIndex}
                    $isoccupied={Boolean(desk.developers[seatIndex])}
                    $isover={dropTarget === seatIndex && isOver}
                >
                    {desk.developers[seatIndex] ? (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div
                                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                            >
                                <img
                                    src={desk.developers[seatIndex]?.avatar}
                                    alt={desk.developers[seatIndex]?.name}
                                    style={{ width: 30, height: 30, borderRadius: "50%" }}
                                />
                                <span>{desk.developers[seatIndex]?.name}</span>
                            </div>
                            <StyledButton
                                onClick={() => onDeveloperRemove(desk.id, seatIndex)}
                            >
                                Remove
                            </StyledButton>
                        </div>
                    ) : (
                        <div style={{ textAlign: "center", color: theme.textDim }}>
                            Drop Developer Here
                        </div>
                    )}
                </DeveloperSeat>
            ))}

            <TaskCard>
                <h3 style={{ color: theme.primary, margin: "0 0 10px 0" }}>
                    Current Task
                </h3>
                <div>{desk.currentTask?.title || "No task assigned"}</div>
            </TaskCard>

            <StyledButton
                onClick={onMaximize}
                style={{ position: "absolute", bottom: 15, right: 15 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Details
            </StyledButton>
        </DeskComponent>
    );
};

// BacklogSection Component
const BacklogSection: React.FC<{ data: { tasks: Task[] } }> = ({ data }) => {
    const [filter, setFilter] = useState<Filter>({
        type: "all",
        searchTerm: "",
        status: [],
    });

    const filteredTasks = useMemo(() => {
        return data.tasks.filter(
            (task) =>
                task.title.toLowerCase().includes(filter.searchTerm.toLowerCase()) &&
                (filter.type === "all" ||
                    filter.status.length === 0 ||
                    filter.status.includes(task.status))
        );
    }, [data.tasks, filter]);

    return (
        <div>
            <SearchInput
                placeholder="Search tasks..."
                value={filter.searchTerm}
                onChange={(e) =>
                    setFilter((prev) => ({ ...prev, searchTerm: e.target.value }))
                }
            />
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                <FilterButton
                    $active={filter.type === "all"}
                    onClick={() => setFilter((prev) => ({ ...prev, type: "all" }))}
                >
                    All
                </FilterButton>
                <FilterButton
                    $active={filter.type === "tasks"}
                    onClick={() => setFilter((prev) => ({ ...prev, type: "tasks" }))}
                >
                    Tasks
                </FilterButton>
            </div>

            {filteredTasks.map((task) => (
                <TaskCard key={task.id}>
                    <h4 style={{ margin: "0 0 5px 0", color: theme.primary }}>
                        {task.title}
                    </h4>
                    <div style={{ fontSize: "12px", color: theme.secondary }}>
                        {task.type} - {task.points} points
                    </div>
                    <div
                        style={{
                            fontSize: "12px",
                            color: theme.textDim,
                            marginTop: "5px",
                        }}
                    >
                        Status: {task.status}
                    </div>
                </TaskCard>
            ))}
        </div>
    );
};

// Modal Component
const Modal: React.FC<{
    desk: Desk;
    onClose: () => void;
    onDeveloperAssign: (deskId: string, devId: string, seatIndex: 0 | 1) => void;
    onTaskAssign: (deskId: string, taskId: string) => void;
}> = ({ desk, onClose, onDeveloperAssign, onTaskAssign }) => {
    return (
        <>
            <ModalOverlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />
            <ModalContent
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
            >
                <SectionHeader>Desk Details</SectionHeader>

                <div style={{ marginTop: "20px" }}>
                    <h3 style={{ color: theme.secondary }}>Developers</h3>
                    {desk.developers.map((dev, index) => (
                        <div key={`${desk.id}-dev-${index}`}>
                            {" "}
                            // More unique key
                            {dev ? (
                                <DeveloperCard>
                                    <img
                                        src={dev.avatar}
                                        alt={dev.name}
                                        style={{ width: 40, height: 40, borderRadius: "50%" }}
                                    />
                                    <span>{dev.name}</span>
                                </DeveloperCard>
                            ) : (
                                <div style={{ color: theme.textDim }}>
                                    Empty Seat {index + 1}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: "20px" }}>
                    <h3 style={{ color: theme.secondary }}>Current Task</h3>
                    {desk.currentTask ? (
                        <TaskCard>
                            <h4 style={{ color: theme.primary }}>{desk.currentTask.title}</h4>
                            <p>{desk.currentTask.description}</p>
                            <div>Type: {desk.currentTask.type}</div>
                            <div>Points: {desk.currentTask.points}</div>
                            <div>Status: {desk.currentTask.status}</div>
                        </TaskCard>
                    ) : (
                        <div style={{ color: theme.textDim }}>No task assigned</div>
                    )}
                </div>

                <StyledButton
                    onClick={onClose}
                    style={{ marginTop: "20px" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Close
                </StyledButton>
            </ModalContent>
        </>
    );
};

export default App;