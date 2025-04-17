import React from 'react';
import AIAgentCompass from "../site/widgets/custom-elements/nat-ceo-thn/components/ai-agent-compass/AIAgentCompass";
import HRAgentProfile from "../site/widgets/custom-elements/nat-ceo-thn/components/ai-agent-compass/AIAgentComass2";
const meta = {
    title: 'AI Agents/AI Agent Compass',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
};
export default meta;
// Default story with empty initial text
export const Option1 = {
    render: () => {
        return React.createElement(AIAgentCompass, null);
    }
};
// Story with sample response rendering (no actual API call)
export const Option2 = {
    render: () => {
        return (React.createElement(HRAgentProfile, null));
    },
};
