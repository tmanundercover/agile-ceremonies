import { ComponentType } from 'react';
import {Teammate} from './components/teammate-selector/Teammate.types';

export interface AgentProfileType {
  id: string;
  name: string;
  role: string;
  capabilities: string[];
  description: string;
  domains: string[];
  status: string;
}

export interface Desk {
  id: string;
  developerSeats: [Teammate| null, Teammate| null];
  endcapSeat: Teammate | null;
  taskDropdown: Task[];
  // assignedTask: Task | null;
  assignedTask: string | null;
}

export interface HelpRequest {
  comments: Comment[];
  description: string;
  helperId: string;
  id: string;
  requesterId: string;
  statusAcknowledgement: 'Pending' | 'Resolved'| 'Obsolete';
  taskId: string;
}

export interface StandupData {
  name: string;
  status: string;
  blockers: string[];
  helpRequest: HelpRequest;
  tasksCompleted: Task[];
  tasksInProgress: Task[];
  tasksPlanned: Task[];
}

export interface Task {
    id: string;
    priority: string;
    icon: ComponentType<any>;
    title: string;
    type: string;
    status: string;
    requirementId: string;
    assignedTeammates: any[];
    dependencies: any[];
    description: string;
    comments: any[];
}

export interface ChatMessage {
    id: string;
    sender: {
        name: string;
        type: 'user' | 'ai' | 'system';
        avatarUrl?: string;
    };
    content: string;
    timestamp: Date;
}

