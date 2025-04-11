import React, { useState } from 'react';
import { FileData, FileVersion } from '../../types';
import { ToolIconStyled, ToolIconWrapperStyled, TooltipStyled } from '../../styledComponents';
import { v4 as uuidv4 } from 'uuid';

interface SvgSplitToolProps {
    file: FileData;
    onSplit: (file: FileData) => void;
}

export const SvgSplitTool: React.FC<SvgSplitToolProps> = ({ file, onSplit }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleSplitSvg = async () => {
        if (!file.content.includes('svg')) return;

        try {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(file.content, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');

            if (!svgElement) return;

            const layers = Array.from(svgElement.children).filter(el =>
                ['path', 'g', 'rect', 'circle', 'ellipse'].includes(el.tagName)
            );

            const newVersions: FileVersion[] = layers.map((layer, index) => {
                const newSvg = svgElement.cloneNode(false) as SVGElement;
                newSvg.appendChild(layer.cloneNode(true));

                return {
                    id: uuidv4(),
                    name: `Layer ${index + 1}`,
                    content: `data:image/svg+xml;base64,${btoa(newSvg.outerHTML)}`,
                    type: 'image/svg+xml',
                    createdAt: new Date()
                };
            });

            const updatedFile = {
                ...file,
                versions: [...(file.versions || []), ...newVersions]
            };

            onSplit(updatedFile);
        } catch (error) {
            console.error('Error splitting SVG:', error);
        }
    };

    return (
        <ToolIconWrapperStyled
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <TooltipStyled $visible={showTooltip}>Split SVG layers</TooltipStyled>
            <ToolIconStyled onClick={handleSplitSvg}>
                <span role="img" aria-label="Split">✂️</span>
            </ToolIconStyled>
        </ToolIconWrapperStyled>
    );
};

