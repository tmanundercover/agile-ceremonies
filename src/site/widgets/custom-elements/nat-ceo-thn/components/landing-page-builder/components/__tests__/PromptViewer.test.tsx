import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PromptViewer } from '../PromptViewer';
import { OpenAIApiRequest } from '../../OpenAIBackendAPI';

describe('PromptViewer', () => {
  const mockRequest: OpenAIApiRequest = {
    messages: [
      {
        role: 'system',
        content: 'You are a professional web designer'
      },
      {
        role: 'user',
        content: 'Create a landing page'
      }
    ],
    model: 'gpt-4',
    temperature: 0.7,
    max_tokens: 2000
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders correctly in loading state', () => {
    render(
      <PromptViewer
        request={mockRequest}
        status="loading"
        error={null}
        onClose={mockOnClose}
        data-testid="prompt-viewer"
      />
    );

    // Check content sections
    expect(screen.getByText('Landing Page Generation Request')).toBeInTheDocument();
    expect(screen.getByText(mockRequest.messages[0].content)).toBeInTheDocument();
    expect(screen.getByText(mockRequest.messages[1].content)).toBeInTheDocument();

    // Check loading state
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    expect(screen.getByText('Processing request...')).toBeInTheDocument();
  });

  it('renders success state correctly', () => {
    render(
      <PromptViewer
        request={mockRequest}
        status="success"
        error={null}
        onClose={mockOnClose}
        data-testid="prompt-viewer"
      />
    );

    expect(screen.getByText('Generation completed successfully!')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const errorMessage = 'Something went wrong';
    render(
      <PromptViewer
        request={mockRequest}
        status="error"
        error={errorMessage}
        onClose={mockOnClose}
        data-testid="prompt-viewer"
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <PromptViewer
        request={mockRequest}
        status="success"
        error={null}
        onClose={mockOnClose}
        data-testid="prompt-viewer"
      />
    );

    const closeButton = screen.getByTestId('prompt-viewer-close');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('handles long content with scrolling', () => {
    const longRequest: OpenAIApiRequest = {
      ...mockRequest,
      messages: [
        {
          role: 'system',
          content: 'A'.repeat(1000)
        },
        {
          role: 'user',
          content: 'B'.repeat(1000)
        }
      ]
    };

    render(
      <PromptViewer
        request={longRequest}
        status="loading"
        error={null}
        onClose={mockOnClose}
        data-testid="prompt-viewer"
      />
    );

    // Verify the content is rendered
    const systemPrompt = screen.getByText('A'.repeat(1000));
    const userPrompt = screen.getByText('B'.repeat(1000));

    expect(systemPrompt).toBeInTheDocument();
    expect(userPrompt).toBeInTheDocument();
  });

  it('hides voting buttons when not in success state', () => {
    render(
      <PromptViewer
        request={mockRequest}
        status="loading"
        error={null}
        onClose={mockOnClose}
        onVote={jest.fn()}
        data-testid="prompt-viewer"
      />
    );

    expect(screen.queryByTestId('design-vote')).not.toBeInTheDocument();
  });

  it('shows voting buttons when in success state', () => {
    const mockOnVote = jest.fn();
    const mockOnLockVote = jest.fn();

    render(
        <PromptViewer
            request={mockRequest}
            status="success"
            error={null}
            onClose={mockOnClose}
            onVote={mockOnVote}
            onLockVote={mockOnLockVote}
            data-testid="prompt-viewer"
        />
    );

    expect(screen.getByTestId('design-vote')).toBeInTheDocument();

    // Test each vote type using data-testid
    fireEvent.click(screen.getByTestId('vote-up'));
    expect(mockOnVote).toHaveBeenCalledWith('up');

    fireEvent.click(screen.getByTestId('vote-meh'));
    expect(mockOnVote).toHaveBeenCalledWith('meh');

    fireEvent.click(screen.getByTestId('vote-down'));
    expect(mockOnVote).toHaveBeenCalledWith('down');

    // Test lock button
    fireEvent.click(screen.getByTestId('vote-lock'));
    expect(mockOnLockVote).toHaveBeenCalledWith('down'); // Last selected vote
  });

  it('hides vote buttons and shows thank you message after vote is locked', () => {
    const mockOnVote = jest.fn();
    const mockOnLockVote = jest.fn();

    render(
      <PromptViewer
        request={mockRequest}
        status="success"
        error={null}
        onClose={mockOnClose}
        onVote={mockOnVote}
        onLockVote={mockOnLockVote}
        data-testid="prompt-viewer"
      />
    );

    // Vote and lock
    fireEvent.click(screen.getByTestId('vote-up'));
    fireEvent.click(screen.getByTestId('vote-lock'));

    // Verify voting UI is hidden and thank you message is shown
    expect(screen.queryByTestId('design-vote')).not.toBeVisible();
    expect(screen.getByText(/Thanks for your feedback!/)).toBeInTheDocument();
  });

  it('shows different emoji based on vote type', () => {
    const mockOnVote = jest.fn();
    const mockOnLockVote = jest.fn();

    const { rerender } = render(
      <PromptViewer
        request={mockRequest}
        status="success"
        error={null}
        onClose={mockOnClose}
        onVote={mockOnVote}
        onLockVote={mockOnLockVote}
        data-testid="prompt-viewer"
      />
    );

    // Test each vote type
    ['up', 'meh', 'down'].forEach((voteType) => {
      fireEvent.click(screen.getByTestId(`vote-${voteType}`));
      fireEvent.click(screen.getByTestId('vote-lock'));

      expect(screen.getByText(/Thanks for your feedback!/)).toBeInTheDocument();
      const expectedEmoji = voteType === 'up' ? '🎉' : voteType === 'meh' ? '👍' : '📝';
      expect(screen.getByText(expectedEmoji)).toBeInTheDocument();

      // Reset for next test
      rerender(
        <PromptViewer
          request={mockRequest}
          status="success"
          error={null}
          onClose={mockOnClose}
          onVote={mockOnVote}
          onLockVote={mockOnLockVote}
          data-testid="prompt-viewer"
        />
      );
    });
  });
});
