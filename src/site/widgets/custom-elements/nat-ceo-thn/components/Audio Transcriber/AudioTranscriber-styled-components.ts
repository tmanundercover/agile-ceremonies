import styled from 'styled-components';

export const AppContainerStyled = styled.div`
  text-align: center;
  padding: 20px;
`;

export const AppHeaderStyled = styled.header`
  margin-bottom: 30px;
`;

export const AppMainStyled = styled.main`
  max-width: 800px;
  margin: 0 auto;
`;

export const UploadSectionStyled = styled.div`
  margin-bottom: 20px;
`;

export const FileInputStyled = styled.input`
  margin-bottom: 10px;
`;

export const AudioPlayerStyled = styled.audio`
  width: 100%;
  margin-bottom: 20px;
`;

export const ButtonGroupStyled = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ActionButtonStyled = styled.button<{ disabled?: boolean }>`
  padding: 10px 20px;
  font-size: 16px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  background-color: ${props => props.disabled ? '#cccccc' : '#007bff'};
  color: white;
  border: none;
  border-radius: 4px;
`;

export const ResultsSectionStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ResultBoxStyled = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 200px;
  text-align: left;
`;

export const HeadingStyled = styled.h2`
  margin-top: 0;
`;

export const StatusIndicatorStyled = styled.div<{ $isListening: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  margin: 10px 0;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${props => props.$isListening ? '#4CAF50' : '#9e9e9e'};
  color: white;
  transition: all 0.3s ease;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 8px;
    border-radius: 50%;
    background-color: white;
    animation: ${props => props.$isListening ? 'pulse 1.5s infinite' : 'none'};
  }

  @keyframes pulse {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.4;
      transform: scale(1.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

