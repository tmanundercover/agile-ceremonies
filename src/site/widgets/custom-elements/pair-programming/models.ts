import { IconProps } from '@radix-ui/react-icons';
import { ComponentType } from 'react';

export interface Teammate {
  id: string;
  name: string;
  role: 'PM' | 'Developer' | 'Graphic Designer' | 'Marketing' | 'Team Member';
  helpRequests: HelpRequest[];
  email: string;
  avatarUrl: string;
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
    icon: ComponentType<IconProps>;
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
