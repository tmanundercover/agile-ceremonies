import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import YouTubeDescriptionGenerator from '../site/widgets/custom-elements/social-media-content-generation/youTube-description-generator/YouTubeDescriptionGenerator';

const meta = {
    title: 'AI Tools/YouTube Description Generator',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof YouTubeDescriptionGenerator>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default story with empty initial text
export const Default: Story = {
    render: () => {
        return <YouTubeDescriptionGenerator/>
    }
};


// Story with sample response rendering (no actual API call)
export const WithSampleResponse: Story = {
    render: () => {
        return (
            <div style={{width: '800px'}}>
                <YouTubeDescriptionGenerator/>
            </div>
        );
    },
};

// Mobile view
export const MobileView: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
    render: () => {
        return (
            <YouTubeDescriptionGenerator
            />
        );
    },
};
