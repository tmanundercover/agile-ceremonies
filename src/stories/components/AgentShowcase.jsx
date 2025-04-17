import React from "react";
import {
    AgentBody,
    AgentCard,
    AgentDescription,
    AgentGrid,
    AgentHeader,
    AgentIcon,
    AgentTitle
} from "./styled-components";

export const AgentShowcase = ({ agents }) => {
    return (
        <AgentGrid>
            {agents.map((agent, index) => (
                <AgentCard href={agent.link} key={index}>
                    <AgentHeader color={agent.color}>
                        <AgentIcon className="agent-icon">{agent.icon}</AgentIcon>
                        <AgentTitle>{agent.name}</AgentTitle>
                    </AgentHeader>
                    <AgentBody>
                        <AgentDescription>{agent.description}</AgentDescription>
                    </AgentBody>
                </AgentCard>
            ))}
        </AgentGrid>
    );
};