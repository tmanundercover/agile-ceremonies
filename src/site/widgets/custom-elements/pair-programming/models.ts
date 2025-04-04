import * as React from "react";
import {DateProps} from "@wix/wix-ui-icons-common/dist/types/general/dist/components/Date";

export interface Task {
  id: string;
  title: string;
  description: string;
  comments: Comment[];
  type: 'feature' | 'bug' | 'wireframe' | 'spike';
  assignedTeammates: Teammate[];
  requirementId: string;
  dependencies: (Task | Requirement)[];
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  icon: React.FC<DateProps>
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  dependencies: Requirement[];
  assignedTo: Teammate;
  status: 'Open' | 'In Progress' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
}

export interface Teammate {
  id: string;
  name: string;
  role: 'PM' | 'Developer' | 'Graphic Designer' | 'Marketing';
  helpRequests: HelpRequest[];
}

export interface Desk {
  id: string;
  developerSeats: [Teammate| null, Teammate| null];
  endcapSeat: Teammate | null;
  taskDropdown: Task[];
  assignedTask: Task | null;
}

export interface HelpRequest {
  comments: [];
  description: string;
  helperId: string;
  id: string;
  requesterId: string;
  status: 'Pending' | 'Resolved'| 'Obsolete';
  taskId: string;
}

export interface StandupData {
  name: string;
  status: string;
  blockers: string[];
  helpRequest: HelpRequest;
  tasksCompleted: string[];
  tasksInProgress: string[];
  tasksPlanned: string[];
}
