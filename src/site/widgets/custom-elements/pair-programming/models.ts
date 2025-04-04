export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'feature' | 'bug' | 'wireframe' | 'spike';
  assignedTo: Teammate;
  requirementId: string;
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  dependencies: Requirement[];
  assignedTo: Teammate;
}

export interface Teammate {
  id: string;
  name: string;
  role: 'PM' | 'Developer' | 'Graphic Designer' | 'Marketing';
}

export interface Desk {
  id: string;
  developerSeats: [Teammate, Teammate];
  endcapSeat: Teammate;
  taskDropdown: Task[];
}

export interface HelpRequest {
  teammate: Teammate;
  comment: string;
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
