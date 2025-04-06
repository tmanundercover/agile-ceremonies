import React from 'react';
import {ThumbnailsProps} from '../types';
import {ThumbnailGrid as StyledThumbnailGrid, ThumbnailImage} from '../styledComponents';

const ThumbnailGrid: React.FC<ThumbnailsProps> = ({ thumbnails, onThumbnailClick, parentSvgProps }) => {
    return (
        <StyledThumbnailGrid>
            {thumbnails.map((thumbnail, index) => (
                <ThumbnailImage
                    key={thumbnail.id}
                    onClick={() => onThumbnailClick(index)}
                    className={`${thumbnail.disabled ? 'selected' : ''}`}
                    role="button"
                    tabIndex={0}
                >
                    <svg {...parentSvgProps}>
                        {(() => {
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
                        })()}
                    </svg>
                </ThumbnailImage>
            ))}
        </StyledThumbnailGrid>
    );
};

export default ThumbnailGrid;
