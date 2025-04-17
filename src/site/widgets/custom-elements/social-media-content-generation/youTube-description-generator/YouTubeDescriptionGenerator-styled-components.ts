import styled from 'styled-components';

export const YouTubeDescriptionGeneratorContainerStyled = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const TextAreaStyled = styled.textarea`
  width: 100%;
  min-height: 100px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-family: inherit;
  resize: vertical;
`;

export const GenerateButtonStyled = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #3367d6;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const LoaderContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const ResultContainerStyled = styled.div`
  padding: 20px;
  margin: 10px 0;
  border-radius: 4px;
  color: white;
`;

export const TitleStyled = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
`;

export const DescriptionTextStyled = styled.p`
  white-space: pre-wrap;
  line-height: 1.5;
`;

export const TagsContainerStyled = styled.div`
  padding: 20px;
  margin: 10px 0;
  border-radius: 4px;
  color: white;
  display: flex;
  flex-wrap: wrap;
`;

export const TagStyled = styled.span`
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
`;

export const CommaDelimitedTagsContainerStyled = styled.div`
  padding: 20px;
  margin: 10px 0;
  border-radius: 4px;
  color: white;
`;

export const LoaderStyled = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-bottom-color: #4285f4;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

