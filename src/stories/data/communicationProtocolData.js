export const compassCommunicationProtocols = [
  {
    type: "Agent-to-Agent",
    description: "Publish message to recipient's Queue. If invalid, bounce to Compass."
  },
  {
    type: "Nat-to-Compass",
    description: "Direct via API/Webhook (Chat, UI, etc.)"
  },
  {
    type: "Compass-to-Agent",
    description: "Via message queues, based on tool+workflow"
  },
  {
    type: "Agent-to-Compass",
    description: "Log feedback, invalid prompts, update training"
  },
  {
    type: "Compass-to-Library",
    description: "Reads from + writes to centralized Library"
  },
  {
    type: "Agent-to-Workflow",
    description: "Follows instructions from Compass' routing plan"
  }
];

// Add more protocol data objects for other agents here
