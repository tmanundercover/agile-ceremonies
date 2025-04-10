import '@testing-library/jest-dom';
import {configureToMatchImageSnapshot, MatchImageSnapshotOptions} from 'jest-image-snapshot';
import puppeteer from 'puppeteer';

// Configure screenshot matcher
const toMatchScreenshot = configureToMatchImageSnapshot({
  customDiffConfig: { threshold: 0.1 },
  failureThreshold: 0.02,
  failureThresholdType: 'percent',
  allowSizeMismatch: true
});


// Configure svg matcher
const toMatchSVGMockup = configureToMatchImageSnapshot({
  customDiffConfig: { threshold: 0.59 },
  failureThreshold: 0.02,
  failureThresholdType: 'percent',
  allowSizeMismatch: true,
});

// Extend Jest's expect
expect.extend({ 
  toMatchScreenshot,
  toMatchSVGMockup
});
