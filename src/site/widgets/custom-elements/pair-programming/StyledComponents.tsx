import styled from 'styled-components';

export const ModalStyled = styled.div`
  /* Modal styles */
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px; /* Increased width */
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
  gap: 15px;
`;

export const InputStyled = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%; /* Added to make the input take up the whole row */
`;

export const TextAreaStyled = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

export const SelectStyled = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const ButtonStyled = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

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
`;

export const SwimlaneStyled = styled.div`
  flex: 1;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  border-radius: 4px; /* Removed border */
  margin: 0 10px;

  h3 {
    color: #333; /* Adjust the color to ensure contrast */
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
  width: 100%; /* Adjusted to be as wide as the swim lane */
`;

export const AddTaskButtonStyled = styled.button`
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

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
  font-size: 14px; /* Decreased font size for modern look */
  margin-right: 10px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 4px; /* Removed border */
  cursor: pointer;
  background-color: #f9f9f9;
  color: #333; /* Ensure text color is visible */

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

