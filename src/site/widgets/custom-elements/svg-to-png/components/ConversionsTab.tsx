import React, { useEffect } from 'react';
import Prism from 'prismjs';
import CopyButton from './CopyButton';
import { calculateSize } from '../utils/sizeUtils';
import {
    ConversionsForm,
    ConversionItem,
    ConversionHeader,
    ConversionContent
} from '../styledComponents';

interface ConversionResult {
    label: string;
    content: string;
    size: string;
}

const ConversionsTab: React.FC<{ svgContent: string }> = ({ svgContent }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, [svgContent]);

    const getConversions = (): ConversionResult[] => {
        const minified = svgContent.replace(/\s+/g, ' ').trim();
        const dataUri = `data:image/svg+xml,${encodeURIComponent(minified)}`;
        const base64 = btoa(minified);
        const base64Uri = `data:image/svg+xml;base64,${base64}`;

        return [
            { label: 'Minified', content: minified, size: calculateSize(minified) },
            { label: 'Data URI', content: dataUri, size: calculateSize(dataUri) },
            { label: 'Base64', content: base64, size: calculateSize(base64) },
            { label: 'Base64 URI', content: base64Uri, size: calculateSize(base64Uri) }
        ];
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <ConversionsForm onSubmit={handleSubmit}>
            {getConversions().map(({ label, content, size }) => (
                <ConversionItem key={label}>
                    <ConversionHeader>
                        <h3>{label}</h3>
                        <div className="actions">
                            <span className="size-info">{size}</span>
                            <CopyButton content={content} label={`Copy ${label}`} />
                        </div>
                    </ConversionHeader>
                    <ConversionContent>
                        {content}
                    </ConversionContent>
                </ConversionItem>
            ))}
        </ConversionsForm>
    );
};

export default ConversionsTab;

