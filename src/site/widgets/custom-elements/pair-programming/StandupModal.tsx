import React, { useState } from 'react';
import { ModalStyled, FormStyled, InputStyled, TextAreaStyled, SelectStyled, ButtonStyled } from './StyledComponents';
import BlockerSection from './BlockerSection';
import Swimlanes from './Swimlanes';
import { HelpRequest, Task } from './models';

interface StandupModalProps {
  onClose: (data: { name: string; status: string; blockers: string[]; helpRequest: HelpRequest; tasksCompleted: Task[]; tasksInProgress: Task[]; tasksPlanned: Task[] }) => void;
}

const StandupModal: React.FC<StandupModalProps> = ({ onClose }) => {
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [blockers, setBlockers] = useState<string[]>([]);
  const [helpRequest, setHelpRequest] = useState<HelpRequest>({ id: '', requesterId: '', helperId: '', taskId: '', description: '', status: 'Pending', comments: [] });
  const [tasksCompleted, setTasksCompleted] = useState<Task[]>([]);
  const [tasksInProgress, setTasksInProgress] = useState<Task[]>([]);
  const [tasksPlanned, setTasksPlanned] = useState<Task[]>([]);

  const handleSubmit = () => {
    const data = { name, status, blockers, helpRequest, tasksCompleted, tasksInProgress, tasksPlanned };
    onClose(data);
  };

  const handleCancel = () => {
    onClose({ name: '', status: '', blockers: [], helpRequest: { id: '', requesterId: '', helperId: '', taskId: '', description: '', status: 'Pending', comments: [] }, tasksCompleted: [], tasksInProgress: [], tasksPlanned: [] });
  };

  return (
    <div>
      <ModalStyled>
        <h2>Standup Status</h2>
        <FormStyled>
          <InputStyled type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <SelectStyled value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select Status</option>
            <option value="On Track">On Track</option>
            <option value="Blocked">Blocked</option>
            <option value="At Risk">At Risk</option>
          </SelectStyled>
          <BlockerSection blockers={blockers} setBlockers={setBlockers} />
          <Swimlanes
            tasksCompleted={tasksCompleted}
            setTasksCompleted={setTasksCompleted}
            tasksInProgress={tasksInProgress}
            setTasksInProgress={setTasksInProgress}
            tasksPlanned={tasksPlanned}
            setTasksPlanned={setTasksPlanned}
          />
          <SelectStyled value={helpRequest.helperId} onChange={(e) => setHelpRequest({ ...helpRequest, helperId: e.target.value })}>
            <option value="">Select Teammate</option>
            <option value="1">Alice</option>
            <option value="2">Bob</option>
            <option value="3">Charlie</option>
            {/* Add more teammates as needed */}
          </SelectStyled>
          <TextAreaStyled placeholder="Comment" value={helpRequest.description} onChange={(e) => setHelpRequest({ ...helpRequest, description: e.target.value })} />
          <ButtonStyled onClick={handleSubmit}>Submit</ButtonStyled>
          <ButtonStyled onClick={handleCancel} style={{ backgroundColor: '#dc3545', marginLeft: '10px' }}>Cancel</ButtonStyled>
        </FormStyled>
      </ModalStyled>
    </div>
  );
};

export default StandupModal;
