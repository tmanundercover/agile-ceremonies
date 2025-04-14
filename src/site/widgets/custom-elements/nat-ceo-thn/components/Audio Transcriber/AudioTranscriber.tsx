import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
    ActionButtonStyled,
    AppContainerStyled,
    AppHeaderStyled,
    AppMainStyled,
    AudioPlayerStyled,
    ButtonGroupStyled,
    FileInputStyled,
    UploadSectionStyled,
    ResultsSectionStyled,
    ResultBoxStyled,
    HeadingStyled,
    StatusIndicatorStyled
} from './AudioTranscriber-styled-components';
import { AudioStateType, AudioTranscriberProps } from './AudioTranscriber-types';
import { createAudioUrl, generateSummary } from './AudioTranscriber-utils';

const AudioTranscriber: React.FC<AudioTranscriberProps> = ({ className }) => {
    const [state, setState] = useState<AudioStateType>({
        audioFile: null,
        transcription: '',
        summary: '',
        isLoading: false,
        isListening: false
    });
    const [error, setError] = useState<string>('');
    const audioRef = useRef<HTMLAudioElement>(null);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            setError('Speech recognition is not supported in this browser.');
        }
    }, [browserSupportsSpeechRecognition]);

    useEffect(() => {
        if (transcript) {
            setState(prev => ({ ...prev, transcription: transcript }));
        }
    }, [transcript]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && audioRef.current) {
            setState(prev => ({
                ...prev,
                audioFile: file,
                transcription: '',
                summary: ''
            }));
            audioRef.current.src = createAudioUrl(file);
        }
    };

    const handleStartListening = () => {
        resetTranscript();
        setState(prev => ({ ...prev, isListening: true }));
        SpeechRecognition.startListening({ continuous: true });
    };

    const handleStopListening = () => {
        setState(prev => ({ ...prev, isListening: false }));
        SpeechRecognition.stopListening();
    };

    const handleGenerateSummary = async () => {
        if (!state.transcription) return;

        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const summary = await generateSummary(state.transcription);
            setState(prev => ({ ...prev, summary }));
        } catch (error) {
            setError('Failed to generate summary');
            console.error('Summarization error:', error);
        } finally {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    return (
        <AppContainerStyled className={className}>
            <AppHeaderStyled>
                <h1>Audio Transcription & Summary</h1>
            </AppHeaderStyled>

            <AppMainStyled>
                <UploadSectionStyled>
                    <FileInputStyled
                        type="file"
                        accept="audio/*"
                        onChange={handleFileUpload}
                    />
                    <AudioPlayerStyled ref={audioRef} controls />
                </UploadSectionStyled>

                <StatusIndicatorStyled $isListening={listening}>
                    {listening ? 'Listening...' : 'Not listening'}
                </StatusIndicatorStyled>

                <ButtonGroupStyled>
                    <ActionButtonStyled
                        onClick={listening ? handleStopListening : handleStartListening}
                        disabled={!browserSupportsSpeechRecognition}
                    >
                        {listening ? 'Stop Recording' : 'Start Recording'}
                    </ActionButtonStyled>
                    <ActionButtonStyled
                        onClick={handleGenerateSummary}
                        disabled={!state.transcription || state.isLoading}
                    >
                        {state.isLoading ? 'Generating...' : 'Generate Summary'}
                    </ActionButtonStyled>
                </ButtonGroupStyled>

                {error && (
                    <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>
                )}

                <ResultsSectionStyled>
                    <ResultBoxStyled>
                        <HeadingStyled>Transcription</HeadingStyled>
                        {state.transcription || 'No transcription available'}
                    </ResultBoxStyled>
                    <ResultBoxStyled>
                        <HeadingStyled>Summary</HeadingStyled>
                        {state.summary || 'No summary available'}
                    </ResultBoxStyled>
                </ResultsSectionStyled>
            </AppMainStyled>
        </AppContainerStyled>
    );
};

export default AudioTranscriber;

