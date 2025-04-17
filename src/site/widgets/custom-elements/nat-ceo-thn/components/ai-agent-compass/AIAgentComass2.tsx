import React from 'react';

export default function AIAgentComass2() {
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