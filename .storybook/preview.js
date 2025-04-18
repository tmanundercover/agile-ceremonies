import RadixThemeWrapper from "../src/test/RadixThemeWrapper";
import React from 'react';
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
        (Story) => {
            return React.createElement(RadixThemeWrapper, null,
                React.createElement(Story, null));
        },
    ],
    tags: ["autodocs"]
};
export default preview;
//# sourceMappingURL=preview.js.map