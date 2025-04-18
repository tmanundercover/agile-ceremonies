import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

// Timeline item interface
export interface TimelineItem {
  weeks: string;
  description: string;
  agent: string;
  goals?: string[];
}

// Component props
interface TimelineSectionProps {
  items: TimelineItem[];
  title?: string;
}

// Styled components
const TimelineContainer = styled.div`
  margin: ${theme.spacing.md} 0;
  padding: ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.shadows.md};
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239333EA' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E") repeat;
    opacity: 0.2;
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
  background: linear-gradient(90deg, #FFFFFF, ${theme.colors.primaryLight});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 3px;
    bottom: -8px;
    left: 0;
    background: linear-gradient(90deg, ${theme.colors.primary}, transparent);
    border-radius: 2px;
  }
`;

const TimelineList = styled.div`
  position: relative;
  margin-left: ${theme.spacing.lg};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 3px;
    background: linear-gradient(to bottom, ${theme.colors.primary}, ${theme.colors.primaryLight}80);
    border-radius: 4px;
  }
`;

const TimelineItemContainer = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.lg};
  padding-left: ${theme.spacing.xl};
  
  &::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 4px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${theme.colors.primaryLight};
    border: 3px solid ${theme.colors.primary};
    z-index: 1;
    transition: all 0.3s ${theme.animations.easeOutBack};
  }
  
  &:hover {
    &::before {
      background: ${theme.colors.primary};
      box-shadow: 0 0 0 6px rgba(147, 51, 234, 0.2);
      transform: scale(1.1);
    }
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineItemContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadows.md};
  border-left: 3px solid ${theme.colors.primary};
  transition: transform 0.3s ${theme.animations.easeOutBack}, box-shadow 0.3s ${theme.animations.easeInOut};
  
  &:hover {
    transform: translateX(5px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.primaryLight};
  }
`;

const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
`;

const TimelineWeeks = styled.div`
  font-weight: 700;
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '📅';
    margin-right: ${theme.spacing.xs};
    font-size: 1rem;
  }
`;

const TimelineAgent = styled.div`
  background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  color: white;
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(147, 51, 234, 0.3);
  display: flex;
  align-items: center;
  
  &::before {
    content: '👤';
    margin-right: ${theme.spacing.xs};
    font-size: 0.9rem;
  }
`;

const TimelineDescription = styled.p`
  margin-bottom: ${theme.spacing.md};
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${theme.colors.neutral200};
`;

const GoalsContainer = styled.div`
  background: rgba(147, 51, 234, 0.1);
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  margin-top: ${theme.spacing.sm};
  border: 1px solid rgba(147, 51, 234, 0.2);
`;

const GoalsTitle = styled.div`
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.primaryLight};
  font-size: 1rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '🎯';
    margin-right: ${theme.spacing.xs};
  }
`;

const GoalsList = styled.ul`
  margin: 0;
  padding-left: 24px;
  
  li {
    margin-bottom: 8px;
    position: relative;
    color: ${theme.colors.neutral200};
    font-size: 0.9rem;
    
    &::marker {
      color: ${theme.colors.primaryLight};
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

// The main timeline component
const TimelineSection: React.FC<TimelineSectionProps> = ({ items, title = "Timeline" }) => {
  return (
    <TimelineContainer>
      <ContentWrapper>
        <SectionTitle>{title}</SectionTitle>
        <TimelineList>
          {items.map((item, index) => (
            <TimelineItemContainer key={index}>
              <TimelineItemContent>
                <TimelineHeader>
                  <TimelineWeeks>Weeks {item.weeks}</TimelineWeeks>
                  <TimelineAgent>{item.agent}</TimelineAgent>
                </TimelineHeader>
                <TimelineDescription>{item.description}</TimelineDescription>

                {item.goals && item.goals.length > 0 && (
                  <GoalsContainer>
                    <GoalsTitle>Goals</GoalsTitle>
                    <GoalsList>
                      {item.goals.map((goal, goalIndex) => (
                        <li key={goalIndex}>{goal}</li>
                      ))}
                    </GoalsList>
                  </GoalsContainer>
                )}
              </TimelineItemContent>
            </TimelineItemContainer>
          ))}
        </TimelineList>
      </ContentWrapper>
    </TimelineContainer>
  );
};

export default TimelineSection;
