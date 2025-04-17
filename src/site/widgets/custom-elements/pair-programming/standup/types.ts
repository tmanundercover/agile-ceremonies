import {Teammate} from "../models";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
}

export interface HelpRequest {
  topic: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
}

export interface StandupData {
  name: string;
  status: 'On Track' | 'Blocked' | 'At Risk';
  blockers: string[];
  helpRequest?: HelpRequest;
  tasksCompleted: Task[];
  tasksInProgress: Task[];
  tasksPlanned: Task[];
}

export interface StandupModalProps {
  teammate: Teammate | null;
  onClose: (data: StandupData | { name?: string }) => void;
  isEntering: boolean;
}
