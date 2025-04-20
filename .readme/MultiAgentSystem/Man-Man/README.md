# AI Agent Man Man
# Overall DB
## 🔧 users (collection)
```json
{
  "email": "user@example.com",
  "name": "Dev Admin",
  "role": "admin", 
  "lastLogin": "2025-04-13T23:00:00Z"
}
```

## Firestore collection structure for the AI Agent Compass:
1. **agent_profiles** - Store metadata about each agent
   
   /agent_profiles/{agent_id}
   ```
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
   
   /prompt_logs/{prompt_id}
   ```
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
   /workflow_library/{n8n_id}
```json
{
  "id": "internal-id",
  "name": "Publish Instagram Post",
  "n8nId": "abc123xyz",
  "description": "Trigger IG post automation",
  "steps": ["Step1", "Step2", "Step3"],
  "status": "active",
  "lastRun": "2025-04-13T23:00:00Z",
  "created_at": "2025-03-13T23:00:00Z",
  "ownerId": "userDocId"
}
```

4. **workflow_logs** - Subcollection under workflows
   /workflows/{workflowId}/workflow_logs
```json
{
  "triggeredBy": "userDocId",
  "status": "success",
  "inputData": { "text": "Post this!" },
  "outputData": { "result": "OK" },
  "error": null,
  "timestamp": "2025-04-13T23:00:00Z"
}
```
5. **triggers** - These are the triggers to the workflow(collection)
```json
{
  "workflowId": "workflowDocId",
  "type": "interval",
  "interval": 30,
  "lastTriggeredAt": "2025-04-13T23:00:00Z",
  "active": true
}
```

# RTDB (Realtime Database) paths (RTDB is a giant JSON tree):
```
/agentQueue/{agentId}/incoming/
/compassQueue/outgoing/
```

Start with these collections/paths, and you can expand them as you develop the Agent Compass communication framework.


# 🔐 Firebase Security Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }

    match /workflows/{workflowId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }

    match /workflows/{workflowId}/workflow_logs/{logId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
  }
}
```

# 🧠 Real-Time Listener React Hook

Create a useRealtimeWorkflows hook using onSnapshot:
```
// hooks/useRealtimeWorkflows.ts
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export const useRealtimeWorkflows = () => {
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'workflows'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorkflows(items);
    });
    return () => unsub();
  }, []);

  return workflows;
};
```
# 🔌 mcp.api.js (Firebase Admin SDK)
server-side API handler that authenticates, reads/writes workflows, and interacts with Firestore securely.

```ts
// mcp.api.ts
import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';

// Initialize admin SDK only once
if (!admin.apps.length) {
   admin.initializeApp();
}

const db = admin.firestore();

// Example MCP API handler for workflows
export const handleMcpRequest = onRequest(async (req, res) => {
   try {
      const { method, body, query } = req;

      switch (method) {
         case 'POST':
            const { action } = body;

            if (!action) {
               return res.status(400).send({ error: 'Missing action in request body' });
            }

            switch (action) {
               case 'create':
                  return createWorkflow(body.data, res);
               case 'trigger':
                  return post_triggerWorkflow(body, res);
               default:
                  return res.status(400).send({ error: 'Invalid action specified' });
            }

         case 'GET':
            return getWorkflow(query.id, res);
         case 'PUT':
            return updateWorkflow(query.id, body, res);
         case 'DELETE':
            return deleteWorkflow(query.id, res);
         default:
            return res.status(405).send({ error: 'Method Not Allowed' });
      }
   } catch (err) {
      console.error('MCP API error:', err);
      return res.status(500).send({ error: 'Internal Server Error' });
   }
});

// Backend Secure Trigger API - If you want to securely proxy n8n trigger calls (so users can’t hit n8n directly)
export async function  triggerWorkflow(request, res) {
   const { workflowId, inputData } = request;

   // Fetch the n8n ID and validate
   const workflow = await getWorkflow(workflowId);
   if (!workflow) return res.status(400).send({ error: 'Workflow not found' });

   const n8nRes = await fetch(`https://your-n8n-instance.com/webhook/${workflow.n8nId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer YOUR_N8N_TOKEN' },
      body: JSON.stringify(inputData)
   });

   const output = await n8nRes.json();

   // Save log to Firestore
   await saveWorkflowLog(workflowId, {
      inputData,
      outputData: output,
      status: n8nRes.ok ? 'success' : 'error',
      error: n8nRes.ok ? null : output.error,
      timestamp: new Date().toISOString()
   });

   return res.status(200).send(output);
}

// Helper: Create a new workflow
async function createWorkflow(data, res) {
   const docRef = await db.collection('workflows').add(data);
   return res.status(201).send({ id: docRef.id, message: 'Workflow created' });
}

// Helper: Get a workflow
async function getWorkflow(id, res) {
   if (!id) return res.status(400).send({ error: 'Missing workflow ID' });
   const doc = await db.collection('workflows').doc(id).get();
   if (!doc.exists) return res.status(404).send({ error: 'Workflow not found' });
   return res.send({ id: doc.id, ...doc.data() });
}

// Helper: Update a workflow
async function updateWorkflow(id, data, res) {
   if (!id) return res.status(400).send({ error: 'Missing workflow ID' });
   await db.collection('workflows').doc(id).update(data);
   return res.send({ message: 'Workflow updated' });
}

// Helper: Delete a workflow
async function deleteWorkflow(id, res) {
   if (!id) return res.status(400).send({ error: 'Missing workflow ID' });
   await db.collection('workflows').doc(id).delete();
   return res.send({ message: 'Workflow deleted' });
}

// Helper: Save workflow log
async function saveWorkflowLog(workflowId, logData) {
   const logRef = db.collection('workflows').doc(workflowId).collection('workflow_logs').doc();
   await logRef.set(logData);
}
```

We’d use Firebase Admin SDK server-side to write to Firestore if needed.

# Real time Database initialization - intialize agent queue including compass queue

```ts
import {getDatabase, ref, set} from "firebase/database";

// Initialize RTDB
const db = getDatabase();

const initializeAgents = () => {

    // The agents
    const agents = [
        {id: "nat", name: "AI_AGENT_NAT"},
        {id: "brian", name: "AI_AGENT_BRIAN"},
        {id: "compass", name: "AI_AGENT_COMPASS"},
        {id: "man-man", name: "AI_AGENT_MAN_MAN"},
        {id: "antosh", name: "AI_AGENT_ANTOSH"},
        {id: "josh", name: "AI_AGENT_JOSH"},
        {id: "lia", name: "AI_AGENT_LIA"}
    ];

    // Create the compass outgoing queue
    const compassOutgoingRef = ref(db, `/compassQueue/outgoing/initial`);
    set(compassOutgoingRef, {
        timestamp: Date.now(),
        message: "Compass outgoing queue initialized",
        status: "ready"
    });

    // Create a path for each agent
    for (agent in agents) {
        // Create a path for each agent
        const agentId = agent.id; // Example agent ID
        const agentRef = ref(db, `/agentQueue/${agentId}/incoming/initial`);

        // Create initial structure with a timestamp
        set(agentRef, {
            timestamp: Date.now(),
            message: `AI Agent ${agent.name} incoming queue initialized`,
            status: "ready"
        });
    }
}
```

# 🧪 Sample Widget using Real-Time Firestore
```tsx
// widgets/McpWidget.tsx
import { useRealtimeWorkflows } from '@/hooks/useRealtimeWorkflows';

export default function McpWidget() {
  const workflows = useRealtimeWorkflows();

  const handleTrigger = async (workflowId: string) => {
    const res = await fetch('/_api/mcp/triggerWorkflow', {
      method: 'POST',
      body: JSON.stringify({ workflowId, inputData: { example: true } }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    alert(`Triggered: ${JSON.stringify(data)}`);
  };

  return (
    <div className="space-y-4">
      {workflows.map(wf => (
        <div key={wf.id} className="p-4 border rounded shadow">
          <h2 className="text-xl font-bold">{wf.name}</h2>
          <p>Status: {wf.status}</p>
          <button
            onClick={() => handleTrigger(wf.id)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Trigger Workflow
          </button>
        </div>
      ))}
    </div>
  );
}
```

