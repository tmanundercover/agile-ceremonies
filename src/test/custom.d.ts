import '@testing-library/jest-dom';

declare global {
  namespace Testing {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveValue(value: string | number | string[]): R;
      // Add other matchers as needed
    }
  }
}

export {};
