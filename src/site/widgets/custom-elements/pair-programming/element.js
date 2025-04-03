"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var react_to_webcomponent_1 = require("react-to-webcomponent");
var PairProgrammingWrapper_1 = require("./PairProgrammingWrapper");
var CustomElement = function (_a) {
    var _b = _a.displayName, displayName = _b === void 0 ? "Your Widget's Title" : _b;
    return (<>
        {/*hi*/}
        <PairProgrammingWrapper_1.default />
        </>);
};
var customElement = (0, react_to_webcomponent_1.default)(CustomElement, react_1.default, react_dom_1.default, {
    props: {
        displayName: 'string',
    },
});
exports.default = customElement;
