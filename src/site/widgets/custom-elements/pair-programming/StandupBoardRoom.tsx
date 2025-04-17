import React, { useState } from 'react';
import { StandupData } from './models';
import TimelineComponentStyled from './task-track/TaskTracker';
import styled from 'styled-components';
import theme from './theme';

// Styled components with enhanced styling using theme properties
const BoardRoomContainer = styled.div`
  background-color: ${theme.colors.bgColor};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  padding: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
  transition: all ${theme.transitionSpeed};
`;

const BoardRoomStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing.md};
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SidebarStyled = styled.div`
  width: 260px;
  background-color: ${theme.colors.cardBg};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SidebarHeader = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.primary};
  color: white;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 2px solid ${theme.colors.primaryDark};
`;

const TeammateStyled = styled.div`
  padding: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.neutral200};
  transition: background-color ${theme.transitionSpeed};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${theme.colors.neutral100};
  }
`;

const TeammateName = styled.div`
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-bottom: ${theme.spacing.xs};
  background-color: ${props => {
    switch(props.status.toLowerCase()) {
      case 'available': return theme.colors.success;
      case 'busy': return theme.colors.warning;
      case 'offline': return theme.colors.neutral500;
      default: return theme.colors.info;
    }
  }};
  color: white;
`;

const InfoLabel = styled.div`
  font-size: 12px;
  color: ${theme.colors.neutral700};
  margin-top: ${theme.spacing.xs};
  font-weight: 500;
`;

const BlockerTag = styled.span`
  background-color: ${theme.colors.error};
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-right: 4px;
  margin-bottom: 4px;
  display: inline-block;
`;

const BlockersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 4px;
`;

const MainContentStyled = styled.div`
  flex: 1;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.cardBg};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
`;

const ContentSection = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const SectionTitle = styled.h3`
  color: ${theme.colors.primary};
  font-size: 18px;
  margin: 0 0 ${theme.spacing.sm} 0;
  padding-bottom: ${theme.spacing.xs};
  border-bottom: 2px solid ${theme.colors.primaryLight};
`;

// Button for opening the task tracker
const TaskTrackerButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: ${theme.spacing.md};
  transition: all ${theme.transitionSpeed};
  display: flex;
  align-items: center;
  box-shadow: ${theme.boxShadow};

  &:hover {
    background-color: ${theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::before {
    content: ${props => props.children === 'Open Task Tracker' ? '"📋"' : '"❌"'};
    margin-right: ${theme.spacing.xs};
    font-size: 16px;
  }
`;

const NoContentMessage = styled.div`
  color: ${theme.colors.neutral700};
  font-style: italic;
  padding: ${theme.spacing.md};
  text-align: center;
  border: 1px dashed ${theme.colors.neutral500};
  border-radius: ${theme.borderRadius};
`;

interface StandupBoardRoomProps {
  standupData: StandupData[];
}


const StandupBoardRoom: React.FC<StandupBoardRoomProps> = ({ standupData }) => {
  const [showTaskTracker, setShowTaskTracker] = useState(false);

  // Sample timeline data for the task tracker
  const timelineData = [
    {
      week: 1,
      agent: "Planning Team",
      description: "Sprint planning and task breakdown",
      tasks: [
        {
          title: "To Do",
          items: ["Create user stories", "Estimate tasks", "Assign responsibilities"]
        }
      ],
      additionalInfo: [
        {
          title: "Sprint Goals",
          content: "Define project architecture and establish development workflow",
          tags: ["Planning", "Architecture", "Setup"]
        }
      ]
    },
    {
      week: 2,
      agent: "Development Team",
      description: "Implementation of core features",
      tasks: [
        {
          title: "In Progress",
          items: ["Backend API development", "Frontend UI components", "Database schema design"]
        }
      ],
      additionalInfo: [
        {
          title: "Technical Focus",
          content: "API design patterns and responsive UI implementation",
          tags: ["API", "Frontend", "Responsive"],
          agentLinks: [
            { name: "Design System", path: "/design-system" }
          ]
        }
      ]
    }
  ];

  return (
    <BoardRoomContainer>
      <TaskTrackerButton onClick={() => setShowTaskTracker(!showTaskTracker)}>
        {showTaskTracker ? 'Hide Task Tracker' : 'Open Task Tracker'}
      </TaskTrackerButton>
      
      {showTaskTracker && (
        <div style={{ marginBottom: theme.spacing.lg }}>
          <TimelineComponentStyled timelineData={timelineData} />
        </div>
      )}
      
      <BoardRoomStyled>
        <SidebarStyled>
          <SidebarHeader>Team Status</SidebarHeader>
          {standupData.length > 0 ? (
            standupData.map((data, index) => (
              <TeammateStyled key={index}>
                <TeammateName>{data.name}</TeammateName>
                <StatusBadge status={data.status}>{data.status}</StatusBadge>

                {data.blockers && data.blockers.length > 0 && (
                  <>
                    <InfoLabel>Blockers:</InfoLabel>
                    <BlockersContainer>
                      {data.blockers.map((blocker, idx) => (
                        <BlockerTag key={idx}>{blocker}</BlockerTag>
                      ))}
                    </BlockersContainer>
                  </>
                )}
              </TeammateStyled>
            ))
          ) : (
            <NoContentMessage>No team members available</NoContentMessage>
          )}
        </SidebarStyled>

        <MainContentStyled>
          <ContentSection>
            <SectionTitle>Today's Focus</SectionTitle>
            {/* This section can be populated with relevant content */}
            <NoContentMessage>No focus items defined for today</NoContentMessage>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Team Announcements</SectionTitle>
            {/* This section can be populated with team announcements */}
            <NoContentMessage>No announcements at this time</NoContentMessage>
          </ContentSection>
        </MainContentStyled>
      </BoardRoomStyled>
    </BoardRoomContainer>
  );
};

export default StandupBoardRoom;
