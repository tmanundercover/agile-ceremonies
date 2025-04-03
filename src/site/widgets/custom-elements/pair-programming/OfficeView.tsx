import React from 'react';
import { OfficeViewStyled, SidebarStyled, OfficeFloorStyled } from './StyledComponents';

const OfficeView: React.FC = () => {
  return (
    <OfficeViewStyled>
      <SidebarStyled>
        {/* Teammates and backlog */}
      </SidebarStyled>
      <OfficeFloorStyled>
        {/* Grid of desks */}
      </OfficeFloorStyled>
    </OfficeViewStyled>
  );
};

export default OfficeView;
