import React, { useState } from 'react';
import { ModalStyled, FormStyled, InputStyled, TextAreaStyled, SelectStyled, ButtonStyled } from './StyledComponents';

interface HelpRequest {
  teammate: string;
  comment: string;
}

interface StandupModalProps {
  onClose: (data: { name: string; status: string; blockers: string[]; helpRequest: HelpRequest; tasksCompleted: string; tasksInProgress: string; tasksPlanned: string }) => void;
}

const StandupModal: React.FC<StandupModalProps> = ({ onClose }) => {
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [blockers, setBlockers] = useState<string[]>([]);
  const [helpRequest, setHelpRequest] = useState<HelpRequest>({ teammate: '', comment: '' });
  const [tasksCompleted, setTasksCompleted] = useState<string>('');
  const [tasksInProgress, setTasksInProgress] = useState<string>('');
  const [tasksPlanned, setTasksPlanned] = useState<string>('');

  const handleSubmit = () => {
    const data = { name, status, blockers, helpRequest, tasksCompleted, tasksInProgress, tasksPlanned };
    onClose(data);
  };

  return (
    <ModalStyled>
      <h2>Standup Status</h2>
      <FormStyled>
        <InputStyled type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextAreaStyled placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
        <InputStyled type="text" placeholder="Blockers" value={blockers.join(', ')} onChange={(e) => setBlockers(e.target.value.split(', '))} />
        <TextAreaStyled placeholder="Tasks Completed" value={tasksCompleted} onChange={(e) => setTasksCompleted(e.target.value)} />
        <TextAreaStyled placeholder="Tasks In Progress" value={tasksInProgress} onChange={(e) => setTasksInProgress(e.target.value)} />
        <TextAreaStyled placeholder="Tasks Planned" value={tasksPlanned} onChange={(e) => setTasksPlanned(e.target.value)} />
        <SelectStyled value={helpRequest.teammate} onChange={(e) => setHelpRequest({ ...helpRequest, teammate: e.target.value })}>
          <option value="">Select Teammate</option>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
          <option value="Charlie">Charlie</option>
          {/* Add more teammates as needed */}
        </SelectStyled>
        <TextAreaStyled placeholder="Comment" value={helpRequest.comment} onChange={(e) => setHelpRequest({ ...helpRequest, comment: e.target.value })} />
        <ButtonStyled onClick={handleSubmit}>Submit</ButtonStyled>
      </FormStyled>
    </ModalStyled>
  );
};

export default StandupModal;
