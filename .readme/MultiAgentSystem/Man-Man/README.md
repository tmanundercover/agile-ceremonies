# AI Agent Man Man
# Overall DB
## 🔧 users (collection)
```json
{
  "email": "user@example.com",
  "name": "Dev Admin",
  "role": "admin", // "editor", "viewer"
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
  "id": "internal-id"
  "name": "Publish Instagram Post",
  "n8nId": "abc123xyz",
  "description": "Trigger IG post automation",
  "steps": ["Step1", "Step2", "Step3],
  "status": "active", // paused, error
  "lastRun": "2025-04-13T23:00:00Z",
  "created_at": "2025-03-13T23:00:00Z"
  "ownerId": "userDocId"
}```

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
}```
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


🔐 Firebase Security Rules
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

3. 🧠 Real-Time Listener React Hook

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

4. 🔌 mcp.api.js (Firebase Admin SDK)
server-side API handler that authenticates, reads/writes workflows, and interacts with Firestore securely.

```ts
// mcp.api.js
import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import { ok, badRequest } from 'wix-http-functions';

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
        return createWorkflow(body, res);
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
export async function post_triggerWorkflow(request) {
  const { workflowId, inputData } = await request.body.json();

  // Fetch the n8n ID and validate
  const workflow = await getWorkflowFromFirestore(workflowId);
  if (!workflow) return badRequest({ error: 'Workflow not found' });

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
```

We’d use Firebase Admin SDK server-side to write to Firestore if needed.

5. 🧪 Sample Widget using Real-Time Firestore
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

