import React from 'react';
import { SvgThumbnail } from '../types';
import { SelectedPanel, SelectedThumbnailsWrapper } from '../styledComponents';

interface SelectedThumbnailsProps {
    thumbnails: SvgThumbnail[];
    onRemove: (index: number) => void;
}

const SelectedThumbnails: React.FC<SelectedThumbnailsProps> = ({ thumbnails, onRemove }) => {
    return (
        <SelectedPanel className={thumbnails.length > 0 ? 'open' : ''}>
            <h3>Selected Components ({thumbnails.length})</h3>
            <SelectedThumbnailsWrapper>
                {thumbnails.map((thumbnail, index) => (
                    <img
                        key={thumbnail.id}
                        src={thumbnail.src}
                        alt={`Selected ${index + 1}`}
                        onClick={() => onRemove(index)}
                    />
                ))}
            </SelectedThumbnailsWrapper>
        </SelectedPanel>
    );
};

export default SelectedThumbnails;
