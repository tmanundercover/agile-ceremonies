import '@testing-library/jest-dom';
// Extend Jest matchers with all Testing Library matchers
expect.extend({
    ...'@testing-library/jest-dom'.matchers,
});
// Suppress act() warnings
const originalError = console.error;
console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
        return;
    }
    originalError.call(console, ...args);
};
