import React, { useState } from "react";
import { GitHub, LinkedIn, ArrowDown } from "@wix/wix-ui-icons-common";
import {
    CTAButtonStyled,
    DescriptionStyled,
    HeadingStyled,
    LandingContainerStyled,
    SocialHoverBgStyled,
    SocialLinkStyled,
    UsernameTextStyled,
    SVGContainerStyled,
    SocialLinksContainerStyled,
    AnimatedGraphicStyled,
} from "./Landing-Page-with-animated-icon-styled-components";
import { SocialLinkType } from "./Landing-Page-with-animated-icon-types";

const SocialButton: React.FC<{
    link: SocialLinkType;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}> = ({ link, isHovered, onMouseEnter, onMouseLeave }) => (
    <a href={link.url} target="_blank" rel="noopener noreferrer">
        <SocialLinkStyled onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <foreignObject x="85" y="12" width="24" height="24">
                <link.icon />
            </foreignObject>
            <UsernameTextStyled isHovered={isHovered}>{link.username}</UsernameTextStyled>
            {isHovered && <SocialHoverBgStyled />}
        </SocialLinkStyled>
    </a>
);

const AILandingPage = () => {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    const handleMouseEnter = (button: string) => setHoveredButton(button);
    const handleMouseLeave = () => setHoveredButton(null);

    const socialLinks: SocialLinkType[] = [
        {
            icon: GitHub,
            username: "tmanundercover",
            platform: "GitHub",
            url: "https://github.com/tmanundercover",
        },
        {
            icon: LinkedIn,
            username: "the-handsomest-nerd",
            platform: "LinkedIn",
            url: "https://www.linkedin.com/in/the-handsomest-nerd/",
        },
        {
            icon: ArrowDown,
            username: "Hire me on Fiverr",
            platform: "Fiverr",
            url: "https://www.fiverr.com/jamessinglet735",
        },
    ];

    return (
        <LandingContainerStyled>
            <SVGContainerStyled>
                <AnimatedGraphicStyled />
            </SVGContainerStyled>
            <HeadingStyled>
                Future-ready websites with built-in AI
            </HeadingStyled>
            <DescriptionStyled>
                Transforming ideas into intelligent digital experiences through cutting-edge AI integration and responsive design. Bringing innovation to every pixel and interaction.
            </DescriptionStyled>
            <CTAButtonStyled
                onMouseEnter={() => handleMouseEnter("build")}
                onMouseLeave={handleMouseLeave}
            >
                Build With AI
            </CTAButtonStyled>
            <CTAButtonStyled
                onMouseEnter={() => handleMouseEnter("view")}
                onMouseLeave={handleMouseLeave}
            >
                View Capabilities
            </CTAButtonStyled>
            <SocialLinksContainerStyled>
                {socialLinks.map((link, index) => (
                    <SocialButton
                        key={index}
                        link={link}
                        isHovered={hoveredButton === link.platform}
                        onMouseEnter={() => handleMouseEnter(link.platform)}
                        onMouseLeave={handleMouseLeave}
                    />
                ))}
            </SocialLinksContainerStyled>
        </LandingContainerStyled>
    );
};

export default AILandingPage;
