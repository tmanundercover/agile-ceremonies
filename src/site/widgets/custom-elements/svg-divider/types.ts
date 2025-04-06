export interface SvgThumbnail {
    id: string;
    name: string;
    src: string;
    width: number;
    height: number;
    x: number;
    y: number;
    disabled: boolean;
}

export interface ThumbnailsProps {
    thumbnails: SvgThumbnail[];
    onThumbnailClick: (index: number) => void;
    parentSvgProps: {[key: string]: string};
}
