import React from 'react';
import styled from 'styled-components';
import { calculateSize } from '../utils/sizeUtils';

const ImagesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 16px;
`;

const ImageCard = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    background: white;

    h3 {
        margin: 0 0 12px 0;
        font-size: 16px;
        color: #333;
    }

    .image-wrapper {
        position: relative;
        width: 100%;
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        border-radius: 4px;
        margin-bottom: 8px;

        img {
            max-width: 100%;
            max-height: 300px;
            object-fit: contain;
        }
    }

    .info {
        font-size: 14px;
        color: #666;
        margin-top: 8px;
    }
`;

interface ImageFormatProps {
    svgContent: string;
}

const ImagesTab: React.FC<ImageFormatProps> = ({ svgContent }) => {
    const getConversions = () => {
        const minified = svgContent.replace(/\s+/g, ' ').trim();
        const dataUri = `data:image/svg+xml,${encodeURIComponent(minified)}`;
        const base64 = btoa(minified);
        const base64Uri = `data:image/svg+xml;base64,${base64}`;

        return [
            { label: 'Original SVG', content: `data:image/svg+xml;charset=utf8,${encodeURIComponent(svgContent)}` },
            { label: 'Minified SVG', content: dataUri },
            { label: 'Base64 SVG', content: base64Uri }
        ];
    };

    return (
        <ImagesContainer>
            {getConversions().map(({ label, content }) => (
                <ImageCard key={label}>
                    <h3>{label}</h3>
                    <div className="image-wrapper">
                        <img src={content} alt={`${label} preview`} />
                    </div>
                    <div className="info">
                        Size: {calculateSize(content)}
                    </div>
                </ImageCard>
            ))}
        </ImagesContainer>
    );
};

export default ImagesTab;
