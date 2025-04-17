import React from "react";
import {
    HeroContainer,
    HeroContent,
    HeroTitle,
    HeroSubtitle,
    Button,
    HeroSidebar
} from "./styled-components";
import Standup from "./Standup";

export const AnimatedHero = ({ title, subtitle, cta, ctaLink }) => {
    return (
        <HeroContainer>
            <HeroContent>
                <HeroTitle>{title}</HeroTitle>
                <HeroSubtitle>{subtitle}</HeroSubtitle>
                <Button href={ctaLink}>{cta}</Button>
            </HeroContent>
            <HeroSidebar>
                <Standup hours="9" minutes="30" period="am" />
            </HeroSidebar>
        </HeroContainer>
    );
};
