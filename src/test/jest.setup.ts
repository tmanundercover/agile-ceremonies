import '@testing-library/jest-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

// Setup globals for tests
(global as any).React = React;
(global as any).ReactDOM = ReactDOM;

// Import types for @testing-library/jest-dom
declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(options?: any): R;
      toMatchVisualSnapshot(options?: any): R;
    }
  }
}

// Configure base image snapshot matcher
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: {
    threshold: 0.1,
  },
  failureThreshold: 0.02,
  failureThresholdType: 'percent',
});

// Configure visual snapshot matcher
const toMatchVisualSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: {
    threshold: 0.01,
  },
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
  customSnapshotsDir: '__image_snapshots__/visual',
});

// Extend Jest's expect
expect.extend({ 
  toMatchImageSnapshot,
  toMatchVisualSnapshot
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

