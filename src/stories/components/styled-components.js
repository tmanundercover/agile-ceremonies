// Animation keyframes
import styled, {keyframes} from "styled-components";
import theme from "../theme";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
export const HeroContainer = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  color: white;
  text-align: left;
  animation: ${fadeIn} 0.8s ease-out;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const HeroSidebar = styled.div`
  width: 350px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
  color: white;
`;

export const HeroSubtitle = styled.p`
  font-size: 20px;
  margin-bottom: ${theme.spacing.lg};
  opacity: 0.9;
  color: white;
`;

export const Button = styled.a`
  display: inline-block;
  background: white;
  color: ${theme.colors.primary};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius};
  font-weight: 600;
  text-decoration: none;
  transition: all ${theme.transition};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.boxShadow};
    background: ${theme.colors.neutral100};
  }
`;

export const RevealContainer = styled.div`
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(20px)'};
  transition: opacity 0.6s ease, transform 0.6s ease;
  margin: ${theme.spacing.xl} 0;
`;

export const AgentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.lg} 0;
`;

export const AgentCard = styled.a`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: ${theme.borderRadius};
  overflow: hidden;
  box-shadow: ${theme.boxShadow};
  transition: transform ${theme.transition}, box-shadow ${theme.transition};
  text-decoration: none;
  color: ${theme.colors.neutral900};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
    text-decoration: none;
    
    .agent-icon {
      animation: ${pulse} 0.6s ease-in-out;
    }
  }
`;

export const AgentHeader = styled.div`
  background: ${props => props.color || theme.colors.primary};
  padding: ${theme.spacing.md};
  display: flex;
  align-items: center;
`;

export const AgentIcon = styled.div`
  font-size: 32px;
  margin-right: ${theme.spacing.md};
`;

export const AgentTitle = styled.h3`
  margin: 0;
  color: white;
`;

export const AgentBody = styled.div`
  padding: ${theme.spacing.md};
`;

export const AgentDescription = styled.p`
  color: ${theme.colors.neutral700};
  margin: 0;
`;

export const FeatureContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0;
`;

export const FeatureItem = styled.div`
  background: white;
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.boxShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform ${theme.transition};
  
  &:hover {
    transform: scale(1.03);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 36px;
  margin-bottom: ${theme.spacing.md};
`;

export const FeatureTitle = styled.h3`
  margin: 0 0 ${theme.spacing.sm} 0;
`;

export const FeatureDescription = styled.p`
  margin: 0;
  color: ${theme.colors.neutral700};
`;

export const DiagramContainer = styled.div`
  margin: ${theme.spacing.xl} 0;
  border: 1px solid ${theme.colors.neutral200};
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.lg};
  background: white;
`;

export const CardContainer = styled.div`
  background: linear-gradient(135deg, ${theme.colors.info}, ${props => props.background || theme.colors.primaryLight});
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.lg};
  color: white;
  margin: ${theme.spacing.xl} 0;
  display: flex;
  align-items: center;
`;

export const CardIcon = styled.div`
  font-size: 48px;
  margin-right: ${theme.spacing.lg};
`;

export const CardContent = styled.div`
  flex: 1;
`;

export const CardTitle = styled.h3`
  margin: 0 0 ${theme.spacing.sm} 0;
`;

export const CardText = styled.p`
  margin: 0 0 ${theme.spacing.md} 0;
  opacity: 0.9;
`;

export const CardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

export const CardButton = styled.a`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${props => props.isPrimary ? 'white' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.isPrimary ? theme.colors.primary : 'white'};
  border-radius: ${theme.borderRadius};
  text-decoration: none;
  transition: all ${theme.transition};
  font-weight: ${props => props.isPrimary ? 600 : 400};
  
  &:hover {
    background: ${props => props.isPrimary ? theme.colors.neutral100 : 'rgba(255, 255, 255, 0.3)'};
    transform: translateY(-2px);
  }
`;
// Additional styled components for multi-ai-agent-network.mdx
export const StyledMdxContent = styled.div`
  color: ${theme.colors.textColor};
  font-family: ${theme.typography.body.fontFamily};
  line-height: ${theme.typography.body.lineHeight};
  font-size: ${theme.typography.body.fontSize};
  
  h1 {
    font-size: ${theme.typography.heading1.fontSize};
    font-weight: ${theme.typography.heading1.fontWeight};
    position: ${theme.typography.heading1.position};
    display: ${theme.typography.heading1.display};
    margin-bottom: ${theme.spacing.lg};
    
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 4px;
      bottom: -8px;
      left: 0;
      background: ${theme.colors.primary};
      border-radius: 2px;
    }
  }
  
  h2 {
    font-size: ${theme.typography.heading2.fontSize};
    font-weight: ${theme.typography.heading2.fontWeight};
    border-bottom: ${theme.typography.heading2.borderBottom};
    padding-bottom: ${theme.typography.heading2.paddingBottom};
    margin-top: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.md};
  }
  
  h3 {
    font-size: ${theme.typography.heading3.fontSize};
    font-weight: ${theme.typography.heading3.fontWeight};
    margin-top: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.sm};
  }
  
  p {
    margin-bottom: ${theme.spacing.md};
  }
  
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: ${theme.colors.primaryDark};
      text-decoration: underline;
    }
  }
  
  img {
    max-width: 100%;
    border-radius: ${theme.borderRadius};
    margin: ${theme.spacing.md} 0;
    
    &.interactive-image {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: scale(1.02);
        box-shadow: ${theme.boxShadow};
      }
    }
  }
`;

export const StyledAgentOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: ${theme.spacing.md};
  margin: ${theme.spacing.lg} 0;
`;

export const StyledAgentCard = styled.div`
  background: ${theme.colors.cardBg};
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.md};
  text-align: center;
  box-shadow: ${theme.boxShadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  .agent-icon {
    font-size: 32px;
    margin-bottom: ${theme.spacing.sm};
  }
  
  h3 {
    margin: ${theme.spacing.xs} 0;
    color: ${theme.colors.primary};
  }
  
  p {
    font-size: ${theme.typography.small.fontSize};
    margin: 0;
    color: ${theme.colors.neutral700};
  }
`;

export const StyledTimeline = styled.div`
  position: relative;
  margin: ${theme.spacing.xl} 0;
  padding-left: 30px;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${theme.colors.primary};
    border-radius: 2px;
  }
`;

export const StyledTimelineDay = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.cardBg};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    left: -34px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${theme.colors.primary};
  }
  
  &.hovered {
    transform: translateX(10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .timeline-marker {
    font-weight: bold;
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.xs};
  }
  
  h4 {
    margin: ${theme.spacing.xs} 0;
  }
`;

export const AgentLink = styled.a`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  margin: 4px 0;
  border-radius: 20px;
  background: ${theme.colors.neutral100};
  border: 1px dashed ${theme.colors.primary};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${theme.colors.primaryLight};
    color: white;
    text-decoration: none;
  }
  
  &:before {
    content: "🤖";
    margin-right: 6px;
  }
`;

export const StyledOrgChart = styled.svg`
  .node {
    cursor: pointer;
    transition: opacity 0.3s ease, transform 0.3s ease;
    
    &:hover {
      opacity: 0.8;
    }
    
    &.hovered {
      transform: scale(1.1);
    }
  }
  
  text {
    user-select: none;
  }
  
  .connections path {
    transition: stroke-width 0.3s ease;
  }
`;

