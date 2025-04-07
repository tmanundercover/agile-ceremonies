import React from 'react';
import ReactMarkdown from 'react-markdown';
import { PreviewPane, Preview as PreviewContainer } from './styles';

interface PreviewProps {
    markdown: string;
}

export const Preview: React.FC<PreviewProps> = ({ markdown }) => {
    return (
        <PreviewPane>
            <PreviewContainer>
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </PreviewContainer>
        </PreviewPane>
    );
};
