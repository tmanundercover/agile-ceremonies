import React from 'react';

interface StatusDisplayProps {
    progress: number;
    status: string;
    messages: string[];
}

export const ProjectStatusDisplay: React.FC<StatusDisplayProps> = ({
                                                                       progress,
                                                                       status,
                                                                       messages
                                                                   }) => {
    return (
        <div className="status-display">
            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="status-message">
                Current Status: {status}
            </div>
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        {msg}
                    </div>
                ))}
            </div>
        </div>
    );
};