import styled from 'styled-components';

export const ModalStyled = styled.div`
  /* Modal styles */
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
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
