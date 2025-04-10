import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const BoardRoomStyled = styled.div`
  display: flex;
`;

export const SidebarStyled = styled.div`
  width: 200px;
  background-color: var(--secondary-text-color);
`;

export const TeammateStyled = styled.div`
  padding: 10px;
  border-bottom: 1px solid var(--background-color);
`;

export const MainContentStyled = styled.div`
  flex: 1;
  padding: 20px;
`;

export const OfficeViewStyled = styled.div`
  display: flex;
`;

export const OfficeFloorStyled = styled.div`
  flex: 1;
  padding: 20px;
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const InputStyled = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const TextAreaStyled = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const SelectStyled = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const ButtonStyled = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  align-self: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const BlockerSectionStyled = styled.div`
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  color: #333;
`;

export const BlockerListStyled = styled.ul`
  list-style: none;
  padding: 0;
  color: #333;
`;

export const BlockerItemStyled = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 5px;
  color: #333;
`;

export const RemoveButtonStyled = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 16px;
`;

export const SwimlaneSectionStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  .slick-slider {
    margin-bottom: 15px;
  }

  .slick-dots {
    bottom: -30px;
  }

  .slick-prev, .slick-next {
    z-index: 1;
  }
`;

export const SwimlaneStyled = styled.div`
  flex: 1;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  border-radius: 4px;
  margin: 0 10px;

  h3 {
    color: #333;
  }
`;

export const VerticalLineStyled = styled.div`
  width: 1px;
  background-color: #ccc;
  margin: 0 10px;
`;

export const TaskListStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
`;

export const TaskItemStyled = styled.li`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DropdownStyled = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const AddTaskButtonStyled = styled.button`
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

export const ToggleSwitchStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const RadioButtonLabelStyled = styled.label`
  font-size: 14px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f9f9f9;
  color: #333;

  input {
    margin-right: 5px;
  }

  &:hover {
    background-color: #e9e9e9;
  }

  input:checked + & {
    background-color: #007bff;
    color: white;
  }
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
`;

export const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    color: #000000;
`;

export const OfficeContainer = styled.div`
    display: grid;
    grid-template-columns: 300px 1fr;  // Increased from 250px to 300px
    height: 100vh;
    background: #f5f5f5;
`;

export const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 1rem;
    overflow: hidden; // Prevent content from overflowing
`;

export const BacklogSection = styled.div`
    height: 60%;
    overflow-y: auto;
    padding: 1rem;
`;

export const OfficeFloor = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
    background: white;
    overflow: auto;
`;

export const DeskContainer = styled.div`
    background: rgba(200, 200, 200, 0.1);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 1rem;
    display: grid;
    grid-template-areas:
    "dev1 task endcap"
    "dev2 task endcap";
    gap: 1rem;
    height: 200px;
`;

export const Seat = styled.div`
    background: 'rgba(0, 0, 0, 0.1)';
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const SeatOccupied = styled.div`
    background: 'rgba(0, 255, 0, 0.1)';
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const TaskDropdown = styled.select`
    grid-area: task;
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const TeammateCarousel = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px;
    background: #333;
    margin-bottom: 20px;
    z-index: 1;
    
    button {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 5px 15px;
        &:hover {
            color: #007bff;
        }
    }
`;

export const DraggableTeammate = styled.div`
    flex: 1;
    padding: 30px 20px;
    background: #7FCF87;  // Using the Dev Twins color from style guide
    color: #000000;
    font-weight: bold;
    font-size: 1.2em;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    text-align: center;
    
    &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }
`;

export const ModalStyled = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 1000;
    max-width: 90vw;
    max-height: 90vh;
    width: 800px;
    overflow-y: auto;
    
    &.slide-in {
        animation: slideIn 0.3s forwards;
    }
    
    &.slide-out {
        animation: slideOut 0.3s forwards;
    }
    
    @keyframes slideIn {
        from {
            transform: translate(100%, -50%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
        to {
            transform: translate(-100%, -50%);
            opacity: 0;
        }
    }
`;

export const TeammateCardContainer = styled.div`
    width: calc(100% - 2rem); // Account for padding
    min-height: 120px;
    padding: 1.5rem;
    background: #7FCF87;
    color: #000000;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    margin-bottom: 1rem;
    text-align: center;
    
    &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }
`;

export const TeammateInfo = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

export const TeammateRole = styled.div`
    font-size: 1em;
    opacity: 0.9;
`;

