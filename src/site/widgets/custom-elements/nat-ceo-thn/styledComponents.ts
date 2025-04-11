import styled from "styled-components";
import {Button, Text, TextField} from "@radix-ui/themes";
import {Step} from "./components/welcome-steps/StepProgressIndicator";

export const ErrorText = styled(Text)`
    color: var(--red-9);
    margin-top: 4px;
    display: block; // Ensure consistent display
`;

export const ErrorTextField = styled(TextField.Input)<{ $hasError: boolean }>`
    &:focus {
        box-shadow: ${props => props.$hasError ? '0 0 0 2px var(--red-7)' : '0 0 0 2px var(--purple-7)'};
    }

    border-color: ${props => props.$hasError ? 'var(--red-7)' : 'var(--gray-7)'};
`;

export const FormContainer = styled.div`
    background: white;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const FormFieldWrapper = styled.div<{ $width: string }>`
    flex: 1 1 ${props => props.$width};
    width: ${props => props.$width};
    min-width: 250px;
`;

interface StyledProgressBarProps {
    progress?: number;
}

export const StyledProgressBar = styled.div<StyledProgressBarProps>`
  position: relative;
  width: 100%;
  height: 32px;
  margin-bottom: 24px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 8px;
    background: var(--gray-4);
    border-radius: 4px;
    transform: translateY(-50%);
  }

  .progress {
    position: absolute;
    top: 50%;
    left: 0;
    width: ${props => props.progress || 20}%;
    height: 8px;
    background: linear-gradient(90deg, #9333EA 0%, #A855F7 100%);
    border-radius: 4px;
    transform: translateY(-50%);
    transition: width 0.3s ease;
  }
`;

interface StepProgressIndicatorProps {
    steps: Step[];
    progress?: number;
}

export const StepperContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  margin: 0;
  width: 100%;
`;

export const StepIndicatorWrapper = styled.div<{ $position: number }>`
  position: absolute;
  left: ${props => props.$position}%;
  transform: translateX(-50%);
`;

export const StepIndicator = styled.div<{ $active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$active ?
    'linear-gradient(90deg, ' +
    '#9333EA' +
    ' 0%, ' +
    '#A855F7' +
    ' 100%)' :
    'var(--gray-4)'};
  color: ${props => props.$active ? 'white' : 'var(--gray-9)'};
  position: relative;
  z-index: 1;
`;

export const StepLabel = styled(Text)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  white-space: nowrap;
`;

export const ToolIcon = styled.button`
    background: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: scale(1.1);
    }

    svg {
        width: 20px;
        height: 20px;
    }
`;

export const ImageOverlayContainer = styled.div<{ $visible: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    opacity: ${props => props.$visible ? 1 : 0};
    transition: opacity 0.3s ease;
    pointer-events: ${props => props.$visible ? 'auto' : 'none'};
`;

export const Tooltip = styled.div<{ $visible: boolean }>`
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: #1A1A1A;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    opacity: ${props => props.$visible ? 1 : 0};
    transition: opacity 0.2s ease;
    pointer-events: none;
    white-space: nowrap;
    
    &:after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 8px;
        height: 8px;
        background: #1A1A1A;
    }
`;

export const ToolIconWrapper = styled.div`
    position: relative;
`;

export const StickerBuilderContainer = styled.div`
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 0 auto;
    height: 800px;
    max-height: 800px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const StickerCanvas = styled.div`
    width: 100%;
    height: 30vh;
    max-height: 240px;
    border: 2px dashed var(--gray-7);
    border-radius: 16px;
    margin: 16px 0;
    position: relative;
    overflow: hidden;
`;

export const StickerPreview = styled.svg`
    width: 1024px;
    height: 1024px;
    cursor: pointer;

    .sticker-piece {
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.05);
        }

        &.selected {
            outline: 2px solid var(--purple-7);
        }
    }
`;

export const PieceSelector = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 16px;
    overflow-y: auto;
    max-height: 15vh;
`;

export const ChatButton = styled(Button)`
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: linear-gradient(90deg, #9333EA 0%, #A855F7 100%);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

export const DropZone = styled.div<{ $isDragging: boolean }>`
    border: 2px dashed ${props => props.$isDragging ? 'var(--purple-7)' : 'var(--gray-7)'};
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    background: ${props => props.$isDragging ? 'var(--purple-3)' : 'transparent'};
    transition: all 0.3s ease;
    cursor: pointer;
    margin-bottom: 16px;
`;

export const FileGrid = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 16px;
    overflow-y: auto;
    max-height: 25vh;
`;

export const FileCard = styled.div`
    padding: 16px;
    border: 1px solid var(--gray-7);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &:hover {
        border-color: var(--purple-7);
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
`;

export const ThumbnailContainer = styled.div`
    width: 100%;
    height: 120px;
    border-radius: 4px;
    overflow: hidden;
    background: var(--gray-3);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    svg {
        width: 40px;
        height: 40px;
        color: var(--gray-7);
    }
`;

export const FileInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const FilePreview = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0 auto;
    background: #f8f9fa;
    border: 1px solid var(--gray-7);
    border-radius: 16px;
    box-sizing: border-box;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    pre {
        background: var(--gray-3);
        padding: 16px;
        border-radius: 8px;
        width: 100%;
        height: 100%;
    }
`;

export const ImageContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

export const CategoryPill = styled.div`
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--purple-9);
    color: white;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
    z-index: 1;
`;

export const LoadingOverlay = styled.div<{ $visible: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    opacity: ${props => props.$visible ? 1 : 0};
    transition: opacity 0.3s ease;
    pointer-events: ${props => props.$visible ? 'auto' : 'none'};
`;

export const LoadingSpinner = styled.div`
    width: 40px;
    height: 40px;
    border: 3px solid var(--purple-3);
    border-radius: 50%;
    border-top-color: var(--purple-9);
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

export const ChatFooter = styled.div`
    display: flex;
    gap: 8px;
    padding: 16px;
    border-top: 1px solid var(--gray-5);
    background: white;
    width: 100%;
    box-sizing: border-box;
`;

export const ChatInput = styled(TextField.Input)`
    flex: 1;
    min-width: 0;
`;

export const TabList = styled.div`
    display: flex;
    gap: 8px;
    padding: 0 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--gray-5);
`;

export const TabButton = styled.button<{ $active: boolean }>`
    padding: 8px 16px;
    border: none;
    background: none;
    color: ${props => props.$active ? 'var(--purple-9)' : 'var(--gray-9)'};
    border-bottom: 2px solid ${props => props.$active ? 'var(--purple-9)' : 'transparent'};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        color: var(--purple-9);
    }
`;

export const TabContent = styled.div`
    flex: 1;
    overflow: auto;
`;
