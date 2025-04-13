import React, {useEffect, useState} from 'react';
import {LandingPageData, StyleGuide} from './landing-page-builder-types';
import {
    defaultStyleGuide,
    formatConfig,
    generateMockLandingPage,
    getPreviewDimensions
} from './landing-page-builder-utils';
import {callOpenAI, convertFormDataToApiRequest, OpenAIApiRequest} from './OpenAIBackendAPI';
import {
    ButtonStyled,
    ContainerStyled,
    FormContainerStyled,
    FormLabelStyled,
    FormSectionStyled,
    FormStyled,
    InputGroupStyled,
    InputStyled,
    LabelStyled,
    OpenAIIconWrapperStyled,
    OverlayControlsStyled,
    PreviewContainerStyled,
    PreviewControlsStyled,
    PreviewOverlayStyled,
    PreviewSectionStyled,
    PreviewTitleStyled,
    StyledOpenAIIconStyled,
    TextAreaStyled,
    ToggleButtonStyled,
    FormFieldWrapperStyled,
    CopyButtonStyled,
    RequestFieldStyled,
    RequestConfigFieldStyled,
} from './landing-page-builder-styled-components';
import {StyleGuideModal} from './components/StyleGuideModal';
import {VoteDesign, VoteType} from "./components/VoteDesign";
import {StatusIndicator} from './components/StatusIndicator';
import { ChevronLeftIcon, ChevronRightIcon, ClipboardCopyIcon } from '@radix-ui/react-icons';
import { FileSelector } from './components/FileSelector';

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .catch(err => console.error('Failed to copy text:', err));
};

export const LandingPageBuilder: React.FC = () => {
    const [formData, setFormData] = useState<LandingPageData>({
        mainText: 'Join our team of AI experts and shape the future of technology',
        keywords: ['AI', 'Machine Learning', 'Remote Work', 'Technical Consulting'],
        callsToAction: ['Apply Now', 'Learn More'],
        svgGraphic: '', // Will be populated when file is uploaded
        styleGuide: defaultStyleGuide
    });

    const [styleGuideOpen, setStyleGuideOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentRequest, setCurrentRequest] = useState<OpenAIApiRequest | null>(null);
    const [promptViewerStatus, setPromptViewerStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [showMockPreview, setShowMockPreview] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<string | null>(null);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const previewContainer = document.getElementById('prompt-preview');

        if (loading && !generatedContent) {
            setShowMockPreview(true);
            if (previewContainer) {
                const dimensions = getPreviewDimensions();
                previewContainer.innerHTML = generateMockLandingPage(dimensions, formData.styleGuide);
            }
        } else if (generatedContent && previewContainer) {
            setShowMockPreview(false);
            previewContainer.innerHTML = generatedContent;
        }

        return () => {
            if (previewContainer) {
                previewContainer.innerHTML = '';
            }
        };
    }, [loading, formData.styleGuide, generatedContent]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setPromptViewerStatus('loading');
        setGeneratedContent(null);
        setShowMockPreview(true);

        const request = convertFormDataToApiRequest(formData);
        setCurrentRequest(request);

        try {
            const content = await callOpenAI(formData, defaultStyleGuide);
            setGeneratedContent(content);
            setPromptViewerStatus('success');
            setError('Generation completed successfully!');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            setPromptViewerStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const handleStyleGuideUpdate = (newStyleGuide: StyleGuide) => {
        setFormData({
            ...formData,
            styleGuide: newStyleGuide
        });
    };

    const handleVote = (vote: VoteType) => {
        console.log('User voted:', vote);

        switch (vote) {
            case 'up':
                setPromptViewerStatus('success');
                break;
            case 'down':
                setPromptViewerStatus('error');
                break;
            default:
                setPromptViewerStatus('loading');
        }
    };

    return (
        <>
            <ContainerStyled>
                <ToggleButtonStyled
                    onClick={() => setIsHidden(!isHidden)}
                    $isHidden={isHidden}
                    aria-label={isHidden ? "Show builder" : "Hide builder"}
                >
                    {isHidden ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </ToggleButtonStyled>

                <FormStyled onSubmit={handleSubmit} $isHidden={isHidden}>
                    <h2>Landing Page Builder</h2>
                    <InputGroupStyled>
                        <LabelStyled htmlFor="mainMessage">Main Message</LabelStyled>
                        <TextAreaStyled
                            id="mainMessage"
                            value={formData.mainText}
                            onChange={(e) => setFormData({...formData, mainText: e.target.value})}
                        />
                    </InputGroupStyled>

                    <InputGroupStyled>
                        <LabelStyled htmlFor="keywords">Keywords (comma-separated)</LabelStyled>
                        <InputStyled
                            id="keywords"
                            type="text"
                            value={formData.keywords.join(', ')}
                            onChange={(e) => setFormData({
                                ...formData,
                                keywords: e.target.value.split(',').map(k => k.trim())
                            })}
                        />
                    </InputGroupStyled>

                    <InputGroupStyled>
                        <LabelStyled htmlFor="callsToAction">Calls to Action (comma-separated)</LabelStyled>
                        <InputStyled
                            id="callsToAction"
                            type="text"
                            value={formData.callsToAction.join(', ')}
                            onChange={(e) => setFormData({
                                ...formData,
                                callsToAction: e.target.value.split(',').map(cta => cta.trim())
                            })}
                        />
                    </InputGroupStyled>

                    <InputGroupStyled>
                        <LabelStyled htmlFor="svgUpload">Upload SVG Graphic</LabelStyled>
                        <FileSelector
                            onFileSelected={(file) => {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                    setFormData({
                                        ...formData,
                                        svgGraphic: event.target?.result as string
                                    });
                                };
                                reader.readAsText(file);
                            }}
                            accept=".svg"
                            data-testid="svg-upload"
                        />
                    </InputGroupStyled>

                    <ButtonStyled type="button" onClick={() => setStyleGuideOpen(true)}>
                        Edit Style Guide
                    </ButtonStyled>

                    <ButtonStyled type="submit" disabled={loading}>
                        {loading ? (
                            <OpenAIIconWrapperStyled>
                                <StyledOpenAIIconStyled
                                    fill="#ffffff"
                                    viewBox="0 0 24 24"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    transform="rotate(-45)"
                                >
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <title>OpenAI icon</title>
                                        <path
                                            d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"></path>
                                    </g>
                                </StyledOpenAIIconStyled>
                            </OpenAIIconWrapperStyled>
                        ) : 'Generate Preview'}
                    </ButtonStyled>
                </FormStyled>

                <PreviewSectionStyled $isHidden={isHidden}>
                    <PreviewTitleStyled>
                        {loading ? 'Generating Preview...' : 'Landing Page Preview'}
                    </PreviewTitleStyled>
                    {error && (
                        <StatusIndicator
                            status={promptViewerStatus}
                            message={error}
                            data-testid="status-indicator"
                        />
                    )}
                    <PreviewContainerStyled 
                        id="prompt-preview"
                        style={{ opacity: showMockPreview ? 0.6 : 1 }}
                    />

                    {promptViewerStatus === 'success' && !loading && !showMockPreview && (
                        <VoteDesign
                            onVote={handleVote}
                            data-testid="design-vote"
                        />
                    )}
                    
                    {promptViewerStatus === "success" && currentRequest && !showMockPreview && (
                        <PreviewControlsStyled>
                            <FormContainerStyled>
                                <h3>Landing Page Generation Request</h3>
                                <FormSectionStyled>
                                    <FormLabelStyled>System Prompt</FormLabelStyled>
                                    <FormFieldWrapperStyled>
                                        <RequestFieldStyled>
                                            {currentRequest.messages[0].content}
                                        </RequestFieldStyled>
                                        <CopyButtonStyled
                                            onClick={() => copyToClipboard(currentRequest.messages[0].content)}
                                            title="Copy to clipboard"
                                        >
                                            <ClipboardCopyIcon /> Copy
                                        </CopyButtonStyled>
                                    </FormFieldWrapperStyled>
                                </FormSectionStyled>

                                <FormSectionStyled>
                                    <FormLabelStyled>User Prompt</FormLabelStyled>
                                    <FormFieldWrapperStyled>
                                        <RequestFieldStyled>
                                            {currentRequest.messages[1].content}
                                        </RequestFieldStyled>
                                        <CopyButtonStyled
                                            onClick={() => copyToClipboard(currentRequest.messages[1].content)}
                                            title="Copy to clipboard"
                                        >
                                            <ClipboardCopyIcon /> Copy
                                        </CopyButtonStyled>
                                    </FormFieldWrapperStyled>
                                </FormSectionStyled>

                                <FormSectionStyled>
                                    <FormLabelStyled>Configuration</FormLabelStyled>
                                    <FormFieldWrapperStyled>
                                        <RequestConfigFieldStyled
                                            dangerouslySetInnerHTML={{
                                                __html: formatConfig(currentRequest)
                                            }}
                                        />
                                        <CopyButtonStyled
                                            onClick={() => copyToClipboard(JSON.stringify(currentRequest.config, null, 2))}
                                            title="Copy to clipboard"
                                        >
                                            <ClipboardCopyIcon /> Copy
                                        </CopyButtonStyled>
                                    </FormFieldWrapperStyled>
                                </FormSectionStyled>
                            </FormContainerStyled>
                        </PreviewControlsStyled>
                    )}
                </PreviewSectionStyled>
            </ContainerStyled>

            {styleGuideOpen && (
                <StyleGuideModal
                    styleGuide={formData.styleGuide}
                    onClose={() => setStyleGuideOpen(false)}
                    onSave={handleStyleGuideUpdate}
                />
            )}
        </>
    );
};

