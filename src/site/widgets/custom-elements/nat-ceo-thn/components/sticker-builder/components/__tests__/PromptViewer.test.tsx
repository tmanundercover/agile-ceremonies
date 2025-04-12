import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PromptViewer } from '../../PromptViewer';
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

  it('renders correctly with request data', () => {
    render(<PromptViewer request={mockRequest} />);

    // Check heading
    expect(screen.getByText('Generating Landing Page')).toBeInTheDocument();

    // Check prompt sections
    expect(screen.getByText('System Prompt:')).toBeInTheDocument();
    expect(screen.getByText('User Prompt:')).toBeInTheDocument();
    expect(screen.getByText('Configuration:')).toBeInTheDocument();

    // Check content
    expect(screen.getByText(mockRequest.messages[0].content)).toBeInTheDocument();
    expect(screen.getByText(mockRequest.messages[1].content)).toBeInTheDocument();
    expect(screen.getByText(/Model: gpt-4/)).toBeInTheDocument();
    expect(screen.getByText(/Temperature: 0.7/)).toBeInTheDocument();
    expect(screen.getByText(/Max Tokens: 2000/)).toBeInTheDocument();

    // Check loading spinner
    expect(screen.getByText('Processing request...')).toBeInTheDocument();
  });

  it('renders within a modal-like container', () => {
    const { container } = render(<PromptViewer request={mockRequest} />);
    
    // Check if the container has modal-like styling
    const viewerContainer = container.firstChild;
    expect(viewerContainer).toHaveStyle({
      position: 'fixed',
      background: 'white',
      padding: '2rem'
    });
  });

  it('handles long content with scrolling', () => {
    const longRequest: OpenAIApiRequest = {
      ...mockRequest,
      messages: [
        {
          role: 'system' as const,
          content: 'A'.repeat(1000)
        },
        {
          role: 'user' as const,
          content: 'B'.repeat(1000)
        }
      ]
    };

    const { container } = render(<PromptViewer request={longRequest} />);
    
    // Check if container has overflow handling
    const viewerContainer = container.firstChild;
    expect(viewerContainer).toHaveStyle({
      'max-height': '80vh',
      'overflow-y': 'auto'
    });
  });
});

