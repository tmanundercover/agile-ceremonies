import React from 'react';
import ReactMarkdown from 'react-markdown';
import { PreviewPane, PreviewContainer, MarkdownContent } from './styles';

interface PreviewProps {
    markdown: string;
    onUpdateMarkdown?: (newMarkdown: string) => void;
}

export const Preview: React.FC<PreviewProps> = ({ markdown }) => {
    return (
        <PreviewPane>
            <PreviewContainer>
                <MarkdownContent>
                    <div dangerouslySetInnerHTML={{ __html: markdown }} />
                </MarkdownContent>
            </PreviewContainer>
        </PreviewPane>
    );
};
