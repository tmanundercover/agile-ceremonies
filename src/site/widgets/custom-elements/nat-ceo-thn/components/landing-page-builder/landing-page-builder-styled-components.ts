import styled, {keyframes} from 'styled-components';

// Design tokens from style guide
export const tokens = {
  colors: {
    primary: '#9333EA',
    primaryLight: '#A855F7',
    primaryDark: '#7928CA',
    secondary: '#E25574',
    secondaryLight: '#F06C88', // 15% lighter
    secondaryDark: '#C94B68', // 15% darker
    success: '#22C55E',
    error: '#EF4444',
    warning: '#EAB308',
    info: '#3B82F6',
    white: '#FFFFFF', // Add white color
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
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)'
  }
};

export const ContainerStyled = styled.div<{ $isHidden?: boolean }>`
  display: flex;
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: ${tokens.colors.neutral[100]};
  font-family: 'Inter', system-ui, sans-serif;
  overflow: hidden;
`;

export const ToggleButtonStyled = styled.button<{ $isHidden?: boolean }>`
  position: fixed;
  top: ${tokens.spacing.md};
  left: ${props => props.$isHidden ? '0' : '400px'};
  z-index: 10;
  background: ${tokens.colors.primary};
  color: white;
  border: none;
  border-radius: ${tokens.borderRadius.full};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: left 0.3s ease;
  
  &:hover {
    background: ${tokens.colors.primaryDark};
  }
`;

export const FormStyled = styled.form<{ $isHidden?: boolean }>`
  position: fixed;
  top: 0;
  left: ${props => props.$isHidden ? '-400px' : '0'};
  width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.lg};
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.neutral[100]};
  border-radius: 0;
  box-shadow: ${props => props.$isHidden ? 'none' : `0 8px 16px rgba(0,0,0,0.1)`};
  border-right: ${props => props.$isHidden ? 'none' : '1px solid rgba(255, 255, 255, 0.18)'};
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  transition: left 0.3s ease;
  padding-bottom: ${tokens.spacing.xl};
  box-sizing: border-box;

  > * {
    max-width: 100%;
  }
`;

export const InputGroupStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.sm};
  width: 100%;
  box-sizing: border-box;
`;

export const LabelStyled = styled.label`
  font-weight: 600;
  color: ${tokens.colors.neutral[900]};
  font-size: ${tokens.fontSizes.base};
`;

export const InputStyled = styled.input`
  padding: ${tokens.spacing.md};
  border: 1px solid ${tokens.colors.neutral[500]};
  border-radius: ${tokens.borderRadius.sm};
  font-size: ${tokens.fontSizes.base};
  transition: all 0.2s;
  background: #f0f4f8;
  box-shadow: 
    inset 4px 4px 8px #d1d9e6,
    inset -4px -4px 8px #ffffff;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  
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
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  
  &:focus {
    border-color: ${tokens.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
  }
`;

export const PreviewStyled = styled.div`
  background: transparent;
  padding: ${tokens.spacing.xl};
  min-height: 600px;
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

export const slideDown = keyframes`
    from {
        transform: translateY(-20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

export const slideRight = keyframes`
    from {
        transform: translateX(-20px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

export const slideOut = keyframes`
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(20px);
        opacity: 0;
        visibility: hidden;
    }
`;

export const fadeOut = slideOut;

export const ModalStyled = styled.div`
  position: relative;
  background: ${tokens.colors.neutral[100]};
  padding: ${tokens.spacing.xl};
  border-radius: ${tokens.borderRadius.md};
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 300px;
  max-height: 90vh;
  overflow-y: auto;
  //animation: ${slideUp} 0.3s ease-out forwards;

  h2 {
    margin: 0 0 ${tokens.spacing.lg};
    color: ${tokens.colors.neutral[900]};
    font-size: ${tokens.fontSizes['2xl']};
  }

  ${FormStyled} {
    position: static;
    width: 100%;
    height: auto;
    padding: 0;
    box-shadow: none;
    border-right: none;
    background: transparent;
  }
`;

export const ButtonStyled = styled.button<{ variant?: 'primary' | 'secondary' | 'success' | 'error' }>`
  padding: ${tokens.spacing.md} ${tokens.spacing.lg};
  background: ${props => {
    switch (props.variant) {
      case 'secondary':
        return tokens.colors.secondary;
      case 'success':
        return tokens.colors.success;
      case 'error':
        return tokens.colors.error;
      default:
        return tokens.colors.primary;
    }
  }};
  color: white;
  border: none;
  border-radius: ${tokens.borderRadius.sm};
  font-size: ${tokens.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  &:hover {
    background: ${props => {
      switch (props.variant) {
        case 'secondary':
          return tokens.colors.secondaryDark;
        case 'success':
          return '#1CAD52';
        case 'error':
          return '#DC3030';
        default:
          return tokens.colors.primaryDark;
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

export const IndicatorContainerStyled = styled.div<{ $isVisible: boolean }>`
    position: absolute;
    top: ${tokens.spacing.xl};
    left: 50%;
    transform: translateX(-50%);
    z-index: 1001;
    min-width: 300px;
    max-width: 600px;
    animation: ${slideUp} 0.3s ease-out forwards,
              ${({$isVisible}) => !$isVisible && slideOut} 0.5s ease-out forwards;
    pointer-events: none;
`;

export const LoadingTextStyled = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: ${tokens.spacing.md};
    padding: ${tokens.spacing.md} ${tokens.spacing.xl};
    font-weight: 600;
    color: ${tokens.colors.info};
    background: ${tokens.colors.neutral[100]};
    border: 1px solid ${tokens.colors.info};
    border-radius: ${tokens.borderRadius.md};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    pointer-events: auto;
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
  width: calc(100vw - 450px);
  min-width: auto;
  height: calc(100vh - 164px);
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.lg};
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
  overflow: hidden;
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

export const RequestFieldStyled = styled.div`
  background: ${tokens.colors.neutral[100]};
  border: 1px solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.borderRadius.md};
  padding: ${tokens.spacing.lg};
  font-family: 'Fira Code', monospace;
  white-space: pre-wrap;
  width: 100%;
  box-sizing: border-box;
  color: ${tokens.colors.neutral[900]};
  font-size: ${tokens.fontSizes.sm};
  line-height: 1.6;
  min-height: fit-content;
  height: auto;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: ${tokens.colors.primary};
  }
`;

export const RequestConfigFieldStyled = styled(RequestFieldStyled)`
  .json-key {
    color: ${tokens.colors.info};
  }
  .json-value {
    color: ${tokens.colors.success};
  }
  .json-string {
    color: ${tokens.colors.secondary};
  }
`;

export const FormContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-right: ${tokens.spacing.md};
  margin-bottom: 0;

  h3 {
    margin: 0;
    color: ${tokens.colors.neutral[900]};
    font-size: ${tokens.fontSizes.xl};
    position: sticky;
    top: 0;
    background: white;
    padding: ${tokens.spacing.md} 0;
    z-index: 1;
  }

  > *:not(h3) {
    position: relative;
    z-index: 2;
  }
`;


export const OverlayControlsStyled = styled.div`
  display: flex;
  gap: ${tokens.spacing.md};
  padding: ${tokens.spacing.md};
  background: white;
  border-radius: ${tokens.borderRadius.md};
  box-shadow: ${tokens.shadows.lg};
`;

export const VoteSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm};
  padding: ${tokens.spacing.sm} 0;
`;

export const ThankYouMessageStyled = styled.div<{ $visible: boolean }>`
  text-align: center;
  color: #22C55E;
  font-weight: 600;
  padding: ${tokens.spacing.sm} ${tokens.spacing.md};
  animation: ${slideDown} 0.3s ease-in;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out, transform 0.3s ease-in-out;
  transform: translateY(${({ $visible }) => ($visible ? 0 : '20px')});
  margin-bottom: 0;
`;

export const PreviewSectionStyled = styled.div<{ $isHidden?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: ${props => props.$isHidden ? '32px' : '400px'};
  padding: "0px";
  transition: all 0.3s ease;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  position: relative;
  max-width: 100%;
  background: white;
  gap: ${tokens.spacing.lg};
  z-index: 1; // Add explicit z-index
`;

export const PreviewWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.lg};
`;

export const PreviewTitleStyled = styled.h2`
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: 600;
  color: ${tokens.colors.neutral[900]};
  padding-left: calc(${tokens.spacing.xl} * 2);
  z-index: 0 !important;
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
  background: transparent;
  padding-left: 64px;
  margin-top: -${tokens.spacing.lg};
  width: 100%;
  box-sizing: border-box;
  min-height: fit-content;
  height: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  // animation: ${slideUp} 0.3s ease-out forwards;
  padding: ${tokens.spacing.xl};
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

export const VoteContainerStyled = styled.div`
    display: flex;
    justify-content: center;
    gap: ${tokens.spacing.lg};
`;

export const VoteLabelStyled = styled.span`
    font-size: ${tokens.fontSizes.sm};
    color: ${tokens.colors.neutral[700]};
    display: block;
    text-align: center;
    margin-top: ${tokens.spacing.xs};
`;

export const VoteWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
`;

export const LoadingTextContainerStyled = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: ${tokens.spacing.md};
    padding: ${tokens.spacing.md} ${tokens.spacing.xl};
    margin-bottom: -20px;
    font-weight: 600;
    color: ${tokens.colors.info};
    background: white;
    border-radius: ${tokens.borderRadius.md};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    pointer-events: auto;
`;

export const StatusBannerStyled = styled.div<{ status: 'success' | 'error' }>`
    padding: ${tokens.spacing.md} ${tokens.spacing.xl};
    border-radius: ${tokens.borderRadius.md};
    background: ${({status}) => status === 'success' ? 
        `${tokens.colors.success}10` : 
        `${tokens.colors.error}10`
    };
    color: ${({status}) => status === 'success' ? 
        tokens.colors.success : 
        tokens.colors.error
    };
    border: 1px solid ${({status}) => status === 'success' ? 
        tokens.colors.success : 
        tokens.colors.error
    };
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${tokens.spacing.sm};
    pointer-events: auto;
    animation: ${slideRight} 0.3s ease-out forwards;
    font-weight: 600;
`;

export const ColorInputGroupStyled = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: ${tokens.spacing.md};
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;

export const ColorSwatchStyled = styled.button`
  width: 50px;
  height: 50px;
  padding: 0;
  border: 2px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.color};
  
  &:hover {
    border-color: #0066ff;
  }
  
  &:focus {
    outline: none;
    border-color: #0066ff;
  }
`;

export const ColorInputStyled = styled.input`
  width: 50px;
  height: 50px;
  padding: 0;
  border: 2px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0;
  position: absolute;
  pointer-events: none;
`;

export const HexInputStyled = styled.input`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100px;
  
  &:focus {
    border-color: #0066ff;
    outline: none;
  }
`;

export const FileSelectorStyled = styled.div<{ $isDragging: boolean }>`
  border: 2px dashed ${props => props.$isDragging ? tokens.colors.primary : tokens.colors.neutral[500]};
  border-radius: ${tokens.borderRadius.md};
  background: ${props => props.$isDragging ? `${tokens.colors.primary}10` : tokens.colors.neutral[100]};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  
  &:hover {
    border-color: ${tokens.colors.primary};
    background: ${tokens.colors.primary}10;
  }
`;

export const DropzoneContentStyled = styled.div<{ $hasFile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${tokens.spacing.md};
  color: ${tokens.colors.neutral[700]};
  height: 100%;
  justify-content: center;
  
  ${props => props.$hasFile && `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 1;
    }
  `}
  
  svg {
    color: ${tokens.colors.primary};
  }
`;

export const FileInputStyled = styled.input`
  display: none;
`;

export const FormFieldWrapperStyled = styled.div`
  position: relative;
  margin-bottom: ${tokens.spacing.lg};
  width: 100%;
  box-sizing: border-box;
`;

export const CopyFeedbackStyled = styled.span<{ $type: 'success' | 'error' | null }>`
  margin-left: ${tokens.spacing.sm};
  color: ${props => props.$type === 'success' ? tokens.colors.success : tokens.colors.error};
  font-size: ${tokens.fontSizes.sm};
  opacity: ${props => props.$type ? 1 : 0};
  transition: opacity 0.2s ease;
`;

export const CopyButtonStyled = styled.button`
  position: absolute;
  top: ${tokens.spacing.sm};
  right: ${tokens.spacing.sm};
  background: ${tokens.colors.neutral[100]};
  border: 1px solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.borderRadius.sm};
  padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.xs};
  min-width: 120px; // Add minimum width to prevent layout shift when feedback appears
  cursor: pointer;
  font-size: ${tokens.fontSizes.sm};
  color: ${tokens.colors.neutral[700]};
  opacity: 0;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${tokens.colors.neutral[200]};
    color: ${tokens.colors.neutral[900]};
  }
  
  ${FormFieldWrapperStyled}:hover & {
    opacity: 1;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const PreviewContainerStyled = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;
  border-radius: ${tokens.borderRadius.lg};
  background: ${tokens.colors.white};
  box-shadow: ${tokens.shadows.md};
  overflow: hidden;
  z-index: 1;

  &:hover .preview-overlay {
    opacity: 1;
    pointer-events: all;
  }
`;

export const PreviewOverlayStyled = styled.div.attrs({ className: 'preview-overlay' })`
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
  pointer-events: none;
  z-index: 10;
`;

