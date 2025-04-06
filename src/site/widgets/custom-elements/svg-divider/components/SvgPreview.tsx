import React from 'react';
import { SvgPreviewProps } from '../types';
import { PreviewContainer, PreviewWindow, SvgPreviewTitle } from '../styledComponents';

const SvgPreview: React.FC<SvgPreviewProps> = ({ svgContent, componentCount }) => {
    return (
        <PreviewContainer>
            <SvgPreviewTitle>
                SVG Preview ({componentCount} components)
            </SvgPreviewTitle>
            <PreviewWindow
                dangerouslySetInnerHTML={{ __html: svgContent || '' }}
            />
        </PreviewContainer>
    );
};

export default SvgPreview;
