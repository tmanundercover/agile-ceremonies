import React, { useEffect, useCallback } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism.css';
import CopyButton from './CopyButton';
import { CodeBlock, CodeContainer } from '../styledComponents';

interface ReactComponentTabProps {
    svgContent: string;
}

const ReactComponentTab: React.FC<ReactComponentTabProps> = ({ svgContent }) => {
    const convertToReactComponent = useCallback((svg: string): string => {
        if (!svg) return '';
        
        // Convert SVG string to React component format
        let component = svg
            .replace(/class=/g, 'className=')
            .replace(/stroke-width=/g, 'strokeWidth=')
            .replace(/fill-rule=/g, 'fillRule=')
            .replace(/clip-rule=/g, 'clipRule=')
            .replace(/stroke-linecap=/g, 'strokeLinecap=')
            .replace(/stroke-linejoin=/g, 'strokeLinejoin=');

        // Wrap in React component
        const componentCode = `
import React from 'react';

const SvgComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    ${component}
);

export default SvgComponent;
`;

        return componentCode;
    }, []);

    useEffect(() => {
        // Force Prism to reinitialize when content changes
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                Prism.highlightAll();
            }, 0);
        }
    }, [svgContent]);

    const componentCode = convertToReactComponent(svgContent);

    return (
        <div className="react-component-tab">
            <div className="header-controls" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                <CopyButton content={componentCode} label="Copy React Component" />
            </div>
            <CodeContainer>
                <CodeBlock className="language-tsx">
                    {componentCode}
                </CodeBlock>
            </CodeContainer>
        </div>
    );
};

export default ReactComponentTab;

