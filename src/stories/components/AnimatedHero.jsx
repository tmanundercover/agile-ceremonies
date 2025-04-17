import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import theme from '../theme';
import Standup from "./Standup";

// Animation keyframes
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -468px 0 }
  100% { background-position: 468px 0 }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components for the hero
const HeroWrapper = styled.div`
  position: relative;
  border-radius: ${theme.borderRadius};
  overflow: hidden;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  margin-bottom: ${theme.spacing.xl};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.6;
    z-index: 1;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.xl};
  position: relative;
  z-index: 2;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${theme.spacing.lg};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(30px)'};
  transition: opacity 0.6s ease, transform 0.6s ease;
`;

const RightSection = styled.div`
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.8s ease 0.2s;
  animation: ${float} 6s ease-in-out infinite;
  
  @media (max-width: 1024px) {
    animation: none;
    max-width: 350px;
    margin: 0 auto;
  }
`;

const GradientTitle = styled.h1`
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  margin-bottom: ${theme.spacing.md};
  color: white;
  background: linear-gradient(90deg, #ffffff, #f0e7ff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 5px;
    background: white;
    border-radius: 4px;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(16px, 2vw, 20px);
  margin-bottom: ${theme.spacing.lg};
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  max-width: 600px;
  line-height: 1.6;
`;

const SearchContainer = styled.form`
  position: relative;
  max-width: 500px;
  margin-top: ${theme.spacing.lg};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  padding-left: 50px;
  border-radius: 30px;
  border: none;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
  
  &:focus {
    background: white;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    outline: none;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.primary};
  font-size: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  background: white;
  color: ${theme.colors.primary};
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    background: #f0f0f0;
  }
`;

const SecondaryButton = styled.a`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-3px);
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
`;

const Particle = styled.div`
  position: absolute;
  width: ${props => props.size || '6px'};
  height: ${props => props.size || '6px'};
  background: white;
  border-radius: 50%;
  opacity: ${props => props.opacity || '0.3'};
  top: ${props => props.top || '10%'};
  left: ${props => props.left || '10%'};
  animation: ${float} ${props => props.duration || '10s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const StandupWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.md};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform: rotate(-2deg);
  transition: transform 0.3s;
  
  &:hover {
    transform: rotate(0deg) scale(1.02);
  }
`;

export const AnimatedHero = ({ title, subtitle, cta, ctaLink, withSearch = false }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Small timeout to ensure smooth animation after initial render
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery) return;

        // Example: redirect to Storybook search with query
        const searchPath = `/?path=/search&q=${encodeURIComponent(searchQuery)}`;
        window.location.href = searchPath;
    };

    return (
        <HeroWrapper>
            <FloatingParticles>
                <Particle size="8px" top="20%" left="80%" opacity="0.4" duration="15s" delay="0s" />
                <Particle size="12px" top="70%" left="10%" opacity="0.2" duration="18s" delay="2s" />
                <Particle size="10px" top="40%" left="30%" opacity="0.3" duration="12s" delay="1s" />
                <Particle size="15px" top="85%" left="70%" opacity="0.2" duration="20s" delay="3s" />
                <Particle size="6px" top="25%" left="50%" opacity="0.5" duration="10s" delay="0.5s" />
            </FloatingParticles>

            <ContentContainer>
                <LeftSection isVisible={isVisible}>
                    <div>
                        <GradientTitle>{title}</GradientTitle>
                        <Subtitle>{subtitle}</Subtitle>

                        <ButtonGroup>
                            {cta && ctaLink && (
                                <PrimaryButton href={ctaLink}>
                                    {cta}
                                </PrimaryButton>
                            )}
                            <SecondaryButton href="/?path=/docs/documentation-table-of-contents--docs">
                                View Documentation
                            </SecondaryButton>
                        </ButtonGroup>
                    </div>

                    {withSearch && (
                        <SearchContainer onSubmit={handleSearch}>
                            <SearchIcon>🔍</SearchIcon>
                            <SearchInput
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search documentation..."
                            />
                        </SearchContainer>
                    )}
                </LeftSection>

                <RightSection isVisible={isVisible}>
                    <StandupWrapper>
                        <Standup hours="9" minutes="30" period="am" />
                    </StandupWrapper>
                </RightSection>
            </ContentContainer>
        </HeroWrapper>
    );
};

export default AnimatedHero;
