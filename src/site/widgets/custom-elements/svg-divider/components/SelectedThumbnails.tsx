import React from 'react';
import { SvgThumbnail } from '../types';
import { SelectedPanel, SelectedThumbnailsWrapper } from '../styledComponents';

interface SelectedThumbnailsProps {
    thumbnails: SvgThumbnail[];
    parentSvgProps: {[key: string]: string};
}

const SelectedThumbnails: React.FC<SelectedThumbnailsProps> = ({ thumbnails, parentSvgProps }) => {
    return (
        <SelectedPanel className={thumbnails.length > 0 ? 'open' : ''}>
            <h3>Selected Components ({thumbnails.length})</h3>
            <SelectedThumbnailsWrapper>
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
            </SelectedThumbnailsWrapper>
        </SelectedPanel>
    );
};

export default SelectedThumbnails;
