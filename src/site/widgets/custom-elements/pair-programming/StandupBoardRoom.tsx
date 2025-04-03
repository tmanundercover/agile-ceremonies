import React from 'react';
import { BoardRoomStyled, SidebarStyled, TeammateStyled, MainContentStyled } from './StyledComponents';

const StandupBoardRoom = ({ standupData }) => {
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
