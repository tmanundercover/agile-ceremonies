import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const ModalStyled = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

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

