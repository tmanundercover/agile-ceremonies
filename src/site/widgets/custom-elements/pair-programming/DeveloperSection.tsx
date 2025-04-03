import React from "react";
import { Section, DevelopersList, DeveloperCard } from "./styles";
import { developers } from "./demoData"; // Import demo data

const DeveloperSection: React.FC = () => {
    return (
        <Section>
            <h2>Developers</h2>
            <DevelopersList>
                {developers.map(dev => (
                    <DeveloperCard key={dev.id}>
                        {dev.name}
                    </DeveloperCard>
                ))}
            </DevelopersList>
        </Section>
    );
};

export default DeveloperSection;

