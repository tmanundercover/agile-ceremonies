import axios from 'axios';

export const createAudioUrl = (file: File): string => {
    return URL.createObjectURL(file);
};

export const generateSummary = async (text: string): Promise<string> => {
    try {
        // Replace with your actual API endpoint
        const response = await axios.post('/api/summarize', { text });
        return response.data.summary;
    } catch (error) {
        console.error('Summary generation failed:', error);
        throw new Error('Failed to generate summary');
    }
};
