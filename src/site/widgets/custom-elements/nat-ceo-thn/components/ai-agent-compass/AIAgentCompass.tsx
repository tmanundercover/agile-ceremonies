import React from "react";

const AIAgentCompass = () => {
    return (
        <div className="p-4 max-w-5xl mx-auto text-white">
            <h1 className="text-4xl font-bold mb-4">Agent Profile: HR Agent "Compass"</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* SVG Schematic */}
                <div className="p-4 bg-gray-900 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2">MCP Compass Workflow (SVG)</h2>
                    <div className="overflow-x-auto">
                        <svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg">
                            <rect x="50" y="40" width="200" height="80" rx="10" fill="#A78BFA" />
                            <text x="100" y="90" fontSize="16" fill="white">Nat (CEO/PM)</text>

                            <rect x="320" y="40" width="220" height="80" rx="10" fill="#F472B6" />
                            <text x="350" y="90" fontSize="16" fill="white">Compass (HR Agent)</text>

                            <rect x="650" y="20" width="180" height="60" rx="10" fill="#34D399" />
                            <text x="675" y="55" fontSize="14" fill="white">Scrapes README</text>

                            <rect x="650" y="100" width="180" height="60" rx="10" fill="#60A5FA" />
                            <text x="660" y="135" fontSize="14" fill="white">Check Agent Tools/Inputs</text>

                            <rect x="320" y="160" width="220" height="80" rx="10" fill="#FBBF24" />
                            <text x="350" y="200" fontSize="16" fill="black">Return Workflow Info</text>

                            <line x1="250" y1="80" x2="320" y2="80" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />
                            <line x1="540" y1="80" x2="650" y2="50" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />
                            <line x1="540" y1="80" x2="650" y2="130" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />
                            <line x1="650" y1="80" x2="430" y2="200" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />

                            <defs>
                                <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                                    <path d="M0,0 L0,6 L9,3 z" fill="white" />
                                </marker>
                            </defs>
                        </svg>
                    </div>
                </div>

                {/* Agent Details */}
                <div className="p-4 bg-gray-900 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2">Agent Overview</h2>
                    <ul className="list-disc list-inside text-gray-200">
                        <li><strong>Name:</strong> Compass</li>
                        <li><strong>Role:</strong> HR + Workflow Routing Agent</li>
                        <li><strong>Description:</strong> Determines which agent should receive and process prompts using centralized knowledge + scraping.</li>
                        <li><strong>Input:</strong> User Prompt from Nat</li>
                        <li><strong>Actions:</strong>
                            <ul className="ml-4 list-decimal">
                                <li>Scrapes ai-agent-handbook README</li>
                                <li>Finds matching agent and tools</li>
                                <li>Checks required inputs</li>
                                <li>Replies to Nat with workflow and routing package</li>
                            </ul>
                        </li>
                        <li><strong>Communicates With:</strong> All agents + GitHub (via Firecrawl)</li>
                        <li><strong>Fallback:</strong> If no agent found, asks user for clarification</li>
                        <li><strong>Data Access:</strong> System/User prompts, Tools library, Workflow registry</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AIAgentCompass;
