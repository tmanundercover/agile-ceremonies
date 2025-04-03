import React from 'react';
import { LayoutContainer, Sidebar, Content } from "./styles";
// ...existing imports...

const MainLayout: React.FC = () => {
    return (
        <LayoutContainer>
            <Sidebar>
              {/* Sidebar intentionally left empty */}
            </Sidebar>
            <Content>
              {/* officeFloor intentionally left empty */}
            </Content>
        </LayoutContainer>
    );
};

export default MainLayout;
