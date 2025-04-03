import styled from "styled-components";
// MainLayout styles
export const LayoutContainer = styled.div `
    display: flex;
    height: 100vh;
`;
export const Content = styled.div `
    flex: 1;
    padding: 20px;
    overflow-x: auto;
`;
// DeveloperSection styles
export const Section = styled.section `
    margin: 0 0 20px 0;
    h2 {
         margin-bottom: 20px;
    }
`;
export const DevelopersList = styled.div `
    overflow-x: auto;
    display: flex;
    scroll-snap-type: x mandatory;
    position: relative;
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
export const DeveloperCard = styled.div `
    background: #333;
    padding: 10px;
    border-radius: 4px;
    flex-shrink: 0;
    width: 100%;
    scroll-snap-align: center;
    text-align: center;
`;
export const Sidebar = styled.div `
    width: 300px;
    background: #f4f4f4;
    padding: 20px;
`;
export const BacklogContainer = styled.div `
    margin-top: 20px;
    padding: 10px;
    background: #fff;
`;
export const BacklogTitle = styled.h2 `
    font-size: 1.2em;
    margin-bottom: 10px;
`;
export const TaskItem = styled.li `
    list-style: none;
    padding: 5px;
    border-bottom: 1px solid #ccc;
`;
export const OfficeContainer = styled.div `
    padding: 10px;
    overflow-y: hidden; // disable vertical scroll on office view
`;
export const DeskGrid = styled.div `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 10px;
`;
export const Desk = styled.div `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: auto; // rows will be sized automatically
    border: 2px solid ${props => props.solid ? '#000' : '#ccc'};
    padding: 0;
`;
// New styled component for seat cells (developer allowed)
export const SeatCell = styled.div `
    background: #e0f7fa; // light color indicating developer-only seating
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    grid-row: span 2; // occupies two rows
    &:first-child {
        border-right: 1px solid #ccc;
    }
`;
// New styled component for task dropdown cell
export const TaskDropdown = styled.div `
    grid-column: 1 / span 2;
    grid-row: span 2; // occupies two rows
    display: grid;
    grid-template-rows: auto auto; // task title and description
    background: #fff;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    align-items: center;
    justify-content: center;
    padding: 5px;
    cursor: pointer;
    
    .task-description {
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
    }
`;
// New styled component for endcap cell (non-developer seating)
export const EndcapCell = styled.div `
    grid-column: 1 / span 2;
    grid-row: span 2; // occupies two rows
    background: #f0f0f0; // distinct color to indicate non-developers
    border-top: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
`;
export const EmptyDesk = styled.div `
    border: 2px dashed #ccc;
    padding: 10px;
    text-align: center;
    position: relative;
`;
export const EmptyDeskOverlay = styled.div `
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
