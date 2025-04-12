import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LandingPageBuilder } from '../../LandingPageBuilder';
import { generateLandingPage } from '../../../../../../../../server/api/openai/landing-page';

jest.mock('../../../../../../../../server/api/openai/landing-page');
const mockedGenerateLandingPage = generateLandingPage as jest.MockedFunction<typeof generateLandingPage>;

describe('LandingPageBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(<LandingPageBuilder />);

    expect(screen.getByLabelText(/Main Message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Keywords/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Calls to Action/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload SVG Graphic/i)).toBeInTheDocument();
    expect(screen.getByText(/Edit Style Guide/i)).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    render(<LandingPageBuilder />);

    const mainMessageInput = screen.getByLabelText(/Main Message/i);
    const keywordsInput = screen.getByLabelText(/Keywords/i);
    const ctaInput = screen.getByLabelText(/Calls to Action/i);

    fireEvent.change(mainMessageInput, { target: { value: 'New Message' } });
    fireEvent.change(keywordsInput, { target: { value: 'test1, test2' } });
    fireEvent.change(ctaInput, { target: { value: 'CTA1, CTA2' } });

    expect(mainMessageInput).toHaveValue('New Message');
    expect(keywordsInput).toHaveValue('test1, test2');
    expect(ctaInput).toHaveValue('CTA1, CTA2');
  });

  it('shows loading state and success state during generation', async () => {
    mockedGenerateLandingPage.mockResolvedValueOnce({
      choices: [{
        message: {
          content: '<svg>Test SVG</svg>'
        }
      }]
    });

    render(<LandingPageBuilder />);
    fireEvent.click(screen.getByText('Generate Preview'));

    // Check loading state
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    expect(screen.getByText('Processing request...')).toBeInTheDocument();

    // Check success state
    await waitFor(() => {
      expect(screen.getByText('Generation completed successfully!')).toBeInTheDocument();
      expect(screen.getByTestId('prompt-viewer')).toHaveStyle({ border: '2px solid #22c55e' });
    });
  });

  it('handles API error states', async () => {
    const errorMessage = 'API Error';
    mockedGenerateLandingPage.mockRejectedValueOnce(new Error(errorMessage));

    render(<LandingPageBuilder />);
    fireEvent.click(screen.getByText('Generate Preview'));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByTestId('prompt-viewer')).toHaveStyle({ border: '2px solid #ef4444' });
    });
  });

  it('handles the complete voting and locking flow', async () => {
    mockedGenerateLandingPage.mockResolvedValueOnce({
      choices: [{
        message: {
          content: '<svg>Test SVG</svg>'
        }
      }]
    });

    render(<LandingPageBuilder />);
    fireEvent.click(screen.getByText('Generate Preview'));

    await waitFor(() => {
      expect(screen.getByText('Generation completed successfully!')).toBeInTheDocument();
    });

    // Test voting buttons
    const upVoteButton = screen.getByTitle('Save as favorite');
    const mehButton = screen.getByTitle('Save with low priority');
    const downVoteButton = screen.getByTitle('Archive for deconstruction');
    const lockButton = screen.getByTitle('Lock in vote');

    // Test each vote type
    fireEvent.click(upVoteButton);
    expect(screen.getByTestId('prompt-viewer')).toHaveStyle({ border: '2px solid #22c55e' });

    fireEvent.click(mehButton);
    expect(screen.getByTestId('prompt-viewer')).toHaveStyle({ border: '2px solid #22c55e' });

    fireEvent.click(downVoteButton);
    expect(screen.getByTestId('prompt-viewer')).toHaveStyle({ border: '2px solid #22c55e' });

    // Lock the vote
    fireEvent.click(lockButton);

    // Verify final state
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
      expect(screen.getByTestId('saved-preview')).toBeInTheDocument();
      expect(screen.queryByTestId('prompt-viewer')).not.toBeInTheDocument();
    });
  });

  it('disables voting after locking', async () => {
    mockedGenerateLandingPage.mockResolvedValueOnce({
      choices: [{
        message: {
          content: '<svg>Test SVG</svg>'
        }
      }]
    });

    render(<LandingPageBuilder />);
    fireEvent.click(screen.getByText('Generate Preview'));

    await waitFor(() => {
      expect(screen.getByTitle('Save as favorite')).not.toBeDisabled();
    });

    // Vote and lock
    fireEvent.click(screen.getByTitle('Save as favorite'));
    fireEvent.click(screen.getByTitle('Lock in vote'));

    // Verify buttons are disabled
    await waitFor(() => {
      const voteButtons = screen.getAllByRole('button');
      const actionButtons = voteButtons.filter(button =>
        ['Save as favorite', 'Save with low priority', 'Archive for deconstruction']
          .includes(button.getAttribute('title') || ''));

      actionButtons.forEach(button => {
        expect(button).toBeDisabled();
      });
    });
  });
});
