import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import YouTubeDescriptionGenerator from '../site/widgets/custom-elements/social-media-content-generation/youTube-description-generator/YouTubeDescriptionGenerator';
import AIAgentCompass from "../site/widgets/custom-elements/nat-ceo-thn/components/ai-agent-compass/AIAgentCompass";
import HRAgentProfile from "../site/widgets/custom-elements/nat-ceo-thn/components/ai-agent-compass/AIAgentComass2";

const meta = {
    title: 'AI Agents/AI Agent Compass',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof AIAgentCompass>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default story with empty initial text
export const Option1: Story = {
    render: () => {
        return <AIAgentCompass/>
    }
};


// Story with sample response rendering (no actual API call)
export const Option2: Story = {
    render: () => {
        return (
                <HRAgentProfile/>
        );
    },
};
