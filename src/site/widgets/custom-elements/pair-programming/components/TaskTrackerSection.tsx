import React from 'react';
import styled from 'styled-components';
import MultiAgentNetworkSection from './MultiAgentNetworkSection';
import theme, {technologyTagColors} from '../theme';
import { Task } from '../models';
import {MilestoneTracker} from "../task-track/MilestoneTracker.types";

const TaskTrackerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${theme.spacing.lg};
  transition: all 0.3s ${theme.animations.easeInOut};
  background-color: ${theme.colors.cardBg};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.md};
  border-left: 4px solid ${theme.colors.primary};
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, ${theme.colors.primary}10, transparent 20%);
    pointer-events: none;
  }
`;

interface TaskTrackerSectionProps {
  milestone: MilestoneTracker;
  onTaskUpdate?: (task: Task) => void;
}

const TaskTrackerSection: React.FC<TaskTrackerSectionProps> = ({ milestone, onTaskUpdate }) => {
  // Default features array that can be customized per milestone if needed
  const defaultFeatures = [
    {
      title: "Intelligent Prioritization",
      description: "Automatically organize tasks based on deadlines, dependencies, and team capacity."
    },
    {
      title: "Real-time Collaboration",
      description: "See updates instantly as team members make progress, add comments, or change statuses."
    },
    {
      title: "Integration Capabilities",
      description: "Connect with Git repositories, CI/CD pipelines, and other development tools."
    },
    {
      title: "Customizable Workflows",
      description: "Adapt the system to match your team's unique processes and methodologies."
    }
  ];

  return (
    <TaskTrackerContainer>
      <MultiAgentNetworkSection
        phases={milestone.phases}
        description={milestone.description}
        title={milestone.milestone}
        technologies={
          milestone.techOverview && milestone.techOverview.map((tech) => ({
            name: tech.name,
            description: tech.description,
            color: technologyTagColors[tech.name] || theme.colors.primary,
          }))
        }
        features={defaultFeatures}
        actionButtonText={"Watch Us Build It!"}
      />
    </TaskTrackerContainer>
  );
};

export default TaskTrackerSection;
