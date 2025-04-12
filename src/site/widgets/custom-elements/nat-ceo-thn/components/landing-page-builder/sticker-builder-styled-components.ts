import styled, {keyframes} from 'styled-components';

// Design tokens from style guide
const tokens = {
  colors: {
    primary: '#9333EA',
    primaryLight: '#A855F7',
    primaryDark: '#7928CA',
    success: '#22C55E',
    error: '#EF4444',
    warning: '#EAB308',
    info: '#3B82F6',
    neutral: {
      900: '#1A1A1A',
      700: '#4A5568',
      500: '#A0AEC0',
      200: '#EDF2F7',
      100: '#F8F9FA'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px'
  },
  fontSizes: {
    xs: '11px',
    sm: '12px',
    base: '14px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px'
  }
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: ${tokens.spacing.xl};
  padding: ${tokens.spacing.xl};
  min-height: 100vh;
  background: ${tokens.colors.neutral[100]};
  font-family: 'Inter', system-ui, sans-serif;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.lg};
  padding: ${tokens.spacing.xl};
  background: white;
  border-radius: ${tokens.borderRadius.md};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm};
`;

export const Label = styled.label`
  font-weight: 600;
  color: ${tokens.colors.neutral[900]};
  font-size: ${tokens.fontSizes.base};
`;

export const Input = styled.input`
  padding: ${tokens.spacing.md};
  border: 2px solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.borderRadius.sm};
  font-size: ${tokens.fontSizes.base};
  transition: all 0.2s;
  
  &:focus {
    border-color: ${tokens.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
  }
`;

export const TextArea = styled.textarea`
  padding: ${tokens.spacing.md};
  border: 2px solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.borderRadius.sm};
  font-size: ${tokens.fontSizes.base};
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s;
  
  &:focus {
    border-color: ${tokens.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
  }
`;

export const Preview = styled.div`
  background: white;
  border-radius: ${tokens.borderRadius.md};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: ${tokens.spacing.xl};
  min-height: 600px;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: ${tokens.spacing.xl};
  border-radius: ${tokens.borderRadius.md};
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1000;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'success' | 'error' }>`
  padding: ${tokens.spacing.md} ${tokens.spacing.lg};
  background: ${props => {
    switch (props.variant) {
      case 'secondary':
        return tokens.colors.neutral[100];
      case 'success':
        return tokens.colors.success;
      case 'error':
        return tokens.colors.error;
      default:
        return tokens.colors.primary;
    }
  }};
  color: ${props => props.variant === 'secondary' ? tokens.colors.neutral[900] : 'white'};
  border: none;
  border-radius: ${tokens.borderRadius.sm};
  font-size: ${tokens.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => {
      switch (props.variant) {
        case 'secondary':
          return tokens.colors.neutral[200];
        case 'success':
          return '#1CAD52';
        case 'error':
          return '#DC3030';
        default:
          return tokens.colors.primaryDark;
      }
    }};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => {
      switch (props.variant) {
        case 'success':
          return 'rgba(34, 197, 94, 0.2)';
        case 'error':
          return 'rgba(239, 68, 68, 0.2)';
        default:
          return 'rgba(147, 51, 234, 0.1)';
      }
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SavedDesignPreview = styled(Preview)`
    margin-top: 2rem;
    border: 2px solid #22C55E;
`;

export const SuccessMessage = styled.div`
    margin-top: 1rem;
    padding: 1rem;
    background-color: #F0FDF4;
    border-radius: 8px;
    color: #22C55E;
    font-weight: 500;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const OpenAIIcon = styled.svg`
    width: 32px;
    height: 32px;
    animation: ${rotate} 2s linear infinite;
    margin-bottom: 0.5rem;
`;

export const LoadingSpinner = styled.div`
    text-align: center;
    margin-top: 1rem;
    font-weight: bold;
    color: #3B82F6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .loading-text {
        margin-top: 0.5rem;
        font-size: 0.875rem;
    }
`;

export const slideUp = keyframes`
    from {
        transform: translate(-50%, 20px);
        opacity: 0;
    }
    to {
        transform: translate(-50%, 0);
        opacity: 1;
    }
`;

export const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
        visibility: hidden;
    }
`;

export const IndicatorContainer = styled.div<{ isVisible: boolean }>`
    position: absolute;
    left: 50%;
    top: -60px;
    transform: translateX(-50%);
    z-index: 1001; // Higher than PromptViewer
    min-width: 300px;
    max-width: 600px;
    animation: ${slideUp} 0.3s ease-out forwards,
    ${({isVisible}) => !isVisible && fadeOut} 0.5s ease-out forwards;
    pointer-events: none; // Allows clicking through the indicator
`;

export const LoadingText = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1.5rem;
    margin-bottom: -20px;
    font-weight: bold;
    color: #3B82F6;
    background: white;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    pointer-events: auto;
`;

export const StatusBanner = styled.div<{ status: 'success' | 'error' }>`
    padding: 0.75rem 1.5rem;
    margin-bottom: -20px; // Pull the indicator closer to the container
    border-radius: 6px;
    background: ${({status}) => status === 'success' ? '#E6F4EA' : '#FEEEE2'};
    color: #2c2929;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    pointer-events: auto; // Re-enable pointer events for the actual message
`;