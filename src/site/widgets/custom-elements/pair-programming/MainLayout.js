import React, { useState } from "react";
import DeveloperSection from "./DeveloperSection";
import { LayoutContainer, Content, Sidebar, BacklogContainer, BacklogTitle, RequirementItem, OfficeContainer, DeskGrid, Desk, EmptyDesk, EmptyDeskOverlay, SeatCell, RequirementDropdown, EndcapCell } from "./styles";
import { fullDesks, partialDesks } from "./demoData";
import { tasks } from "./datastore"; // updated import
// New InteractiveTaskItem component for showing task detail on hover/click.
const InteractiveTaskItem = ({ title, detail }) => {
    const [showDetail, setShowDetail] = useState(false);
    const toggleDetail = () => setShowDetail(prev => !prev);
    return (React.createElement(RequirementItem, { onMouseEnter: () => setShowDetail(true), onMouseLeave: () => setShowDetail(false), onClick: toggleDetail },
        React.createElement("div", null, title),
        showDetail && React.createElement("div", { style: { fontSize: "0.9em", color: "#666" } }, detail)));
};
const MainLayout = () => {
    // Constants for scaling limits.
    const MIN_SCALE = 0.8; // zoom out limit - ensures padding around desks
    const MAX_SCALE = 2; // zoom in limit
    // States for pinch zoom.
    const [scale, setScale] = useState(1);
    const [pinchInitialDistance, setPinchInitialDistance] = useState(null);
    const [pinchBaseScale, setPinchBaseScale] = useState(1);
    // Modal state for requirement detail
    const [modalVisible, setModalVisible] = useState(false);
    const [modalRequirement, setModalRequirement] = useState(null);
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
    const handleRequirementDoubleClick = (title, description) => {
        setModalRequirement({ title, description });
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
        setModalRequirement(null);
    };
    return (React.createElement(LayoutContainer, null,
        React.createElement(Sidebar, null,
            React.createElement("div", { style: { display: 'flex', flexDirection: 'column', height: '100%' } },
                React.createElement("div", { style: { height: '150px', width: '100%' } },
                    React.createElement(DeveloperSection, null)),
                React.createElement("div", { style: { flex: 1, width: '100%' } },
                    React.createElement(BacklogContainer, null,
                        React.createElement(BacklogTitle, null, "Requirements Backlog"),
                        React.createElement("ul", null, tasks.map(task => (React.createElement(RequirementItem, { key: task.id, onDoubleClick: () => handleRequirementDoubleClick(task.title, task.description) }, task.title)))))))),
        React.createElement(Content, null,
            React.createElement("div", { style: { transform: `scale(${scale})`, transformOrigin: "0 0" }, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd },
                React.createElement(OfficeContainer, null,
                    React.createElement("h1", null, "Office"),
                    React.createElement(DeskGrid, null,
                        fullDesks.map(id => (React.createElement(Desk, { key: id, solid: true },
                            React.createElement(SeatCell, null, "Seat 1"),
                            React.createElement(SeatCell, null, "Seat 2"),
                            React.createElement(RequirementDropdown, { onDoubleClick: () => handleRequirementDoubleClick(`Requirement ${id}`, `Description for requirement ${id}`), onClick: () => { } },
                                React.createElement("div", { className: "requirement-title" },
                                    "Requirement ",
                                    id),
                                React.createElement("div", { className: "requirement-description" },
                                    "Description for requirement ",
                                    id)),
                            React.createElement(EndcapCell, null, "Endcap")))),
                        partialDesks.map(id => (React.createElement(Desk, { key: id },
                            React.createElement(SeatCell, null, "Seat 1"),
                            React.createElement(SeatCell, null, "Seat 2"),
                            React.createElement(RequirementDropdown, { onDoubleClick: () => handleRequirementDoubleClick(`Requirement ${id}`, `Description for requirement ${id}`), onClick: () => { } },
                                React.createElement("div", { className: "requirement-title" },
                                    "Requirement ",
                                    id),
                                React.createElement("div", { className: "requirement-description" },
                                    "Description for requirement ",
                                    id)),
                            React.createElement(EndcapCell, null, "Endcap")))),
                        React.createElement(EmptyDesk, null,
                            React.createElement("div", null, "2 Seats"),
                            React.createElement("div", null, "Requirement"),
                            React.createElement("div", null, "Endcap"),
                            React.createElement(EmptyDeskOverlay, null, "+"))))),
            modalVisible && modalRequirement && (React.createElement("div", { style: {
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
                }, onClick: closeModal },
                React.createElement("div", { style: {
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "4px",
                        minWidth: "300px"
                    }, onClick: e => e.stopPropagation() },
                    React.createElement("div", { style: { marginBottom: "10px", fontSize: "0.9em", color: "#555" } },
                        "Home > Office > ",
                        modalRequirement.title),
                    React.createElement("h2", null, modalRequirement.title),
                    React.createElement("p", null, modalRequirement.description),
                    React.createElement("button", { onClick: closeModal }, "Close")))))));
};
export default MainLayout;
