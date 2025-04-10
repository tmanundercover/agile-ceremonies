# Project Management API Spike

This document evaluates three project management APIs and assesses whether GitHub Issues meets the requirements.

## API Comparison

### 1. Clickup AI
- Provides an AI‐driven task and project management API
- May offer automation benefits but its free tier could be limited
- Integration might require extra work to bridge with the app's flow

### 2. GitHub Issues
- Integrated directly with GitHub and free
- Supports tasks tracking, issue creation, labeling, and notifications via GitHub's REST or GraphQL API
- Well suited for developers and fits seamlessly into the development workflow
- Adequate if the team prefers simple task management with effective traceability

### 3. Trello API
- Offers a free tier with robust API for project boards, lists, and cards
- Provides a visual task flow that some teams prefer
- Easy to integrate but may not be as code-centric as GitHub Issues

## Recommendation

Given the criteria—free services, ease of integration, and developer familiarity—GitHub Issues is quite adequate. Since you already started some work with GitHub issues and it's part of the GitHub workflow, it offers a low-overhead solution for managing both administrative tasks (for Nat and Brian) and AI tasking.

## Implementation Example

Below is a simple TypeScript example using GitHub Issues via GitHub's REST API with axios:

```typescript
import axios from 'axios';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'the-repo-owner';
const REPO_NAME = 'the-repo-name';

async function createIssue(title: string, body: string) {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`;
    try {
        const response = await axios.post(
        url,
        {
            title,
            body
        },
        {
            "headers": {
                Authorization: `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
                }
            }
        );
    
        console.log('Issue created:', response.data.html_url);
    } catch (error) {
        console.error('Error creating issue:', error);
    }
}

createIssue('New Task for AI Workflow', 'Details about the task assigned to AI agents.');
```

## Summary

GitHub Issues is adequate for a development-focused project management approach, while Clickup AI and Trello offer alternative workflows if additional features or different UI perspectives are needed.
