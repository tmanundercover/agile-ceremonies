import styled, { keyframes } from "styled-components";

export const LandingContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    text-align: center;
`;

export const SVGContainerStyled = styled.div`
    width: 100%;
    max-width: 600px;
    margin-bottom: 24px;
`;

const pulseAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
`;

export const AnimatedGraphicStyled = styled.div`
    width: 100%;
    height: 300px;
    background: url('/path/to/animated-ai-graphic.svg') no-repeat center;
    background-size: contain;
    animation: ${pulseAnimation} 3s infinite;
`;

export const HeadingStyled = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: #1A1A1A;
    margin-bottom: 16px;
`;

export const DescriptionStyled = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: #4A5568;
    line-height: 1.5;
    margin-bottom: 32px;
`;

export const CTAButtonStyled = styled.button`
    background: #9333EA;
    color: #FFFFFF;
    padding: 16px 24px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    margin: 8px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background: #7928CA;
    }
`;

export const SocialLinksContainerStyled = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 32px;
`;

export const SocialLinkStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

export const SocialHoverBgStyled = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(42, 42, 42, 0.4);
    border-radius: 6px;
`;

export const UsernameTextStyled = styled.span<{ isHovered: boolean }>`
    font-size: 14px;
    font-weight: 500;
    color: ${({ isHovered }) => (isHovered ? "#FFFFFF" : "#4A5568")};
    transition: color 0.3s;
`;
