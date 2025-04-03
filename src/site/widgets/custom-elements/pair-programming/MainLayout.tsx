import React from 'react';
import { LayoutContainer, Sidebar, Content, OfficeContainer, DeskGrid, Desk, SeatCell, RequirementDropdown, EndcapCell, BacklogContainer, BacklogTitle } from "./styles";
// ...existing imports...
import DeveloperCarousel from "./DeveloperCarousel";

const MainLayout: React.FC = () => {
    return (
        <LayoutContainer>
            <Sidebar>
                <div style={{ flex: "0 0 auto", padding: "10px", borderBottom: "1px solid #ccc" }}>
                    <h3>Developers</h3>
                    {/* Insert DeveloperCarousel here */}
                    <DeveloperCarousel />
                </div>
                <BacklogContainer style={{ flex: 1 }}>
                    <BacklogTitle>Backlog</BacklogTitle>
                    {/* ...backlog items... */}
                </BacklogContainer>
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
