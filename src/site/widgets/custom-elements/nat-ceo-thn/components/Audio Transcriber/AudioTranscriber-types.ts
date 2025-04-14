export interface AudioTranscriberProps {
    className?: string;
}

export interface AudioStateType {
    audioFile: File | null;
    transcription: string;
    summary: string;
    isLoading: boolean;
    isListening: boolean;
}

export interface TranscriptionResultType {
    text: string;
    confidence: number;
}
