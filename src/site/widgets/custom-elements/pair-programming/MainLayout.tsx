import React from 'react';
import { LayoutContainer, Sidebar, Content, OfficeContainer, DeskGrid, Desk, SeatCell, RequirementDropdown, EndcapCell } from "./styles";
// ...existing imports...

const MainLayout: React.FC = () => {
    return (
        <LayoutContainer>
            <Sidebar>
              {/* Sidebar intentionally left empty */}
            </Sidebar>
            <Content>
              {/* Office floor with 10 desks */}
              <OfficeContainer>
                <DeskGrid>
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <Desk key={idx} solid>
                      <SeatCell>
                        Developer Seat 1
                      </SeatCell>
                      <SeatCell>
                        Developer Seat 2
                      </SeatCell>
                      <RequirementDropdown>
                        Task: Work on something
                      </RequirementDropdown>
                      <EndcapCell>
                        PM / Graphic Seat
                      </EndcapCell>
                    </Desk>
                  ))}
                </DeskGrid>
              </OfficeContainer>
            </Content>
        </LayoutContainer>
    );
};

export default MainLayout;
