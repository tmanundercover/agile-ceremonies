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
import {Desk, Teammate} from "./models"

// Types
interface Requirement {
    id: string;
    title: string;
    description: string;
    status: 'New' | 'InProgress' | 'Complete';
    dependencies: string[];
    assignedPM: string;
    tasks: Task[];
    priority: 'Low' | 'Medium' | 'High';
    deadline: Date;
    acceptanceCriteria: string[];
}

interface StandupStatus {
    id: string;
    teammateId: string;
    date: Date;
    status: string;
    blockers: string[];
    helpRequests: HelpRequest[];
}

interface HelpRequest {
    id: string;
    requesterId: string;
    helperId: string;
    taskId: string;
    description: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    rejectionReason?: string;
    comments: Comment[];
}

interface Comment {
    id: string;
    authorId: string;
    content: string;
    timestamp: Date;
}

// Main App Component
export const App: React.FC = () => {
    // const [currentView, setCurrentView] = useState<'standup' | 'office' | 'board'>('office');
    // const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);

    const [desks, setDesks] = useState<Desk[]>([
        {
            id: '1',
            developerSeat1: null,
            developerSeat2: null,
            endcapSeat: null,
            assignedTask: null
        },
        {
            id: '2',
            developerSeat1: null,
            developerSeat2: null,
            endcapSeat: null,
            assignedTask: null
        },
    ]);
    //
    const [teammates, setTeammates] = useState<Teammate[]>([
        {id: '1', name: 'John Dev', role: 'Developer', helpRequests: []},
        {id: '2', name: 'Jane PM', role: 'PM', helpRequests: []},
        {id: '3', name: 'Bob Designer', role: 'GraphicDesigner', helpRequests: []},
    ]);
    //
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: '1',
            title: 'Implement Login',
            type: 'Feature',
            status: 'New',
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
            if (!targetDesk.developerSeat1) {
                targetDesk.developerSeat1 = teammate.id;
            } else if (!targetDesk.developerSeat2) {
                targetDesk.developerSeat2 = teammate.id;
            }
        } else if (['PM', 'GraphicDesigner'].includes(teammate.type)) {
            if (!targetDesk.endcapSeat) {
                targetDesk.endcapSeat = teammate.id;
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
                                {teammates.find(t => t.id === desk.developerSeats[0])?.name}
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
                                {teammates.find(t => t.id === desk.developerSeats[1])?.name}
                            </Seat> : <SeatOccupied
                                style={{gridArea: 'dev1'}}
                            >
                                {
                                    'Empty Seat'
                                }
                            </SeatOccupied>}


                            <TaskDropdown
                                value={desk.assignedTask?.title || ''}
                                onChange={(e) => {
                                    const updatedDesks = desks.map(d =>
                                        d.id === desk.id ? {...d, assignedTask: e.target.value} : d
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
                                {teammates.find(t => t.id === desk.endcapSeat)?.name}
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

