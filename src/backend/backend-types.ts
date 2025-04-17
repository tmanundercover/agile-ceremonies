// Types
export interface OAuth2Client {
    generateAuthUrl: (options: any) => string;
    getToken: (code: string) => Promise<any>;
    setCredentials: (credentials: any) => void;
}

export interface ChannelInfo {
    snippetTitle: string;
    snippetDescription: string;
    thumbnail: any;
    statisticsVideoCount: number;
    customUrl?: string;
    channelId: string;
}

export interface TokenData {
    type: string;
    value: string;
    _id?: string;
}

export interface YouTubeDescriptionResponse {
    title: string;
    description: string;
    tags: string[];
    commaDelimitedTags?: string;
    error?: string;
}