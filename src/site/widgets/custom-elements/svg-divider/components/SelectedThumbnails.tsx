import React, { useState } from 'react';
import { SvgThumbnail } from '../types';
import { SelectedThumbnailsWrapper } from '../styledComponents';
import ProcessingOptions from './ProcessingOptions';
import { saveSvgFile } from '../utils/fileSaver';

interface SelectedThumbnailsProps {
    thumbnails: SvgThumbnail[];
    parentSvgProps: {[key: string]: string};
    processedResult: string | null;
    onProcessLayered: () => void;
    onProcessOriginal: () => void;
}

const SelectedThumbnails: React.FC<SelectedThumbnailsProps> = ({
    thumbnails,
    parentSvgProps,
    processedResult,
    onProcessLayered,
    onProcessOriginal,
}) => {
    const [displayMode, setDisplayMode] = useState<'preview'>('preview');

    const handleSave = (type: 'layered' | 'original') => {
        if (!processedResult) return;
        const filename = type === 'layered' ? 'layered.svg' : 'original.svg';
        saveSvgFile(processedResult, filename);
    };

    return (
        <div>
            <h3>Selected Components ({thumbnails.length})</h3>
            <ProcessingOptions
                onProcessLayered={() => {
                    setDisplayMode('preview');
                    onProcessLayered();
                }}
                onProcessOriginal={() => {
                    setDisplayMode('preview');
                    onProcessOriginal();
                }}
                onSave={handleSave}
            />
            <SelectedThumbnailsWrapper>
                {processedResult ? (
                    <div dangerouslySetInnerHTML={{ __html: processedResult }} />
                ) : (
                    <svg {...parentSvgProps}>
                        {thumbnails.map((thumbnail) => {
                            const svgContent = decodeURIComponent(thumbnail.src.split(',')[1]);
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(svgContent, 'image/svg+xml');
                            const element = doc.querySelector('svg > *');
                            
                            return element ? (
                                <g 
                                    key={thumbnail.id}
                                    dangerouslySetInnerHTML={{ __html: element.outerHTML }}
                                />
                            ) : null;
                        })}
                    </svg>
                )}
            </SelectedThumbnailsWrapper>
        </div>
    );
};

export default SelectedThumbnails;
