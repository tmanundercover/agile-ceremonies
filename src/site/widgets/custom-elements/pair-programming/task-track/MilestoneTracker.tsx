import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { MilestoneTracker } from './MilestoneTracker.types';
import TaskTrackerSection from "../components/TaskTrackerSection";

interface MilestoneComponentProps {
  milestoneData: MilestoneTracker[];
}

const MilestoneContainer = styled.div`
  font-family: ${theme.fontFamily};
  max-width: 100%;
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const MilestoneWrapper = styled.div`
  //background: linear-gradient(135deg, ${theme.colors.neutral900}20, ${theme.colors.primaryDark}10);
  border-radius: ${theme.borderRadius};
  //box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.md};
  //transition: transform 0.3s ${theme.animations.easeOutBack};
  
  // &:hover {
  //   transform: translateY(-5px);
  //   box-shadow: ${theme.shadows.lg};
  // }
`;

const MilestoneHeader = styled.h2`
  font-size: ${theme.typography.heading2.fontSize};
  color: ${theme.colors.primary};
  margin-top: 0;
  margin-bottom: ${theme.spacing.md};
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    width: 70%;
    height: 3px;
    bottom: -4px;
    left: 0;
    background: ${theme.colors.primary};
    border-radius: 2px;
  }
`;

const MilestoneComponentStyled: React.FC<MilestoneComponentProps> = ({ milestoneData }) => {
  return (
    <MilestoneContainer>
      {milestoneData.map((milestone, mIndex) => (
        <MilestoneWrapper key={`milestone-${mIndex}`}>
          <MilestoneHeader>{milestone.milestone}</MilestoneHeader>
          <TaskTrackerSection milestone={milestone} />
        </MilestoneWrapper>
      ))}
    </MilestoneContainer>
  );
};

export default MilestoneComponentStyled;
