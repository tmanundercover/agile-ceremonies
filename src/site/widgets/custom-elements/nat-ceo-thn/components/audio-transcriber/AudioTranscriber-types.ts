declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

export interface AudioTranscriberProps {
    className?: string;
}

export interface AudioStateType {
    audioFile: File | null;
    transcription: string;
    summary: string;
    isLoading: boolean;
    isListening: boolean;
    permissionStatus: 'granted' | 'unsupported';
}
