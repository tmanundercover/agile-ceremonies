import React, { useState } from "react";
import styled from "styled-components";
import DeveloperSection from "./DeveloperSection";
import { LayoutContainer, Content, Sidebar, BacklogContainer, BacklogTitle, TaskItem, OfficeContainer, DeskGrid, Desk, EmptyDesk, EmptyDeskOverlay, SeatCell, TaskDropdown, EndcapCell } from "./styles";
import { fullDesks, partialDesks } from "./demoData";
import { tasks } from "./datastore/tasks"; // updated import

// New InteractiveTaskItem component for showing task detail on hover/click.
const InteractiveTaskItem: React.FC<{ title: string; detail: string }> = ({ title, detail }) => {
    const [showDetail, setShowDetail] = useState(false);
    const toggleDetail = () => setShowDetail(prev => !prev);
    return (
        <TaskItem 
            onMouseEnter={() => setShowDetail(true)}
            onMouseLeave={() => setShowDetail(false)}
            onClick={toggleDetail}
        >
            <div>{title}</div>
            {showDetail && <div style={{ fontSize: "0.9em", color: "#666" }}>{detail}</div>}
        </TaskItem>
    );
};

const MainLayout: React.FC = () => {
    // Constants for scaling limits.
    const MIN_SCALE = 0.8; // zoom out limit - ensures padding around desks
    const MAX_SCALE = 2;   // zoom in limit

    // States for pinch zoom.
    const [scale, setScale] = useState(1);
    const [pinchInitialDistance, setPinchInitialDistance] = useState<number | null>(null);
    const [pinchBaseScale, setPinchBaseScale] = useState(1);

    // Modal state for task detail
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTask, setModalTask] = useState<{ title: string; description: string } | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const distance = Math.hypot(dx, dy);
            setPinchInitialDistance(distance);
            setPinchBaseScale(scale);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2 && pinchInitialDistance !== null) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const currentDistance = Math.hypot(dx, dy);
            let newScale = pinchBaseScale * (currentDistance / pinchInitialDistance);
            newScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
            setScale(newScale);
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (e.touches.length < 2) {
            setPinchInitialDistance(null);
        }
    };

    const handleTaskDoubleClick = (title: string, description: string) => {
        setModalTask({ title, description });
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalTask(null);
    };

    return (
        <LayoutContainer>
            <Sidebar>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Fixed height for the developer section */}
                    <div style={{ height: '150px', width: '100%' }}>
                        <DeveloperSection />
                    </div>
                    {/* Backlog fills remaining space */}
                    <div style={{ flex: 1, width: '100%' }}>
                        <BacklogContainer>
                            <BacklogTitle>Task Backlog</BacklogTitle>
                            <ul>
                                {tasks.map(task => (
                                    <TaskItem
                                        key={task.id}
                                        onDoubleClick={() => handleTaskDoubleClick(task.title, task.description)}
                                    >
                                        {task.title}
                                    </TaskItem>
                                ))}
                            </ul>
                        </BacklogContainer>
                    </div>
                </div>
            </Sidebar>
            <Content>
                <div
                    style={{ transform: `scale(${scale})`, transformOrigin: "0 0" }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <OfficeContainer>
                        <h1>Office</h1>
                        <DeskGrid>
                            {fullDesks.map(id => (
                                <Desk key={id} solid>
                                    <SeatCell>Seat 1</SeatCell>
                                    <SeatCell>Seat 2</SeatCell>
                                    <TaskDropdown
                                        onDoubleClick={() => handleTaskDoubleClick(`Task ${id}`, `Description for task ${id}`)}
                                        onClick={() => {/* ...toggle task detail... */}}
                                    >
                                        <div className="task-title">Task {id}</div>
                                        <div className="task-description">Description for task {id}</div>
                                    </TaskDropdown>
                                    <EndcapCell>Endcap</EndcapCell>
                                </Desk>
                            ))}
                            {partialDesks.map(id => (
                                <Desk key={id}>
                                    <SeatCell>Seat 1</SeatCell>
                                    <SeatCell>Seat 2</SeatCell>
                                    <TaskDropdown
                                        onDoubleClick={() => handleTaskDoubleClick(`Task ${id}`, `Description for task ${id}`)}
                                        onClick={() => {/* ...toggle task detail... */}}
                                    >
                                        <div className="task-title">Task {id}</div>
                                        <div className="task-description">Description for task {id}</div>
                                    </TaskDropdown>
                                    <EndcapCell>Endcap</EndcapCell>
                                </Desk>
                            ))}
                            <EmptyDesk>
                                <div>2 Seats</div>
                                <div>Task</div>
                                <div>Endcap</div>
                                <EmptyDeskOverlay>+</EmptyDeskOverlay>
                            </EmptyDesk>
                        </DeskGrid>
                    </OfficeContainer>
                </div>

                {modalVisible && modalTask && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1000
                        }}
                        onClick={closeModal}
                    >
                        <div
                            style={{
                                background: "#fff",
                                padding: "20px",
                                borderRadius: "4px",
                                minWidth: "300px"
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ marginBottom: "10px", fontSize: "0.9em", color: "#555" }}>
                                Home &gt; Office &gt; {modalTask.title}
                            </div>
                            <h2>{modalTask.title}</h2>
                            <p>{modalTask.description}</p>
                            {/* ...additional task details... */}
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                )}

            </Content>
        </LayoutContainer>
    );
};

export default MainLayout;
