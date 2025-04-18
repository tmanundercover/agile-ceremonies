import React, {useState} from 'react';
import {StandupData, Teammate} from './models';
import styled from 'styled-components';
import theme from './theme';
import ActualStandupModal from './standup/ActualStandupModal';
import TimelineSection, { TimelineItem } from './components/TimelineSection';

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

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-bottom: ${theme.spacing.xs};
  background-color: ${props => {
    switch(props.$status.toLowerCase()) {
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

// Updated button components with icons
const TaskTrackerButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
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
  box-shadow: ${theme.boxShadow};

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: ${theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Task icon component
const TaskIconSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17L5 12L6.4 10.6L10 14.2L17.6 6.6L19 8L10 17Z"
      fill="currentColor"/>
  </svg>
);

// Close icon component
const CloseIconSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
      fill="currentColor"/>
  </svg>
);

// Standup icon component
const StandupIconSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z"
      fill="currentColor"/>
  </svg>
);

const NoContentMessage = styled.div`
  color: ${theme.colors.neutral700};
  font-style: italic;
  padding: ${theme.spacing.md};
  text-align: center;
  border: 1px dashed ${theme.colors.neutral500};
  border-radius: ${theme.borderRadius};
`;

// Add a styled component for the standup button
const StartStandupButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.success};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: ${theme.spacing.md};
  transition: all ${theme.transitionSpeed};
  display: flex;
  align-items: center;
  box-shadow: ${theme.boxShadow};

  &:hover {
    background-color: ${theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::before {
    content: "🗣️";
    margin-right: ${theme.spacing.xs};
    font-size: 16px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: ${theme.spacing.md};
`;

interface StandupBoardRoomProps {
  standupData: StandupData[];
}


const StandupBoardRoom: React.FC<StandupBoardRoomProps> = ({ standupData }) => {
  const [showTaskTracker, setShowTaskTracker] = useState(false);
  // Add state for showing the standup modal
  const [showStandupModal, setShowStandupModal] = useState(false);
  // Add state for the selected teammate
  const [selectedTeammate, setSelectedTeammate] = useState<Teammate | null>(null);

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

  // New formatted timeline data for the TimelineSection component
  const timelineItems: TimelineItem[] = [
    {
      weeks: "1-2",
      description: "Setup communication routing infrastructure for all agents",
      agent: "Compass (Communication Framework)",
      goals: [
        "Build the central message routing system",
        "Establish communication protocols and data schemas",
        "Create infrastructure for agent-to-agent messaging"
      ]
    },
    // You can add more timeline items as needed
    {
      weeks: "3-4",
      description: "Implement agent specialization and task delegation",
      agent: "TaskMaster",
      goals: [
        "Develop agent skill registry",
        "Create task assignment algorithms",
        "Build performance monitoring tools"
      ]
    }
  ];

  // Function to open the standup modal with a selected teammate
  const handleOpenStandup = () => {
    // Create a basic teammate object to pass to the modal
    // In a real implementation, you might want to select a specific teammate
    const teammate: Teammate = {
      id: '1',
      name: 'You',
      role: 'Developer',
      helpRequests: [],
      email: "user@example.com",
      avatarUrl: ""
    };

    setSelectedTeammate(teammate);
    setShowStandupModal(true);
  };

  // Function to handle closing the standup modal
  const handleCloseStandup = (data: any) => {
    setShowStandupModal(false);
    // Process standup data if needed
    if (data && data.name) {
      console.log('Standup data submitted:', data);
      // You could update standupData here if needed
    }
  };

  return (
    <BoardRoomContainer>
      <ButtonContainer>
        <TaskTrackerButton onClick={() => setShowTaskTracker(!showTaskTracker)}>
          {showTaskTracker ? <CloseIconSVG /> : <TaskIconSVG />}
          {showTaskTracker ? 'Hide Task Tracker' : 'Open Task Tracker'}
        </TaskTrackerButton>
        <StartStandupButton onClick={handleOpenStandup}>
          <StandupIconSVG />
          Submit Standup Update
        </StartStandupButton>
      </ButtonContainer>

      
      <BoardRoomStyled>
        <SidebarStyled>
          <SidebarHeader>Team Status</SidebarHeader>
          {standupData.length > 0 ? (
            standupData.map((data, index) => (
              <TeammateStyled key={index}>
                <TeammateName>{data.name}</TeammateName>
                <StatusBadge $status={data.status}>{data.status}</StatusBadge>

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
            {/* Add the TimelineSection component here */}
            <TimelineSection
              items={timelineItems}
              title="Project Timeline"
            />
          </ContentSection>

          <ContentSection>
            <SectionTitle>Team Announcements</SectionTitle>
            {/* This section can be populated with team announcements */}
            <NoContentMessage>No announcements at this time</NoContentMessage>
          </ContentSection>
        </MainContentStyled>
      </BoardRoomStyled>

      {/* Render the ActualStandupModal when showStandupModal is true */}
      {showStandupModal && (
        <ActualStandupModal
          onClose={handleCloseStandup}
          teammate={selectedTeammate}
          isEntering={true}
        />
      )}
    </BoardRoomContainer>
  );
};

export default StandupBoardRoom;

