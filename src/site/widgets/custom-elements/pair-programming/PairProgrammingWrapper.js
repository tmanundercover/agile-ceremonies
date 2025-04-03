"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var App_1 = require("./App");
var PairProgrammingWrapper = function (_a) {
    var displayName = _a.displayName;
    return (<react_dnd_1.DndProvider backend={react_dnd_html5_backend_1.HTML5Backend}>
      <App_1.default />
    </react_dnd_1.DndProvider>);
};
exports.default = PairProgrammingWrapper;
