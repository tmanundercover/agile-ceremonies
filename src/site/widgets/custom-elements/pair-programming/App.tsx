import TeammateCard from './TeammateCard';
import TeammateDetailsModal from './TeammateDetailsModal';
import {useEffect, useState} from "react";
import {Desk, Task, Teammate} from "./models";
import {
    AppContainer,
    BacklogSection,
    DeskContainer,
    OfficeContainer,
    OfficeFloor,
    Seat,
    SeatOccupied,
    Sidebar,
    TaskDropdown,
    TeammateCarousel,
    NavButton,
    SectionTitle,
    StandupButton,
    DeskTitle,
    TaskSelectionTitle,
    EmptySeatLabel
} from "./StyledComponents";
import { CalendarIcon } from '@radix-ui/react-icons';
import React from 'react';
import ActualStandupModal from "./standup/ActualStandupModal";
import theme from './theme';
import ThemeSwitcherStyled from './task-track/TaskTracker';
import TimelineComponentStyled from "./task-track/TaskTracker";
import {ProjectTimelineData} from "./data/ProjectTimelineData";

const App: React.FC = () => {
    const [currentTeammateIndex, setCurrentTeammateIndex] = useState(0);
    const [selectedTeammate, setSelectedTeammate] = useState<Teammate | null>(null);
    const [showStandupModal, setShowStandupModal] = useState(false);
    const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);

    const [desks, setDesks] = useState<Desk[]>([
        {
            id: '1',
            developerSeats: [null,null],
            endcapSeat: null,
            assignedTask: null,
            taskDropdown: []
        },
        {
            id: '2',
            developerSeats: [null,null],
            endcapSeat: null,
            assignedTask: null,
            taskDropdown: []
        },
    ]);

    const [teammates, setTeammates] = useState<Teammate[]>([
        {id: '1', name: 'John Dev',  role: 'Developer', helpRequests: [], email:"email@thn.com", avatarUrl:""},
        {id: '2', name: 'Jane PM', role: 'PM', helpRequests: [], email:"email@thn.com", avatarUrl:""},
        {id: '3', name: 'Bob Designer', role: 'Graphic Designer', helpRequests: [], email:"email@thn.com", avatarUrl:""},
    ]);

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

    useEffect(() => {
        // Ensure that the desks and teammates are properly initialized
        if (!desks || !teammates) {
            setDesks([]);
            setTeammates([]);
        }
    }, []);

    const nextTeammate = () => {
        setCurrentTeammateIndex((prev) => (prev + 1) % teammates.length);
    };

    const previousTeammate = () => {
        setCurrentTeammateIndex((prev) => (prev - 1 + teammates.length) % teammates.length);
    };

    return (
        <AppContainer>
            <OfficeContainer>
                <Sidebar>
                    <SectionTitle>Team Members</SectionTitle>
                    <TeammateCarousel>
                        <NavButton onClick={previousTeammate}>&lt;</NavButton>
                        <NavButton onClick={nextTeammate}>&gt;</NavButton>
                    </TeammateCarousel>
                    <TeammateCard
                        teammate={teammates[currentTeammateIndex]}
                        onClick={() => setSelectedTeammate(teammates[currentTeammateIndex])}
                    />
                    <StandupButton
                        onClick={() => {
                            setSelectedTeammate(teammates[currentTeammateIndex]);
                            setShowStandupModal(true);
                        }}
                    >
                        Start Daily Standup
                    </StandupButton>

                    <BacklogSection>
                        <SectionTitle>Backlog</SectionTitle>
                        {tasks.map(task => (
                            <div key={task.id} style={{
                                padding: theme.spacing.sm,
                                margin: `${theme.spacing.xs} 0`,
                                backgroundColor: theme.colors.cardBg,
                                borderRadius: theme.borderRadius,
                                boxShadow: theme.boxShadow,
                                border: `1px solid ${theme.colors.neutral500}`
                            }}>
                                <div style={{
                                    fontWeight: 'bold',
                                    color: theme.colors.primary
                                }}>
                                    {task.title}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: theme.colors.textColor
                                }}>
                                    {task.status} - {task.priority} Priority
                                </div>
                            </div>
                        ))}
                    </BacklogSection>
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
                                    {teammates.find(t => t.id === desk.developerSeats[0]?.id)?.name}
                                </Seat> :
                                <SeatOccupied style={{gridArea: 'dev1'}}>
                                    <EmptySeatLabel>Empty Seat</EmptySeatLabel>
                                </SeatOccupied>
                            }

                            {desk.developerSeats[1] ?
                                <Seat style={{gridArea: 'dev2'}}>
                                    {teammates.find(t => t.id === desk.developerSeats[1]?.id)?.name}
                                </Seat> :
                                <SeatOccupied style={{gridArea: 'dev2'}}>
                                    <EmptySeatLabel>Empty Seat</EmptySeatLabel>
                                </SeatOccupied>
                            }

                            <TaskSelectionTitle>Assigned Task:</TaskSelectionTitle>
                            <TaskDropdown
                                value={desk.assignedTask || ''}
                                onChange={(e) => {
                                    const updatedDesks: Desk[] = desks.map((d:Desk) => {
                                        const aDesk:Desk = {
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
                                    {teammates.find(t => t.id === desk.endcapSeat?.id)?.name}
                                </Seat> :
                                <SeatOccupied style={{gridArea: 'endcap'}}>
                                    <EmptySeatLabel>Empty Seat</EmptySeatLabel>
                                </SeatOccupied>
                            }
                        </DeskContainer>
                    ))}
                </OfficeFloor>
            </OfficeContainer>

            {selectedTeammate && (
                <TeammateDetailsModal
                    teammate={selectedTeammate}
                    onClose={() => setSelectedTeammate(null)}
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

            <TimelineComponentStyled timelineData={ProjectTimelineData}/>
        </AppContainer>
    );
};

export default App;

