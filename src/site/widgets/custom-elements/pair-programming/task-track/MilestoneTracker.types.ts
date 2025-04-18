export interface Todo {
  title: string;
  status: string;
  services: string[];
}

export interface CheckboxProps {
    checked?: boolean;
}

export interface TodoTextProps {
    checked?: boolean;
}

export interface TagProps {
    text: string;
    link?: string;
    isAgent?: boolean;
}



export interface MilestoneDayProps {
    hovered?: boolean;
}

export interface Task {
  title: string;
  description: string;
  services?: string[];
  todos?: Todo[];
  items?: string[];
  io?: {
    inputType: "JSON" | "Text";
    input: {
      [key: string]: string | number;
    };
    "outputType": "JSON" | "Text";
    "output": {
      [key: string]: any;
    },
  }
}

export interface Phase {
  phase: string;
  timeline: string;
  agent?: string;
  description?: string;
  goals?: string[];
  tasks?: Task[];
  additionalInfo?: {
    title: string;
    content: string;
    tags: string[];
    agentLinks: {
      name: string;
      path: string;
    }[];
  }[];
}

export interface MilestoneTracker {
  milestone: string;
  description: string;
  techOverview?: {
    name: string;
    description: string;
  }[];
  phases: Phase[];
  stretchFeatures?: {
    title: string;
    value: string;
  }[];
  finalNotes?: string[];
}
