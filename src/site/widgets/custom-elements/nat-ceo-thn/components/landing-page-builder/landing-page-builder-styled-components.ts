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

export const ContainerStyled = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: ${tokens.spacing.xl};
  padding: ${tokens.spacing.xl};
  min-height: 100vh;
  background: ${tokens.colors.neutral[100]};
  font-family: 'Inter', system-ui, sans-serif;
`;

export const FormStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};
  padding: ${tokens.spacing.xl};
  background: #f0f4f8;
  border-radius: ${tokens.borderRadius.md};
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.18);
  overflow-y: auto;
  max-height: 100%;
`;

export const InputGroupStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.sm};
`;

export const LabelStyled = styled.label`
  font-weight: 600;
  color: ${tokens.colors.neutral[900]};
  font-size: ${tokens.fontSizes.base};
`;

export const InputStyled = styled.input`
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

export const TextAreaStyled = styled.textarea`
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

export const PreviewStyled = styled.div`
  background: white;
  border-radius: ${tokens.borderRadius.md};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: ${tokens.spacing.xl};
  min-height: 600px;
`;

export const ModalStyled = styled.div`
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

export const ButtonStyled = styled.button<{ variant?: 'primary' | 'secondary' | 'success' | 'error' }>`
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

export const SavedDesignPreviewStyled = styled(PreviewStyled)`
    margin-top: 2rem;
    border: 2px solid #22C55E;
`;

export const SuccessMessageStyled = styled.div`
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

export const OpenAIIconStyled = styled.svg`
    width: 24px;
    height: 24px;
    animation: ${rotate} 3.5s linear infinite;
    margin-bottom: 0.5rem;
`;

export const LoadingSpinnerStyled = styled.div`
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

export const IndicatorContainerStyled = styled.div<{ $isVisible: boolean }>`
    position: relative;
    left: 50%;
    z-index: 1001; 
    min-width: 300px;
    max-width: 600px;
    animation: ${slideUp} 0.3s ease-out forwards,
    ${({$isVisible}) => !$isVisible && fadeOut} 0.5s ease-out forwards;
    pointer-events: none;
`;

export const LoadingTextStyled = styled.div`
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

export const StatusBannerStyled = styled.div<{ status: 'success' | 'error' }>`
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

export const ViewerContainerStyled = styled.div<{ status?: 'loading' | 'success' | 'error' }>`
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

export const CloseButtonStyled = styled.button`
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

export const FormSectionStyled = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabelStyled = styled.label`
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const FormFieldStyled = styled.div`
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

export const ConfigFieldStyled = styled(FormFieldStyled)`
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

export const FormContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};
  overflow-y: auto;
  padding-right: ${tokens.spacing.md};
  max-height: 100%;
  margin-bottom: ${tokens.spacing.xl};
`;

export const PreviewContainerStyled = styled.div`
  aspect-ratio: 16/9;
  width: 100%;
  background: #f0f4f8;
  border-radius: ${tokens.borderRadius.lg};
  box-shadow: 
    20px 20px 60px #d1d9e6,
    -20px -20px 60px #ffffff;
  padding: ${tokens.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: relative;
  
  svg {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const PreviewOverlayStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${PreviewContainerStyled}:hover & {
    opacity: 1;
  }
`;

export const OverlayControlsStyled = styled.div`
  background: white;
  padding: ${tokens.spacing.lg};
  border-radius: ${tokens.borderRadius.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const VoteSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};
  padding: ${tokens.spacing.md} 0;
`;

export const ThankYouMessageStyled = styled.div`
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

export const PreviewSectionStyled = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: ${tokens.spacing.lg};
  padding: ${tokens.spacing.xl};
  width: 100%;
  overflow-y: auto;
  background: ${tokens.colors.neutral[100]};
`;

export const PreviewWrapperStyled = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const PreviewTitleStyled = styled.h2`
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: 600;
  color: ${tokens.colors.neutral[900]};
  margin: 0;
`;

export const OpenAIIconWrapperStyled = styled.div`
  display: flex;
  padding: 0;
  padding-top: 4px;
  justify-content: center;
  height: 12px;
  align-items: center;
`;

export const StyledOpenAIIconStyled = styled(OpenAIIconStyled)`
  width: 20px;
  height: 20px;
  align-content: center;
`;

export const PreviewControlsStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.md};
  padding: ${tokens.spacing.lg};
  background: white;
  border-radius: ${tokens.borderRadius.md};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow-y: auto;
  max-height: 300px;
`;

export const StyledButtonStyled = styled.button<{ $color: string }>`
    background: none;
    border: none;
    font-size: 2.5rem;
    cursor: pointer;
    transition: transform 0.2s;
    padding: 0.5rem;
    color: ${props => props.$color};

    &:hover:not(:disabled) {
        transform: scale(1.1);
    }

    &:active:not(:disabled) {
        transform: scale(0.95);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const ToggleButtonGroupStyled = styled.div`
  display: flex;
  gap: ${tokens.spacing.sm};
  justify-content: center;
  align-items: center;
  padding: ${tokens.spacing.md} 0;
`;

export const ToggleButtonContainerStyled = styled.div`
  position: relative;
  
  &:hover {
    .tooltip {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const TooltipStyled = styled.span`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
  background: ${tokens.colors.neutral[900]};
  color: white;
  font-size: ${tokens.fontSizes.xs};
  border-radius: ${tokens.borderRadius.sm};
  white-space: nowrap;
  transition: opacity 0.2s;
  margin-bottom: ${tokens.spacing.xs};
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px;
    border-style: solid;
    border-color: ${tokens.colors.neutral[900]} transparent transparent transparent;
  }
`;

export const OverlayStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const SelectStyled = styled.select`
  padding: ${tokens.spacing.md};
  border: 2px solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.borderRadius.sm};
  font-size: ${tokens.fontSizes.base};
  background: #f0f4f8;
  box-shadow: 
    inset 4px 4px 8px #d1d9e6,
    inset -4px -4px 8px #ffffff;
  width: 100%;
  
  &:focus {
    border-color: ${tokens.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
  }
`;

export const RangeInputStyled = styled.input`
  width: 100%;
  -webkit-appearance: none;
  margin: ${tokens.spacing.md} 0;
  background: transparent;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    background: #f0f4f8;
    border-radius: ${tokens.borderRadius.full};
    box-shadow: 
      inset 4px 4px 8px #d1d9e6,
      inset -4px -4px 8px #ffffff;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: ${tokens.colors.primary};
    margin-top: -6px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  &:focus {
    outline: none;
    
    &::-webkit-slider-thumb {
      box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
    }
  }
`;

export const ButtonGroupStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${tokens.spacing.md};
  margin-top: ${tokens.spacing.lg};
`;

