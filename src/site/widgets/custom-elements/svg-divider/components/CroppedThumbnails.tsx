import React from 'react';
import styled from 'styled-components';
import { ThumbnailGrid, ThumbnailImage } from '../styledComponents';

const CroppedPreviewContainer = styled.div`
    margin-top: 20px;
    border-top: 1px solid #ddd;
    padding-top: 20px;

    .dark & {
        border-color: #555;
    }
`;

interface CroppedThumbnailsProps {
    croppedComponents?: Array<{
        id: string;
        svg: string;
    }>;
    onSelect: (index: number) => void;
}

const CroppedThumbnails: React.FC<CroppedThumbnailsProps> = ({
    croppedComponents = [],
    onSelect
}) => {
    if (!Array.isArray(croppedComponents) || croppedComponents.length === 0) {
        return null;
    }

    return (
        <CroppedPreviewContainer>
            <h4>Components in Cropped Area</h4>
            <ThumbnailGrid>
                {croppedComponents.map((component, index) => (
                    <ThumbnailImage
                        key={component.id}
                        onClick={() => onSelect(index)}
                        dangerouslySetInnerHTML={{ __html: component.svg }}
                    />
                ))}
            </ThumbnailGrid>
        </CroppedPreviewContainer>
    );
};

export default CroppedThumbnails;

