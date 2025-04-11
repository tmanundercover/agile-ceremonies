import React, {useState} from 'react';
import {DownloadIcon} from '@radix-ui/react-icons';
import {ToolIconStyled} from '../../../styledComponents';
import {StickerImage} from '../../../types';

interface LoadMockImagesToolProps {
    onLoad: (stickerImages: StickerImage[]) => void;
}

export const LoadMockImagesTool: React.FC<LoadMockImagesToolProps> = ({ onLoad }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const createSvgFromPieces = (pieces: StickerImage['pieces']): string => {
        const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                ${pieces.map(piece => `
                    <g transform="${piece.transform}">
                        ${piece.paths.map(path => `<path d="${path}" fill="#000" />`).join('\n')}
                    </g>
                `).join('\n')}
            </svg>
        `;
        return `data:image/svg+xml;base64,${btoa(svgContent)}`;
    };

    const handleLoadMockImages = () => {
        const mockImages: StickerImage[] = [
            {
                id: '1',
                name: 'Basic Avatar',
                pieces: [
                    {
                        id: 'head1',
                        type: 'head',
                        paths: ['M50,50 C50,30 70,20 90,20 C110,20 130,30 130,50 C130,70 110,90 90,90 C70,90 50,70 50,50'],
                        transform: 'translate(0,0) scale(1)',
                        selected: false
                    },
                    {
                        id: 'eyes1',
                        type: 'eyes',
                        paths: [
                            'M70,40 C70,35 75,35 75,40 C75,45 70,45 70,40',
                            'M110,40 C110,35 115,35 115,40 C115,45 110,45 110,40'
                        ],
                        transform: 'translate(0,0) scale(1)',
                        selected: false
                    },
                    {
                        id: 'hair1',
                        type: 'hair',
                        paths: ['M40,30 C60,10 120,10 140,30 C140,40 130,50 120,45 C110,40 70,40 60,45 C50,50 40,40 40,30'],
                        transform: 'translate(0,0) scale(1)',
                        selected: false
                    }
                ]
            }
        ];

        onLoad(mockImages);
    };

    return (
        <ToolIconStyled onClick={handleLoadMockImages}>
            <DownloadIcon width={20} height={20} />
        </ToolIconStyled>
    );
};

export default LoadMockImagesTool;

