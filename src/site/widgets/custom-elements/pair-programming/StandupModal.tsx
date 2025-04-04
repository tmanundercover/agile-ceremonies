import React, { useState } from 'react';
import { ModalStyled, FormStyled, InputStyled, TextAreaStyled, SelectStyled, ButtonStyled } from './StyledComponents';
import BlockerSection from './BlockerSection';
import Swimlanes from './Swimlanes';
import { Teammate } from './models';

interface HelpRequest {
  teammate: Teammate;
  comment: string;
}

interface StandupModalProps {
  onClose: (data: { name: string; status: string; blockers: string[]; helpRequest: HelpRequest; tasksCompleted: string[]; tasksInProgress: string[]; tasksPlanned: string[] }) => void;
}

const StandupModal: React.FC<StandupModalProps> = ({ onClose }) => {
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [blockers, setBlockers] = useState<string[]>([]);
  const [helpRequest, setHelpRequest] = useState<HelpRequest>({ teammate: { id: '', name: '', role: 'Developer' }, comment: '' });
  const [tasksCompleted, setTasksCompleted] = useState<string[]>([]);
  const [tasksInProgress, setTasksInProgress] = useState<string[]>([]);
  const [tasksPlanned, setTasksPlanned] = useState<string[]>([]);

  const handleSubmit = () => {
    const data = { name, status, blockers, helpRequest, tasksCompleted, tasksInProgress, tasksPlanned };
    onClose(data);
  };

  return (
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
        <SelectStyled value={helpRequest.teammate.id} onChange={(e) => setHelpRequest({ ...helpRequest, teammate: { ...helpRequest.teammate, id: e.target.value } })}>
          <option value="">Select Teammate</option>
          <option value="1">Alice</option>
          <option value="2">Bob</option>
          <option value="3">Charlie</option>
          {/* Add more teammates as needed */}
        </SelectStyled>
        <TextAreaStyled placeholder="Comment" value={helpRequest.comment} onChange={(e) => setHelpRequest({ ...helpRequest, comment: e.target.value })} />
        <ButtonStyled onClick={handleSubmit}>Submit</ButtonStyled>
      </FormStyled>
    </ModalStyled>
  );
};

export default StandupModal;
