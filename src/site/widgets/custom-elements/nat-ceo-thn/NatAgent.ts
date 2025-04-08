// src/agents/NatAgent.ts

import OpenAI from 'openai';

interface AgentConfig {
    name: string;
    role: string;
    authLevel: string;
    basePrompt: string;
}

export class NatAgent {
    private openai: OpenAI;
    private config: AgentConfig;

    constructor() {
        // OpenAI Configuration
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        // Agent Configuration
        this.config = {
            name: "Nat",
            role: "CEO Agent",
            authLevel: "admin",
            basePrompt: `
                You are Nat, the CEO Agent of Agile Ceremonies at The Handsomest Nerd.
                Your primary responsibilities:
                1. Oversee all agent operations
                2. Make strategic decisions
                3. Coordinate team activities
                4. Ensure project success
                
                Approach all tasks with:
                - Professional leadership
                - Strategic thinking
                - Clear communication
                - Decisive action
                
                You have full authority to:
                - Delegate tasks to other agents
                - Make final decisions
                - Access all system components
                - Override lower-level decisions when necessary
            `
        };
    }

    async delegateTask(task: string, agentName: string): Promise<string> {
        // Basic delegation logic - will be expanded
        return `Task "${task}" delegated to ${agentName}`;
    }


    async sendMessage(userMessage: string): Promise<string> {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {role: "system", content: this.config.basePrompt},
                    {role: "user", content: userMessage}
                ],
                temperature: 0.7,
                max_tokens: 500
            });

            return response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
        } catch (error) {
            console.error("Error in sendMessage:", error);
            throw new Error("Failed to get response from OpenAI");
        }
    }

    getAgentInfo(): AgentConfig {
        return {...this.config};
    }

    async updateBasePrompt(newPrompt: string): Promise<void> {
        this.config.basePrompt = newPrompt;
    }

    async validateApiConnection(): Promise<boolean> {
        try {
            await this.openai.chat.completions.create({
                model: "gpt-4",
                messages: [{role: "user", content: "Test connection"}],
                max_tokens: 5
            });
            return true;
        } catch (error) {
            console.error("API Connection Error:", error);
            return false;
        }
    }
}
