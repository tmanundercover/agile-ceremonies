import React from 'react';
import { OfficeViewStyled, SidebarStyled, OfficeFloorStyled } from './StyledComponents';

const OfficeView: React.FC = () => {
  return (
    <div>
      <OfficeViewStyled>
        <SidebarStyled>
          {/* Teammates and backlog */}
        </SidebarStyled>
        <OfficeFloorStyled>
          {/* Grid of desks */}
        </OfficeFloorStyled>
      </OfficeViewStyled>
    </div>
  );
};

export default OfficeView;
