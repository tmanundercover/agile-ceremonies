import TeammateDetailsModal from './components/teammate-selector/TeammateDetailsModal';
import React, {useEffect, useState} from "react";
import {ChatMessage, Desk, Task} from "./models";
import {
    AppContainer,
    DeskContainer,
    DeskTitle,
    EmptySeatLabel,
    OfficeContainer,
    OfficeFloor,
    Seat,
    SeatOccupied,
    TaskDropdown,
    TaskSelectionTitle
} from "./StyledComponents";
import {CalendarIcon} from '@radix-ui/react-icons';
import ActualStandupModal from "./standup/ActualStandupModal";
import theme from './theme';
import styled, {ThemeProvider} from 'styled-components';
import MilestoneTracker from "./task-track/MilestoneTracker";
import AgentChatSidebar from "./task-track/components/AgentChatSidebar";
import {Chat} from "../nat-ceo-thn/components/chat/Chat";
import TeammateSelector from "./components/teammate-selector/TeammateSelector";
import { Teammate } from './components/teammate-selector/Teammate.types';

// Create SVG icons for each tab
const OfficeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"
            fill="currentColor"/>
    </svg>
);

const TaskIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17L5 12L6.4 10.6L10 14.2L17.6 6.6L19 8L10 17Z"
            fill="currentColor"/>
    </svg>
);

const StandupIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z"
            fill="currentColor"/>
    </svg>
);

const NetworkIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12Z"
            fill="currentColor"/>
        <path d="M6 12C6 13.1 5.1 14 4 14C2.9 14 2 13.1 2 12C2 10.9 2.9 10 4 10C5.1 10 6 10.9 6 12Z"
              fill="currentColor"/>
        <path d="M22 12C22 13.1 21.1 14 20 14C18.9 14 18 13.1 18 12C18 10.9 18.9 10 20 10C21.1 10 22 10.9 22 12Z"
              fill="currentColor"/>
        <path d="M12 6C12 7.1 11.1 8 10 8C8.9 8 8 7.1 8 6C8 4.9 8.9 4 10 4C11.1 4 12 4.9 12 6Z" fill="currentColor"/>
        <path d="M12 18C12 19.1 11.1 20 10 20C8.9 20 8 19.1 8 18C8 16.9 8.9 16 10 16C11.1 16 12 16.9 12 18Z"
              fill="currentColor"/>
        <path d="M18 6C18 7.1 17.1 8 16 8C14.9 8 14 7.1 14 6C14 4.9 14.9 4 16 4C17.1 4 18 4.9 18 6Z"
              fill="currentColor"/>
        <path d="M18 18C18 19.1 17.1 20 16 20C14.9 20 14 19.1 14 18C14 16.9 14.9 16 16 16C17.1 16 18 16.9 18 18Z"
              fill="currentColor"/>
    </svg>
);

// Replace the tab buttons with icon buttons
const IconTabContainer = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${theme.colors.neutral500};
    margin-bottom: ${theme.spacing.md};
    padding: ${theme.spacing.sm} 0;
    gap: ${theme.spacing.md};
    justify-content: center;
    background-color: ${theme.colors.cardBg};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 100;
`;


const IconTabButton = styled.button<{ $active: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    background-color: ${props => props.$active ? theme.colors.primary + '22' : 'transparent'};
    border: none;
    border-radius: ${theme.borderRadius};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    color: ${props => props.$active ? theme.colors.primary : theme.colors.neutral700};
    position: relative;

    &::after {
        content: ${props => props.$active ? "''" : 'none'};
        position: absolute;
        bottom: -${theme.spacing.sm};
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 3px;
        background-color: ${theme.colors.primary};
        border-radius: 3px;
    }

    &:hover {
        background-color: ${props => props.$active ? theme.colors.primary + '22' : theme.colors.neutral200};
        transform: translateY(-2px);
        color: ${theme.colors.primary};
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }

    svg {
        margin-bottom: ${theme.spacing.xs};
        font-size: 24px;
        transition: transform 0.2s ease;
    }

    &:hover svg {
        transform: scale(1.1);
    }
`;

const IconLabel = styled.span`
    font-size: 14px;
    font-weight: 500;
`;

const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
`;

const TaskTrackerContainer = styled.div`
    display: flex;
    height: calc(100vh - 150px);
    width: 100%;
`;

const TaskTrackerContent = styled.div<{ $sidebarVisible: boolean }>`
    flex: 1;
    padding: ${theme.spacing.md};
    overflow-y: auto;
    transition: all 0.3s ease;
    margin-left: ${props => props.$sidebarVisible ? '0' : '-280px'};
`;
const Sidebar = styled.div`
    width: 280px;
    height: 100%;
    background-color: ${theme.colors.sidebarBg || '#f9fafb'};
    border-right: 1px solid ${theme.colors.neutral300};
    padding: ${theme.spacing.sm};
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const TaskTrackerSidebar = styled(Sidebar)`
    width: 280px;
    height: 100%;
    padding: ${theme.spacing.md};
    overflow-y: auto;
`;

// Add StandupBoardRoom styled component
const StandupBoardContainer = styled.div`
    padding: ${theme.spacing.md};
    height: calc(100vh - 150px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`;

const StandupBoard = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.md};
`;

const StandupCard = styled.div`
    background-color: ${theme.colors.cardBg};
    border-radius: ${theme.borderRadius};
    box-shadow: ${theme.boxShadow};
    padding: ${theme.spacing.md};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};
`;

const StandupCardHeader = styled.div`
    font-weight: bold;
    color: ${theme.colors.primary};
    border-bottom: 2px solid ${theme.colors.primaryLight};
    padding-bottom: ${theme.spacing.xs};
`;

const StandupCardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};
`;

const StandupStatusItem = styled.div`
    padding: ${theme.spacing.sm};
    background-color: ${theme.colors.neutral200};
    border-radius: ${theme.borderRadius};
`;

const TeamHeaderSection = styled.div`
    margin-bottom: ${theme.spacing.md};
`;

const CarouselContainer = styled.div`
    position: relative;
    margin: ${theme.spacing.md} 0;
`;

const StandupButton = styled.button`
    background-color: ${theme.colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: 15px; /* Slightly smaller font */
    cursor: pointer;
    margin: ${theme.spacing.md} 0;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    position: relative;
    font-weight: 500;
    width: 100%; /* Take full width */
    box-sizing: border-box;

    &::before {
        content: '📅';
        margin-right: ${theme.spacing.sm};
        transition: transform 0.2s ease;
    }

    &:hover {
        background-color: ${theme.colors.primaryDark};
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

        &::before {
            transform: rotate(-10deg);
        }
    }

    &:active {
        transform: translateY(1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }
`;

const SectionTitle = styled.h2`
    font-size: ${theme.typography.heading3.fontSize};
    margin-top: 0;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.primary};
    position: relative;
    display: inline-block;
    max-width: 100%; /* Ensure it doesn't overflow */
    word-break: break-word; /* Allow breaking of long words */

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        bottom: -4px;
        left: 0;
        background: ${theme.colors.primary};
        border-radius: 2px;
    }
`;



const SidebarSection = styled.div`
    margin-bottom: ${theme.spacing.sm};
    &:last-child {
        flex: 1;
        min-height: 0; /* Important to allow proper flex shrinking */
        display: flex;
        flex-direction: column;
    }
`;

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'desks' | 'taskTracker' | 'standupRoom' | 'network'>('desks');
    const [currentTeammateIndex, setCurrentTeammateIndex] = useState(0);
    const [selectedTeammate, setSelectedTeammate] = useState<Teammate | null>(null);
    const [showStandupModal, setShowStandupModal] = useState(false);
    const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [isTeammateDetailsModalOpen, setIsTeammateDetailsModalOpen] = useState<boolean>(false)

    const [desks, setDesks] = useState<Desk[]>([
        {
            id: '1',
            developerSeats: [null, null],
            endcapSeat: null,
            assignedTask: null,
            taskDropdown: []
        },
        {
            id: '2',
            developerSeats: [null, null],
            endcapSeat: null,
            assignedTask: null,
            taskDropdown: []
        },
    ]);

// Handle sending a new message
    const handleSendMessage = (message: string) => {
        if (!selectedTeammate) return;

        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            sender: {name: 'User', type: 'user'},
            content: message,
            timestamp: new Date()
        };

        setChatMessages(prev => [...prev, newMessage]);

        // Simulate a response after a short delay
        setTimeout(() => {
            const agentResponse: ChatMessage = {
                id: (Date.now() + 1).toString(),
                sender: {
                    name: selectedTeammate.persona.name,
                    type: 'ai'
                },
                content: `I received your message: "${message}". How can I help you with this?`,
                timestamp: new Date()
            };

            setChatMessages(prev => [...prev, agentResponse]);
        }, 1000);
    };


    const [tasks, setTasks] = useState<Task[]>([
        {
            id: '1',
            priority: 'Low',
            icon: CalendarIcon,
            title: 'Implement Login',
            type: 'feature',
            status: 'To Do',
            requirementId: '1',
            assignedTeammates: [],
            dependencies: [],
            description: 'Create login functionality',
            comments: [],
        },
        {
            id: '2',
            priority: 'Medium',
            icon: CalendarIcon,
            title: 'Design Homepage',
            type: 'design',
            status: 'In Progress',
            requirementId: '2',
            assignedTeammates: [],
            dependencies: [],
            description: 'Create homepage design mockups',
            comments: [],
        },
        {
            id: '3',
            priority: 'High',
            icon: CalendarIcon,
            title: 'Fix API Integration',
            type: 'bug',
            status: 'To Do',
            requirementId: '3',
            assignedTeammates: [],
            dependencies: [],
            description: 'Fix API integration issues',
            comments: [],
        },
    ]);

    // Sample chat messages for agent communication
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            sender: {name: 'User', type: 'user'},
            content: 'I need help implementing the login functionality for our app.',
            timestamp: new Date(Date.now() - 3600000) // 1 hour ago
        },
        {
            id: '2',
            sender: {name: 'DevAgent', type: 'ai'},
            content: 'I can help with that. Could you specify what authentication method you prefer? OAuth, email/password, or something else?',
            timestamp: new Date(Date.now() - 3540000) // 59 minutes ago
        },
        {
            id: '3',
            sender: {name: 'User', type: 'user'},
            content: 'Let\'s go with OAuth using Google and Facebook.',
            timestamp: new Date(Date.now() - 3480000) // 58 minutes ago
        },
        {
            id: '4',
            sender: {name: 'DevAgent', type: 'ai'},
            content: 'Great choice. I\'ll create the task and notify the security team. @SecurityAgent we need to implement OAuth with Google and Facebook.',
            timestamp: new Date(Date.now() - 3420000) // 57 minutes ago
        },
        {
            id: '5',
            sender: {name: 'SecurityAgent', type: 'ai'},
            content: 'I\'ve reviewed the requirements. We should use Firebase Authentication for this as it supports both providers and handles token management securely. I\'ll prepare the configuration and security rules.',
            timestamp: new Date(Date.now() - 3360000) // 56 minutes ago
        },
        {
            id: '6',
            sender: {name: 'System', type: 'system'},
            content: 'Task created: "Implement OAuth with Google and Facebook" - Priority: High',
            timestamp: new Date(Date.now() - 3300000) // 55 minutes ago
        },
        {
            id: '7',
            sender: {name: 'UIAgent', type: 'ai'},
            content: "I'll create the login UI components with buttons for both providers. @DevAgent, can you share the color codes and sizes needed for the OAuth buttons?",
            timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
        },
        {
            id: '8',
            sender: {name: 'DevAgent', type: 'ai'},
            content: 'Here are Google\'s brand guidelines for sign-in buttons: https://developers.google.com/identity/branding-guidelines. For Facebook, use #1877F2 with the official logo. Button height should be 40px to match our design system.',
            timestamp: new Date(Date.now() - 1740000) // 29 minutes ago
        }
    ]);

    // Filter messages for the selected teammate
    const filteredMessages = selectedTeammate
        ? chatMessages.filter(message =>
            message.sender.type === 'user' ||
            message.sender.type === 'system' ||
            message.sender.name === selectedTeammate.persona.name)
        : [];


    useEffect(() => {
        // Ensure that the desks and teammates are properly initialized
        if (!desks) {
            setDesks([]);
        }
    }, []);

    const [isChatOpen, setIsChatOpen] = useState<boolean>(false)

    return (
        <AppContainer>
            <IconTabContainer>
                <IconTabButton
                    $active={activeTab === 'desks'}
                    onClick={() => setActiveTab('desks')}
                >
                    <OfficeIcon/>
                    <IconLabel>Development Office</IconLabel>
                </IconTabButton>
                <IconTabButton
                    $active={activeTab === 'taskTracker'}
                    onClick={() => setActiveTab('taskTracker')}
                >
                    <TaskIcon/>
                    <IconLabel>Task Tracker</IconLabel>
                </IconTabButton>
                <IconTabButton
                    $active={activeTab === 'standupRoom'}
                    onClick={() => setActiveTab('standupRoom')}
                >
                    <StandupIcon/>
                    <IconLabel>Standup Room</IconLabel>
                </IconTabButton>
                <IconTabButton
                    $active={activeTab === 'network'}
                    onClick={() => setActiveTab('network')}
                >
                    <NetworkIcon/>
                    <IconLabel>Multi-Agent Network</IconLabel>
                </IconTabButton>
                <Chat onToggle={() => {
                    setIsChatOpen(state => !state)
                }} isOpen={isChatOpen}/>
            </IconTabContainer>

            <ContentContainer>

                {activeTab === 'desks' && (
                    <OfficeContainer>
                        <Sidebar>
                            <SidebarSection>
                                <SectionTitle>Team</SectionTitle>
                                <TeammateSelector onSelectedTeammate={(teammate) => {
                                    setSelectedTeammate(teammate)
                                }}/>

                                {/*<StandupButton*/}
                                {/*    onClick={() => {*/}
                                {/*        setSelectedTeammate(teammates[currentTeammateIndex]);*/}
                                {/*        setShowStandupModal(true);*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    Start Daily Standup*/}
                                {/*</StandupButton>*/}
                            </SidebarSection>

                            {/* Add the Chat Sidebar component */}
                            <SidebarSection>
                                <AgentChatSidebar
                                    selectedTeammate={selectedTeammate}
                                    messages={filteredMessages}
                                    onSendMessage={handleSendMessage}
                                />
                            </SidebarSection>
                        </Sidebar>

                        <OfficeFloor>
                            <SectionTitle>Development Office</SectionTitle>
                            {desks.map((desk: Desk) => (
                                <DeskContainer
                                    key={desk.id}
                                    onDoubleClick={() => setSelectedDesk(desk)}
                                >
                                    <DeskTitle>Desk {desk.id}</DeskTitle>

                                    {desk.developerSeats[0] ?
                                        <Seat style={{gridArea: 'dev1'}}>
                                            Dev1
                                            {/*{teammates.find(t => t.id === desk.developerSeats[0]?.id)?.name}*/}
                                        </Seat> :
                                        <SeatOccupied style={{gridArea: 'dev1'}}>
                                            <EmptySeatLabel>Empty Seat</EmptySeatLabel>
                                        </SeatOccupied>
                                    }

                                    {desk.developerSeats[1] ?
                                        <Seat style={{gridArea: 'dev2'}}>
                                            Dev2
                                            {/*{teammates.find(t => t.id === desk.developerSeats[1]?.id)?.name}*/}
                                        </Seat> :
                                        <SeatOccupied style={{gridArea: 'dev2'}}>
                                            <EmptySeatLabel>Empty Seat</EmptySeatLabel>
                                        </SeatOccupied>
                                    }

                                    <TaskSelectionTitle>Assigned Task:</TaskSelectionTitle>
                                    <TaskDropdown
                                        value={desk.assignedTask || ''}
                                        onChange={(e) => {
                                            const updatedDesks: Desk[] = desks.map((d: Desk) => {
                                                const aDesk: Desk = {
                                                    ...d,
                                                    assignedTask: e.target.value
                                                }
                                                return d.id === desk.id ? aDesk : d
                                            });
                                            setDesks(updatedDesks);
                                        }}
                                    >
                                        <option value="">Select Task</option>
                                        {tasks.map(task => (
                                            <option key={task.id} value={task.id}>
                                                {task.title}
                                            </option>
                                        ))}
                                    </TaskDropdown>

                                    {desk.endcapSeat ?
                                        <Seat style={{gridArea: 'endcap'}}>
                                            Endcap
                                            {/*{desk.endcapSeat.name}*/}
                                            {/*{teammates.find(t => t.id === desk.endcapSeat?.id)?.name}*/}
                                        </Seat> :
                                        <SeatOccupied style={{gridArea: 'endcap'}}>
                                            <EmptySeatLabel>Empty Seat</EmptySeatLabel>
                                        </SeatOccupied>
                                    }
                                </DeskContainer>
                            ))}
                        </OfficeFloor>
                    </OfficeContainer>
                )}

                {activeTab === 'taskTracker' && (
                    <ThemeProvider theme={theme}>
                        <MilestoneTracker/>
                    </ThemeProvider>
                )}

                {activeTab === 'standupRoom' && (
                    <StandupBoardContainer>
                        <SectionTitle>Standup Board Room</SectionTitle>
                        <StandupBoard>
                            {/*{teammates.map(teammate => (*/}
                            {/*    <StandupCard key={teammate.id}>*/}
                            {/*        <StandupCardHeader>{teammate.name}</StandupCardHeader>*/}
                            {/*        <StandupCardContent>*/}
                            {/*            <StandupStatusItem>*/}
                            {/*                <strong>Yesterday:</strong> No updates recorded.*/}
                            {/*            </StandupStatusItem>*/}
                            {/*            <StandupStatusItem>*/}
                            {/*                <strong>Today:</strong> No plans recorded.*/}
                            {/*            </StandupStatusItem>*/}
                            {/*            <StandupStatusItem>*/}
                            {/*                <strong>Blockers:</strong> None reported.*/}
                            {/*            </StandupStatusItem>*/}
                            {/*        </StandupCardContent>*/}
                            {/*    </StandupCard>*/}
                            {/*))}*/}
                        </StandupBoard>
                    </StandupBoardContainer>
                )}

                {activeTab === 'network' && (
                    <>hi</>
                )}
            </ContentContainer>

            {isTeammateDetailsModalOpen && selectedTeammate && (
                <TeammateDetailsModal
                    teammate={selectedTeammate}
                    onClose={() => setIsTeammateDetailsModalOpen(false)}
                    onStandupClick={() => setShowStandupModal(true)}
                    isExiting={showStandupModal}
                />
            )}

            {showStandupModal && (
                <ActualStandupModal
                    onClose={() => setShowStandupModal(false)}
                    teammate={selectedTeammate}
                    isEntering={false}
                />
            )}

        </AppContainer>
    );
};

export default App;

