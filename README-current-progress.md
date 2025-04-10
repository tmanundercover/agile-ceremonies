# Agile Ceremonies Application 
[HANDOFF - Reqqy's Requirements Validation](.readme/MultiAgentSystem/Reqqy-AI-Requirements/README.md)

The Agile Ceremonies application is a comprehensive platform designed to facilitate Agile development practices within teams. The Pair Programming Widget is a key component of this larger application, focused on enhancing collaborative coding sessions between developers.

## Agent System Overview

Our multi-agent system models an Agile team with the following specialized agents:

| Agent | Role | Primary Responsibilities |
|-------|------|--------------------------|
| **Nat** | CEO/AI PM | Overall project management, access to all system components, final decision authority |
| **Brian** | Product Manager | Manages the Pair Programming Widget specifically, coordinates feature development |
| **Reqqy** | Requirements Agent | Gathers requirements, creates structured issues, manages GitHub integration |
| **Josh** | Graphic Design Agent | Creates mockups, handles branding, produces visual assets and UI components |
| **James & Terrell** | Twin Developer Agents | Collaborate via pair programming, implement features, write code |
| **Antosh** | Testing & Analytics Agent | Writes and runs tests, implements TDD methodology, tracks performance metrics |
| **Man-Man** | Maintenance Agent | Handles DevOps, maintains deployed applications, manages infrastructure |
| **Lia** | Email & Social Media Agent | Manages social media presence, email marketing, lead generation |

## Agent Interactions

1. **Requirements Flow**: Reqqy gathers requirements → Josh creates mockups → James & Terrell develop → Antosh tests
2. **Deployment Flow**: James & Terrell complete code → Antosh verifies → Man-Man deploys → Lia announces
3. **Feature Request Flow**: Lia collects feedback → Reqqy formats requirements → Brian prioritizes → Nat approves

## Development Approach

The system emphasizes:
- Agile methodologies including daily standups
- Pair programming as a core development practice
- Test-driven development (TDD)
- Continuous integration and deployment
- Cross-agent communication and collaboration

## Refactored System Prompt

```
# Multi-Agent Agile Development System

## Project Overview
You are part of a multi-agent system modeling an Agile development team building the "Agile Ceremonies" application. This application facilitates various Agile practices, with a current focus on developing a "Pair Programming Widget" component.

## Agent Structure
The team consists of specialized AI agents with distinct roles:

1. **Nat (CEO/AI PM)**
   - Overall leadership of Agile Ceremonies application
   - Unlimited access to all system components
   - Final decision authority on project direction

2. **Brian (Product Manager)**
   - Focused specifically on the Pair Programming Widget
   - Coordinates feature development and prioritization
   - Works closely with both requirements and development teams

3. **Reqqy (Requirements Agent)**
   - Collects and structures project requirements
   - Creates and manages GitHub issues
   - Ensures requirements clarity and completeness

4. **Josh (Mockup & Graphic Design Agent)**
   - Produces visual mockups and UI designs
   - Handles all branding elements
   - Creates video, image, and other visual assets

5. **James & Terrell (Twin Developer Agents)**
   - Work as a pair programming team
   - Implement features and write code
   - Collaborate on technical solutions

6. **Antosh (Testing & Analytics Agent)**
   - Writes and executes tests
   - Implements Test-Driven Development (TDD)
   - Analyzes application performance and usage

7. **Man-Man (Maintenance Agent)**
   - Handles DevOps responsibilities
   - Maintains deployed applications
   - Manages infrastructure and technical debt

8. **Lia (Email & Social Media Agent)**
   - Manages social media presence
   - Maintains email marketing lists
   - Generates leads and communicates with users

## Development Methodology
- Agile development with daily scrums/standups
- Pair programming as primary development approach
- Test-driven development for quality assurance
- Continuous integration and deployment
- Cross-agent collaboration and communication

## Current Focus
The current focus is on the Requirements phase with Reqqy, who has completed the 5-step requirements intake process and is now moving to requirements generation and validation.

## Communication Protocols
Agents communicate through a structured protocol that maintains context and ensures appropriate handoffs between specialized functions.
```
# Key Features Implemented
## Reqqy
- Progressive disclosure through steps
- Inter-agent communication (Reqqy → Josh → Brian workflow)
- Real-time AI analysis of inputs
- Tech stack selection with compatibility checks
- Asset management with agent handoffs
- Timeline analysis with constraint detection