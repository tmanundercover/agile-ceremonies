import React, { useState } from 'react';
import { ModalStyled, FormStyled, InputStyled, TextAreaStyled, SelectStyled, ButtonStyled } from './StyledComponents';
import BlockerSection from './BlockerSection';
import Swimlanes from './Swimlanes';
import {HelpRequest, StandupData, Task, Teammate} from './models';

interface StandupModalProps {
    teammate: Teammate | null;
    onClose: (data: StandupData) => void;
    isEntering: boolean;
}

const StandupModal: React.FC<StandupModalProps> = ({ teammate, onClose, isEntering }) => {
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [blockers, setBlockers] = useState<string[]>([]);
  const [helpRequest, setHelpRequest] = useState<HelpRequest>({ id: '', requesterId: '', helperId: '', taskId: '', description: '', status: 'Pending', comments: [], statusAcknowledgement: "Pending" });
  const [tasksCompleted, setTasksCompleted] = useState<Task[]>([]);
  const [tasksInProgress, setTasksInProgress] = useState<Task[]>([]);
  const [tasksPlanned, setTasksPlanned] = useState<Task[]>([]);

  const handleSubmit = () => {
    const data = { name, status, blockers, helpRequest, tasksCompleted, tasksInProgress, tasksPlanned };
    onClose(data);
  };

  const handleCancel = () => {
    onClose({ name: '', status: '', blockers: [], helpRequest: { id: '', requesterId: '', helperId: '', taskId: '', description: '', status: 'Pending', comments: [], statusAcknowledgement: "Pending" }, tasksCompleted: [], tasksInProgress: [], tasksPlanned: [] });
  };

    return (
        <ModalStyled className={isEntering ? 'slide-in' : ''}>
            <h2 style={{ marginBottom: '1rem' }}>Standup Status - {teammate?.name}</h2>
            <FormStyled style={{ gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <InputStyled type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <SelectStyled value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="On Track">On Track</option>
                        <option value="Blocked">Blocked</option>
                        <option value="At Risk">At Risk</option>
                    </SelectStyled>
                </div>

                <BlockerSection blockers={blockers} setBlockers={setBlockers} />

                <Swimlanes
                    tasksCompleted={tasksCompleted}
                    setTasksCompleted={setTasksCompleted}
                    tasksInProgress={tasksInProgress}
                    setTasksInProgress={setTasksInProgress}
                    tasksPlanned={tasksPlanned}
                    setTasksPlanned={setTasksPlanned}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <SelectStyled value={helpRequest.helperId} onChange={(e) => setHelpRequest({ ...helpRequest, helperId: e.target.value })}>
                        <option value="">Select Teammate</option>
                        <option value="1">Alice</option>
                        <option value="2">Bob</option>
                        <option value="3">Charlie</option>
                    </SelectStyled>
                    <TextAreaStyled
                        placeholder="Comment"
                        value={helpRequest.description}
                        onChange={(e) => setHelpRequest({ ...helpRequest, description: e.target.value })}
                        style={{ height: '80px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                    <ButtonStyled onClick={handleSubmit}>Submit</ButtonStyled>
                    <ButtonStyled onClick={handleCancel} style={{ backgroundColor: '#dc3545' }}>Cancel</ButtonStyled>
                </div>
            </FormStyled>
        </ModalStyled>
    );
};

export default StandupModal;
