export const compassRoutingWorkflow = {
  title: "MCP_COMPASS_ROUTING_WORKFLOW",
  steps: [
    {
      number: 1,
      agent: "Nat",
      action: "Receives a new message (via chat UI/API/Webhook)"
    },
    {
      number: 2,
      agent: "Nat → Compass",
      action: "Sends full message to Compass (HR)"
    },
    {
      number: 3,
      agent: "Compass",
      action: "Analyzes message context, user intent, agent capabilities, tool availability"
    },
    {
      number: 4,
      agent: "Compass",
      action: "Checks agent roles, workflow definitions, prompt mappings, available tools & inputs"
    },
    {
      number: 5,
      agent: "Compass → Nat",
      action: "Sends routing output package (Agent name, Required tools, Workflow steps, Inputs/parameters) back to Nat"
    },
    {
      number: 6,
      agent: "Nat",
      action: "Sends message package to selected Agent via their message queue"
    },
    {
      number: 7,
      agent: "All Agents",
      action: "If Agent declines or message is misrouted → bounce back to Compass for reroute and log"
    },
    {
      number: 8,
      agent: "Compass",
      action: "Updates error handling/routing intelligence"
    }
  ]
};

// Add more workflow data objects here for other agents
