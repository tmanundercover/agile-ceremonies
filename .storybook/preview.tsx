 import RadixThemeWrapper from "../src/test/RadixThemeWrapper";
import React from 'react';
 import {StoryFn, StoryObj} from "@storybook/react";

const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story:StoryFn) => {
            return <RadixThemeWrapper><Story/></RadixThemeWrapper>
        },
    ],

    tags: ["autodocs"]
};

export default preview;