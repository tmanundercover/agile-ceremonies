import React from 'react';
import {
    PreviewOverlayStyled,
    OverlayControlsStyled,
    ToggleButtonContainerStyled,
    TooltipStyled,
} from '../landing-page-builder-styled-components';
import { ToggleButton } from './ToggleButton';

interface PreviewToolsOverlayProps {
    onSaveImage: () => void;
    onDevelopPage: () => void;
}

const SaveIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16L21 8V19C21 20.1046 20.1046 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 21V13H7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 3V8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const DevelopIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 12L3 17M3 17V13M3 17H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 12L21 17M21 17V13M21 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="8" y="3" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

export const PreviewToolsOverlay: React.FC<PreviewToolsOverlayProps> = ({
    onSaveImage,
    onDevelopPage
}) => {
    return (
        <PreviewOverlayStyled>
            <OverlayControlsStyled>
                <ToggleButtonContainerStyled>
                    <ToggleButton
                        isSelected={false}
                        onClick={onSaveImage}
                        color="#22C55E"
                        data-testid="save-image-button"
                        title="Save as Image"
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <SaveIcon />
                            <div style={{ fontSize: '12px', lineHeight: '14px', textAlign: 'center' }}>
                                Save as<br/>Image
                            </div>
                        </div>
                    </ToggleButton>
                    <TooltipStyled className="tooltip">Save preview as image</TooltipStyled>
                </ToggleButtonContainerStyled>

                <ToggleButtonContainerStyled>
                    <ToggleButton
                        isSelected={false}
                        onClick={onDevelopPage}
                        color="#3B82F6"
                        data-testid="develop-page-button"
                        title="Develop Landing Page"
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <DevelopIcon />
                            <div style={{ fontSize: '12px', lineHeight: '14px', textAlign: 'center' }}>
                                Develop<br/>Landing Page
                            </div>
                        </div>
                    </ToggleButton>
                    <TooltipStyled className="tooltip">Generate development files</TooltipStyled>
                </ToggleButtonContainerStyled>
            </OverlayControlsStyled>
        </PreviewOverlayStyled>
    );
};
