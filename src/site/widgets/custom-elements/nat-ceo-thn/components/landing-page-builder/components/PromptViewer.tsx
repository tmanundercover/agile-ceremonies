import React from 'react';
import styled from 'styled-components';
import { OpenAIApiRequest } from '../OpenAIBackendAPI';
import { StatusIndicator } from './StatusIndicator';
import { VoteDesign, VoteType } from './VoteDesign';

const ViewerContainer = styled.div<{ status?: 'loading' | 'success' | 'error' }>`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 2rem;
  padding-top: 3rem;
  margin-top: 60px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  max-width: 90vw;
  width: 1200px;
  min-width: 800px;
  height: calc(100vh - 164px); // Fixed height
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 2rem;
  grid-template-rows: 1fr auto;  // Add this line to support the vote section
  border: 2px solid ${({ status }) => {
    switch (status) {
      case 'loading':
        return '#3B82F6';
      case 'success':
        return '#22C55E';
      case 'error':
        return '#EF4444';
      default:
        return '#ddd';
    }
  }};
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-weight: bold;
  color: #3B82F6;
`;

const StatusBanner = styled.div<{ status: 'success' | 'error' }>`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  background: ${({ status }) => status === 'success' ? '#E6F4EA' : '#FEEEE2'};
  color: ${({ status }) => status === 'success' ? '#22C55E' : '#EF4444'};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const FormSection = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const FormField = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 1rem;
  font-family: monospace;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
  
  &:hover {
    border-color: #cbd5e1;
  }
`;

const ConfigField = styled(FormField)`
  .json-key {
    color: #0066ff;
  }
  .json-value {
    color: #16a34a;
  }
  .json-string {
    color: #ea580c;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto; // Enable scrolling
  padding-right: 1rem; // Add padding for scrollbar
  max-height: 100%; // Take full height
`;

const PreviewContainer = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  min-height: 300px;
  min-width: 300px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  // Add SVG placeholder when empty
  &:empty::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f1f5f9'/%3E%3Cpath d='M30,50 L70,50 M50,30 L50,70' stroke='%23cbd5e1' stroke-width='4'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
  }
`;

const VoteSection = styled.div`
  grid-column: 1 / -1;  // Span all columns
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  border-top: 1px solid #e2e8f0;
  margin-top: 1rem;
`;

interface PromptViewerProps {
  request: OpenAIApiRequest;
  status: 'loading' | 'success' | 'error';
  error: string | null;
  onClose: () => void;
  onVote?: (vote: VoteType) => void;
  onLockVote?: (vote: VoteType) => void;
  'data-testid'?: string;
}

export const PromptViewer: React.FC<PromptViewerProps> = ({
  request,
  status,
  error,
  onClose,
  onVote,
  onLockVote,
  'data-testid': dataTestId
}) => {
  const formatConfig = (config: Partial<OpenAIApiRequest>) => {
    const configObj = {
      model: config.model,
      temperature: config.temperature,
      max_tokens: config.max_tokens
    };

    return JSON.stringify(configObj, null, 2)
      .replace(/"([^"]+)":/g, '<span class="json-key">"$1":</span>')
      .replace(/: "([^"]+)"/g, ': <span class="json-string">"$1"</span>')
      .replace(/: ([0-9.]+)/g, ': <span class="json-value">$1</span>');
  };

  return (
    <ViewerContainer status={status} data-testid={dataTestId}>
      <StatusIndicator
        status={status}
        message={status === 'success' ? 'Generation completed successfully!' : error || undefined}
        data-testid="status-indicator"
      />
      <CloseButton onClick={onClose} data-testid="prompt-viewer-close">&times;</CloseButton>

      <FormContainer>
        <h3>Landing Page Generation Request</h3>
        <FormSection>
          <FormLabel>System Prompt</FormLabel>
          <FormField>
            {request.messages[0].content}
          </FormField>
        </FormSection>

        <FormSection>
          <FormLabel>User Prompt</FormLabel>
          <FormField>
            {request.messages[1].content}
          </FormField>
        </FormSection>

        <FormSection>
          <FormLabel>Configuration</FormLabel>
          <ConfigField
            dangerouslySetInnerHTML={{
              __html: formatConfig(request)
            }}
          />
        </FormSection>
      </FormContainer>

      <PreviewContainer id="prompt-preview">
        {/* Preview content will be injected here */}
      </PreviewContainer>

      {status === 'success' && onVote && onLockVote && (
        <VoteSection>
          <VoteDesign
            onVote={onVote}
            onLock={onLockVote}
            data-testid="design-vote"
          />
        </VoteSection>
      )}
    </ViewerContainer>
  );
};

