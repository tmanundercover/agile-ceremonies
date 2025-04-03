import React, { useState } from "react";
import styled from "styled-components";
import DeveloperSection from "./DeveloperSection";
import { LayoutContainer, Content, Sidebar, BacklogContainer, BacklogTitle, TaskItem, OfficeContainer, DeskGrid, Desk, EmptyDesk, EmptyDeskOverlay, SeatCell, TaskDropdown, EndcapCell } from "./styles";

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
    // Demo arrays for desks demo:
    const fullDesks = [1, 2, 3, 4, 5, 6];
    const partialDesks = [7, 8, 9];

    // Constants for scaling limits.
    const MIN_SCALE = 0.8; // zoom out limit - ensures padding around desks
    const MAX_SCALE = 2;   // zoom in limit

    // States for pinch zoom.
    const [scale, setScale] = useState(1);
    const [pinchInitialDistance, setPinchInitialDistance] = useState<number | null>(null);
    const [pinchBaseScale, setPinchBaseScale] = useState(1);

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

    return (
        <LayoutContainer>
            <Sidebar>
                {/* Developer carousel at the top */}
                <DeveloperSection />
                {/* Backlog section */}
                <BacklogContainer>
                    <BacklogTitle>Task Backlog</BacklogTitle>
                    <ul>
                        <InteractiveTaskItem title="Task 1" detail="Refactor code" />
                        <InteractiveTaskItem title="Task 2" detail="Write tests" />
                        <InteractiveTaskItem title="Task 3" detail="Update documentation" />
                        <InteractiveTaskItem title="Task 4" detail="Fix bug #123" />
                        <InteractiveTaskItem title="Task 5" detail="Code review" />
                        {/* ...additional demo tasks... */}
                    </ul>
                </BacklogContainer>
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
                                    <TaskDropdown onClick={() => {/* ...toggle task detail... */}}>
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
                                    <TaskDropdown onClick={() => {/* ...toggle task detail... */}}>
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
            </Content>
        </LayoutContainer>
    );
};

export default MainLayout;

