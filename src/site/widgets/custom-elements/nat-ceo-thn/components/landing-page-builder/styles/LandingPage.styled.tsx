import styled from 'styled-components';

export const LandingContainerStyled = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
  overflow: hidden;
`;

export const SVGContainerStyled = styled.svg`
  width: 100%;
  height: 100vh;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
`;

export const HeadingStyled = styled.text`
  font-family: 'Inter', sans-serif;
  font-size: 64px;
  font-weight: 800;
  fill: #ffffff;
  letter-spacing: -1.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const DescriptionStyled = styled.text`
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 400;
  fill: #b3b3b3;
  line-height: 1.8;
  letter-spacing: 0.2px;
`;

export const CTAButtonStyled = styled.g`
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    filter: brightness(1.2);
    transform: translateY(-2px);
  }

  &:hover .button-bg {
    opacity: 0.95;
  }
`;

export const SocialLinkStyled = styled.g`
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-3px);
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  }
`;

export const IconStyled = styled.div<{ isHovered: boolean }>`
  color: ${props => props.isHovered ? '#8b5cf6' : '#d4d4d4'};
  width: 24px;
  height: 24px;
  transition: color 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UsernameTextStyled = styled.text<{ isHovered: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: ${props => props.isHovered ? '500' : '400'};
  fill: ${props => props.isHovered ? '#ffffff' : '#d4d4d4'};
  transition: all 0.4s ease;
  letter-spacing: 0.3px;
`;

export const SocialHoverBgStyled = styled.rect`
  transition: all 0.4s ease;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
`;
