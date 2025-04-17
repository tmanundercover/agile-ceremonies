import TeammateCard from './TeammateCard';
import TeammateDetailsModal from './TeammateDetailsModal';
import StandupModal from './StandupModal';
import {useEffect, useState} from "react";
import {Desk, Task, Teammate} from "./models";
import {
    AppContainer,
    BacklogSection, DeskContainer,
    OfficeContainer, OfficeFloor, Seat, SeatOccupied,
    Sidebar, TaskDropdown,
    TeammateCarousel
} from "./StyledComponents";
import { CalendarIcon } from '@radix-ui/react-icons';
import React from 'react';
import ActualStandupModal from "./standup/ActualStandupModal";

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
    //
    const [teammates, setTeammates] = useState<Teammate[]>([
        {id: '1', name: 'John Dev',  role: 'Developer', helpRequests: []},
        {id: '2', name: 'Jane PM', role: 'PM', helpRequests: []},
        {id: '3', name: 'Bob Designer', role: 'Graphic Designer', helpRequests: []},
    ]);
    //
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
    ]);
    //
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
                    <TeammateCarousel>
                        <button onClick={previousTeammate}>&lt;</button>
                        <button onClick={nextTeammate}>&gt;</button>
                    </TeammateCarousel>
                    <TeammateCard
                        teammate={teammates[currentTeammateIndex]}
                        onClick={() => setSelectedTeammate(teammates[currentTeammateIndex])}
                    />
                    <BacklogSection>
                        {/* Implement backlog list */}
                    </BacklogSection>
                </Sidebar>

                <OfficeFloor>
                    {desks.map((desk: Desk) => (
                        <DeskContainer
                            key={desk.id}
                            // whileHover={{ boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
                            onDoubleClick={() => setSelectedDesk(desk)}
                        >
                            {!!desk.developerSeats[0] ? <Seat
                                style={{gridArea: 'dev1'}}
                            >
                                {teammates.find(t => t.id === desk.developerSeats[0]?.id)?.name}
                            </Seat> : <SeatOccupied
                                style={{gridArea: 'dev1'}}
                            >
                                {
                                    'Empty Seat'
                                }
                            </SeatOccupied>}

                            {!!desk.developerSeats[1] ? <Seat
                                style={{gridArea: 'dev1'}}
                            >
                                {teammates.find(t => t.id === desk.developerSeats[1]?.id)?.name}
                            </Seat> : <SeatOccupied
                                style={{gridArea: 'dev1'}}
                            >
                                {
                                    'Empty Seat'
                                }
                            </SeatOccupied>}


                            <TaskDropdown
                                value={desk.assignedTask || ''}
                                onChange={(e) => {
                                    const updatedDesks: Desk[] = desks.map((d:Desk) => {

                                        const aDesk:Desk = {
                                            ...d,
                                            assignedTask: e.target.value
                                        }
                                        return d.id === desk.id ? aDesk : d
                                        }
                                    );
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

                            {!!desk.endcapSeat ? <Seat
                                style={{gridArea: 'dev1'}}
                            >
                                {teammates.find(t => t.id === desk.endcapSeat?.id)?.name}
                            </Seat> : <SeatOccupied
                                style={{gridArea: 'dev1'}}
                            >
                                {
                                    'Empty Seat'
                                }
                            </SeatOccupied>}
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
                    isEntering={false}                />
            )}
        </AppContainer>
    );
};

export default App;

