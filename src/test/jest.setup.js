import '@testing-library/jest-dom';
import React from 'react';
import ReactDOM from 'react-dom';
// Setup globals for tests
global.React = React;
global.ReactDOM = ReactDOM;
// Extend Jest matchers with all Testing Library matchers
expect.extend({
    ...'@testing-library/jest-dom'.matchers,
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
