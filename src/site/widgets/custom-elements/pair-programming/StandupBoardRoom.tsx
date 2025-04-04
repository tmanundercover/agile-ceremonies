import React from 'react';
import { BoardRoomStyled, SidebarStyled, TeammateStyled, MainContentStyled } from './StyledComponents';
import { StandupData } from './models';

interface StandupData {
  name: string;
  // Add other properties if needed
}

interface StandupBoardRoomProps {
  standupData: StandupData[];
}

const StandupBoardRoom: React.FC<StandupBoardRoomProps> = ({ standupData }) => {
  return (
    <BoardRoomStyled>
      <SidebarStyled>
        {standupData.map((data, index) => (
          <TeammateStyled key={index}>
            {data.name}
          </TeammateStyled>
        ))}
      </SidebarStyled>
      <MainContentStyled>
        {/* Display tasks and requirements */}
      </MainContentStyled>
    </BoardRoomStyled>
  );
};

export default StandupBoardRoom;

