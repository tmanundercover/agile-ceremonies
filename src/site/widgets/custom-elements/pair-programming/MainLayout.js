"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var DeveloperSection_1 = require("./DeveloperSection");
var styles_1 = require("./styles");
var demoData_1 = require("./demoData");
var datastore_1 = require("./datastore"); // updated import
// New InteractiveTaskItem component for showing task detail on hover/click.
var InteractiveTaskItem = function (_a) {
    var title = _a.title, detail = _a.detail;
    var _b = (0, react_1.useState)(false), showDetail = _b[0], setShowDetail = _b[1];
    var toggleDetail = function () { return setShowDetail(function (prev) { return !prev; }); };
    return (<styles_1.RequirementItem onMouseEnter={function () { return setShowDetail(true); }} onMouseLeave={function () { return setShowDetail(false); }} onClick={toggleDetail}>
            <div>{title}</div>
            {showDetail && <div style={{ fontSize: "0.9em", color: "#666" }}>{detail}</div>}
        </styles_1.RequirementItem>);
};
var MainLayout = function () {
    // Constants for scaling limits.
    var MIN_SCALE = 0.8; // zoom out limit - ensures padding around desks
    var MAX_SCALE = 2; // zoom in limit
    // States for pinch zoom.
    var _a = (0, react_1.useState)(1), scale = _a[0], setScale = _a[1];
    var _b = (0, react_1.useState)(null), pinchInitialDistance = _b[0], setPinchInitialDistance = _b[1];
    var _c = (0, react_1.useState)(1), pinchBaseScale = _c[0], setPinchBaseScale = _c[1];
    // Modal state for requirement detail
    var _d = (0, react_1.useState)(false), modalVisible = _d[0], setModalVisible = _d[1];
    var _e = (0, react_1.useState)(null), modalRequirement = _e[0], setModalRequirement = _e[1];
    var handleTouchStart = function (e) {
        if (e.touches.length === 2) {
            var dx = e.touches[0].clientX - e.touches[1].clientX;
            var dy = e.touches[0].clientY - e.touches[1].clientY;
            var distance = Math.hypot(dx, dy);
            setPinchInitialDistance(distance);
            setPinchBaseScale(scale);
        }
    };
    var handleTouchMove = function (e) {
        if (e.touches.length === 2 && pinchInitialDistance !== null) {
            var dx = e.touches[0].clientX - e.touches[1].clientX;
            var dy = e.touches[0].clientY - e.touches[1].clientY;
            var currentDistance = Math.hypot(dx, dy);
            var newScale = pinchBaseScale * (currentDistance / pinchInitialDistance);
            newScale = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
            setScale(newScale);
        }
    };
    var handleTouchEnd = function (e) {
        if (e.touches.length < 2) {
            setPinchInitialDistance(null);
        }
    };
    var handleRequirementDoubleClick = function (title, description) {
        setModalRequirement({ title: title, description: description });
        setModalVisible(true);
    };
    var closeModal = function () {
        setModalVisible(false);
        setModalRequirement(null);
    };
    return (<styles_1.LayoutContainer>
            <styles_1.Sidebar>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Fixed height for the developer section */}
                    <div style={{ height: '150px', width: '100%' }}>
                        <DeveloperSection_1.default />
                    </div>
                    {/* Backlog fills remaining space */}
                    <div style={{ flex: 1, width: '100%' }}>
                        <styles_1.BacklogContainer>
                            <styles_1.BacklogTitle>Requirements Backlog</styles_1.BacklogTitle>
                            <ul>
                                {datastore_1.tasks.map(function (task) { return (<styles_1.RequirementItem key={task.id} onDoubleClick={function () { return handleRequirementDoubleClick(task.title, task.description); }}>
                                        {task.title}
                                    </styles_1.RequirementItem>); })}
                            </ul>
                        </styles_1.BacklogContainer>
                    </div>
                </div>
            </styles_1.Sidebar>
            <styles_1.Content>
                <div style={{ transform: "scale(".concat(scale, ")"), transformOrigin: "0 0" }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                    <styles_1.OfficeContainer>
                        <h1>Office</h1>
                        <styles_1.DeskGrid>
                            {demoData_1.fullDesks.map(function (id) { return (<styles_1.Desk key={id} solid>
                                    <styles_1.SeatCell>Seat 1</styles_1.SeatCell>
                                    <styles_1.SeatCell>Seat 2</styles_1.SeatCell>
                                    <styles_1.RequirementDropdown onDoubleClick={function () { return handleRequirementDoubleClick("Requirement ".concat(id), "Description for requirement ".concat(id)); }} onClick={function () { }}>
                                        <div className="requirement-title">Requirement {id}</div>
                                        <div className="requirement-description">Description for requirement {id}</div>
                                    </styles_1.RequirementDropdown>
                                    <styles_1.EndcapCell>Endcap</styles_1.EndcapCell>
                                </styles_1.Desk>); })}
                            {demoData_1.partialDesks.map(function (id) { return (<styles_1.Desk key={id}>
                                    <styles_1.SeatCell>Seat 1</styles_1.SeatCell>
                                    <styles_1.SeatCell>Seat 2</styles_1.SeatCell>
                                    <styles_1.RequirementDropdown onDoubleClick={function () { return handleRequirementDoubleClick("Requirement ".concat(id), "Description for requirement ".concat(id)); }} onClick={function () { }}>
                                        <div className="requirement-title">Requirement {id}</div>
                                        <div className="requirement-description">Description for requirement {id}</div>
                                    </styles_1.RequirementDropdown>
                                    <styles_1.EndcapCell>Endcap</styles_1.EndcapCell>
                                </styles_1.Desk>); })}
                            <styles_1.EmptyDesk>
                                <div>2 Seats</div>
                                <div>Requirement</div>
                                <div>Endcap</div>
                                <styles_1.EmptyDeskOverlay>+</styles_1.EmptyDeskOverlay>
                            </styles_1.EmptyDesk>
                        </styles_1.DeskGrid>
                    </styles_1.OfficeContainer>
                </div>

                {modalVisible && modalRequirement && (<div style={{
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
            }} onClick={closeModal}>
                        <div style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "4px",
                minWidth: "300px"
            }} onClick={function (e) { return e.stopPropagation(); }}>
                            <div style={{ marginBottom: "10px", fontSize: "0.9em", color: "#555" }}>
                                Home &gt; Office &gt; {modalRequirement.title}
                            </div>
                            <h2>{modalRequirement.title}</h2>
                            <p>{modalRequirement.description}</p>
                            {/* ...additional requirement details... */}
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>)}

            </styles_1.Content>
        </styles_1.LayoutContainer>);
};
exports.default = MainLayout;
