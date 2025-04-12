import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CheckIcon, CrossCircledIcon } from '@radix-ui/react-icons';

const slideUp = keyframes`
  from {
    transform: translate(-50%, 20px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const IndicatorContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  left: 50%;
  top: -60px;
  transform: translateX(-50%);
  z-index: 1001; // Higher than PromptViewer
  min-width: 300px;
  max-width: 600px;
  animation: ${slideUp} 0.3s ease-out forwards,
             ${({ isVisible }) => !isVisible && fadeOut} 0.5s ease-out forwards;
  pointer-events: none; // Allows clicking through the indicator
`;

const LoadingText = styled.div`
  padding: 0.75rem 1.5rem;
  margin-bottom: -20px; // Pull the indicator closer to the container
  font-weight: bold;
  color: #3B82F6; // Updated to use info color
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  pointer-events: auto; // Re-enable pointer events for the actual message
`;

const StatusBanner = styled.div<{ status: 'success' | 'error' }>`
  padding: 0.75rem 1.5rem;
  margin-bottom: -20px; // Pull the indicator closer to the container
  border-radius: 6px;
  background: ${({status}) => status === 'success' ? '#E6F4EA' : '#FEEEE2'};
  color: #2c2929;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  pointer-events: auto; // Re-enable pointer events for the actual message
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
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Reset visibility when status changes
    setIsVisible(true);

    // Don't set timeout for loading state
    if (status === 'loading') return;

    // Set timeout duration based on status
    const timeout = status === 'success' ? 3000 : 5000;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, [status]);

  return (
    <IndicatorContainer
      data-testid={dataTestId}
      data-visible={isVisible.toString()}
      isVisible={isVisible}
    >
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

