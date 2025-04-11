interface AgentMessage {
    from: string;
    to: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    content: string;
    timestamp: Date;
}

export interface ProjectData {
    projectName: string;
    description: string;
    resources: ResourceRequirement[];
    team: TeamMember[];
}

export interface ResourceRequirement {
    type: string;
    quantity: number;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    availability: boolean;
}

export interface FileVersion {
    id: string;
    name: string;
    content: string;
    type: string;
    createdAt: Date;
}

export interface FileData {
    id: string;
    name: string;
    type: string;
    size: number;
    lastModified: number;
    content: string;
    versions: FileVersion[];
    savedSvgLocation?: string;
}

export interface StickerPiece {
    id: string;
    type: 'head' | 'hair' | 'headphones' | 'facial' | 'eyes';
    paths: string[];
    transform: string;
    selected: boolean;
}

export interface StickerImage {
    id: string;
    name: string;
    pieces: StickerPiece[];
}
