import React from 'react';
import styled from 'styled-components';
import { OpenAIApiRequest } from './OpenAIBackendAPI';
import { StatusIndicator } from './components/StatusIndicator';

const ViewerContainer = styled.div<{ status?: 'loading' | 'success' | 'error' }>`
  position: fixed;
  top: 10px; // Increased from 100px to allow space for status indicator
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 2rem;
  padding-top: 3rem; // Increased top padding
  margin-top: 60px; // Add margin for status indicator
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  max-width: 600px;
  width: 90%;
  max-height: calc(100vh - 260px); // Adjusted to account for top margin and status
  overflow-y: auto;
  border: 2px solid ${({ status }) => {
    switch (status) {
      case 'loading':
        return '#FFB800';
      case 'success':
        return '#00CC88';
      case 'error':
        return '#FF4444';
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
  color: #0066ff;
`;

const StatusBanner = styled.div<{ status: 'success' | 'error' }>`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  background: ${({ status }) => status === 'success' ? '#E6F4EA' : '#FEEEE2'};
  color: ${({ status }) => status === 'success' ? '#1B873B' : '#B42318'};
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
interface PromptViewerProps {
  request: OpenAIApiRequest;
  status: 'loading' | 'success' | 'error';
  error: string | null;
  onClose: () => void;
  'data-testid'?: string;
}

export const PromptViewer: React.FC<PromptViewerProps> = ({
  request,
  status,
  error,
  onClose,
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
        message={status === 'success' ? 'Generation completed successfully' : error || undefined}
        data-testid="status-indicator"
      />
      <CloseButton onClick={onClose} data-testid="prompt-viewer-close">&times;</CloseButton>
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
    </ViewerContainer>
  );
};

