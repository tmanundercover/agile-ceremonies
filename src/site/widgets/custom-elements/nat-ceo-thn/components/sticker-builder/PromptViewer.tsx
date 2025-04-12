import React from 'react';
import styled from 'styled-components';
import { OpenAIApiRequest } from './OpenAIBackendAPI';

const ViewerContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-weight: bold;
  color: #0066ff;
`;

interface PromptViewerProps {
  request: OpenAIApiRequest;
}

export const PromptViewer: React.FC<PromptViewerProps> = ({ request }) => {
  return (
    <ViewerContainer>
      <h3>Generating Landing Page</h3>
      <div>
        <h4>System Prompt:</h4>
        <pre>{request.messages[0].content}</pre>
        
        <h4>User Prompt:</h4>
        <pre>{request.messages[1].content}</pre>
        
        <h4>Configuration:</h4>
        <pre>
          Model: {request.model}
          Temperature: {request.temperature}
          Max Tokens: {request.max_tokens}
        </pre>
      </div>
      <LoadingSpinner>
        Processing request...
      </LoadingSpinner>
    </ViewerContainer>
  );
};
