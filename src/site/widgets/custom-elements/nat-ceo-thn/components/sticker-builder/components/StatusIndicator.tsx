import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { CheckIcon, CrossCircledIcon } from '@radix-ui/react-icons';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const IndicatorContainer = styled.div`
  position: absolute;
  left: 50%;
  top: -80px; // Position above the PromptViewer
  transform: translateX(-50%);
  z-index: 2000;
  min-width: 300px;
  max-width: 600px;
  animation: ${slideUp} 0.3s ease-out forwards;
`;

const LoadingText = styled.div`
  padding: 1rem 2rem;
  font-weight: bold;
  color: #0066ff;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const StatusBanner = styled.div<{ status: 'success' | 'error' }>`
  padding: 1rem 2rem;
  border-radius: 6px;
  background: ${({ status }) => status === 'success' ? '#E6F4EA' : '#FEEEE2'};
  color: ${({ status }) => status === 'success' ? '#1B873B' : '#B42318'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

interface StatusIndicatorProps {
  status: 'loading' | 'success' | 'error';
  message?: string;
  'data-testid'?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  message,
  'data-testid': dataTestId
}) => {
  return (
    <IndicatorContainer data-testid={dataTestId}>
      {status === 'loading' && (
        <LoadingText data-testid="loading-indicator">
          Processing request...
        </LoadingText>
      )}
      {(status === 'success' || status === 'error') && message && (
        <StatusBanner 
          status={status as 'success' | 'error'}
          data-testid="status-message"
        >
          {status === 'success' ? (
            <>
              <CheckIcon />
              {message}
            </>
          ) : (
            <>
              <CrossCircledIcon />
              {message}
            </>
          )}
        </StatusBanner>
      )}
    </IndicatorContainer>
  );
};

