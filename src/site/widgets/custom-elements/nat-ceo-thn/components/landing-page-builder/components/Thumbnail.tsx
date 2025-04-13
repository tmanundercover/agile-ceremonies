import React from 'react';
import styled from 'styled-components';
import { tokens } from '../landing-page-builder-styled-components';

const ThumbnailWrapperStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${tokens.borderRadius.md};
  background: ${tokens.colors.neutral[100]};
`;

const ThumbnailImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ThumbnailOverlayStyled = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: ${tokens.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FileNameStyled = styled.span`
  color: white;
  font-size: ${tokens.fontSizes.sm};
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 70%;
`;

const FileTypeStyled = styled.span`
  background: ${tokens.colors.primary};
  color: white;
  padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
  border-radius: ${tokens.borderRadius.sm};
  font-size: ${tokens.fontSizes.xs};
  text-transform: uppercase;
`;

interface ThumbnailProps {
  src: string;
  fileName?: string;
  fileType?: string;
  alt?: string;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({
  src,
  fileName,
  fileType,
  alt = "Thumbnail"
}) => {
  return (
    <ThumbnailWrapperStyled>
      <ThumbnailImageStyled src={src} alt={alt} />
      {(fileName || fileType) && (
        <ThumbnailOverlayStyled>
          {fileName && <FileNameStyled>{fileName}</FileNameStyled>}
          {fileType && <FileTypeStyled>{fileType}</FileTypeStyled>}
        </ThumbnailOverlayStyled>
      )}
    </ThumbnailWrapperStyled>
  );
};
