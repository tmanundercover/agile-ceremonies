import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LandingPageBuilder } from '../../LandingPageBuilder';
import { callOpenAI } from '../../OpenAIBackendAPI';
import { generateLandingPage } from '../../../../../../../../server/api/openai/landing-page';

jest.mock('../../OpenAIBackendAPI');
const mockedCallOpenAI = callOpenAI as jest.MockedFunction<typeof callOpenAI>;
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

  it('handles file upload', () => {
    render(<LandingPageBuilder />);
    const file = new File(['<svg>test</svg>'], 'test.svg', { type: 'image/svg+xml' });
    const fileInput = screen.getByLabelText(/Upload SVG Graphic/i);

    fireEvent.change(fileInput, { target: { files: [file] } });

    // Mock FileReader
    const mockFileReader = {
      readAsText: jest.fn(),
      onload: null,
      result: '<svg>test</svg>'
    };
    (window as any).FileReader = jest.fn(() => mockFileReader);
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

    render(<LandingPageBuilder />);

    // Submit form
    fireEvent.click(screen.getByText('Generate Preview'));

    // Check PromptViewer appears with loading state
    const promptViewer = screen.getByTestId('prompt-viewer');
    expect(promptViewer).toBeInTheDocument();
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    expect(promptViewer).toHaveStyle({ border: '2px solid #3b82f6' }); // Loading state border
  });

  it('handles successful form submission', async () => {
    mockedCallOpenAI.mockResolvedValueOnce('<svg>Generated Content</svg>');
    render(<LandingPageBuilder />);

    fireEvent.click(screen.getByText('Generate Preview'));

    expect(screen.getByText('Generating...')).toBeInTheDocument();
    expect(screen.getByTestId('prompt-viewer')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Generation completed successfully!')).toBeInTheDocument();
      expect(screen.getByTestId('prompt-viewer')).toHaveStyle({ border: '2px solid #22c55e' });
    });
  });

  it('handles API error', async () => {
    const errorMessage = 'API Error';
    mockedCallOpenAI.mockRejectedValueOnce(new Error(errorMessage));
    render(<LandingPageBuilder />);

    fireEvent.click(screen.getByText('Generate Preview'));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByTestId('prompt-viewer')).toHaveStyle({ border: '2px solid #ef4444' });
    });
  });
  it('shows success state in PromptViewer after successful generation', async () => {
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
      const promptViewer = screen.getByTestId('prompt-viewer');
      expect(promptViewer).toHaveStyle({ border: '2px solid #22c55e' }); // Success state border
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
      expect(screen.getByText('Generation completed successfully!')).toBeInTheDocument();
      expect(screen.getByTestId('status-message')).toHaveTextContent('Generation completed successfully!');
    });
    expect(screen.getByTestId('prompt-viewer')).toBeInTheDocument();
  });
  it('opens and closes style guide modal', () => {
    render(<LandingPageBuilder />);

    fireEvent.click(screen.getByText('Edit Style Guide'));
    expect(screen.getByText(/Style Guide/i)).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByText(/Style Guide/i)).not.toBeInTheDocument();
  });

  it('closes prompt viewer', async () => {
    mockedCallOpenAI.mockResolvedValueOnce('<svg>Generated Content</svg>');
    render(<LandingPageBuilder />);

    fireEvent.click(screen.getByText('Generate Preview'));
    await waitFor(() => {
      expect(screen.getByTestId('prompt-viewer')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('prompt-viewer-close'));
    expect(screen.queryByTestId('prompt-viewer')).not.toBeInTheDocument();
  });

  it('stays visible when in loading state', () => {
    // Mock the API with a never-resolving promise to keep loading state
    mockedGenerateLandingPage.mockImplementation(() => new Promise(() => {}));

    render(<LandingPageBuilder />);

    // Trigger generation
    fireEvent.click(screen.getByText('Generate Preview'));

    // Verify PromptViewer is visible with loading indicators
    const promptViewer = screen.getByTestId('prompt-viewer');
    expect(promptViewer).toBeInTheDocument();
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Verify it remains visible
    expect(promptViewer).toBeVisible();
    expect(screen.queryByTestId('prompt-viewer-close')).toBeInTheDocument();
  });
});
