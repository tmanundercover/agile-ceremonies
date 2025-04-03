import React from "react";
import { Section, DevelopersList, DeveloperCard } from "./styles";

const DeveloperSection: React.FC = () => {
    return (
        <Section>
            <h2>Developers</h2>
            <DevelopersList>
                <DeveloperCard>
                    <p>Developer 1</p>
                </DeveloperCard>
                <DeveloperCard>
                    <p>Developer 2</p>
                </DeveloperCard>
                <DeveloperCard>
                    <p>Developer 3</p>
                </DeveloperCard>
            </DevelopersList>
        </Section>
    );
};

export default DeveloperSection;

