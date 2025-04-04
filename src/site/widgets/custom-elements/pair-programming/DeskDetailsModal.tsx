import React from 'react';
// import { Modal } from '@wix/design-system';
import { ModalContent,ModalStyled } from './StyledComponents';
import { Desk, Teammate, Task } from './models';

interface DeskDetailsModalProps {
  desk: Desk | null;
  onClose: () => void;
  teammates: Teammate[];
  tasks: Task[];
}

const DeskDetailsModal: React.FC<DeskDetailsModalProps> = ({ desk, onClose, teammates, tasks }) => {
  const getTeammateName = (id: string | null) => {
    const teammate = teammates?.find(t => t.id === id);
    return teammate ? teammate?.name : 'Empty';
  };

  const getTaskTitle = (id: string | null) => {
    const task = tasks.find(t => t.id === id);
    return task ? task.title : 'None';
  };

  return (
    <ModalStyled>
      <ModalContent>
        <h2>Desk Details</h2>
        <p>Developer Seat 1: {getTeammateName(desk?.developerSeats[0]?.name ?? "No Developer Seated")}</p>
        <p>Developer Seat 2: {getTeammateName(desk?.developerSeats[0]?.name ?? "No Developer Seated")}</p>
        <p>Endcap Seat: {getTeammateName(desk?.endcapSeat.name ?? "No Developer Seated")}</p>
        <p>Assigned Task: {getTaskTitle(desk?.taskDropdown[0].title ?? "No Task Selected")}</p>
        <button onClick={onClose}>Close</button>
      </ModalContent>
    </ModalStyled>
  );
};

export default DeskDetailsModal;
