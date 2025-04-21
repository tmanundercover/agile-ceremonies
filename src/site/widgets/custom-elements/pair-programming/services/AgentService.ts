import { AgentProfileType } from '../models';
import {PersonaType} from "../components/teammate-selector/Teammate.types";

export const fetchAgentProfiles = async (): Promise<AgentProfileType[]> => {
  console.log("Fetching agent profiles...");
  try {
    const response = await fetch('http://127.0.0.1:5001/youtube-and-other-connections/us-central1/handleAgentProfilesRequest');
    const data = await response.json();
    
    if (data.success) {
      return data.agents;
    } else {
      console.error('Failed to fetch agent profiles');
      return [];
    }
  } catch (error) {
    console.error('Error fetching agent profiles:', error);
    return [];
  }
};

export const isAITeammate = (teammate: PersonaType): boolean => {
  // Check if this persona was created from an AI agent
  // This could be based on specific properties or metadata
  return teammate.email.includes('@ai-team.com') || teammate.email.includes('@ai-agent.org');
};

export const convertAgentToPersona = (agent: AgentProfileType): PersonaType => {
  return {
    id: agent.id,
    name: agent.name,
    role: agent.role as 'Developer' | 'Graphic Designer' | 'PM' | 'Requirements' | 'CEO' | 'Testing' | 'Dev Ops' | 'Async Teammate',
    capabilities: agent.capabilities,
    description: agent.description,
    domains: agent.domains,
    status: agent.status,
    email: `${agent.name.toLowerCase().replace(/\s/g, '.')}@ai-team.com`,
    avatarUrl: `/images/ai-avatars/${agent.name.toLowerCase().replace(/\s/g, '-')}.png`,
  };
};
