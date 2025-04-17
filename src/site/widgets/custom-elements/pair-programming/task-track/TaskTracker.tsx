import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../theme';

// Type definitions
interface TodoItemProps {
  text: string;
  initialChecked?: boolean;
}

interface CheckboxProps {
  checked?: boolean;
}

interface TodoTextProps {
  checked?: boolean;
}

interface TagProps {
  text: string;
  link?: string;
  isAgent?: boolean;
}

interface TagContainerProps {
  isAgent?: boolean;
}

interface TimelineDayProps {
  hovered?: boolean;
}

interface Task {
  title: string;
  items: string[];
}

interface AgentLink {
  name: string;
  path: string;
}

interface AdditionalInfo {
  title: string;
  content: string;
  tags?: string[];
  agentLinks?: AgentLink[];
}

export interface TimelineItem {
  [key: string]: any; // For dynamic property access
  week?: number;
  phase?: number;
  agent: string;
  description: string;
  tasks?: Task[];
  additionalInfo?: AdditionalInfo[];
}

export interface TimelineComponentProps {
  timelineData: TimelineItem[];
  unit?: string;
}

// Styled components
const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.xs};
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Checkbox = styled.div<CheckboxProps>`
  width: 16px;
  height: 16px;
  border: 1.5px solid ${theme.colors.primary};
  border-radius: 3px;
  margin-right: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  
  ${props => props.checked && `
    background-color: ${theme.colors.primary};
    
    &:after {
      content: '✓';
      color: white;
      font-size: 10px;
    }
  `}
`;

const TodoText = styled.div<TodoTextProps>`
  font-size: 12px;
  color: ${theme.colors.textColor};
  ${props => props.checked && `
    text-decoration: line-through;
    opacity: 0.7;
  `}
`;

const TodoItem: React.FC<TodoItemProps> = ({ text, initialChecked = false }) => {
    const [checked, setChecked] = useState<boolean>(initialChecked);

    return (
        <TodoItemContainer>
            <Checkbox
                checked={checked}
                onClick={() => setChecked(!checked)}
            />
            <TodoText checked={checked}>{text}</TodoText>
        </TodoItemContainer>
    );
};

const TagContainer = styled.span<TagContainerProps>`
  background: ${props => props.isAgent ? 'transparent' : theme.colors.primaryLight};
  color: ${props => props.isAgent ? theme.colors.primary : 'white'};
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  margin: 2px;
  
  ${props => props.isAgent && `
    border: 1px dashed ${theme.colors.primary};
    
    &:hover {
      background: ${theme.colors.primaryLight};
      color: white;
      text-decoration: none;
    }
    
    &:before {
      content: "🤖";
      margin-right: 6px;
    }
  `}
  
  ${props => !props.isAgent && `
    border: 1px solid ${theme.colors.primaryDark};
  `}
`;

const Tag: React.FC<TagProps> = ({ text, link, isAgent = false }) => {
    if (link) {
        return (
            <TagContainer
                as="a"
                href={link}
                isAgent={isAgent}
            >
                {text}
            </TagContainer>
        );
    }

    return <TagContainer isAgent={isAgent}>{text}</TagContainer>;
};

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

const TimelineDay = styled.div<TimelineDayProps>`
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

const TimelineComponentStyled: React.FC<TimelineComponentProps> = ({ timelineData, unit }) => {
    const [hoveredWeek, setHoveredWeek] = useState<number | string | null>(null);

    // Determine the unit based on timelineData structure
    const determineUnit = (): string => {
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
                    key={`${item[unitProperty]}-${index}`}
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

interface ThemeToggleProps {
  // No props needed for this component
}

export const StyledThemeToggle = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${theme.colors.cardBg};
    border: none;
    box-shadow: ${theme.boxShadow};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    z-index: 100;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

const ThemeSwitcherStyled: React.FC<ThemeToggleProps> = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        setIsDarkMode(savedTheme === 'dark');
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = (): void => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <StyledThemeToggle onClick={toggleTheme} aria-label="Toggle dark mode">
            {isDarkMode ? '☀️' : '🌙'}
        </StyledThemeToggle>
    );
};

export default TimelineComponentStyled;
