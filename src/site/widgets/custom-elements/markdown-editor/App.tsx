import React, { useState, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import './App.css';

// Add utility function for SVG conversion
const convertSvgToDataUrl = (svgContent: string): string => {
    const encoded = encodeURIComponent(svgContent)
        .replace(/'/g, '%27')
        .replace(/"/g, '%22');
    return `data:image/svg+xml,${encoded}`;
};

// Custom components for ReactMarkdown
const components = {
    img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
        if (src?.toLowerCase().endsWith('.svg')) {
            // Handle SVG images
            try {
                const dataUrl = src.startsWith('data:') ? src : convertSvgToDataUrl(src);
                return <img src={dataUrl} alt={alt} {...props} />;
            } catch (error) {
                console.error('Error converting SVG:', error);
                return <img src={src} alt={alt} {...props} />;
            }
        }
        return <img src={src} alt={alt} {...props} />;
    }
};

interface AppProps {
    initialValue?: string;
}

const App: React.FC<AppProps> = ({ initialValue = '# Hello, Markdown!' }) => {
    const [markdownText, setMarkdownText] = useState<string>(initialValue);
    const [error, setError] = useState<string | null>(null);
    const editorRef = useRef<any>(null);

    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
        // Configure editor settings
        editor.updateOptions({
            wordWrap: 'on',
            minimap: { enabled: false },
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            theme: 'vs-dark'
        });
    };

    const handleEditorChange = (value: string | undefined) => {
        setMarkdownText(value || '');
        setError(null);
    };

    const saveFile = () => {
        try {
            const blob = new Blob([markdownText], { type: 'text/markdown' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'document.md';
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(`Error saving file: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };

    const insertMarkdown = (template: string) => {
        if (editorRef.current) {
            const editor = editorRef.current;
            const selection = editor.getSelection();
            const selectedText = editor.getModel().getValueInRange(selection);
            
            let textToInsert = template;
            if (selectedText) {
                textToInsert = template.replace('$1', selectedText);
            }
            
            editor.executeEdits('', [{
                range: selection,
                text: textToInsert,
                forceMoveMarkers: true
            }]);
            editor.focus();
        }
    };

    const markdownActions = [
        { label: 'Bold', template: '**$1**' },
        { label: 'Italic', template: '*$1*' },
        { label: 'H1', template: '# $1' },
        { label: 'H2', template: '## $1' },
        { label: 'H3', template: '### $1' },
        { label: 'Link', template: '[$1](url)' },
        { label: 'Image', template: '![$1](image-url)' },
        { label: 'Code', template: '`$1`' },
        { label: 'Code Block', template: '```\n$1\n```' },
        { label: 'Quote', template: '> $1' },
        { label: 'List', template: '- $1' },
        { label: 'Numbered List', template: '1. $1' },
    ];

    return (
        <div className="app-container">
            <div className="toolbar">
                <button onClick={saveFile}>Save as MD</button>
                {error && <div className="error-message">{error}</div>}
            </div>

            <div className="editor-container">
                <div className="editor-pane">
                    <h2>Editor</h2>
                    <div className="markdown-toolbar">
                        {markdownActions.map((action) => (
                            <button
                                key={action.label}
                                onClick={() => insertMarkdown(action.template)}
                                className="markdown-button"
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                    <div className="editor-wrapper">
                        <Editor
                            height="500px"
                            defaultLanguage="markdown"
                            defaultValue={initialValue}
                            onChange={handleEditorChange}
                            onMount={handleEditorDidMount}
                            options={{
                                fontSize: 14,
                                lineHeight: 21,
                                scrollBeyondLastLine: false,
                                wordWrap: 'on',
                                wrappingStrategy: 'advanced',
                                minimap: { enabled: false },
                                contextmenu: true,
                                lineNumbers: 'on',
                                roundedSelection: false,
                                automaticLayout: true,
                            }}
                        />
                    </div>
                </div>

                <div className="preview-pane">
                    <h2>Preview</h2>
                    <div className="preview">
                        <ReactMarkdown 
                            rehypePlugins={[rehypeSanitize]}
                            components={components}
                        >
                            {markdownText}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

