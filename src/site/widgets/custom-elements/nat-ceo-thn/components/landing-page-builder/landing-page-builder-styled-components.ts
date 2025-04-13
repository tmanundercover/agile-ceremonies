import styled, {keyframes} from 'styled-components';

// Design tokens from style guide
export const tokens = {
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
  grid-template-columns: minmax(300px, 400px) 1fr;
  gap: ${tokens.spacing.xl};
  padding: ${tokens.spacing.xl};
  height: 100vh;
  background: ${tokens.colors.neutral[100]};
  font-family: 'Inter', system-ui, sans-serif;
  overflow-y: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.lg};
  padding: ${tokens.spacing.xl};
  background: #f0f4f8;
  border-radius: ${tokens.borderRadius.md};
  box-shadow: 
    8px 8px 16px #d1d9e6,
    -8px -8px 16px #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.18);
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
  background: #f0f4f8;
  box-shadow: 
    inset 4px 4px 8px #d1d9e6,
    inset -4px -4px 8px #ffffff;
  
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
  background: #f0f4f8;
  box-shadow: 
    inset 4px 4px 8px #d1d9e6,
    inset -4px -4px 8px #ffffff;
  
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
        return 'transparent';
      case 'success':
        return tokens.colors.success;
      case 'error':
        return tokens.colors.error;
      default:
        return tokens.colors.primary;
    }
  }};
  color: ${props => props.variant === 'secondary' ? tokens.colors.primary : 'white'};
  border: ${props => props.variant === 'secondary' ? `2px solid ${tokens.colors.primary}` : 'none'};
  border-radius: ${tokens.borderRadius.sm};
  font-size: ${tokens.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 
    6px 6px 12px #d1d9e6,
    -6px -6px 12px #ffffff;
  
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

  &:active {
    box-shadow: 
      inset 6px 6px 12px #d1d9e6,
      inset -6px -6px 12px #ffffff;
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

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const OpenAIIcon = styled.svg`
    width: 24px;
    height: 24px;
    animation: ${rotate} 3.5s linear infinite;
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

export const IndicatorContainer = styled.div<{ $isVisible: boolean }>`
    position: relative;
    left: 50%;
    z-index: 1001; 
    min-width: 300px;
    max-width: 600px;
    animation: ${slideUp} 0.3s ease-out forwards,
    ${({$isVisible}) => !$isVisible && fadeOut} 0.5s ease-out forwards;
    pointer-events: none;
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

export const ViewerContainer = styled.div<{ status?: 'loading' | 'success' | 'error' }>`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 2rem;
  padding-top: 3rem;
  margin-top: 60px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  max-width: 90vw;
  width: 1200px;
  min-width: 800px;
  height: calc(100vh - 164px); // Fixed height
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 2rem;
  grid-template-rows: 1fr auto;  // Add this line to support the vote section
  border: 2px solid ${({ status }) => {
  switch (status) {
    case 'loading':
      return '#3B82F6';
    case 'success':
      return '#22C55E';
    case 'error':
      return '#EF4444';
    default:
      return '#ddd';
  }
}};
  z-index: 1000;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

export const FormSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const FormField = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 1rem;
  font-family: monospace;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
  
  &:hover {
    border-color: #cbd5e1;
  }
`;

export const ConfigField = styled(FormField)`
  .json-key {
    color: #0066ff;
  }
  .json-value {
    color: #16a34a;
  }
  .json-string {
    color: #ea580c;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto; // Enable scrolling
  padding-right: 1rem; // Add padding for scrollbar
  max-height: 100%; // Take full height
  margin-bottom: 80px; // Add margin to prevent overlap with vote section
`;

export const PreviewContainer = styled.div`
  flex: 1;
  min-height: 500px;
  background: #f0f4f8;
  border-radius: ${tokens.borderRadius.lg};
  box-shadow: 
    20px 20px 60px #d1d9e6,
    -20px -20px 60px #ffffff;
  padding: ${tokens.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.18);
  
  svg {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const VoteSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};
  padding: ${tokens.spacing.md} 0;
`;

export const ThankYouMessage = styled.div`
          text-align: center;
          color: #22C55E;
          font-weight: 600;
          padding: 1rem;
          animation: fadeIn 0.3s ease-in;

          @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
          `;

export const PreviewSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.lg};
  padding: ${tokens.spacing.xl};
  height: calc(100vh - ${tokens.spacing.xl} * 2);
  overflow-y: auto;
  background: ${tokens.colors.neutral[100]};
`;

export const PreviewWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 200px); // Fixed height
  max-width: 100%;
  margin-bottom: 0; // Remove margin bottom
  flex: 1; // Allow flex growing
`;

export const PreviewTitle = styled.h2`
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: 600;
  color: ${tokens.colors.neutral[900]};
  margin: 0;
`;

export const OpenAIIconWrapper = styled.div`
  display: flex;
  padding: 0;
  padding-top: 4px;
  justify-content: center;
  height: 12px;
  align-items: center;
`;

export const StyledOpenAIIcon = styled(OpenAIIcon)`
  width: 20px;
  height: 20px;
  align-content: center;
`;

export const PreviewControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};
  padding: ${tokens.spacing.lg};
  background: white;
  border-radius: ${tokens.borderRadius.md};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

