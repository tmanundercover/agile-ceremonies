import React from 'react';
import {ThumbnailsProps} from '../types';
import {ThumbnailGrid as StyledThumbnailGrid, ThumbnailImage} from '../styledComponents';

const ThumbnailGrid: React.FC<ThumbnailsProps> = ({ thumbnails, onThumbnailClick }) => {
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
                    <div
                        dangerouslySetInnerHTML={{
                            __html: decodeURIComponent(thumbnail.src.split(',')[1])
                        }}
                    />
                </ThumbnailImage>
            ))}
        </StyledThumbnailGrid>
    );
};

export default ThumbnailGrid;
