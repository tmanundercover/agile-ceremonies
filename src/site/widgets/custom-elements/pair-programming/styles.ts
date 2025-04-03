import styled from "styled-components";

// MainLayout styles
export const LayoutContainer = styled.div`
    display: flex;
    height: 100vh;
`;

export const Content = styled.div`
    flex: 1;
    padding: 20px;
    overflow-x: auto;
`;

// DeveloperSection styles
export const Section = styled.section`
    margin: 0; // removed extra margin
    color: #ddd; // added lighter text color for non-background
    h2 {
         margin-bottom: 0; // removed spacing below heading
    }
`;


export const DevelopersList = styled.div`
    overflow-x: auto;
    display: flex;
    scroll-snap-type: x mandatory;
    position: relative;
    padding-left: 10px; // added left padding for backward scrolling
    padding-right: 10px;
    // Hide scrollbar on WebKit
    &::-webkit-scrollbar {
        display: none;
    }
    // Horizontal scroll indicator
    &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        width: 40px;
        height: 100%;
        background: linear-gradient(to left, rgba(0,0,0,0.7), rgba(0,0,0,0));
        pointer-events: none;
        opacity: 0.5;
        transition: opacity 0.3s;
    }
    &:hover::after {
        opacity: 1;
    }
`;

export const DeveloperCard = styled.div`
    background: #333;
    color: #ddd; // added lighter text for content
    padding: 10px;
    border-radius: 4px;
    flex-shrink: 0;
    min-width: 150px; // changed from width: 100% to allow horizontal scrolling backwards
    scroll-snap-align: center;
    text-align: center;
`;

export const Sidebar = styled.div`
    width: 190px; // updated: one developer card (150px) + 2*20px padding
    background: #f4f4f4;
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export const BacklogContainer = styled.div`
    margin-top: 0; // removed top margin
    padding: 10px;
    background: #fff;
    /* Added to stretch tasks to fill remaining height */
    flex: 1; // make grow to fill available height
    overflow-y: auto;
`;

export const BacklogTitle = styled.h2`
    font-size: 1.2em;
    margin-bottom: 10px;
`;

// Renamed from TaskItem to RequirementItem.
export const RequirementItem = styled.li`
    list-style: none;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    width: 100%; // added to span full width
`;

export const OfficeContainer = styled.div`
    padding: 10px;
    background: linear-gradient(to bottom, #fff, #f0f0f0); // skylight effect
    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.8); // simulate looking down through a skylight
    overflow-y: hidden; // disable vertical scroll on office view
`;

export const DeskGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 10px;
`;

export const Desk = styled.div<{ solid?: boolean }>`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    // Updated to add five rows: two for the seats, one for the task, two for the endcap
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    border: 2px solid ${props => props.solid ? '#000' : '#ccc'};
    padding: 0;
`;

export const SeatCell = styled.div`
    background: #e0f7fa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    // Update: Seat spans the top two rows
    grid-row: 1 / span 2;
    &:first-child {
        border-right: 1px solid #ccc;
    }
`;

// Renamed from TaskDropdown to RequirementDropdown.
export const RequirementDropdown = styled.div`
    grid-column: 1 / span 2;
    // Moved to row 3 for the task row
    grid-row: 3 / span 1;
    display: grid;
    grid-template-rows: auto auto;
    background: #fff;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    align-items: center;
    justify-content: center;
    padding: 5px;
    cursor: pointer;
    
    .requirement-description {
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
    }
    
    .requirement-title {
        // ...existing code...
    }
`;

export const EndcapCell = styled.div`
    grid-column: 1 / span 2;
    // Updated: Endcap now takes up two rows starting from row 4
    grid-row: 4 / span 2;
    background: #f0f0f0;
    border-top: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`;

export const EmptyDesk = styled.div`
    border: 2px dashed #ccc;
    padding: 10px;
    text-align: center;
    position: relative;
`;

export const EmptyDeskOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    color: #aaa;
`;

