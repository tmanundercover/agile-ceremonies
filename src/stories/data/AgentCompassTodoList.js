export const agentCompassTodoList = [
  {
    phase: 1,
    title: "Infrastructure & Setup",
    description: "Self-hosting and configuring core infrastructure",
    tasks: [
      { title: "Self-Host n8n", items: [
        "Set up n8n on your server (Docker or bare metal)",
        "Install the Agent Node and MCP Node (ensure latest version)",
        "Secure access (SSL, basic auth, etc.)",
        "Enable Firebase and GitHub API credentials as environment variables"
      ]},
      { title: "Firebase Setup", items: [
        "Create Firebase Project",
        "Enable Firestore (for prompt/workflow library, metadata)",
        "Enable Firebase RTDB (for queue messages between agents)",
        "Set up Firebase Authentication (email or service-to-service for agents)",
        "Enable Firebase Functions (Node.js/TypeScript)",
        "Set up Firebase Storage for prompt history/log files (optional)"
      ]}
    ],
    additionalInfo: [
      {
        title: "Services",
        content: "Core infrastructure components needed for the system.",
        tags: ["n8n", "Firebase", "Docker"]
      }
    ]
  },
  {
    phase: 2,
    title: "Core Compass Agent Workflow in n8n",
    description: "Building the central routing infrastructure",
    tasks: [
      { title: "Webhook Trigger (Start Node)", items: [
        "Set up a public webhook trigger in n8n to receive prompt requests from the frontend"
      ]},
      { title: "Firecrawi Node", items: [
        "Implement custom Firecrawi node or webhook that scrapes README.md, prompt files, agent schemas in GitHub",
        "Stores/update the result in Firestore under /docs/agent_profiles"
      ]},
      { title: "Query Library (Agent Logic)", items: [
        "Query the Firestore \"agent profiles\" collection",
        "Match the prompt text to tags or domains tied to agents",
        "Determine most likely Agent recipient",
        "Include fallback in case of ambiguity"
      ]},
      { title: "Create Prompt Package", items: [
        "Package metadata: id, prompt, detectedAgent, timestamp, priority, sender",
        "Save to Firestore /prompt_logs",
        "Save to RTDB /agentQueue/${agentId}/incoming"
      ]},
      { title: "Send to Agent Queue (Simulated)", items: [
        "Instead of routing to a real agent, simulate Compass output",
        "Return prompt package with chosen agent back to Nat (API response)"
      ]},
      { title: "Log Route Error (Fallback Path)", items: [
        "If agent match fails or system errors: Log to Firestore /errors",
        "Return fallback message to Nat with error details"
      ]}
    ],
    additionalInfo: [
      {
        title: "APIs",
        content: "External systems integrated during this phase.",
        tags: ["GitHub API", "Firebase API"]
      }
    ]
  },
  {
    phase: 3,
    title: "Communication Protocols",
    description: "Establishing data schemas and storage structures",
    tasks: [
      { title: "Define Message Schema", items: [
        "Create prompt_package.ts with PromptPackage interface",
        "Define id, agentId, prompt, sender, timestamp, source, and confidence fields"
      ]},
      { title: "Firestore Collections", items: [
        "Set up /agent_profiles (from Firecrawi)",
        "Configure /prompt_logs",
        "Implement /errors"
      ]},
      { title: "Firebase RTDB Paths", items: [
        "Configure /agentQueue/{agentId}/incoming",
        "Set up /compassQueue/outgoing (optional reverse path)"
      ]}
    ],
    additionalInfo: [
      {
        title: "Services",
        content: "Data storage and messaging services.",
        tags: ["Firebase Firestore", "Firebase RTDB"]
      }
    ]
  },
  {
    phase: 4,
    title: "Custom Frontend Integration",
    description: "Building the user interface components",
    tasks: [
      { title: "Wix React Custom Widget", items: [
        "Use Wix's Custom Element SDK",
        "Build a React component to accept user input",
        "POST to the Compass webhook",
        "Display the routed result (selected agent, route info, JSON structure)"
      ]}
    ],
    additionalInfo: [
      {
        title: "Services",
        content: "Frontend development platforms.",
        tags: ["Wix Custom Elements", "React"]
      }
    ]
  },
  {
    phase: 5,
    title: "Firebase Functions (Utility)",
    description: "Supporting cloud functions implementation",
    tasks: [
      { title: "Create Utility Functions", items: [
        "logRoute.ts: Writes successful route data to Firestore",
        "logError.ts: Handles and stores errors",
        "simulateAgent.ts: Optional function that mocks agent responses"
      ]}
    ],
    additionalInfo: [
      {
        title: "Services",
        content: "Serverless computation platforms.",
        tags: ["Firebase Functions", "TypeScript"]
      }
    ]
  },
  {
    phase: 6,
    title: "Training & Self-Correction Logic",
    description: "Implementing learning mechanisms",
    tasks: [
      { title: "Feedback-Based Routing Update", items: [
        "Create mechanism for Compass to log misrouted prompts",
        "Learn from updated prompt/agent matches",
        "Adjust future route confidence scores"
      ]}
    ],
    additionalInfo: [
      {
        title: "Services",
        content: "Machine learning and feedback systems.",
        tags: ["Firebase Firestore", "n8n"]
      }
    ]
  },
  {
    phase: 7,
    title: "DevOps/Testing/CI",
    description: "Setting up continuous integration and testing",
    tasks: [
      { title: "DevOps", items: [
        "Use GitHub for repo/CI",
        "Integrate GitHub with Firecrawi agent",
        "Optional: Use Supabase as backup or alt storage"
      ]},
      { title: "Tests", items: [
        "Write unit tests for Firestore routing logic",
        "Test Compass packaging and queue simulation",
        "Use Antosh (future agent) logic for analytics pipeline"
      ]}
    ],
    additionalInfo: [
      {
        title: "Services",
        content: "DevOps and testing platforms.",
        tags: ["GitHub", "CI/CD", "Supabase"]
      }
    ]
  },
  {
    phase: 8,
    title: "Bonus: Future Agent Stubs for Testing",
    description: "Creating mock agents for system testing",
    tasks: [
      { title: "Create Mock Agents", items: [
        "Create Firebase Functions or mock n8n endpoints to simulate agents",
        "Build stubs for Brian (Product Manager), Reqqy (Requirements), Josh (Design), and James/Terrell (Dev)",
        "Configure simple responses like \"Agent Brian received the prompt and will begin processing.\""
      ]},
      { title: "Deliverable: n8n Compass Workflow Preview", items: [
        "Webhook trigger receives prompt",
        "Firecrawi node scrapes + updates Firestore",
        "Query node selects agent",
        "Prompt packaged + saved",
        "Output returned to requester (via API or UI)"
      ]}
    ],
    additionalInfo: [
      {
        title: "Services",
        content: "Testing and simulation tools.",
        tags: ["Firebase Functions", "n8n", "Mock APIs"]
      }
    ]
  }
];

export default agentCompassTodoList;
