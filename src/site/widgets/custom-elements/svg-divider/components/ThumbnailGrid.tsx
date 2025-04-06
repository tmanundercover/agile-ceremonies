import React from 'react';
import { ThumbnailsProps } from '../types';
import { ThumbnailGrid as StyledThumbnailGrid, ThumbnailImage } from '../styledComponents';

const ThumbnailGrid: React.FC<ThumbnailsProps> = ({ thumbnails, onThumbnailClick }) => {
    return (
        <StyledThumbnailGrid>
            {thumbnails.map((thumbnail, index) => (
                <ThumbnailImage
                    key={thumbnail.id}
                    src={thumbnail.src}
                    onClick={() => onThumbnailClick(index)}
                    className={thumbnail.disabled ? 'disabled' : ''}
                    alt={`Thumbnail ${index + 1}`}
                />
            ))}
        </StyledThumbnailGrid>
    );
};

export default ThumbnailGrid;
