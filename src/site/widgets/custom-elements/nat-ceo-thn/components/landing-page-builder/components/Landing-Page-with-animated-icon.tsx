import React, { useState } from "react";
import { GitHub, LinkedIn, ArrowDown } from '@wix/wix-ui-icons-common';
import {
    LandingContainerStyled,
    SVGContainerStyled,
    HeadingStyled,
    DescriptionStyled,
    CTAButtonStyled,
    SocialLinkStyled,
    IconStyled,
    UsernameTextStyled,
    SocialHoverBgStyled
} from '../styles/LandingPage.styled';

interface SocialLinkType {
    icon: typeof GitHub | typeof LinkedIn | typeof ArrowDown;
    username: string;
    platform: string;
    url: string;
}

interface SocialButtonProps {
    link: SocialLinkType;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ link, isHovered, onMouseEnter, onMouseLeave }) => (
    <a href={link.url} target="_blank" rel="noopener noreferrer">
        <SocialLinkStyled
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <foreignObject x="85" y="12" width="24" height="24">
                <IconStyled isHovered={isHovered}>
                    <link.icon />
                </IconStyled>
            </foreignObject>

            <UsernameTextStyled
                x="97"
                y="55"
                textAnchor="middle"
                isHovered={isHovered}
            >
                {link.username}
            </UsernameTextStyled>
            
            {isHovered && (
                <SocialHoverBgStyled
                    x="0"
                    y="0"
                    width="195"
                    height="75"
                    rx="6"
                    fill="#2a2a2a"
                    opacity="0.4"
                />
            )}
        </SocialLinkStyled>
    </a>
);

const AILandingPage = () => {
    // ...existing code for hooks and socialLinks...

    return (
        <LandingContainerStyled>
            <SVGContainerStyled
                viewBox="0 0 1440 900"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Main Content */}
                <HeadingStyled x="280" y="380">
                    AI-Powered Development
                </HeadingStyled>

                <DescriptionStyled x="280" y="460">
                    <tspan x="280" dy="0">
                        Transforming ideas into intelligent digital experiences
                    </tspan>
                    <tspan x="280" dy="40">
                        through cutting-edge AI integration and responsive design.
                    </tspan>
                    <tspan x="280" dy="40">
                        Bringing innovation to every pixel and interaction.
                    </tspan>
                </DescriptionStyled>

                <CTAButtonStyled
                    transform="translate(580, 620)"
                    onClick={() => handleMouseEnter("learn")}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* ...existing CTA button content... */}
                </CTAButtonStyled>

                {/* ...existing code for social links... */}
            </SVGContainerStyled>
        </LandingContainerStyled>
    );
};

export default AILandingPage;
