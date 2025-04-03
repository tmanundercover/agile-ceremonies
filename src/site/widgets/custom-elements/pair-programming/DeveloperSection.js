import React from "react";
import { Section, DevelopersList, DeveloperCard } from "./styles";
const DeveloperSection = () => {
    return (React.createElement(Section, null,
        React.createElement("h2", null, "Developers"),
        React.createElement(DevelopersList, null,
            React.createElement(DeveloperCard, null,
                React.createElement("p", null, "Developer 1")),
            React.createElement(DeveloperCard, null,
                React.createElement("p", null, "Developer 2")),
            React.createElement(DeveloperCard, null,
                React.createElement("p", null, "Developer 3")))));
};
export default DeveloperSection;
