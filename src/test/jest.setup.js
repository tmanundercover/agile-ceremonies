import '@testing-library/jest-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
// Setup globals for tests
global.React = React;
global.ReactDOM = ReactDOM;
// Extend Jest matchers with all Testing Library matchers
expect.extend({
    ...'@testing-library/jest-dom'.matchers,
});
// Configure and add image snapshot matcher
const customConfig = {
    customDiffConfig: {
        threshold: 0.1,
    },
    failureThreshold: 0.02,
    failureThresholdType: 'percent',
};
expect.extend({
    toMatchImageSnapshot: (received) => toMatchImageSnapshot.call(expect(received), customConfig)
});
// Suppress act() warnings and useLayoutEffect warnings
const originalError = console.error;
console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0]) ||
        /Warning.*useLayoutEffect does nothing on the server/.test(args[0])) {
        return;
    }
    originalError.call(console, ...args);
};
