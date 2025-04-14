# AI Agent Compass - Multi-Agent Communications & Routing Specialist

## 1. HR Agent Name and Role
**Agent Name:** Compass  
**Full Title:** Compass – Multi-Agent Communications & Prompt Routing Specialist  
**Theme:** Think "Alexa meets DevOps PM" with big HR energy.

### Primary Responsibilities:
- Acts as the Message Router for the entire Multi-Agent Network
- Interprets incoming prompts
- Scrapes internal documentation (README, prompt libraries, schemas)
- Determines correct Agent, required tools, prompts, and workflow steps
- Packages and routes message to the correct Agent queue
- Logs unsuccessful routes for training/error analysis
- Maintains access to the central Workflow & Prompt Library
- Returns execution plan to Nat for delivery or approval

## 2. "MCP Compass Workflow" – Centralized Routing Process
**Workflow Name:** MCP_COMPASS_ROUTING_WORKFLOW

### Workflow Steps:

| Step | Action                                                                                                                                          | Agent |
|------|-------------------------------------------------------------------------------------------------------------------------------------------------|-------|
| 1 | Nat receives a new message (via chat UI/API/Webhook)                                                                                            | Nat |
| 2 | Nat sends full message to Compass (HR)                                                                                                          | Compass |
| 3 | Compass analyzes message context, user intent, agent capabilities, tool availability                                                            | Compass |
| 4 | Compass checks agent roles, workflow definitions, prompt mappings, available tools & inputs                                                     | Compass |
| 5 | Compass sends routing Expected output package(Agent name, Required tools, Workflow steps Inputs /parameters) back to Nat | Compass |
| 6 | Nat sends message package to selected Agent via their message queue                                                                             | Nat |
| 7 | If Agent declines or misrouted → bounce back to Compass for reroute and log                                                                     | All Agents |
| 8 | Compass updates error handling/routing intelligence                                                                                             | Compass |

## 3. Centralized Prompt & Workflow Library

### Suggested Structure:

| Collection Name | Description |
|----------------|-------------|
| agents | Agent profiles (name, avatar, role, skills, workflows) |
| workflows | Descriptions of all workflows, steps, required inputs/outputs |
| prompts | System and user prompts categorized by agent and function |
| tools | List of tools per agent and how to trigger them |
| message_logs | All communications, routing attempts, errors |
| feedback_routes | Misrouted message logs used for rerouting logic |

## 4. Best Storage Architecture for Multi-Agent Workflow System

### Recommended Outside-Wix Stack:

#### Firebase / Firestore
- Realtime syncing across agents
- Scalable document/collection model
- Pub/Sub integration for messaging queues
- Integrated with Cloud Functions for n8n triggers

#### Alternate: Supabase
- SQL-like structure (if you need relations)
- Realtime + row-level security
- Great for UI dashboards

#### Messaging Queue Options:
- Firebase Cloud Messaging or Pub/Sub (for cloud-native apps)
- RabbitMQ or Kafka (for more advanced deployments)
- Wix Events only if you're fully embedded within Wix (limited scalability)

## 5. Agent Communication Protocol

| Communication Type | Protocol |
|-------------------|-----------|
| Agent-to-Agent | Publish message to recipient's Queue. If invalid, bounce to Compass. |
| Nat-to-Compass | Direct via API/Webhook (Chat, UI, etc.) |
| Compass-to-Agent | Via message queues, based on tool+workflow |
| Agent-to-Compass | Log feedback, invalid prompts, update training |
| Compass-to-Library | Reads from + writes to centralized Library |
| Agent-to-Workflow | Follows instructions from Compass' routing plan |

## 6. Agent Profile React App (One Page Model)

```jsx
export default function CompassProfile() {
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-8">
      {/* Agent Header */}
      <div className="flex items-center space-x-4">
        <img src="/images/compass-sticker.png" className="w-32 h-32 rounded-2xl shadow-xl" alt="Compass" />
        <div>
          <h1 className="text-4xl font-bold text-indigo-600">Compass</h1>
          <p className="text-gray-600 text-lg">Multi-Agent Routing Specialist (HR)</p>
        </div>
      </div>

      {/* n8n SVG Schematic */}
      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <h2 className="text-2xl font-semibold mb-2">n8n Schematic</h2>
        <div className="overflow-x-scroll">
          <div className="w-[1200px] h-auto">
            {/* Place raw SVG here */}
            <div dangerouslySetInnerHTML={{ __html: `<!-- SVG GOES HERE -->` }} />
          </div>
        </div>
      </div>

      {/* Agent Details */}
      <div className="bg-indigo-50 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">Agent Capabilities</h2>
        <ul className="list-disc list-inside space-y-2 text-indigo-800">
          <li>Interprets and routes incoming prompts intelligently</li>
          <li>Scrapes workflow library to determine best agent/tool</li>
          <li>Interfaces with all agents and their queues</li>
          <li>Self-corrects by rerouting failed prompts</li>
          <li>Updates routing logic based on feedback</li>
        </ul>
      </div>

      {/* Communication Protocol */}
      <div className="bg-white border rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-2">Communication Protocols</h2>
        <p className="text-gray-600">Compass interfaces with:</p>
        <ul className="list-disc list-inside mt-2 text-gray-800">
          <li><strong>Nat</strong> via structured JSON messages</li>
          <li><strong>Agents</strong> via Firebase queues</li>
          <li><strong>Prompt/Workflow Library</strong> via Firestore or Supabase</li>
          <li><strong>GitHub/Firecrawl</strong> for dynamic scraping</li>
        </ul>
      </div>
    </div>
  );
}
```

## 7. Legend for the n8n Schematic (Compass)

| Symbol | Description |
|--------|-------------|
| 🔵 Blue Box | Agent Trigger Node (Webhook/Prompt from Nat) |
| 🟢 Green Box | Firecrawl/GitHub Scraping |
| 🟡 Yellow Box | Library Query (Prompt/Workflow Collection) |
| 🟣 Purple Box | Prompt Package Creation |
| 🟠 Orange Box | Queue Send to Target Agent |
| 🔴 Red Box | Error Handling/Reroute Logging |
