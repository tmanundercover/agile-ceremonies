const timelineData = [
  {
    week: 1,
    agent: "Nat (CEO)",
    description: "Setup CEO Agent & n8n Workflow Implementation",
    tasks: [
      { title: "n8n Workflow Setup", items: [
        "Create new workflow for CEO agent in n8n",
        "Configure HTTP trigger node for external inputs",
        "Set up OpenAI node with appropriate model and parameters",
        "Create function nodes for agent personality and context"
      ]},
      { title: "Agent Communication Framework", items: [
        "Implement message router node for agent-to-agent communication",
        "Create decision tree logic for request handling",
        "Set up response formatters for consistent outputs",
        "Configure data persistence with Firebase nodes"
      ]},
      { title: "Integration Points", items: [
        "Configure GitHub integration nodes for issue tracking",
        "Set up Calendar API connections for scheduling",
        "Implement Slack/Discord webhook nodes for notifications",
        "Create database query nodes for persistent storage"
      ]},
      { title: "Testing & Deployment", items: [
        "Create test scenarios for workflow validation",
        "Set up error handling and retry logic",
        "Configure environment variables for production/development",
        "Deploy workflow and verify external connectivity"
      ]}
    ],
    additionalInfo: [
      {
        title: "APIs",
        content: "Integration with essential external APIs for system operation.",
        tags: ["GitHub API", "Calendar API", "OpenAI API"]
      },
      {
        title: "Services",
        content: "Core services and platforms for functionality.",
        tags: ["n8n", "Wix Widgets", "Firebase Firestore", "Wix Secrets", "Slack/Discord", "Firebase Functions"]
      },
      {
        title: "AI Agent Resources",
        content: "Specialized AI agents required for this phase.",
        agentLinks: [
          { name: "Compass (Communication Framework)", path: "/?path=/docs/documentation-agents-compass--docs" }
        ]
      }
    ]
  },
  {
    week: 2,
    agent: "Brian (PM)",
    description: "Project Management Integration & Workflow Setup",
    tasks: [
      { title: "Project Management Integration", items: [
        "Connect to project database",
        "Set up authentication system"
      ]},
      { title: "Decision Making System", items: [
        "Implement priority assessment",
        "Create task delegation logic"
      ]}
    ],
    additionalInfo: [
      {
        title: "APIs",
        content: "Project management and scheduling interfaces.",
        tags: ["Calendar API", "GitHub API"]
      },
      {
        title: "Services",
        content: "Collaboration services for team coordination.",
        tags: ["Firebase Firestore", "Wix Dashboard"]
      },
      {
        title: "AI Agent Resources",
        content: "Specialized AI agents required for this phase.",
        agentLinks: []
      }
    ]
  },
  {
    week: 3,
    agent: "Reqqy",
    description: "Requirements Collection System & Issue Creation",
    tasks: [
      { title: "Agent Communication Hub", items: [
        "Implement basic command structure",
        "Test agent communications"
      ]},
      { title: "External Services Setup", items: [
        "GitHub API connection",
        "Calendar API setup"
      ]}
    ],
    additionalInfo: [
      {
        title: "APIs",
        content: "Requirement tracking and documentation interfaces.",
        tags: ["GitHub API", "Document Store API"]
      },
      {
        title: "Services",
        content: "Requirement management platforms.",
        tags: ["Wix Forms", "Firebase Firestore"]
      },
      {
        title: "AI Agent Resources",
        content: "Specialized AI agents required for this phase.",
        agentLinks: []
      }
    ]
  },
  {
    week: 4,
    agent: "Josh",
    description: "Design System & Asset Management Pipeline",
    tasks: [
      { title: "Decision Making System", items: [
        "Set up approval workflows",
        "Initialize admin dashboard structure"
      ]},
      { title: "External Services Setup", items: [
        "Slack/Discord integration"
      ]}
    ],
    additionalInfo: [
      {
        title: "APIs",
        content: "Design and asset management interfaces.",
        tags: ["Image Processing API", "Asset Storage API"]
      },
      {
        title: "Services",
        content: "Design tools and asset storage platforms.",
        tags: ["Wix Media Gallery", "Firebase Storage"]
      },
      {
        title: "AI Agent Resources",
        content: "Specialized AI agents required for this phase.",
        agentLinks: []
      }
    ]
  },
  {
    week: 5,
    agent: "James & Terrell",
    description: "Pair Programming Environment & Development Tools",
    tasks: [
      { title: "Data Storage", items: [
        "Set up MongoDB/PostgreSQL",
        "Create data schemas"
      ]},
      { title: "Basic Testing", items: [
        "Unit test core functions",
        "Integration test APIs"
      ]}
    ],
    additionalInfo: [
      {
        title: "APIs",
        content: "Development and code management interfaces.",
        tags: ["GitHub API", "Code Analysis API"]
      },
      {
        title: "Services",
        content: "Development environments and tools.",
        tags: ["Wix Code Editor", "Firebase Functions"]
      },
      {
        title: "AI Agent Resources",
        content: "Specialized AI agents required for this phase.",
        agentLinks: []
      }
    ]
  },
  {
    week: 6,
    agent: "Antosh",
    description: "Test Framework & Analytics Dashboard",
    tasks: [
      { title: "Data Storage", items: [
        "Implement backup system"
      ]},
      { title: "Documentation", items: [
        "API documentation",
        "System architecture docs"
      ]}
    ],
    additionalInfo: [
      {
        title: "APIs",
        content: "Testing and analytics interfaces.",
        tags: ["Testing Framework API", "Analytics API"]
      },
      {
        title: "Services",
        content: "Testing platforms and analytics tools.",
        tags: ["Firebase Analytics", "Wix Dashboard"]
      },
      {
        title: "AI Agent Resources",
        content: "Specialized AI agents required for this phase.",
        agentLinks: []
      }
    ]
  },
  {
    week: 7,
    agent: "Lia & Man-Man",
    description: "Communications Platform & Infrastructure Maintenance",
    tasks: [
      { title: "Documentation", items: [
        "Setup instructions"
      ]},
      { title: "Verification & Planning", items: [
        "Test all core functionalities",
        "Document any issues/todos",
        "Prepare integration points for next phase"
      ]}
    ],
    additionalInfo: [
      {
        title: "APIs",
        content: "Communication and infrastructure management interfaces.",
        tags: ["Email API", "Social Media API", "Monitoring API"]
      },
      {
        title: "Services",
        content: "Communication channels and infrastructure tools.",
        tags: ["Wix Email Marketing", "Firebase Hosting", "Wix Automations"]
      }
    ]
  }
];

export default timelineData;
