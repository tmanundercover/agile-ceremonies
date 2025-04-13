import React, {useEffect, useState} from 'react';
import {CheckIcon, CrossCircledIcon} from '@radix-ui/react-icons';
import {
    IndicatorContainer,
    LoadingSpinner,
    LoadingText,
    OpenAIIcon,
    StatusBanner
} from "../landing-page-builder-styled-components";

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
        setIsVisible(true);

        // Only show loading message when no success/error message is present
        if (status === 'loading' && !message) return;

        const timeout = status === 'success' ? 3000 : 5000;
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, timeout);

        return () => clearTimeout(timer);
    }, [status, message]);

    return (
        <IndicatorContainer
            data-testid={dataTestId}
            data-visible={isVisible.toString()}
            $isVisible={isVisible}  // Changed from isVisible to $isVisible
        >
            {status === 'loading' && !message && (
                <LoadingText data-testid="loading-indicator">
                    <LoadingSpinner data-testid="loading-indicator">
                        <OpenAIIcon viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21.3333 11.9996C21.3333 17.155 17.155 21.3333 11.9996 21.3333C6.84417 21.3333 2.66663 17.155 2.66663 11.9996C2.66663 6.84417 6.84417 2.66663 11.9996 2.66663"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"/>
                        </OpenAIIcon>
                    </LoadingSpinner>
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
                            <CheckIcon/>
                            {message}
                        </>
                    ) : (
                        <>
                            <CrossCircledIcon/>
                            {message}
                        </>
                    )}
                </StatusBanner>
            )}
        </IndicatorContainer>
    );
};

