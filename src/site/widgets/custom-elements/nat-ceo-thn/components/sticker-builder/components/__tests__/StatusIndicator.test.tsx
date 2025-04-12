import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StatusIndicator } from '../StatusIndicator';
import { CheckIcon, CrossCircledIcon } from '@radix-ui/react-icons';

// Mock Radix icons
jest.mock('@radix-ui/react-icons', () => ({
  CheckIcon: () => <div data-testid="check-icon" />,
  CrossCircledIcon: () => <div data-testid="cross-icon" />
}));

describe('StatusIndicator', () => {
  it('shows loading state correctly', () => {
    render(<StatusIndicator status="loading" />);
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    expect(screen.getByText('Processing request...')).toBeInTheDocument();
  });

  it('shows success message', () => {
    render(<StatusIndicator status="success" message="Operation successful" />);
    const message = screen.getByTestId('status-message');
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('Operation successful');
    expect(message).toHaveStyle({ background: '#E6F4EA' });
  });

  it('shows error message', () => {
    render(<StatusIndicator status="error" message="Operation failed" />);
    const message = screen.getByTestId('status-message');
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('Operation failed');
    expect(message).toHaveStyle({ background: '#FEEEE2' });
  });

  it('maintains consistent height across states', () => {
    const { rerender } = render(<StatusIndicator status="loading" />);
    const loadingHeight = screen.getByTestId('loading-indicator').parentElement?.clientHeight;

    rerender(<StatusIndicator status="success" message="Success" />);
    const successHeight = screen.getByTestId('status-message').parentElement?.clientHeight;

    expect(loadingHeight).toBe(successHeight);
  });

  it('has correct positioning for snackbar appearance', () => {
    render(<StatusIndicator status="loading" />);
    const container = screen.getByTestId('loading-indicator').parentElement;
    expect(container).toHaveStyle({
      position: 'absolute',
      left: '50%',
      top: '-80px'
    });
  });

  it('includes Radix icons for success and error states', () => {
    const { rerender } = render(
      <StatusIndicator status="success" message="Operation successful" />
    );
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();

    rerender(<StatusIndicator status="error" message="Operation failed" />);
    expect(screen.getByTestId('cross-icon')).toBeInTheDocument();
  });
});

