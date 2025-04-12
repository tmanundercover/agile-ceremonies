import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VoteDesign } from '../VoteDesign';

// Mock Radix icons
jest.mock('@radix-ui/react-icons', () => ({
  Thum: () => <div data-testid="check-icon" />,
  CrossCircledIcon: () => <div data-testid="cross-icon" />
}));

describe('VoteDesign', () => {
  const mockOnVote = jest.fn();

  beforeEach(() => {
    mockOnVote.mockClear();
  });

  it('renders all vote buttons', () => {
    render(<VoteDesign onVote={mockOnVote} data-testid="vote-design" />);

    expect(screen.getByTestId('vote-up')).toBeInTheDocument();
    expect(screen.getByTestId('vote-meh')).toBeInTheDocument();
    expect(screen.getByTestId('vote-down')).toBeInTheDocument();
  });

  it('calls onVote with correct vote type when buttons are clicked', () => {
    render(<VoteDesign onVote={mockOnVote} data-testid="vote-design" />);

    fireEvent.click(screen.getByTestId('vote-up'));
    expect(mockOnVote).toHaveBeenCalledWith('up');

    fireEvent.click(screen.getByTestId('vote-meh'));
    expect(mockOnVote).toHaveBeenCalledWith('meh');

    fireEvent.click(screen.getByTestId('vote-down'));
    expect(mockOnVote).toHaveBeenCalledWith('down');

    expect(mockOnVote).toHaveBeenCalledTimes(3);
  });

  it('displays correct labels for each button', () => {
    render(<VoteDesign onVote={mockOnVote} data-testid="vote-design" />);

    expect(screen.getByText('Love it!')).toBeInTheDocument();
    expect(screen.getByText('Meh...')).toBeInTheDocument();
    expect(screen.getByText('Nope')).toBeInTheDocument();
  });
});
