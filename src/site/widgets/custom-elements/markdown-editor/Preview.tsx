import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PreviewPane, PreviewContainer, MarkdownContent } from './styles';

interface PreviewProps {
    markdown: string;
    onUpdateMarkdown?: (newMarkdown: string) => void;
}

export const Preview: React.FC<PreviewProps> = ({ markdown }) => {
    useEffect(() => {
        // Cleanup function to revoke any blob URLs when component unmounts
        return () => {
            const images = document.querySelectorAll('img[src^="blob:"]');
            images.forEach((img) => {
                const imgElement = img as HTMLImageElement;
                if (imgElement.src.startsWith('blob:')) {
                    URL.revokeObjectURL(imgElement.src);
                }
            });
        };
    }, []);

    return (
        <PreviewPane>
            <PreviewContainer>
                <MarkdownContent>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({node, children}) => {
                                if (typeof children === 'string') {
                                    const content = children.trim();
                                    // If content is an img tag with data URL, render it directly
                                    if (content.startsWith('<img') && content.includes('data:image/svg+xml;base64,')) {
                                        return <div dangerouslySetInnerHTML={{ __html: content }} />;
                                    }
                                }
                                return <p>{children}</p>;
                            },
                            img: ({node, ...props}) => (
                                <img 
                                    {...props} 
                                    style={{ maxWidth: '550px', height: 'auto', display: 'block' }} 
                                    alt={props.alt || 'Image'}
                                />
                            )
                        }}
                    >
                        {markdown}
                    </ReactMarkdown>
                </MarkdownContent>
            </PreviewContainer>
        </PreviewPane>
    );
};

