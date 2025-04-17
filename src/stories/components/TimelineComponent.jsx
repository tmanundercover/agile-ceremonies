import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../theme';
import TodoItem from './TodoItem';
import Tag from './Tag';

const TimelineContainer = styled.div`
  position: relative;
  margin: ${theme.spacing.xl} 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${theme.colors.primary};
    border-radius: 4px;
  }
`;

const TimelineDay = styled.div`
  position: relative;
  margin-left: 50px;
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  border-radius: ${theme.borderRadius};
  background: ${theme.colors.cardBg};
  box-shadow: ${theme.boxShadow};
  transition: transform ${theme.transitionSpeed}, box-shadow ${theme.transitionSpeed};
  
  &::before {
    content: '';
    position: absolute;
    left: -30px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${theme.colors.primary};
  }
  
  ${props => props.hovered && `
    transform: translateX(10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  `}
`;

const DayNumber = styled.div`
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const AgentName = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: ${theme.spacing.xs};
`;

const Description = styled.div`
  color: ${theme.colors.textColor};
  margin-bottom: ${theme.spacing.sm};
`;

const TaskSection = styled.div`
  margin-top: ${theme.spacing.sm};
  padding-top: ${theme.spacing.xs};
  border-top: 1px dashed ${theme.colors.neutral500};
`;

const TaskTitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const AdditionalInfoSection = styled.div`
  margin-top: ${theme.spacing.sm};
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.neutral500};
`;

const InfoTitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const InfoContent = styled.div`
  font-size: 12px;
  color: ${theme.colors.textColor};
  margin-bottom: ${theme.spacing.xs};
`;

const InfoGroup = styled.div`
  margin-bottom: ${theme.spacing.sm};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xs};
`;

const TimelineComponentStyled = ({ timelineData, unit }) => {
  const [hoveredWeek, setHoveredWeek] = useState(null);

  // Determine the unit based on timelineData structure
  const determineUnit = () => {
    if (timelineData.length === 0) {
      return unit || 'weeks'; // Fallback to the provided unit or default
    }

    // Check first item to determine the unit type
    const firstItem = timelineData[0];

    if ('phase' in firstItem) {
      return 'phases';
    } else if ('week' in firstItem) {
      return 'weeks';
    }

    // If no definitive unit found, use the provided unit or default
    return unit || 'weeks';
  };

  const detectedUnit = determineUnit();

  // Helper function to capitalize the first letter of the unit
  const capitalizedUnit = detectedUnit.charAt(0).toUpperCase() + detectedUnit.slice(1);
  // Remove trailing 's' if present to get singular form (weeks -> Week, phases -> Phase)
  const singularUnit = capitalizedUnit.endsWith('s') ? capitalizedUnit.slice(0, -1) : capitalizedUnit;

  // Get the property name for the unit (week or phase)
  const unitProperty = detectedUnit.endsWith('s') ? detectedUnit.slice(0, -1) : detectedUnit;

  return (
    <TimelineContainer>
      {timelineData.map((item, index) => (
        <TimelineDay
          key={item[unitProperty]+index}
          hovered={hoveredWeek === item[unitProperty]}
          onMouseEnter={() => setHoveredWeek(item[unitProperty])}
          onMouseLeave={() => setHoveredWeek(null)}
        >
          <DayNumber>{singularUnit} {item[unitProperty]}</DayNumber>
          <AgentName>{item.agent}</AgentName>
          <Description>{item.description}</Description>

          {item.tasks && item.tasks.map((taskGroup, idx) => (
            <TaskSection key={idx}>
              <TaskTitle>{taskGroup.title}</TaskTitle>
              {taskGroup.items.map((task, taskIdx) => (
                <TodoItem key={taskIdx} text={task} />
              ))}
            </TaskSection>
          ))}

          {item.additionalInfo && (
            <AdditionalInfoSection>
              {item.additionalInfo.map((info, infoIdx) => (
                <InfoGroup key={infoIdx}>
                  <InfoTitle>{info.title}</InfoTitle>
                  <InfoContent>{info.content}</InfoContent>
                  {info.tags && (
                    <TagsContainer>
                      {info.tags.map((tag, tagIdx) => (
                        <Tag key={tagIdx} text={tag} />
                      ))}
                    </TagsContainer>
                  )}
                  {info.agentLinks && (
                    <TagsContainer>
                      {info.agentLinks.map((agent, agentIdx) => (
                        <Tag
                          key={agentIdx}
                          text={agent.name}
                          link={agent.path}
                          isAgent={true}
                        />
                      ))}
                    </TagsContainer>
                  )}
                </InfoGroup>
              ))}
            </AdditionalInfoSection>
          )}
        </TimelineDay>
      ))}
    </TimelineContainer>
  );
};

// Set default props
TimelineComponentStyled.defaultProps = {
  timelineData: [],
  unit: 'weeks' // Default unit is weeks, but component will auto-detect if possible
};

export default TimelineComponentStyled;

