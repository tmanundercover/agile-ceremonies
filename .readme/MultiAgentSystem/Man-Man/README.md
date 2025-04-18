# AI Agent Man Man

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