import styled from 'styled-components';
import theme from './theme';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: ${theme.colors.bgColor};
  font-family: ${theme.typography.body.fontFamily};
  color: ${theme.colors.textColor};
  transition: background-color ${theme.transitionSpeed}, color ${theme.transitionSpeed};
`;

export const OfficeContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const Sidebar = styled.div`
  width: 300px;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.cardBg};
  border-right: 1px solid ${theme.colors.neutral500};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: ${theme.boxShadow};
  z-index: 1;
`;

export const TeammateCarousel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

export const NavButton = styled.button`
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: 16px;
  cursor: pointer;
  transition: background-color ${theme.transitionSpeed};
  
  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.primaryLight};
  }
`;

export const BacklogSection = styled.div`
  margin-top: ${theme.spacing.md};
  flex: 1;
  overflow-y: auto;
  padding-top: ${theme.spacing.md};
  border-top: 1px dashed ${theme.colors.neutral500};
`;

export const OfficeFloor = styled.div`
  flex: 1;
  padding: ${theme.spacing.lg};
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.lg};
  overflow-y: auto;
`;

export const DeskContainer = styled.div`
  background-color: ${theme.colors.cardBg};
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.boxShadow};
  display: grid;
  grid-template-areas:
    "title title"
    "dev1 dev2"
    "taskTitle taskTitle"
    "task task"
    "endcap endcap";
  grid-template-columns: 1fr 1fr;
  grid-gap: ${theme.spacing.md};
  width: 350px;
  transition: transform ${theme.transitionSpeed}, box-shadow ${theme.transitionSpeed};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const DeskTitle = styled.h3`
  grid-area: title;
  margin: 0;
  font-size: 18px;
  color: ${theme.colors.primary};
  border-bottom: 2px solid ${theme.colors.primaryLight};
  padding-bottom: ${theme.spacing.xs};
`;

export const Seat = styled.div`
  background-color: ${theme.colors.primaryLight};
  color: white;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
`;

export const SeatOccupied = styled.div`
  background-color: ${theme.colors.neutral200};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px dashed ${theme.colors.neutral500};
`;

export const EmptySeatLabel = styled.span`
  color: ${theme.colors.neutral700};
  font-size: 14px;
  font-style: italic;
`;

export const TaskSelectionTitle = styled.div`
  grid-area: taskTitle;
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 500;
  margin-top: ${theme.spacing.xs};
`;

export const TaskDropdown = styled.select`
  grid-area: task;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius};
  border: 1px solid ${theme.colors.neutral500};
  background-color: ${theme.colors.cardBg};
  color: ${theme.colors.textColor};
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primaryLight}40;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  margin-top: 0;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.primary};
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: -4px;
    left: 0;
    background: ${theme.colors.primary};
    border-radius: 2px;
  }
`;

export const StandupButton = styled.button`
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: 16px;
  cursor: pointer;
  margin-top: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  transition: background-color ${theme.transitionSpeed};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
  
  &:before {
    content: '📅';
    margin-right: ${theme.spacing.sm};
  }
`;

export const TeammateCardContainer = styled.div`
  background-color: ${theme.colors.cardBg};
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.boxShadow};
  margin-bottom: ${theme.spacing.md};
  cursor: pointer;
  transition: transform ${theme.transitionSpeed}, box-shadow ${theme.transitionSpeed};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const TeammateInfo = styled.h3`
  margin: 0 0 ${theme.spacing.xs} 0;
  font-size: 16px;
  color: ${theme.colors.primary};
`;

export const TeammateRole = styled.div`
  font-size: 14px;
  color: ${theme.colors.neutral700};
`;

export const ModalStyled = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.colors.cardBg};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  min-width: 300px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  
  h2 {
    color: ${theme.colors.primary};
    margin-top: 0;
    border-bottom: 2px solid ${theme.colors.primaryLight};
    padding-bottom: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.md};
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: ${theme.spacing.lg};
    gap: ${theme.spacing.sm};
    
    button {
      background-color: ${theme.colors.primary};
      color: white;
      border: none;
      border-radius: ${theme.borderRadius};
      padding: ${theme.spacing.xs} ${theme.spacing.md};
      cursor: pointer;
      transition: background-color ${theme.transitionSpeed};
      
      &:hover {
        background-color: ${theme.colors.primaryDark};
      }
      
      &:last-child {
        background-color: ${theme.colors.neutral500};
        
        &:hover {
          background-color: ${theme.colors.neutral700};
        }
      }
    }
  }
  
  &.slide-in {
    animation: slideIn 0.3s forwards;
  }
  
  &.slide-out {
    animation: slideOut 0.3s forwards;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
  }
  
  /* Mobile styles */
  @media (max-width: 768px) {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    transform: none;
    border-radius: 0;
    padding: ${theme.spacing.md};
    
    &.slide-in {
      animation: mobileSlideIn 0.3s forwards;
    }
    
    &.slide-out {
      animation: mobileSlideOut 0.3s forwards;
    }
    
    @keyframes mobileSlideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes mobileSlideOut {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(20px);
      }
    }
    
    .actions {
      margin-top: auto;
      padding-top: ${theme.spacing.md};
    }
  }
`;