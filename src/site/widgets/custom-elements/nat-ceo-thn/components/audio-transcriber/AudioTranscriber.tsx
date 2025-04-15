import React, { useEffect, useRef, useState } from 'react';
import CopyButton from '../../../svg-divider/components/CopyButton';
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
    StatusIndicatorStyled,
    ErrorMessageStyled,
} from './AudioTranscriber-styled-components';
import { AudioStateType, AudioTranscriberProps } from './AudioTranscriber-types';
import { createAudioUrl, generateSummary } from './AudioTranscriber-utils';

const AudioTranscriber: React.FC<AudioTranscriberProps> = ({ className }) => {
    const [state, setState] = useState<AudioStateType>({
        audioFile: null,
        transcription: 'Waiting for audio input...',
        summary: 'Waiting for audio transcript...',
        isLoading: false,
        isListening: false,
        permissionStatus: 'granted' // Default to granted since we're skipping the check
    });
    const [error, setError] = useState<string>('');
    const audioRef = useRef<HTMLAudioElement>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        // Check if Web Speech API is supported
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            setError('Speech recognition is not supported in your browser.');
            return;
        }

        // Initialize speech recognition
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0])
                .map((result: any) => result.transcript)
                .join('');
            setState(prev => ({ ...prev, transcription: transcript }));
        };

        recognitionRef.current.onerror = (event: any) => {
            setState(prev => ({ ...prev, transcription: event.message.toString() }));
            // setError('An error occurred with speech recognition');
            // setState(prev => ({ ...prev, isListening: false }));
        };

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

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

    const handleStartListening = async () => {
        try {
            setState(prev => ({ ...prev, isListening: true }));
            setError('');
            await recognitionRef.current.start();
        } catch (err: any) {
            setError(err.message || 'Failed to start recording');
            setState(prev => ({ ...prev, isListening: false }));
        }
    };

    const handleStopListening = () => {
        recognitionRef.current?.stop();
        setState(prev => ({ ...prev, isListening: false }));
    };

    const handleGenerateSummary = async () => {
        if (!state.transcription) return;

        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const summary = await generateSummary(state.transcription);
            setState(prev => ({ ...prev, summary }));
        } catch (err) {
            setError('Failed to generate summary');
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

                <StatusIndicatorStyled $isListening={state.isListening}>
                    {state.isListening ? 'Listening...' : 'Not listening'}
                </StatusIndicatorStyled>

                <ButtonGroupStyled>
                    <ActionButtonStyled
                        onClick={state.isListening ? handleStopListening : handleStartListening}
                        disabled={state.permissionStatus === 'unsupported'}
                    >
                        {state.isListening ? 'Stop Recording' : 'Start Recording'}
                    </ActionButtonStyled>
                    <ActionButtonStyled
                        onClick={handleGenerateSummary}
                        disabled={!state.transcription || state.isLoading}
                    >
                        {state.isLoading ? 'Generating...' : 'Generate Summary'}
                    </ActionButtonStyled>
                </ButtonGroupStyled>

                {error && <ErrorMessageStyled>{error}</ErrorMessageStyled>}

                <ResultsSectionStyled>
                    <ResultBoxStyled>
                        <HeadingStyled>Transcription</HeadingStyled>
                        {state.transcription && (<CopyButton content={state.transcription} label={"Transcription"}/>) }
                        {state.transcription}
                    </ResultBoxStyled>
                    <ResultBoxStyled>
                        <HeadingStyled>Summary</HeadingStyled>
                        {state.summary && <CopyButton content={state.summary} label={"Summary"}/>}
                        {state.summary}
                    </ResultBoxStyled>
                </ResultsSectionStyled>
            </AppMainStyled>
        </AppContainerStyled>
    );
};

export default AudioTranscriber;
