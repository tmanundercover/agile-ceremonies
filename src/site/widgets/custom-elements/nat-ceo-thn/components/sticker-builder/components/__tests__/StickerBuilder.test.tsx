import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StickerBuilder } from '../../StickerBuilder';
import { generateLandingPage } from '../../../../../../../../server/api/openai/landing-page';

jest.mock('../../../../../../../../server/api/openai/landing-page');
const mockedGenerateLandingPage = generateLandingPage as jest.MockedFunction<typeof generateLandingPage>;

describe('StickerBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(<StickerBuilder />);

    expect(screen.getByLabelText(/Main Message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Keywords/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Calls to Action/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload SVG Graphic/i)).toBeInTheDocument();
  });

  it('handles successful form submission', async () => {
    // Mock successful API response
    mockedGenerateLandingPage.mockResolvedValueOnce({
      choices: [{
        message: {
          content: `
            <svg width="1200" height="800">
              <!-- Generated SVG content -->
            </svg>
          `
        }
      }]
    });

    render(<StickerBuilder />);

    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/Main Message/i), {
      target: { value: 'Test Message' }
    });

    fireEvent.change(screen.getByLabelText(/Keywords/i), {
      target: { value: 'test, keywords' }
    });

    fireEvent.change(screen.getByLabelText(/Calls to Action/i), {
      target: { value: 'Test CTA' }
    });

    // Submit form
    const submitButton = screen.getByText('Generate Preview');
    fireEvent.click(submitButton);

    // Verify loading state
    expect(screen.getByText('Generating...')).toBeInTheDocument();

    // Wait for completion
    await waitFor(() => {
      expect(screen.getByText('Generate Preview')).toBeEnabled();
    });

    // Verify API was called with correct request format
    expect(mockedGenerateLandingPage).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: expect.arrayContaining([
          expect.objectContaining({
            role: 'system',
            content: expect.any(String)
          }),
          expect.objectContaining({
            role: 'user',
            content: expect.any(String)
          })
        ]),
        model: 'gpt-4',
        temperature: 0.7,
        max_tokens: 2000
      })
    );
  });

  it('handles API error properly', async () => {
    mockedGenerateLandingPage.mockRejectedValueOnce(new Error('Failed to generate landing page'));

    render(<StickerBuilder />);

    const submitButton = screen.getByText('Generate Preview');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to generate landing page')).toBeInTheDocument();
      expect(submitButton).toBeEnabled();
    });
  });

  it('handles invalid response format', async () => {
    // @ts-ignore - intentionally returning invalid format
    mockedGenerateLandingPage.mockResolvedValueOnce({
      choices: []
    });

    render(<StickerBuilder />);

    const submitButton = screen.getByText('Generate Preview');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid response format from landing page generator')).toBeInTheDocument();
      expect(submitButton).toBeEnabled();
    });
  });
});

describe('StickerBuilder with PromptViewer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows PromptViewer with loading state when generating', async () => {
    // Mock API with delay to test loading state
    mockedGenerateLandingPage.mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve({
        choices: [{
          message: {
            content: '<svg>Test SVG</svg>'
          }
        }]
      }), 1000))
    );

    render(<StickerBuilder />);

    // Submit form
    fireEvent.click(screen.getByText('Generate Preview'));

    // Check PromptViewer appears with loading state
    const promptViewer = screen.getByTestId('prompt-viewer');
    expect(promptViewer).toBeInTheDocument();
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    expect(promptViewer).toHaveStyle({ border: '2px solid #FFB800' }); // Loading state border
  });

  it('shows success state in PromptViewer after successful generation', async () => {
    mockedGenerateLandingPage.mockResolvedValueOnce({
      choices: [{
        message: {
          content: '<svg>Test SVG</svg>'
        }
      }]
    });

    render(<StickerBuilder />);
    fireEvent.click(screen.getByText('Generate Preview'));

    await waitFor(() => {
      const promptViewer = screen.getByTestId('prompt-viewer');
      expect(promptViewer).toHaveStyle({ border: '2px solid #00CC88' }); // Success state border
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
      expect(screen.getByText('Generation completed successfully')).toBeInTheDocument();
      expect(screen.getByTestId('status-message')).toHaveTextContent('Generation completed successfully');
    });

    // PromptViewer should remain open
    expect(screen.getByTestId('prompt-viewer')).toBeInTheDocument();
  });

  it('shows error state in PromptViewer after failed generation', async () => {
    mockedGenerateLandingPage.mockRejectedValueOnce(new Error('API Error'));

    render(<StickerBuilder />);
    fireEvent.click(screen.getByText('Generate Preview'));

    await waitFor(() => {
      const promptViewer = screen.getByTestId('prompt-viewer');
      expect(promptViewer).toHaveStyle({ border: '2px solid #FF4444' }); // Error state border
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
      expect(screen.getByText('API Error')).toBeInTheDocument();
      expect(screen.getByTestId('status-message')).toHaveTextContent('API Error');
    });

    // PromptViewer should remain open
    expect(screen.getByTestId('prompt-viewer')).toBeInTheDocument();
  });

  it('closes PromptViewer only when close button is clicked', async () => {
    mockedGenerateLandingPage.mockResolvedValueOnce({
      choices: [{
        message: {
          content: '<svg>Test SVG</svg>'
        }
      }]
    });

    render(<StickerBuilder />);
    fireEvent.click(screen.getByText('Generate Preview'));

    await waitFor(() => {
      expect(screen.getByTestId('prompt-viewer')).toBeInTheDocument();
    });

    // Click close button
    fireEvent.click(screen.getByTestId('prompt-viewer-close'));
    expect(screen.queryByTestId('prompt-viewer')).not.toBeInTheDocument();
  });
});

