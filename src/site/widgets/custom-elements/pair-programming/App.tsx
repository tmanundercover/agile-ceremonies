// App.tsx
import React, {useEffect, useState} from 'react';
import {
    AppContainer,
    OfficeContainer,
    Sidebar,
    TeammateCarousel,
    BacklogSection,
    OfficeFloor,
    DeskContainer,
    Seat,
    SeatOccupied,
    DraggableTeammate,
    TaskDropdown
} from './StyledComponents';
import DeskDetailsModal from "./DeskDetailsModal";
import {Date as DateIcon} from "@wix/wix-ui-icons-common";
import {Desk, Teammate, Requirement, StandupStatus, HelpRequest, Comment, Task} from "./models"

// Main App Component
export const App: React.FC = () => {
    // const [currentView, setCurrentView] = useState<'standup' | 'office' | 'board'>('office');
    // const [currentUser, setCurrentUser] = useState<string | null>(null);
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
            icon: DateIcon,
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

    const handleDragEnd = (result: any) => {
        const {source, destination, draggableId} = result;

        if (!destination) return;

        const teammate = teammates.find(t => t.id === draggableId);
        if (!teammate) return;

        const updatedDesks = [...desks];
        const targetDesk = updatedDesks.find(d => d.id === destination.droppableId);

        if (!targetDesk) return;

        if (teammate.role === 'Developer') {
            if (!targetDesk.developerSeats[0]) {
                targetDesk.developerSeats[0] = teammate;
            } else if (!targetDesk.developerSeats[1]) {
                targetDesk.developerSeats[1] = teammate;
            }
        } else if (['PM', 'GraphicDesigner'].includes(teammate.role)) {
            if (!!targetDesk && !targetDesk.endcapSeat) {
                targetDesk.endcapSeat = teammate;
            }
        }

        setDesks(updatedDesks);
    };

    return (
        <AppContainer>
            <OfficeContainer>
                <Sidebar>
                    <TeammateCarousel>
                        {teammates.map(teammate => (
                            <DraggableTeammate
                                key={teammate.id}
                                // drag
                                // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                // whileHover={{ scale: 1.05 }}
                                // whileTap={{ scale: 0.95 }}
                            >
                                {teammate.name}
                            </DraggableTeammate>
                        ))}
                    </TeammateCarousel>
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

            {selectedDesk && (
                <DeskDetailsModal
                    desk={selectedDesk}
                    onClose={() => setSelectedDesk(null)}
                    teammates={teammates}
                    tasks={tasks}
                />
            )}
        </AppContainer>
    );
};

export default App;

