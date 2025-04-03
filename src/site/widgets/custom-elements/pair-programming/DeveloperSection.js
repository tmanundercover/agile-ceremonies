"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styles_1 = require("./styles");
var demoData_1 = require("./demoData"); // Import demo data
var DeveloperSection = function () {
    return (<styles_1.Section>
            <h2>Developers</h2>
            <styles_1.DevelopersList>
                {demoData_1.developers.map(function (dev) { return (<styles_1.DeveloperCard key={dev.id}>
                        {dev.name}
                    </styles_1.DeveloperCard>); })}
            </styles_1.DevelopersList>
        </styles_1.Section>);
};
exports.default = DeveloperSection;
