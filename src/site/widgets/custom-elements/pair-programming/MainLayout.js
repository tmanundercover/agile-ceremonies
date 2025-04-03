import React, { useState } from "react";
import DeveloperSection from "./DeveloperSection";
import { LayoutContainer, Content, Sidebar, BacklogContainer, BacklogTitle, TaskItem, OfficeContainer, DeskGrid, Desk, EmptyDesk, EmptyDeskOverlay, SeatCell, TaskDropdown, EndcapCell } from "./styles";
// New InteractiveTaskItem component for showing task detail on hover/click.
const InteractiveTaskItem = ({ title, detail }) => {
    const [showDetail, setShowDetail] = useState(false);
    const toggleDetail = () => setShowDetail(prev => !prev);
    return (React.createElement(TaskItem, { onMouseEnter: () => setShowDetail(true), onMouseLeave: () => setShowDetail(false), onClick: toggleDetail },
        React.createElement("div", null, title),
        showDetail && React.createElement("div", { style: { fontSize: "0.9em", color: "#666" } }, detail)));
};
const MainLayout = () => {
    // Demo arrays for desks demo:
    const fullDesks = [1, 2, 3, 4, 5, 6];
    const partialDesks = [7, 8, 9];
    // Constants for scaling limits.
    const MIN_SCALE = 0.8; // zoom out limit - ensures padding around desks
    const MAX_SCALE = 2; // zoom in limit
    // States for pinch zoom.
    const [scale, setScale] = useState(1);
    const [pinchInitialDistance, setPinchInitialDistance] = useState(null);
    const [pinchBaseScale, setPinchBaseScale] = useState(1);
    const handleTouchStart = (e) => {
        if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const distance = Math.hypot(dx, dy);
            setPinchInitialDistance(distance);
            setPinchBaseScale(scale);
        }
    };
    const handleTouchMove = (e) => {
        if (e.touches.length === 2 && pinchInitialDistance !== null) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const currentDistance = Math.hypot(dx, dy);
            let newScale = pinchBaseScale * (currentDistance / pinchInitialDistance);
            newScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
            setScale(newScale);
        }
    };
    const handleTouchEnd = (e) => {
        if (e.touches.length < 2) {
            setPinchInitialDistance(null);
        }
    };
    return (React.createElement(LayoutContainer, null,
        React.createElement(Sidebar, null,
            React.createElement(DeveloperSection, null),
            React.createElement(BacklogContainer, null,
                React.createElement(BacklogTitle, null, "Task Backlog"),
                React.createElement("ul", null,
                    React.createElement(InteractiveTaskItem, { title: "Task 1", detail: "Refactor code" }),
                    React.createElement(InteractiveTaskItem, { title: "Task 2", detail: "Write tests" }),
                    React.createElement(InteractiveTaskItem, { title: "Task 3", detail: "Update documentation" }),
                    React.createElement(InteractiveTaskItem, { title: "Task 4", detail: "Fix bug #123" }),
                    React.createElement(InteractiveTaskItem, { title: "Task 5", detail: "Code review" })))),
        React.createElement(Content, null,
            React.createElement("div", { style: { transform: `scale(${scale})`, transformOrigin: "0 0" }, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd },
                React.createElement(OfficeContainer, null,
                    React.createElement("h1", null, "Office"),
                    React.createElement(DeskGrid, null,
                        fullDesks.map(id => (React.createElement(Desk, { key: id, solid: true },
                            React.createElement(SeatCell, null, "Seat 1"),
                            React.createElement(SeatCell, null, "Seat 2"),
                            React.createElement(TaskDropdown, { onClick: () => { } },
                                React.createElement("div", { className: "task-title" },
                                    "Task ",
                                    id),
                                React.createElement("div", { className: "task-description" },
                                    "Description for task ",
                                    id)),
                            React.createElement(EndcapCell, null, "Endcap")))),
                        partialDesks.map(id => (React.createElement(Desk, { key: id },
                            React.createElement(SeatCell, null, "Seat 1"),
                            React.createElement(SeatCell, null, "Seat 2"),
                            React.createElement(TaskDropdown, { onClick: () => { } },
                                React.createElement("div", { className: "task-title" },
                                    "Task ",
                                    id),
                                React.createElement("div", { className: "task-description" },
                                    "Description for task ",
                                    id)),
                            React.createElement(EndcapCell, null, "Endcap")))),
                        React.createElement(EmptyDesk, null,
                            React.createElement("div", null, "2 Seats"),
                            React.createElement("div", null, "Task"),
                            React.createElement("div", null, "Endcap"),
                            React.createElement(EmptyDeskOverlay, null, "+"))))))));
};
export default MainLayout;
