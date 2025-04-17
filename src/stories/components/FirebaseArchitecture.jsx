import React from 'react';
import CollapsibleSection from './CollapsibleSection';
import Tag from './Tag';

const FirebaseArchitecture = () => {
    return (
        <CollapsibleSection title="Firebase Storage Architecture">
            <div className="tech-recommendations">
                <div className="tech-option">
                    <h3>Firebase / Firestore</h3>
                    <ul>
                        <li>Realtime syncing across agents</li>
                        <li>Scalable document/collection model</li>
                        <li>Pub/Sub integration for messaging queues</li>
                        <li>Built-in security rules for agent access control</li>
                        <li>Offline support for disconnected operations</li>
                        <li>Integrated with Cloud Functions for n8n triggers</li>
                    </ul>
                    <div className="tech-tags">
                        <Tag text="Primary Solution"/>
                        <Tag text="Realtime"/>
                        <Tag text="NoSQL"/>
                    </div>
                </div>

                <div className="tech-option">
                    <h3>Firebase Cloud Messaging (FCM)</h3>
                    <ul>
                        <li>Reliable agent-to-agent messaging</li>
                        <li>Push notifications for urgent tasks</li>
                        <li>Cross-platform support</li>
                        <li>Message prioritization</li>
                    </ul>
                    <div className="tech-tags">
                        <Tag text="Messaging"/>
                        <Tag text="Notifications"/>
                    </div>
                </div>

                <div className="tech-option">
                    <h3>Firebase Cloud Functions</h3>
                    <ul>
                        <li>Serverless execution of routing logic</li>
                        <li>Firestore triggers for real-time updates</li>
                        <li>HTTP endpoints for external integrations</li>
                        <li>Scheduled functions for maintenance tasks</li>
                    </ul>
                    <div className="tech-tags">
                        <Tag text="Serverless"/>
                        <Tag text="Integration"/>
                    </div>
                </div>
            </div>

            <h3>Firestore Schema Definitions</h3>
            <table className="data-table">
                <thead>
                <tr>
                    <th>Collection Name</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>agents</td>
                    <td>Agent profiles (name, avatar, role, skills, workflows)</td>
                </tr>
                <tr>
                    <td>workflows</td>
                    <td>Descriptions of all workflows, steps, required inputs/outputs</td>
                </tr>
                <tr>
                    <td>prompts</td>
                    <td>System and user prompts categorized by agent and function</td>
                </tr>
                <tr>
                    <td>tools</td>
                    <td>List of tools per agent and how to trigger them</td>
                </tr>
                <tr>
                    <td>message_logs</td>
                    <td>All communications, routing attempts, errors</td>
                </tr>
                <tr>
                    <td>feedback_routes</td>
                    <td>Misrouted message logs used for rerouting logic</td>
                </tr>
                </tbody>
            </table>
            <div className="schema-container">
                <div className="schema-item">
                    <h4>Collection: agents</h4>
                    <p><strong>Realtime:</strong> Yes – agent status and availability should update in real-time</p>
                    <div className="schema-code">
                        <pre>
                            {`{
  "id": "agent_id_string",
  "name": "Agent Name",
  "avatar": "url_to_avatar_image",
  "role": "Primary role description",
  "status": "available|busy|offline",
  "skills": ["skill1", "skill2", "skill3"],
  "workflows": ["workflow_id_1", "workflow_id_2"],
  "tools": ["tool_id_1", "tool_id_2"],
  "description": "Detailed description of agent capabilities",
  "created_at": timestamp,
  "updated_at": timestamp,
  "metrics": {
    "tasks_completed": number,
    "avg_response_time": number,
    "success_rate": number
  },
  "queue": {
    "current_tasks": number,
    "max_capacity": number
  }
}`}
                        </pre>
                    </div>
                </div>

                <div className="schema-item">
                    <h4>Collection: workflows</h4>
                    <p><strong>Realtime:</strong> No – workflows are more static, batch updates sufficient</p>
                    <div className="schema-code">
                        <pre>
                            {`{
  "id": "workflow_id_string",
  "name": "Workflow Name",
  "description": "Detailed workflow description",
  "owner_agent": "agent_id",
  "collaborator_agents": ["agent_id_1", "agent_id_2"],
  "steps": [
    {
      "step_id": "step_1",
      "name": "Step Name",
      "description": "Step description",
      "agent": "agent_id",
      "required_tools": ["tool_id_1"],
      "inputs": [
        { "name": "input_1", "type": "string", "required": true },
        { "name": "input_2", "type": "number", "required": false }
      ],
      "outputs": [
        { "name": "output_1", "type": "object" }
      ],
      "next_steps": ["step_2", "step_3"],
      "condition": "logical condition for next step selection"
    }
  ],
  "created_at": timestamp,
  "updated_at": timestamp,
  "version": "1.0",
  "tags": ["tag1", "tag2"],
  "average_completion_time": number
}`}
                        </pre>
                    </div>
                </div>

                <div className="schema-item">
                    <h4>Collection: prompts</h4>
                    <p><strong>Realtime:</strong> No – prompt templates change infrequently</p>
                    <div className="schema-code">
                        <pre>
                            {`{
  "id": "prompt_id_string",
  "name": "Prompt Name",
  "description": "What this prompt is used for",
  "category": "system|user|function",
  "agent_id": "agent_id",
  "workflow_id": "workflow_id (optional)",
  "template": "The actual prompt template with {{variable}} placeholders",
  "variables": [
    { "name": "variable", "description": "What this variable represents", "required": true }
  ],
  "examples": [
    {
      "input": { "variable": "example value" },
      "expected_output": "Example of what the output should look like"
    }
  ],
  "created_at": timestamp,
  "updated_at": timestamp,
  "version": "1.0",
  "usage_count": number,
  "success_rate": number
}`}
                        </pre>
                    </div>
                </div>

                <div className="schema-item">
                    <h4>Collection: tools</h4>
                    <p><strong>Realtime:</strong> No – tool configurations change infrequently</p>
                    <div className="schema-code">
                        <pre>
                            {`{
  "id": "tool_id_string",
  "name": "Tool Name",
  "description": "Tool description",
  "type": "api|function|integration|data_source",
  "access_method": "http|function|library",
  "endpoint": "URL or function reference",
  "parameters": [
    { "name": "param1", "type": "string", "required": true, "description": "Parameter description" }
  ],
  "response_format": "json|text|binary",
  "auth_required": boolean,
  "auth_type": "api_key|oauth|basic",
  "available_to": ["agent_id_1", "agent_id_2"],
  "rate_limited": boolean,
  "rate_limit": {
    "requests": number,
    "period": "second|minute|hour"
  },
  "created_at": timestamp,
  "updated_at": timestamp
}`}
                        </pre>
                    </div>
                </div>

                <div className="schema-item">
                    <h4>Collection: message_logs</h4>
                    <p><strong>Realtime:</strong> Yes – messages should appear immediately for monitoring</p>
                    <div className="schema-code">
                        <pre>
                            {`{
  "id": "message_id_string",
  "conversation_id": "conversation_id",
  "timestamp": timestamp,
  "sender": {
    "type": "agent|user|system",
    "id": "agent_id or user_id"
  },
  "recipient": {
    "type": "agent|user|system",
    "id": "agent_id or user_id"
  },
  "content": {
    "text": "Message content",
    "attachments": [
      { "type": "image|file", "url": "attachment_url" }
    ]
  },
  "metadata": {
    "workflow_id": "workflow_id (if applicable)",
    "step_id": "step_id (if applicable)",
    "prompt_id": "prompt_id (if applicable)",
    "tool_calls": [
      { "tool_id": "tool_id", "parameters": {}, "result": {} }
    ]
  },
  "routing": {
    "original_recipient": "agent_id",
    "rerouted": boolean,
    "reroute_reason": "reason (if rerouted)"
  },
  "performance": {
    "processing_time_ms": number,
    "tokens_used": number
  }
}`}
                        </pre>
                    </div>
                </div>

                <div className="schema-item">
                    <h4>Collection: feedback_routes</h4>
                    <p><strong>Realtime:</strong> Yes – routing failures need immediate attention</p>
                    <div className="schema-code">
                        <pre>
                            {`{
  "id": "feedback_id_string",
  "message_id": "original_message_id",
  "timestamp": timestamp,
  "original_route": {
    "from": "agent_id or user_id",
    "to": "agent_id",
    "intent": "detected_intent"
  },
  "failure_reason": "capability_mismatch|agent_unavailable|context_incomplete|other",
  "failure_details": "Detailed explanation of why routing failed",
  "suggested_route": {
    "agent_id": "better_agent_id",
    "confidence": number,
    "reasoning": "Why this agent would be better"
  },
  "resolution": {
    "status": "pending|resolved|ignored",
    "resolved_by": "agent_id or user_id",
    "resolution_time": timestamp,
    "resolution_notes": "Notes on how this was resolved"
  },
  "learning": {
    "keywords": ["keyword1", "keyword2"],
    "patterns": ["pattern1", "pattern2"],
    "improvements": "Suggestions for routing improvements"
  }
}`}
                        </pre>
                    </div>
                </div>
            </div>

            <h3>Firebase Implementation Recommendations</h3>

            <ul>
                <li><strong>Security Rules:</strong> Implement granular security rules to control which agents can access
                    specific collections and documents
                </li>
                <li><strong>Composite Indexes:</strong> Create indexes for common queries, such as finding prompts by agent
                    and category
                </li>
                <li><strong>Cache Configuration:</strong> Enable offline persistence for essential collections like agents
                    and workflows
                </li>
                <li><strong>Database Triggers:</strong> Use Cloud Functions to trigger actions when specific documents
                    change
                </li>
                <li><strong>Batched Writes:</strong> Use batched writes for related updates to maintain data consistency
                </li>
                <li><strong>Collection Group Queries:</strong> Consider subcollections for message threads and use
                    collection group queries
                </li>
            </ul>
        </CollapsibleSection>
    );
};

export default FirebaseArchitecture;
