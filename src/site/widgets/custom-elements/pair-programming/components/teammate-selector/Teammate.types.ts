import {HelpRequest} from "../../models";

export interface Teammate {
    id: string;
    helpRequests: HelpRequest[];
    persona: PersonaType
}

export type PersonaType =
    {
        role: 'Developer' | 'Graphic Designer' | 'PM' | 'Requirements' | 'CEO' | 'Testing' | 'Dev Ops' | 'Async Teammate';
        id: string;
        name: string,
        capabilities: string[],
        description: string,
        domains: string[],
        status: string
        email: string;
        avatarUrl: string;
    }