import '@testing-library/jest-dom';
import React from 'react';

// Extend Jest matchers with all Testing Library matchers
expect.extend({
  ...('@testing-library/jest-dom' as any).matchers,
});

// Suppress act() warnings
const originalError = console.error;
console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};
