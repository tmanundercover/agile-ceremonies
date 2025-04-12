import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StatusIndicator } from '../StatusIndicator';

// Mock Radix icons
jest.mock('@radix-ui/react-icons', () => ({
  CheckIcon: () => <div data-testid="check-icon" />,
  CrossCircledIcon: () => <div data-testid="cross-icon" />
}));

describe('StatusIndicator', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders loading state correctly', () => {
    render(<StatusIndicator status="loading" data-testid="status-indicator" />);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    expect(screen.getByText('Processing request...')).toBeInTheDocument();
  });

  it('renders success state with message', () => {
    render(
      <StatusIndicator
        status="success"
        message="Operation successful"
        data-testid="status-indicator"
      />
    );

    expect(screen.getByTestId('status-message')).toBeInTheDocument();
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    expect(screen.getByText('Operation successful')).toBeInTheDocument();
  });

  it('renders error state with message', () => {
    render(
      <StatusIndicator
        status="error"
        message="Something went wrong"
        data-testid="status-indicator"
      />
    );

    expect(screen.getByTestId('status-message')).toBeInTheDocument();
    expect(screen.getByTestId('cross-icon')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('remains visible in loading state', () => {
    render(<StatusIndicator status="loading" data-testid="status-indicator" />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const indicator = screen.getByTestId('status-indicator');
    expect(indicator.getAttribute('data-visible')).toBe('true');
  });

  it('hides success message after 3 seconds', () => {
    render(
      <StatusIndicator
        status="success"
        message="Operation successful"
        data-testid="status-indicator"
      />
    );

    const indicator = screen.getByTestId('status-indicator');
    expect(indicator.getAttribute('data-visible')).toBe('true');

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(indicator.getAttribute('data-visible')).toBe('false');
  });

  it('hides error message after 5 seconds', () => {
    render(
      <StatusIndicator
        status="error"
        message="Something went wrong"
        data-testid="status-indicator"
      />
    );

    const indicator = screen.getByTestId('status-indicator');
    expect(indicator.getAttribute('data-visible')).toBe('true');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(indicator.getAttribute('data-visible')).toBe('false');
  });

  it('resets visibility when status changes', () => {
    const { rerender } = render(
      <StatusIndicator
        status="success"
        message="Success"
        data-testid="status-indicator"
      />
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    rerender(
      <StatusIndicator
        status="error"
        message="Error"
        data-testid="status-indicator"
      />
    );

    const indicator = screen.getByTestId('status-indicator');
    expect(indicator.getAttribute('data-visible')).toBe('true');
  });
});

