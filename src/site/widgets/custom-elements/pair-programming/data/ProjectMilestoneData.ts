import {MilestoneTracker} from "../task-track/MilestoneTracker.types";


export const ProjectMilestoneData: MilestoneTracker[] = [{
    "milestone": "Multi-Agent Network with Firebase + Wix + React/TypeScript",
    "description": "Build a multi-agent system using Firebase and Wix, with a focus on task management and natural language processing.",
    "techOverview": [
        {name: "frontend", description: "Wix Widgets (React/TypeScript)"},
        {name: "backendAPI", description: "Firebase Cloud Functions"},
        {name: "realtimeBackend", description: "Firebase Realtime Database"},
        {name: "agentCommunication", description: "Firebase Pub/Sub via Database"},
        {name: "naturalLanguageInterface", description: "GPT-4 API or OpenRouter"},
        {name: "visualBuilder", description: "Custom Canvas in Wix (React)"}
    ],
    "phases": [
        {
            "additionalInfo": [{
                "title": "Tech Stack",
                "content": "Firebase + Wix + React/TypeScript + n8n",
                "tags": ["Firebase", "Wix", "React", "TypeScript", "n8n", "GitHub API", "Firebase Firestore", "Firebase RTDB", "Firebase Functions"],
                "agentLinks": [
                    {
                        "name": "Compass (Communication Framework)",
                        "path": "/?path=/docs/documentation-agents-compass--docs"
                    }
                ]
            }],
            "phase": "PHASE 0: AGENT COMPASS",
            "timeline": "Weeks 1-2",
            "agent": "Compass (Communication Framework)",
            "description": "Setup communication routing infrastructure for all agents",
            "goals": [
                "Build the central message routing system",
                "Establish communication protocols and data schemas",
                "Create infrastructure for agent-to-agent messaging"
            ],
            "tasks": [
                {
                    "title": "Infrastructure & Setup",
                    "description": "Self-hosting and configuring core infrastructure",
                    "services": ["n8n", "Firebase", "Docker"],
                    "todos": [
                        {
                            status: "pending",
                            title: "Set up n8n on your server (Docker or bare metal)",
                            services: ["n8n", "Docker"]
                        },
                        {
                            status: "pending",
                            title: "Install the Agent Node and MCP Node (ensure latest version)",
                            services: ["n8n"]
                        },
                        {status: "pending", title: "Secure access (SSL, basic auth, etc.)", services: []},
                        {
                            status: "pending",
                            title: "Enable Firebase and GitHub API credentials as environment variables",
                            services: ["Firebase"]
                        },
                        {status: "pending", title: "Create Firebase Project", services: ["Firebase"]},
                        {
                            status: "pending",
                            title: "Enable Firestore (for prompt/workflow library, metadata)",
                            services: ["Firebase"]
                        },
                        {
                            status: "pending",
                            title: "Enable Firebase RTDB (for queue messages between agents)",
                            services: ["Firebase"]
                        },
                        {
                            status: "pending",
                            title: "Set up Firebase Authentication (email or service-to-service for agents)",
                            services: ["Firebase"]
                        },
                        {
                            status: "pending",
                            title: "Enable Firebase Functions (Node.js/TypeScript)",
                            services: ["Firebase"]
                        },
                        {
                            status: "pending",
                            title: "Set up Firebase Storage for prompt history/log files (optional)",
                            services: ["Firebase"]
                        }
                    ],
                    "items": [
                        "Set up n8n on your server (Docker or bare metal)",
                        "Install the Agent Node and MCP Node (ensure latest version)",
                        "Secure access (SSL, basic auth, etc.)",
                        "Enable Firebase and GitHub API credentials as environment variables",
                        "Create Firebase Project",
                        "Enable Firestore (for prompt/workflow library, metadata)",
                        "Enable Firebase RTDB (for queue messages between agents)",
                        "Set up Firebase Authentication (email or service-to-service for agents)",
                        "Enable Firebase Functions (Node.js/TypeScript)",
                        "Set up Firebase Storage for prompt history/log files (optional)"
                    ]
                },
                {
                    "title": "Core Compass Agent Workflow in n8n",
                    "description": "Building the central routing infrastructure",
                    "services": ["n8n", "Firebase", "GitHub API"],
                    "todos": [
                        {
                            status: "pending",
                            title: "Set up a public webhook trigger in n8n to receive prompt requests from the frontend",
                            services: ["n8n"]
                        },
                        {
                            status: "pending",
                            title: "Implement custom Firecrawi node or webhook that scrapes README.md, prompt files, agent schemas in GitHub",
                            services: ["n8n", "GitHub API"]
                        },
                        {
                            status: "pending",
                            title: "Query the Firestore \"agent profiles\" collection",
                            services: ["Firebase"]
                        },
                        {
                            status: "pending",
                            title: "Match the prompt text to tags or domains tied to agents",
                            services: []
                        },
                        {
                            status: "pending",
                            title: "Package metadata: id, prompt, detectedAgent, timestamp, priority, sender",
                            services: []
                        },
                        {status: "pending", title: "Save to Firestore /prompt_logs", services: ["Firebase"]},
                        {
                            status: "pending",
                            title: "Save to RTDB /agentQueue/${agentId}/incoming",
                            services: ["Firebase"]
                        }
                    ],
                },
                {
                    "title": "Communication Protocols",
                    "description": "Establishing data schemas and storage structures",
                    "services": ["Firebase Firestore", "Firebase RTDB", "Firecrawl"],
                    "todos": [
                        {
                            status: "pending",
                            title: "Create prompt_package.ts with PromptPackage interface",
                            services: []
                        },
                        {
                            status: "pending",
                            title: "Define id, agentId, prompt, sender, timestamp, source, and confidence fields",
                            services: []
                        },
                        {status: "pending", title: "Set up /agent_profiles (from Firecrawi)", services: []},
                        {status: "pending", title: "Configure /prompt_logs", services: []},
                        {status: "pending", title: "Configure /agentQueue/{agentId}/incoming", services: []},
                        {
                            status: "pending",
                            title: "Set up /compassQueue/outgoing (optional reverse path)",
                            services: []
                        },
                    ],
                    "items": [
                        "Create prompt_package.ts with PromptPackage interface",
                        "Define id, agentId, prompt, sender, timestamp, source, and confidence fields",
                        "Set up /agent_profiles (from Firecrawi)",
                        "Configure /prompt_logs",
                        "Implement /errors",
                        "Configure /agentQueue/{agentId}/incoming",
                        "Set up /compassQueue/outgoing (optional reverse path)"
                    ]
                },
                {
                    "title": "Custom Frontend Integration",
                    "description": "Building the user interface components",
                    "services": ["Wix Custom Elements", "React"],
                    "todos": [
                        {status: "pending", title: "Use Wix's Custom Element SDK", services: ["Wix Custom Elements"]},
                        {status: "pending", title: "Build a React component to accept user input", services: ["React"]},
                        {status: "pending", title: "POST to the Compass webhook", services: []},
                        {
                            status: "pending",
                            title: "Display the routed result (selected agent, route info, JSON structure)",
                            services: ["React"]
                        }
                    ],
                    "items": [
                        "Use Wix's Custom Element SDK",
                        "Build a React component to accept user input",
                        "POST to the Compass webhook",
                        "Display the routed result (selected agent, route info, JSON structure)"
                    ]
                },
                {
                    "title": "Firebase Functions (Utility)",
                    "description": "Supporting cloud functions implementation",
                    "services": ["Firebase Functions", "TypeScript"],
                    "todos": [
                        {
                            status: "pending",
                            title: "logRoute.ts: Writes successful route data to Firestore",
                            services: ["Firebase Functions", "TypeScript"]
                        },
                        {
                            status: "pending",
                            title: "logError.ts: Handles and stores errors",
                            services: ["Firebase Functions", "TypeScript"]
                        },
                        {
                            status: "pending",
                            title: "simulateAgent.ts: Optional function that mocks agent responses",
                            services: ["Firebase Functions", "TypeScript"]
                        }
                    ],
                    "items": [
                        "logRoute.ts: Writes successful route data to Firestore",
                        "logError.ts: Handles and stores errors",
                        "simulateAgent.ts: Optional function that mocks agent responses"
                    ]
                },
                {
                    "title": "Training & Self-Correction Logic",
                    "description": "Implementing learning mechanisms",
                    "services": ["Firebase Firestore", "n8n"],
                    "items": [
                        "Create mechanism for Compass to log misrouted prompts",
                        "Learn from updated prompt/agent matches",
                        "Adjust future route confidence scores"
                    ]
                },
                {
                    "title": "DevOps/Testing/CI",
                    "description": "Setting up continuous integration and testing",
                    "services": ["GitHub", "CI/CD", "Supabase"],
                    "items": [
                        "Use GitHub for repo/CI",
                        "Integrate GitHub with Firecrawi agent",
                        "Write unit tests for Firestore routing logic",
                        "Test Compass packaging and queue simulation"
                    ]
                },
                {
                    "title": "Future Agent Stubs for Testing",
                    "description": "Creating mock agents for system testing",
                    "services": ["Firebase Functions", "n8n", "Mock APIs"],
                    "items": [
                        "Create Firebase Functions or mock n8n endpoints to simulate agents",
                        "Build stubs for Brian (Product Manager), Reqqy (Requirements), Josh (Design), and James/Terrell (Dev)",
                        "Configure simple responses like \"Agent Brian received the prompt and will begin processing.\""
                    ]
                }
            ]
        },
        {
            "additionalInfo": [{
                "title": "Tech Stack",
                "content": "Firebase + Wix + React/TypeScript + n8n",
                "tags": ["Firebase", "Wix", "React", "TypeScript", "n8n", "GitHub API", "Calendar API", "OpenAI API", "Firebase Firestore", "Wix Secrets", "Slack/Discord", "Firebase Functions"],
                "agentLinks": [
                    {
                        "name": "Compass (Communication Framework)",
                        "path": "/?path=/docs/documentation-agents-compass--docs"
                    }
                ]
            }],
            "phase": "PHASE 1: AI AGENT NAT",
            "timeline": "Weeks 3–5",
            "agent": "Nat (CEO)",
            "description": "Setup CEO Agent & n8n Workflow Implementation",
            "goals": [
                "MVP setup of agent creation, task handling using Compass for communication",
                "Basic UI to view tasks and outputs"
            ],
            "tasks": [
                {
                    "title": "Agent Schema Design",
                    "description": "Structure agent profiles in Firebase.",
                    "services": ["Firebase Realtime Database"],
                    "io": {
                        "inputType": "JSON",
                        input: {values: ""},
                        "outputType": "JSON",
                        "output": {
                            "agent": {
                                "id": "string",
                                "role": "string",
                                "status": "string",
                                "currentTask": "string",
                                "capabilities": ["search", "summarize"],
                                "lastActive": "timestamp"
                            }
                        },
                    }
                },
                {
                    "title": "Realtime Task System",
                    "description": "Nat listens for task updates via Compass routing",
                    "services": ["Firebase Realtime Database", "Firebase Cloud Functions"],
                },
                {
                    "title": "Agent Cloud Functions",
                    "description": "Nat's decision making logic implemented as callable functions",
                    "services": ["Firebase Cloud Functions"],
                },
                {
                    "title": "Wix Widget: Task Feed",
                    "description": "UI for monitoring Nat's activity and results. This is the Pair Programming Board.",
                    "services": ["wix-data", "wix-fetch"],
                },
                {
                    "title": "n8n Workflow Setup",
                    "description": "Set up workflow automation for CEO agent",
                    "services": ["n8n", "OpenAI"],
                    "todos": [
                        {"title": "Create new workflow for CEO agent in n8n", "status": "pending", "services": ["n8n"]},
                        {
                            "title": "Configure HTTP trigger node for external inputs",
                            "status": "pending",
                            "services": ["n8n"]
                        },
                        {
                            "title": "Set up OpenAI node with appropriate model and parameters",
                            "status": "pending",
                            "services": ["n8n", "OpenAI"]
                        },
                        {
                            "title": "Create function nodes for agent personality and context",
                            "status": "pending",
                            "services": ["n8n"]
                        }
                    ]
                },
                {
                    "title": "Nat-Compass Integration",
                    "description": "Connect Nat to Compass for message routing",
                    "services": ["n8n", "Firebase"],
                    "todos": [
                        {
                            "title": "Implement Compass client for Nat to send messages",
                            "status": "pending",
                            services: ["n8n", "Firebase RTDB", "TypeScript"]
                        },
                        {
                            "title": "Set up listeners for incoming messages from Compass",
                            "status": "pending",
                            services: ["n8n", "Firebase RTDB", "Firebase Functions"]
                        },
                        {
                            "title": "Create response formatters for consistent outputs",
                            "status": "pending",
                            services: ["n8n", "TypeScript"]
                        },
                        {
                            "title": "Configure data persistence with Firebase nodes",
                            "status": "pending",
                            services: ["n8n", "Firebase Firestore", "Firebase RTDB"]
                        }
                    ]
                },
            ]
        },
        {
            "phase": "PHASE 2: NATURAL LANGUAGE INTERFACE",
            "timeline": "Weeks 6–7",
            "goals": [
                "Let users describe goals in natural language and assign to agent(s).",
                "Agent interprets and plans next steps."
            ],
            "tasks": [
                {
                    "title": "Prompt-to-Task Generator",
                    "description": "Use GPT API to turn user prompts into structured tasks.",
                    "services": ["OpenAI GPT-4 API or OpenRouter"],
                    "io": {
                        inputType: "Text",
                        input: {value: "Find 3 competitors to HeyBoss and compare their feature sets."},
                        "outputType": "JSON",
                        "output": [
                            {"agent": "researcher", "task": "Find 3 competitors"},
                            {"agent": "analyst", "task": "Compare feature sets"}
                        ]
                    }
                },
                {
                    "title": "Agent 'Interpreter' Function",
                    "description": "First agent is 'Planner'—reads user prompt and assigns agents.",
                    "services": ["Firebase Cloud Functions"]
                },
                {
                    "title": "Wix Widget: Prompt Input & Response Viewer",
                    "description": "Displays interpreted plan, allows user to approve or edit.",
                    "services": ["Wix React Widgets"]
                }
            ]
        },
        {
            "phase": "PHASE 3: VISUAL WORKFLOW BUILDER",
            "timeline": "Weeks 8–9",
            "goals": [
                "Users drag-and-drop workflows: agents + task flows.",
                "System converts workflows into Firebase triggers + Cloud Function calls."
            ],
            "tasks": [
                {
                    "title": "Design Agent Node Components",
                    "description": "Custom React components for each agent block.",
                    "services": ["Wix React Widgets"]
                },
                {
                    "title": "Drag/Drop Canvas with State",
                    "description": "Use react-flow or custom layout inside Wix (iframe if needed).",
                    "services": ["react-flow", "Firebase Realtime Database"]
                },
                {
                    "title": "Workflow Compiler",
                    "description": "Translates canvas into task-chain logic stored in Firebase.",
                    "services": ["Firebase Realtime Database", "Cloud Functions"]
                },
                {
                    "title": "Execution Feedback UI",
                    "description": "Highlights active/complete agents using Firebase listeners.",
                    "services": ["Firebase Realtime Database", "Wix React"]
                }
            ]
        },
        {
            "phase": "PHASE 4: TESTING, SECURITY, REFINEMENT",
            "timeline": "Weeks 9–10",
            "goals": [
                "Make the system robust, safe, and visually slick.",
                "Prep for soft launch or beta."
            ],
            "tasks": [
                {
                    "title": "Firebase Auth for Admin/User Roles",
                    "description": "Use Firebase Auth to manage user roles and permissions.",
                    "services": ["Firebase Authentication"]
                },
                {
                    "title": "Rate Limiting on Agent Requests",
                    "description": "Prevent abuse of agent requests using Firebase rules.",
                    "services": ["Firebase Cloud Functions"]
                },
                {
                    "title": "UI Polish",
                    "description": "Animations, loading states, error boundaries.",
                    "services": ["Wix React"]
                },
                {
                    "title": "Agent Testing & Timeout Handling",
                    "description": "Ensure agents handle failures gracefully.",
                    "services": ["Firebase Emulator", "Firebase Functions"]
                },
                {
                    "title": "Wix Dashboard Overview Widget",
                    "description": "Displays all tasks, running agents, system health.",
                    "services": ["Wix React", "Firebase"]
                }
            ]
        }
    ],
    "stretchFeatures": [
        {
            "title": "Agent Marketplace",
            "value": "Let others add/sell new agents."
        },
        {
            "title": "Plugin Loader (per agent)",
            "value": "Scripted plugin loader in Firebase for modular agent logic."
        },
        {
            "title": "Webhooks/Integrations",
            "value": "Zapier-like triggers for outbound workflows."
        },
        {
            "title": "Offline Agent Emulation",
            "value": "Local development testbed using Firebase Emulator."
        }
    ],
    "finalNotes": ["You're building a brain that thinks in tasks, a team of digital employees, and a UI for building workforces visually. ",
        "A clean execution with Firebase + Wix could lead this low-code multi-agent space."
    ]
}]
