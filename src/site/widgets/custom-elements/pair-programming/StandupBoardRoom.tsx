import React from 'react';
import { BoardRoomStyled, SidebarStyled, TeammateStyled, MainContentStyled } from './StyledComponents';
import { StandupData } from './models';

interface StandupBoardRoomProps {
  standupData: StandupData[];
}

const StandupBoardRoom: React.FC<StandupBoardRoomProps> = ({ standupData }) => {
  return (
    <div>
      <BoardRoomStyled>
        <SidebarStyled>
          {standupData.map((data, index) => (
            <TeammateStyled key={index}>
              <div>{data.name}</div>
              <div>Status: {data.status}</div>
              <div>Blockers: {data.blockers.join(', ')}</div>
            </TeammateStyled>
          ))}
        </SidebarStyled>
        <MainContentStyled>
          {/* Display tasks and requirements */}
        </MainContentStyled>
      </BoardRoomStyled>
    </div>
  );
};

export default StandupBoardRoom;
