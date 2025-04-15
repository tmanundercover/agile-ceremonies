import styled from 'styled-components';
import { audioTranscriberStylesToken } from './AudioTranscriber-tokens';

export const AppContainerStyled = styled.div`
  text-align: center;
  padding: ${audioTranscriberStylesToken.spacing.lg};
`;

export const AppHeaderStyled = styled.header`
  margin-bottom: ${audioTranscriberStylesToken.spacing.xl};
`;

export const AppMainStyled = styled.main`
  max-width: 800px;
  margin: 0 auto;
`;

export const UploadSectionStyled = styled.div`
  margin-bottom: ${audioTranscriberStylesToken.spacing.md};
`;

export const FileInputStyled = styled.input`
  margin-bottom: ${audioTranscriberStylesToken.spacing.sm};
`;

export const AudioPlayerStyled = styled.audio`
  width: 100%;
  margin-bottom: ${audioTranscriberStylesToken.spacing.md};
`;

export const ButtonGroupStyled = styled.div`
  display: flex;
  gap: ${audioTranscriberStylesToken.spacing.sm};
  justify-content: center;
  margin-bottom: ${audioTranscriberStylesToken.spacing.md};
`;

export const ResultsSectionStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${audioTranscriberStylesToken.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ResultBoxStyled = styled.div`
  position: relative;
  padding: ${audioTranscriberStylesToken.spacing.md};
  border: 1px solid ${audioTranscriberStylesToken.colors.neutral[200]};
  border-radius: ${audioTranscriberStylesToken.borderRadius.md};
  min-height: 200px;
  text-align: left;
`;

export const HeadingStyled = styled.h2`
  margin-top: 0;
`;

export const StatusIndicatorStyled = styled.div<{ $isListening: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: ${audioTranscriberStylesToken.spacing.sm} ${audioTranscriberStylesToken.spacing.md};
  margin: ${audioTranscriberStylesToken.spacing.sm} 0;
  border-radius: ${audioTranscriberStylesToken.borderRadius.full};
  font-size: ${audioTranscriberStylesToken.fontSizes.sm};
  font-weight: ${audioTranscriberStylesToken.fontWeights.medium};
  background-color: ${props => (props.$isListening ? audioTranscriberStylesToken.colors.success : audioTranscriberStylesToken.colors.neutral[500])};
  color: ${audioTranscriberStylesToken.colors.neutral[100]};
  transition: all 0.3s ease;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: ${audioTranscriberStylesToken.spacing.xs};
    border-radius: 50%;
    background-color: ${audioTranscriberStylesToken.colors.neutral[100]};
    animation: ${props => (props.$isListening ? 'pulse 1.5s infinite' : 'none')};
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

export const ErrorMessageStyled = styled.p`
  color: ${audioTranscriberStylesToken.colors.error};
  margin: ${audioTranscriberStylesToken.spacing.sm} 0;
  padding: ${audioTranscriberStylesToken.spacing.sm};
  border-radius: ${audioTranscriberStylesToken.borderRadius.sm};
  background-color: ${audioTranscriberStylesToken.colors.errorBackground};
  border: 1px solid ${audioTranscriberStylesToken.colors.errorBorder};
  text-align: center;
`;

export const ActionButtonStyled = styled.button<{ disabled?: boolean }>`
  padding: ${audioTranscriberStylesToken.spacing.sm} ${audioTranscriberStylesToken.spacing.md};
  font-size: ${audioTranscriberStylesToken.fontSizes.base};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${props => (props.disabled ? audioTranscriberStylesToken.colors.neutral[500] : audioTranscriberStylesToken.colors.accent)};
  color: ${audioTranscriberStylesToken.colors.neutral[100]};
  border: none;
  border-radius: ${audioTranscriberStylesToken.borderRadius.sm};

  &:nth-of-type(2) {
    background-color: ${props => (props.disabled ? audioTranscriberStylesToken.colors.neutral[500] : '#9333EA')}; /* Primary color */
  }
`;
