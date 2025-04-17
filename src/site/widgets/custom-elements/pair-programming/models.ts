import * as React from "react";
import {DateProps} from "@wix/wix-ui-icons-common/dist/types/general/dist/components/Date";
import {IconProps} from "@wix/wix-ui-icons-common";

export interface Task {
  id: string;
  title: string;
  description: string;
  comments: Comment[];
  type: 'feature' | 'bug' | 'wireframe' | 'spike' | 'design' | 'task';
  assignedTeammates: Teammate[];
  requirementId: string;
  dependencies: (Task | Requirement)[];
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  icon: React.ReactNode
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  assignedPM: string;
  tasks: Task[];
  dependencies: Requirement[];
  assignedTo: Teammate;
  status: 'Open' | 'In Progress' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  deadline: Date;
  acceptanceCriteria: string[];
}

export interface StandupStatus {
  id: string;
  teammateId: string;
  date: Date;
  status: string;
  blockers: string[];
  helpRequests: HelpRequest[];
}

export interface HelpRequest {
  id: string;
  requesterId: string;
  helperId: string;
  taskId: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  rejectionReason?: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  timestamp: Date;
}

export interface Teammate {
  id: string;
  name: string;
  role: 'PM' | 'Developer' | 'Graphic Designer' | 'Marketing';
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

