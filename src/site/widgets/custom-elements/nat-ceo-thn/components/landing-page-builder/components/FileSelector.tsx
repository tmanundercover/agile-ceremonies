import React, { useCallback, useRef, useState } from 'react';
import { UploadIcon } from '@radix-ui/react-icons';
import {
  FileSelectorStyled,
  FileInputStyled,
  DropzoneContentStyled,
} from '../landing-page-builder-styled-components';
import { Thumbnail } from './Thumbnail';

interface FileSelectorProps {
  onFileSelected: (file: File) => void;
  accept?: string;
  'data-testid'?: string;
}

export const FileSelector: React.FC<FileSelectorProps> = ({
  onFileSelected,
  accept = '*',
  'data-testid': dataTestId
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>();
  const [fileType, setFileType] = useState<string>();
  const [thumbnail, setThumbnail] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFileName(file.name);
    setFileType(file.type.split('/')[1].toUpperCase());
    onFileSelected(file);

    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnail(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files?.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onClick = () => {
    inputRef.current?.click();
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <FileSelectorStyled
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      $isDragging={isDragging}
      data-testid={dataTestId}
    >
      <FileInputStyled
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onFileInputChange}
      />
      
      {thumbnail ? (
        <>
          <Thumbnail
            src={thumbnail}
            fileName={fileName}
            fileType={fileType}
          />
          <DropzoneContentStyled $hasFile>
            <UploadIcon width={24} height={24} />
            Click or drop to replace
          </DropzoneContentStyled>
        </>
      ) : (
        <DropzoneContentStyled>
          <UploadIcon width={24} height={24} />
          <div>
            <strong>Click to upload</strong> or drag and drop
            <p>SVG files only</p>
          </div>
        </DropzoneContentStyled>
      )}
    </FileSelectorStyled>
  );
};

