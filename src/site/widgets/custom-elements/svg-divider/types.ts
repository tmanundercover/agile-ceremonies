export interface SvgThumbnail {
    id: string;
    name: string;
    src: string;
    width: number;
    height: number;
    x: number;
    y: number;
    disabled: boolean;
    containers: string[];
}

export interface SvgPreviewProps {
    svgContent: string | null;
    componentCount: number;
}

export interface SvgProcessorProps {
    onFileSelect: (file: File) => void;
    onTextInput: (text: string) => void;
    loading: boolean;
    error: string | null;
}

export interface CropSettings {
    enabled: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ProcessingResult {
    processedSvg: SVGSVGElement | null;
    thumbnails: SvgThumbnail[];
    error: string | null;
}

export interface CropArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ThumbnailsProps {
    thumbnails: SvgThumbnail[];
    onThumbnailClick: (index: number) => void;
    parentSvgProps: { [key: string]: string };
    selectedThumbnails: SvgThumbnail[];
}

export interface ProcessingOptionsProps {
    onProcessLayered: () => void;
    onProcessOriginal: () => void;
    onSave: (type: 'layered' | 'original') => void;
}

export interface LayeredPreviewProps {
    originalSvgShell: string | null;
    selectedThumbnails: SvgThumbnail[];
    parentSvgProps: {[key: string]: string};
    svgContent: string | null;
    componentCount: number;
    originalContainer: string | null;
    onCropProcess?: (cropArea: { x: number, y: number, width: number, height: number }) => void;
    croppedComponents: Array<{ id: string, svg: string }>;
    onSelectionChange?: (selectedComponents: Array<{ id: string, svg: string }>) => void;
}

export interface SelectedThumbnailsProps {
    thumbnails: SvgThumbnail[];
    parentSvgProps: {[key: string]: string};
    processedResult: string | null;
    onProcessLayered?: (cropSettings?: CropSettings) => void;
    onProcessOriginal?: (cropSettings?: CropSettings) => void;
    onProcessCropped?: (cropSettings?: CropSettings) => void;
}

