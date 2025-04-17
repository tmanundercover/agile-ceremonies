import React from 'react';
import YouTubeDescriptionGenerator from '../site/widgets/custom-elements/social-media-content-generation/youTube-description-generator/YouTubeDescriptionGenerator';
const meta = {
    title: 'AI Tools/YouTube Description Generator',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
};
export default meta;
// Default story with empty initial text
export const Default = {
    render: () => {
        return React.createElement(YouTubeDescriptionGenerator, null);
    }
};
// Story with sample response rendering (no actual API call)
export const WithSampleResponse = {
    render: () => {
        return (React.createElement("div", { style: { width: '800px' } },
            React.createElement(YouTubeDescriptionGenerator, null)));
    },
};
// Mobile view
export const MobileView = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
    render: () => {
        return (React.createElement(YouTubeDescriptionGenerator, null));
    },
};
