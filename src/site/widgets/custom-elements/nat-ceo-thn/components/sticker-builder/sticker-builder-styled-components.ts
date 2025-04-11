import styled from 'styled-components';
import { ImagePreviewContainerProps } from './sticker-builder-types';

export const StickerBuilderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const PreviewContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: start;
`;

export const ImagePreviewContainer = styled.div<ImagePreviewContainerProps>`
  width: 400px;
  height: 400px;
  border: 2px solid ${props => props.$isOriginal ? '#ccc' : '#666'};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
`;

export const LayerControlsContainer = styled.div`
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  max-width: 300px;
`;

export const LayerControlItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const StyledButton = styled.button`
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const ProcessingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

export const LayerInfoContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  max-width: 800px;
  
  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    color: #333;
  }
`;

export const LayerInfo = styled.div`
  padding: 12px;
  margin-bottom: 12px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  h4 {
    margin: 0 0 8px 0;
    color: #007bff;
  }

  p {
    margin: 4px 0;
    font-family: monospace;
    font-size: 0.9em;
    color: #666;
  }
`;

