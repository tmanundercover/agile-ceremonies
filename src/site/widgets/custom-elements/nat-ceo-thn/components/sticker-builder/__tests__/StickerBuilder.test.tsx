import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StickerBuilder } from '../StickerBuilder';
import { generateLandingPage } from '../../../../../../../server/api/openai/landing-page';

jest.mock('../../../../../../../server/api/openai/landing-page');
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
