import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchScreenshot(options?: {
        customDiffConfig?: { threshold: number };
        failureThreshold?: number;
        failureThresholdType?: 'pixel' | 'percent';
        customSnapshotIdentifier?: string;
      }): R;
      toMatchSVGMockup(options?: {
        customDiffConfig?: { threshold: number };
        failureThreshold?: number;
        failureThresholdType?: 'pixel' | 'percent';
        customSnapshotIdentifier?: string;
      }): R;
    }
  }
}

export {};
