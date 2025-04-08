interface AgentMessage {
    from: string;
    to: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    content: string;
    timestamp: Date;
}