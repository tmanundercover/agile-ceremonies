// App.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from '@wix/design-system';

// Types
interface Teammate {
    id: string;
    name: string;
    type: 'PM' | 'Developer' | 'GraphicDesigner' | 'Marketing';
    helpRequests: HelpRequest[];
}

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

interface Task {
    id: string;
    title: string;
    type: 'Feature' | 'Bug' | 'Wireframe' | 'Spike';
    status: 'New' | 'InProgress' | 'Complete';
    requirementId: string;
    assignedTeammates: string[];
    dependencies: string[];
    description: string;
    comments: Comment[];
}

interface Desk {
    id: string;
    developerSeat1: string | null;
    developerSeat2: string | null;
    endcapSeat: string | null;
    assignedTask: string | null;
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

// Styled Components
const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  color: #000000;
`;

const OfficeContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100vh;
  background: #f5f5f5;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
`;

// think about styled(motion.div)?
const TeammateCarousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 1rem;
  gap: 1rem;
  height: 40%;
`;

const BacklogSection = styled.div`
  height: 60%;
  overflow-y: auto;
  padding: 1rem;
`;

const OfficeFloor = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: white;
  overflow: auto;
`;

const DeskContainer = styled.div`
  background: rgba(200, 200, 200, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 1rem;
  display: grid;
  grid-template-areas:
    "dev1 task endcap"
    "dev2 task endcap";
  gap: 1rem;
  height: 200px;
`;

const Seat = styled.div<{ occupied: boolean }>`
  background: ${props => props.occupied ? 'rgba(0, 255, 0, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DraggableTeammate = styled.div`
  background: black;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  cursor: move;
  scroll-snap-align: start;
`;

const TaskDropdown = styled.select`
  grid-area: task;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

// const Modal = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.5);
//   backdrop-filter: blur(5px);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
//
const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
`;

// Main App Component
export const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<'standup' | 'office' | 'board'>('office');
    const [currentUser, setCurrentUser] = useState<string | null>(null);
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

    const [teammates, setTeammates] = useState<Teammate[]>([
        { id: '1', name: 'John Dev', type: 'Developer', helpRequests: [] },
        { id: '2', name: 'Jane PM', type: 'PM', helpRequests: [] },
        { id: '3', name: 'Bob Designer', type: 'GraphicDesigner', helpRequests: [] },
    ]);

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

    useEffect(() => {
        // Ensure that the desks and teammates are properly initialized
        if (!desks || !teammates) {
            setDesks([]);
            setTeammates([]);
        }
    }, []);

    const handleDragEnd = (result: any) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        const teammate = teammates.find(t => t.id === draggableId);
        if (!teammate) return;

        const updatedDesks = [...desks];
        const targetDesk = updatedDesks.find(d => d.id === destination.droppableId);

        if (!targetDesk) return;

        if (teammate.type === 'Developer') {
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

    const DeskDetailsModal: React.FC<{ desk: Desk; onClose: () => void }> = ({ desk, onClose }) => (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
        >
            <ModalContent>
                <h2>Desk Details</h2>
                <p>Developer Seat 1: {desk.developerSeat1 || 'Empty'}</p>
                <p>Developer Seat 2: {desk.developerSeat2 || 'Empty'}</p>
                <p>Endcap Seat: {desk.endcapSeat || 'Empty'}</p>
                <p>Assigned Task: {desk.assignedTask || 'None'}</p>
                <button onClick={onClose}>Close</button>
            </ModalContent>
        </Modal>
    );

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
                    {desks.map(desk => (
                        <DeskContainer
                            key={desk.id}
                            // whileHover={{ boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
                            onDoubleClick={() => setSelectedDesk(desk)}
                        >
                            <Seat
                                occupied={!!desk.developerSeat1}
                                style={{ gridArea: 'dev1' }}
                            >
                                {desk.developerSeat1 ?
                                    teammates.find(t => t.id === desk.developerSeat1)?.name :
                                    'Empty Seat'
                                }
                            </Seat>

                            <Seat
                                occupied={!!desk.developerSeat2}
                                style={{ gridArea: 'dev2' }}
                            >
                                {desk.developerSeat2 ?
                                    teammates.find(t => t.id === desk.developerSeat2)?.name :
                                    'Empty Seat'
                                }
                            </Seat>

                            <TaskDropdown
                                value={desk.assignedTask || ''}
                                onChange={(e) => {
                                    const updatedDesks = desks.map(d =>
                                        d.id === desk.id ? { ...d, assignedTask: e.target.value } : d
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

                            <Seat
                                occupied={!!desk.endcapSeat}
                                style={{ gridArea: 'endcap' }}
                            >
                                {desk.endcapSeat ?
                                    teammates.find(t => t.id === desk.endcapSeat)?.name :
                                    'Empty Endcap'
                                }
                            </Seat>
                        </DeskContainer>
                    ))}
                </OfficeFloor>
            </OfficeContainer>

            {selectedDesk && (
                <DeskDetailsModal
                    desk={selectedDesk}
                    onClose={() => setSelectedDesk(null)}
                />
            )}
        </AppContainer>
    );
};

export default App;
