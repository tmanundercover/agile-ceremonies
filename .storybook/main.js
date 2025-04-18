const config = {
    "stories": [
        "../src/**/*.mdx",
        "../src/**/*.md",
        "../src/**/*.stories.@(mjs|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@chromatic-com/storybook",
        "@storybook/experimental-addon-test"
    ],
    "framework": {
        "name": "@storybook/react-vite",
        "options": {}
    }
};
export default config;
//# sourceMappingURL=main.js.map