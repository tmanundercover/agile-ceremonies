import React, {useState} from 'react';
import styled from 'styled-components';
import theme from '../theme';
import TimelineSection, {TimelineItem} from "./TimelineSection";
import TodoServicesTag from "./TodoServicesTag";
import {Phase} from '../task-track/MilestoneTracker.types';
import TodoItem from "./TodoItem";

// Container with gradient background
const SectionContainer = styled.section`
    background: linear-gradient(135deg, ${theme.colors.neutral900}CC, ${theme.colors.primaryDark}80);
    border-radius: ${theme.borderRadius};
    padding: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.xl};
    color: white;
    position: relative;
    overflow: hidden;
    box-shadow: ${theme.shadows.lg};

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239333EA' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E") repeat;
        opacity: 0.2;
        z-index: 0;
    }
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 1;
`;

const SectionTitle = styled.h2`
    font-size: 2.5rem;
    font-weight: 800;
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
        height: 4px;
        bottom: -10px;
        left: 0;
        background: linear-gradient(90deg, ${theme.colors.primary}, transparent);
        border-radius: 2px;
    }
`;

const SectionDescription = styled.p`
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: ${theme.spacing.lg};
    max-width: 800px;
    color: ${theme.colors.neutral200};
`;

const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${theme.spacing.lg};
    margin-top: ${theme.spacing.xl};
`;

const FeatureCard = styled.div`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: ${theme.borderRadius};
    padding: ${theme.spacing.lg};
    transition: all 0.3s ${theme.animations.easeOutBack};
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
        transform: translateY(-10px);
        box-shadow: ${theme.shadows.hover};
        background: rgba(255, 255, 255, 0.15);
        border-color: ${theme.colors.primaryLight}50;
    }
`;

const FeatureTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: ${theme.spacing.sm};
    color: white;
    display: flex;
    align-items: center;

    &::before {
        content: '●';
        color: ${theme.colors.primary};
        margin-right: ${theme.spacing.sm};
        font-size: 1rem;
    }
`;

const FeatureDescription = styled.p`
    font-size: 0.95rem;
    line-height: 1.6;
    color: ${theme.colors.neutral200};
`;

const TechBadgesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.sm};
    margin-top: ${theme.spacing.lg};
`;

interface TechBadgeProps {
    color: string;
}

const TechBadge = styled.span<TechBadgeProps>`
    background-color: ${props => props.color || theme.colors.primary}30;
    color: white;
    font-size: 0.85rem;
    font-weight: 500;
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    border: 1px solid ${props => props.color || theme.colors.primary}50;
    transition: all 0.2s ease;

    &:hover {
        transform: scale(1.05);
        background-color: ${props => props.color || theme.colors.primary}50;
    }
`;

const ActionButton = styled.button`
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
    color: white;
    border: none;
    border-radius: 30px;
    padding: ${theme.spacing.sm} ${theme.spacing.xl};
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: ${theme.spacing.lg};
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(147, 51, 234, 0.3);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(147, 51, 234, 0.4);
    }

    &:active {
        transform: translateY(1px);
    }
`;

const PhaseContainer = styled.div`
    margin-bottom: ${theme.spacing.lg};
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: ${theme.borderRadius};
    overflow: hidden;
    box-shadow: ${theme.shadows.md};
    transition: transform 0.3s ${theme.animations.easeInOut}, box-shadow 0.3s ${theme.animations.easeInOut};
    background: rgba(255, 255, 255, 0.05);

    &:hover {
        transform: translateY(-4px);
        box-shadow: ${theme.shadows.lg};
        border-color: ${theme.colors.primaryLight}30;
    }
`;

const PhaseHeader = styled.div`
    padding: ${theme.spacing.md};
    background: rgba(255, 255, 255, 0.1);
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    border-bottom: 2px solid ${theme.colors.primaryLight}50;
    transition: background-color 0.2s ease;
    
    &:hover {
        background: rgba(255, 255, 255, 0.15);
    }
`;

const PhaseContent = styled.div`
    padding: ${theme.spacing.md};
    background: rgba(255, 255, 255, 0.02);
`;

// Icons for tech badges
const FirebaseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.62 11.558l-3.203 2.98-2.972-5.995 1.538-3.448c.4-.7 1.024-.692 1.414 0l3.226 6.463h-.003z"
              fill="#FFA000"/>
        <path d="M13.445 8.543l2.972 5.995-11.97 11.135z" fill="#F57F17"/>
        <path
            d="M23.123 7.003c.572-.55 1.164-.362 1.315.417l3.116 18.105-10.328 6.2c-.36.2-1.32.286-1.32.286s-.874-.104-1.207-.3L4.447 25.673z"
            fill="#FFCA28"/>
        <path d="M13.445 8.543l-8.997 17.13L8.455.638c.148-.78.592-.855.988-.167z" fill="#FFA000"/>
    </svg>
);

const WixIcon = () => (
    <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z" fill="#FFFFFF"/>
        <path
            d="M23.538 8.897l-4.815 8.291 4.815 8.28h-3.048l-3.242-5.56-3.242 5.56H10.98l4.815-8.28-4.815-8.291h3.027l3.242 5.57 3.242-5.57h3.047z"
            fill="#0C6EFC"/>
    </svg>
);

const ReactIcon = () => (
    <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16 13.146c-1.573 0-2.854 1.281-2.854 2.854s1.281 2.854 2.854 2.854 2.854-1.281 2.854-2.854-1.281-2.854-2.854-2.854z"
            fill="#61DAFB"/>
        <path
            d="M8.011 21.673l-.629-.16c-4.691-1.185-7.381-3.197-7.381-5.519s2.691-4.333 7.381-5.519l.629-.16.178.624c.545 1.86 1.211 3.62 1.999 5.229l.159.325-.159.325c-.788 1.61-1.454 3.36-1.999 5.229l-.178.624zm3.249-11.095c-3.92 1.055-6.275 2.651-6.275 4.576s2.355 3.52 6.275 4.576c.46-1.505 1.03-2.951 1.695-4.292-.665-1.342-1.235-2.788-1.695-4.292v-.568zm8.855-.073l-.623.19c-1.656.546-3.29 1.221-4.836 2.013l-.315.17-.317-.17c-1.545-.792-3.18-1.466-4.837-2.013l-.624-.19-.077-.642c-.232-1.909-.232-3.649 0-5.57l.077-.643.624-.189c1.656-.546 3.291-1.22 4.837-2.013l.316-.17.317.17c1.546.793 3.181 1.466 4.837 2.013l.624.19.077.642c.232 1.909.232 3.649 0 5.571l-.079.643h.002zm-1.779-5.124c-1.541.502-3.017 1.116-4.415 1.83-1.398-.714-2.875-1.328-4.415-1.83.154-1.344.154-2.566 0-3.909 1.54.502 3.017 1.116 4.415 1.83 1.398-.714 2.874-1.328 4.415-1.83-.153 1.344-.153 2.566 0 3.91v-.001zm.236 10.638l.159-.325.159-.325c.788-1.61 1.454-3.361 1.999-5.229l.177-.624.63.16c4.69 1.185 7.38 3.197 7.38 5.52s-2.69 4.333-7.38 5.518l-.63.16-.177-.624c-.546-1.86-1.211-3.62-2-5.229l-.159-.326h.002zm-.565-2.286c.665 1.342 1.235 2.787 1.694 4.292 3.92-1.055 6.275-2.65 6.275-4.576s-2.355-3.52-6.275-4.576c-.46 1.505-1.03 2.951-1.694 4.292v.568z"
            fill="#61DAFB"/>
    </svg>
);

const TypeScriptIcon = () => (
    <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 16v16h32V0H0v16zm25.786-1.276c1.083.537 1.905 1.362 2.435 2.438.139.278.261.524.272.545.013.027-2.448 1.741-3.94 2.747l-.212.145-.22-.336c-.293-.461-.704-.83-1.207-1.055-.867-.365-1.999-.199-2.669.391-.745.653-.693 1.569.109 2.075.391.242 1.137.551 2.088.865 2.581.854 3.676 1.422 4.39 2.284.475.575.805 1.245.958 1.961.077.357.077 1.274 0 1.629-.272 1.295-1.139 2.36-2.501 3.071-.704.371-1.501.545-2.561.562-1.361.014-2.423-.277-3.647-1.014-.624-.371-1.543-1.261-1.845-1.781l-.152-.263 1.095-.723c.605-.399 1.109-.735 1.127-.752.014-.011.104.119.199.29.365.652 1.075 1.235 1.739 1.442 1.152.363 2.533.098 3.071-.594.211-.264.293-.626.217-.999-.092-.461-.491-.799-1.397-1.185-.306-.131-1.082-.42-1.73-.644-2.003-.71-2.833-1.217-3.505-2.143-.318-.448-.614-1.098-.71-1.594-.13-.642-.065-1.579.157-2.249.404-1.208 1.374-2.136 2.659-2.551.745-.237 2.435-.264 3.258-.049z"
            fill="#007ACC"/>
        <path d="M17.936 15.312h-8.63v2.19h3.046v8.693h2.582v-8.693h3.002z" fill="#007ACC"/>
    </svg>
);

// Define technology type
interface Technology {
    name: string;
    color: string;
    icon?: React.ReactNode;
}

// Define feature type
interface Feature {
    title: string;
    description: string;
}

// Props for the MultiAgentNetworkSection
interface MultiAgentNetworkSectionProps {
    title?: string;
    description?: string;
    technologies?: Technology[];
    features?: Feature[];
    actionButtonText?: string;
    onActionClick?: () => void;
    phases: Phase[]
}

const TaskContainer = styled.div`
    position: relative;
    margin-bottom: ${theme.spacing.md};
    padding: ${theme.spacing.md};
    background: rgba(255, 255, 255, 0.07);
    border-radius: ${theme.borderRadius};
    box-shadow: ${theme.shadows.sm};
    border-left: 4px solid ${theme.colors.primary}80;
    transition: transform 0.3s ${theme.animations.easeInOut}, box-shadow 0.3s ${theme.animations.easeInOut};

    &:hover {
        transform: translateX(8px);
        box-shadow: ${theme.shadows.md};
        background: rgba(255, 255, 255, 0.1);
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

const TaskHeader = styled.div`
    font-weight: bold;
    margin-bottom: ${theme.spacing.sm};
    padding-bottom: ${theme.spacing.xs};
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    color: white;
    font-size: 16px;
`;

const TaskDescription = styled.div`
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.neutral200};
    font-size: 14px;
    line-height: 1.5;
`;

const TodosContainer = styled.div`
    margin-top: ${theme.spacing.sm};
    background: rgba(147, 51, 234, 0.1);
    border-radius: ${theme.borderRadius};
    padding: ${theme.spacing.sm};
`;

const TodosTitle = styled.div`
    font-weight: bold;
    margin-bottom: ${theme.spacing.xs};
    color: ${theme.colors.primaryLight};
    font-size: 16px;
    display: flex;
    align-items: center;

    &::before {
        content: '✓';
        margin-right: ${theme.spacing.xs};
    }
`;

const ServiceLabel = styled.div`
    font-size: 12px;
    color: ${theme.colors.neutral300};
    margin-bottom: ${theme.spacing.xs};
    font-weight: 500;
`;

const ServicesContainer = styled.div`
    margin-bottom: ${theme.spacing.sm};
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.xs};
`;

const TasksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
    margin-top: ${theme.spacing.lg};
`;

const TaskListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.sm};
`;

const TaskListTitle = styled.h2`
    font-size: 1.8rem;
    margin: 0;
    color: white;
    position: relative;
    display: inline-block;
    background: linear-gradient(90deg, #FFFFFF, ${theme.colors.primaryLight});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &:after {
        content: '';
        position: absolute;
        width: 70%;
        height: 3px;
        bottom: -4px;
        left: 0;
        background: linear-gradient(90deg, ${theme.colors.primary}, transparent);
        border-radius: 2px;
    }
`;

const ChevronIcon = styled.span<{ $isExpanded: boolean }>`
    transition: transform 0.3s ${theme.animations.easeInOut};
    transform: ${props => props.$isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    display: inline-block;
    font-size: 18px;
`;

const MultiAgentNetworkSection: React.FC<MultiAgentNetworkSectionProps> = ({
                                                                               title = "Multi-Agent Network",
                                                                               phases = [],
                                                                               description = "Build a sophisticated multi-agent system using Firebase and Wix, with a focus on task management and natural language processing. This system enables intelligent collaboration between different specialized AI agents to solve complex problems.",
                                                                               technologies = [
                                                                                   {
                                                                                       name: "Firebase",
                                                                                       color: "#FFA000",
                                                                                       icon: <FirebaseIcon/>
                                                                                   },
                                                                                   {
                                                                                       name: "Wix",
                                                                                       color: "#0C6EFC",
                                                                                       icon: <WixIcon/>
                                                                                   },
                                                                                   {
                                                                                       name: "React",
                                                                                       color: "#61DAFB",
                                                                                       icon: <ReactIcon/>
                                                                                   },
                                                                                   {
                                                                                       name: "TypeScript",
                                                                                       color: "#007ACC",
                                                                                       icon: <TypeScriptIcon/>
                                                                                   }
                                                                               ],
                                                                               features = [
                                                                                   {
                                                                                       title: "Task Management",
                                                                                       description: "Intelligent distribution and tracking of tasks across multiple agents, with real-time updates and priority-based scheduling."
                                                                                   },
                                                                                   {
                                                                                       title: "Natural Language Processing",
                                                                                       description: "Advanced NLP capabilities for understanding user requests, translating between agents, and generating human-readable outputs."
                                                                                   },
                                                                                   {
                                                                                       title: "Firebase Integration",
                                                                                       description: "Leverage Firebase for real-time database, authentication, and cloud functions to create a responsive and scalable agent network."
                                                                                   },
                                                                                   {
                                                                                       title: "Wix Compatibility",
                                                                                       description: "Seamlessly integrate with Wix platforms using custom elements, providing an intuitive interface for managing the agent network."
                                                                                   }
                                                                               ],
                                                                               actionButtonText = "Explore the Network",
                                                                               onActionClick = () => {
                                                                               }
                                                                           }) => {
    // State for tracking expanded phases and tasks
    const [expandedPhases, setExpandedPhases] = useState<{ [key: string]: boolean }>({});
    const [expandedTasks, setExpandedTasks] = useState<{ [key: string]: boolean }>({});

    // Toggle function for expanding/collapsing phases
    const togglePhase = (phaseId: string) => {
        setExpandedPhases(prev => ({
            ...prev,
            [phaseId]: !prev[phaseId]
        }));
    };

    // Toggle function for expanding/collapsing tasks
    const toggleTask = (taskId: string) => {
        setExpandedTasks(prev => ({
            ...prev,
            [taskId]: !prev[taskId]
        }));
    };



    return (
        <SectionContainer>
            <ContentWrapper>
                <SectionTitle>{title}</SectionTitle>
                <SectionDescription>
                    {description}
                </SectionDescription>

                <TechBadgesContainer>
                    {technologies.map((tech, index) => (
                        <TechBadge key={index} color={tech.color}>
                            {tech.icon} {tech.name}
                        </TechBadge>
                    ))}
                </TechBadgesContainer>

                <FeaturesGrid>
                    {features.map((feature, index) => (
                        <FeatureCard key={index}>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>
                                {feature.description}
                            </FeatureDescription>
                        </FeatureCard>
                    ))}
                </FeaturesGrid>

                <ActionButton onClick={onActionClick}>{actionButtonText}</ActionButton>
                <TasksContainer>
                    <TaskListHeader>
                        <TaskListTitle>All Tasks</TaskListTitle>
                    </TaskListHeader>

                    {phases.map((phase: Phase, pIndex) => {
                        const communicationTimelineItems: TimelineItem[] = [
                            {
                                weeks: phase.timeline,
                                description: phase.description || "",
                                agent: phase.agent || "",
                                goals: phase.goals
                            }]
                        const phaseId = `phase-${pIndex}`;
                        const isExpanded = expandedPhases[phaseId] || false;
                        return (
                            <PhaseContainer key={phaseId}>
                                <PhaseHeader onClick={() => togglePhase(phaseId)}>
                                    <div>{phase.phase}</div>
                                    <ChevronIcon $isExpanded={isExpanded}>
                                        {isExpanded ? '▼' : '►'}
                                    </ChevronIcon>
                                </PhaseHeader>
                                <TimelineSection items={communicationTimelineItems}/>

                                {isExpanded && (
                                    <PhaseContent>
                                        {phase.tasks && (
                                            <div>
                                                <h4>Tasks:</h4>
                                                {phase.tasks.map((task, tIndex) => {
                                                    const taskId = `task-${pIndex}-${tIndex}`;
                                                    const isTaskExpanded = expandedTasks[taskId] || false;
                                                    return (
                                                        <TaskContainer key={taskId}>
                                                            <TaskHeader onClick={() => toggleTask(taskId)}>
                                                                <div>{task.title}</div>
                                                                <ChevronIcon $isExpanded={isTaskExpanded}>
                                                                    {isTaskExpanded ? '▼' : '►'}
                                                                </ChevronIcon>
                                                            </TaskHeader>

                                                            {isTaskExpanded && (
                                                                <>
                                                                    <TaskDescription>{task.description}</TaskDescription>

                                                                    {task.services && (
                                                                        <div>
                                                                            <ServiceLabel>Services:</ServiceLabel>
                                                                            <ServicesContainer>
                                                                                {task.services.map((service, sIndex) => (
                                                                                    <TodoServicesTag
                                                                                        key={`service-${sIndex}`}
                                                                                        service={service}/>
                                                                                ))}
                                                                            </ServicesContainer>
                                                                        </div>
                                                                    )}

                                                                    {task.todos && task.todos.length > 0 && (
                                                                        <TodosContainer>
                                                                            <TodosTitle>Todo Items</TodosTitle>
                                                                            {task.todos.map((todo, todoIndex) => (
                                                                                <TodoItem
                                                                                    key={`todo-${todoIndex}`}
                                                                                    title={todo.title}
                                                                                    status={todo.status}
                                                                                    services={todo.services}
                                                                                />
                                                                            ))}
                                                                        </TodosContainer>
                                                                    )}
                                                                </>
                                                            )}
                                                        </TaskContainer>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </PhaseContent>
                                )}
                            </PhaseContainer>
                        );
                    })}
                </TasksContainer>
            </ContentWrapper>
        </SectionContainer>
    );
};

export default MultiAgentNetworkSection;

