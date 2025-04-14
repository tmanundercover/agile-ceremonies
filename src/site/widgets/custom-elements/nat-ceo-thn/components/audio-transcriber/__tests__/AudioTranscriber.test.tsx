import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AudioTranscriber from '../AudioTranscriber';
import * as utils from '../AudioTranscriber-utils';

// Mock the utils
jest.mock('../AudioTranscriber-utils', () => ({
  createAudioUrl: jest.fn(),
  transcribeAudio: jest.fn(),
  generateSummary: jest.fn(),
}));

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn();

describe('AudioTranscriber', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<AudioTranscriber />);
    expect(screen.getByText('Audio Transcription & Summary')).toBeInTheDocument();
  });

  it('handles file upload', () => {
    render(<AudioTranscriber />);
    const file = new File(['dummy content'], 'test.mp3', { type: 'audio/mp3' });
    const input = screen.getByRole('input', { type: 'file' });

    fireEvent.change(input, { target: { files: [file] } });
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  it('disables transcribe button when no file is uploaded', () => {
    render(<AudioTranscriber />);
    const transcribeButton = screen.getByText('Transcribe Audio');
    expect(transcribeButton).toBeDisabled();
  });

  it('disables summary button when no transcription exists', () => {
    render(<AudioTranscriber />);
    const summaryButton = screen.getByText('Generate Summary');
    expect(summaryButton).toBeDisabled();
  });

  it('handles transcription process', async () => {
    const mockTranscription = 'Test transcription';
    (utils.transcribeAudio as jest.Mock).mockResolvedValue(mockTranscription);

    render(<AudioTranscriber />);
    
    // Upload file
    const file = new File(['dummy content'], 'test.mp3', { type: 'audio/mp3' });
    const input = screen.getByRole('input', { type: 'file' });
    fireEvent.change(input, { target: { files: [file] } });

    // Click transcribe
    const transcribeButton = screen.getByText('Transcribe Audio');
    fireEvent.click(transcribeButton);

    // Check loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for transcription
    await waitFor(() => {
      expect(screen.getByText(mockTranscription)).toBeInTheDocument();
    });
  });

  it('handles summary generation', async () => {
    const mockSummary = 'Test summary';
    (utils.generateSummary as jest.Mock).mockResolvedValue(mockSummary);

    render(<AudioTranscriber />);
    
    // Set up initial state with transcription
    const file = new File(['dummy content'], 'test.mp3', { type: 'audio/mp3' });
    const input = screen.getByRole('input', { type: 'file' });
    fireEvent.change(input, { target: { files: [file] } });

    // Mock transcription
    const transcribeButton = screen.getByText('Transcribe Audio');
    fireEvent.click(transcribeButton);
    await waitFor(() => {
      const summaryButton = screen.getByText('Generate Summary');
      expect(summaryButton).not.toBeDisabled();
    });

    // Generate summary
    const summaryButton = screen.getByText('Generate Summary');
    fireEvent.click(summaryButton);

    // Check loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for summary
    await waitFor(() => {
      expect(screen.getByText(mockSummary)).toBeInTheDocument();
    });
  });

  it('handles transcription errors', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    (utils.transcribeAudio as jest.Mock).mockRejectedValue(new Error('Transcription failed'));

    render(<AudioTranscriber />);
    
    // Upload file and trigger transcription
    const file = new File(['dummy content'], 'test.mp3', { type: 'audio/mp3' });
    const input = screen.getByRole('input', { type: 'file' });
    fireEvent.change(input, { target: { files: [file] } });

    const transcribeButton = screen.getByText('Transcribe Audio');
    fireEvent.click(transcribeButton);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalled();
      expect(screen.getByText('No transcription available')).toBeInTheDocument();
    });

    consoleError.mockRestore();
  });

  it('handles summary generation errors', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    (utils.generateSummary as jest.Mock).mockRejectedValue(new Error('Summary generation failed'));

    render(<AudioTranscriber />);
    
    // Set up initial state with transcription
    const transcription = 'Test transcription';
    (utils.transcribeAudio as jest.Mock).mockResolvedValue(transcription);

    // Trigger summary generation
    const summaryButton = screen.getByText('Generate Summary');
    fireEvent.click(summaryButton);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalled();
      expect(screen.getByText('No summary available')).toBeInTheDocument();
    });

    consoleError.mockRestore();
  });
});
