import React from "react";
import { Section, DevelopersList, DeveloperCard } from "./styles";
import { developers } from "./demoData"; // Import demo data
const DeveloperSection = () => {
    return (React.createElement(Section, null,
        React.createElement("h2", null, "Developers"),
        React.createElement(DevelopersList, null, developers.map(dev => (React.createElement(DeveloperCard, { key: dev.id }, dev.name))))));
};
export default DeveloperSection;
