export interface SvgThumbnail {
  id: string;
  src: string;
  disabled: boolean;
}

export interface SubThumbnailMap {
  [parentId: string]: string[];
}

export interface SvgProcessorProps {
  onFileSelect: (file: File) => void;
  loading: boolean;
  error: string | null;
}

export interface ThumbnailsProps {
  thumbnails: SvgThumbnail[];
  onThumbnailClick: (index: number) => void;
}

export interface SvgPreviewProps {
  svgContent: string | null;
  componentCount: number;
}
