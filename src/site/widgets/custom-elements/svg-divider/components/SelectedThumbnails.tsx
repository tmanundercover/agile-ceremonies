import React, { useState } from 'react';
import { SelectedThumbnailsProps } from '../types';
import { SelectedThumbnailsWrapper } from '../styledComponents';
import ProcessingOptions from './ProcessingOptions';
import { saveSvgFile } from '../utils/fileSaver';

const SelectedThumbnails: React.FC<SelectedThumbnailsProps> = ({
    thumbnails,
    parentSvgProps,
    processedResult,
    onProcessLayered,
    onProcessOriginal,
    onProcessCropped
}) => {
    const [displayMode, setDisplayMode] = useState<'preview'>('preview');

    const handleSave = (type: 'layered' | 'original' | 'cropped') => {
        if (!processedResult) return;
        const filename = `${type}.svg`;
        saveSvgFile(processedResult, filename);
    };

    const handleProcessLayered = () => {
        setDisplayMode('preview');
        if (onProcessLayered) onProcessLayered();
    };

    const handleProcessOriginal = () => {
        setDisplayMode('preview');
        if (onProcessOriginal) onProcessOriginal();
    };

    const handleProcessCropped = () => {
        setDisplayMode('preview');
        if (onProcessCropped) onProcessCropped();
    };

    return (
        <div>
            <h3>Selected Components ({thumbnails.length})</h3>
            <ProcessingOptions
                onProcessLayered={handleProcessLayered}
                onProcessOriginal={handleProcessOriginal}
                onProcessCropped={handleProcessCropped}
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
