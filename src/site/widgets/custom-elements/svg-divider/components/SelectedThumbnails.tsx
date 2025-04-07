import React, { useState } from 'react';
import { SvgThumbnail } from '../types';
import { SelectedThumbnailsWrapper } from '../styledComponents';
import ProcessingOptions from './ProcessingOptions';
import { saveSvgFile, saveMultipleSvgFiles } from '../utils/fileSaver';

interface SelectedThumbnailsProps {
    thumbnails: SvgThumbnail[];
    parentSvgProps: {[key: string]: string};
    processedResult: string | null;
    onProcessLayered: () => void;
    onProcessOriginal: () => void;
    onProcessIndividual: () => void;
}

const SelectedThumbnails: React.FC<SelectedThumbnailsProps> = ({
    thumbnails,
    parentSvgProps,
    processedResult,
    onProcessLayered,
    onProcessOriginal,
    onProcessIndividual
}) => {
    const handleSave = (type: 'layered' | 'original' | 'individual') => {
        if (!processedResult) return;

        if (type === 'individual') {
            const filename = prompt('Enter base filename for the component group:');
            if (!filename) return;

            // Split processedResult into individual SVGs if it contains multiple
            const svgContents = processedResult.split('\n').filter(content => content.trim());
            if (svgContents.length > 1) {
                saveMultipleSvgFiles(svgContents, filename);
            } else {
                saveSvgFile(processedResult, filename);
            }
        } else {
            const filename = prompt('Enter filename for the SVG:');
            if (!filename) return;
            saveSvgFile(processedResult, filename);
        }
    };

    return (
        <div>
            <h3>Selected Components ({thumbnails.length})</h3>
            <ProcessingOptions
                onProcessLayered={onProcessLayered}
                onProcessOriginal={onProcessOriginal}
                onProcessIndividual={onProcessIndividual}
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
