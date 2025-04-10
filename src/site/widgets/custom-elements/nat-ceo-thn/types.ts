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

export interface FileData {
    id: string;
    name: string;
    type: string;
    size: number;
    lastModified: number;
    content: string;
}
