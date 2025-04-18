# AI Agent Man Man
# Overall DB
🔧 users (collection)
{
  "email": "user@example.com",
  "name": "Dev Admin",
  "role": "admin", // "editor", "viewer"
  "lastLogin": "2025-04-13T23:00:00Z"
}
📜 workflows (collection)
{
  "name": "Publish Instagram Post",
  "n8nId": "abc123xyz",
  "description": "Trigger IG post automation",
  "status": "active", // paused, error
  "lastRun": "2025-04-13T23:00:00Z",
  "ownerId": "userDocId"
}

📂 workflow_logs (subcollection under workflows/{workflowId}/workflow_logs)
{
  "triggeredBy": "userDocId",
  "status": "success",
  "inputData": { "text": "Post this!" },
  "outputData": { "result": "OK" },
  "error": null,
  "timestamp": "2025-04-13T23:00:00Z"
}

(Optional) ⏱️ triggers (collection)
{
  "workflowId": "workflowDocId",
  "type": "interval",
  "interval": 30,
  "lastTriggeredAt": "2025-04-13T23:00:00Z",
  "active": true
}

#Firestore collection structure for the AI Agent Compass:
1. **agent_profiles** - Store metadata about each agent
   ```
   /agent_profiles/{agent_id}
   {
     id: string,
     name: string,
     role: string,
     capabilities: string[],
     description: string,
     domains: string[], // for routing/matching
     status: string // "active", "inactive", etc.
   }
   ```

2. **prompt_logs** - Track all prompts processed by the system
   ```
   /prompt_logs/{prompt_id}
   {
     id: string,
     prompt: string,
     timestamp: timestamp,
     sender: string,
     detectedAgent: string,
     confidence: number,
     status: string, // "routed", "processing", "completed"
     source: string
   }
   ```

3. **workflow_library** - Store reusable workflows
   ```
   /workflow_library/{workflow_id}
   {
     id: string,
     name: string,
     description: string,
     steps: array,
     createdAt: timestamp,
     updatedAt: timestamp
   }
   ```

# RTDB (Realtime Database) paths (RTDB is a giant JSON tree):
```
/agentQueue/{agentId}/incoming/
/compassQueue/outgoing/
```

Start with these collections/paths, and you can expand them as you develop the Agent Compass communication framework.