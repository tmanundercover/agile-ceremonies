import React, { useState } from 'react';
import { LandingPageData, StyleGuide } from './sticker-builder-types';
import { defaultStyleGuide, getPreviewDimensions, generateMockLandingPage } from './sticker-builder-utils';
import { callOpenAI, convertFormDataToApiRequest, OpenAIApiRequest } from './OpenAIBackendAPI';
import {
  Container,
  Form,
  InputGroup,
  Label,
  Input,
  TextArea,
  Preview,
  Button, SuccessMessage, SavedDesignPreview
} from './sticker-builder-styled-components';
import { PromptViewer } from './components/PromptViewer';
import { StyleGuideModal } from './components/StyleGuideModal';
import {VoteType} from "./components/VoteDesign";

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
  const [showPromptViewer, setShowPromptViewer] = useState(false);
  const [savedDesign, setSavedDesign] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowPromptViewer(true);
    setPromptViewerStatus('loading');

    const request = convertFormDataToApiRequest(formData);
    setCurrentRequest(request);

    try {
      const generatedContent = await callOpenAI(formData);
      const previewContainer = document.getElementById('prompt-preview');
      if (previewContainer) {
        previewContainer.innerHTML = generatedContent;
      }
      setPromptViewerStatus('success');
      setError('Generation completed successfully!'); // Set success message
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setPromptViewerStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          svgGraphic: event.target?.result as string
        });
      };
      reader.readAsText(file);
    }
  };

  const handleStyleGuideUpdate = (newStyleGuide: StyleGuide) => {
    setFormData({
      ...formData,
      styleGuide: newStyleGuide
    });
  };

  const handleVote = (vote:VoteType) => {
    console.log('User voted:', vote);

    switch (vote){
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

  const handleLockVote = (vote: string) => {
    const previewContent = document.getElementById('prompt-preview')?.innerHTML;
    if (previewContent) {
      setSavedDesign(previewContent);
      setShowSuccessMessage(true);
      setShowPromptViewer(false);
      setCurrentRequest(null);
      setPromptViewerStatus('loading'); // Reset status for next time
      setError(null); // Clear any existing error messages
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Landing Page Builder</h2>
        
        <InputGroup>
          <Label htmlFor="mainMessage">Main Message</Label>
          <TextArea 
            id="mainMessage"
            value={formData.mainText}
            onChange={(e) => setFormData({...formData, mainText: e.target.value})}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="keywords">Keywords (comma-separated)</Label>
          <Input
            id="keywords"
            type="text"
            value={formData.keywords.join(', ')}
            onChange={(e) => setFormData({
              ...formData,
              keywords: e.target.value.split(',').map(k => k.trim())
            })}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="callsToAction">Calls to Action (comma-separated)</Label>
          <Input
            id="callsToAction"
            type="text"
            value={formData.callsToAction.join(', ')}
            onChange={(e) => setFormData({
              ...formData,
              callsToAction: e.target.value.split(',').map(cta => cta.trim())
            })}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="svgUpload">Upload SVG Graphic</Label>
          <Input
            id="svgUpload"
            type="file"
            accept=".svg"
            onChange={handleFileUpload}
          />
        </InputGroup>

        <Button type="button" onClick={() => setStyleGuideOpen(true)}>
          Edit Style Guide
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Preview'}
        </Button>
      </Form>

      {showSuccessMessage && (
        <SuccessMessage data-testid="success-message">
          Design saved successfully! Your selected design is shown below.
        </SuccessMessage>
      )}

      {savedDesign ? (
        <SavedDesignPreview
          id="saved-preview"
          data-testid="saved-preview"
          dangerouslySetInnerHTML={{ __html: savedDesign }}
        />
      ) : (
        <Preview id="preview">
          {/* Preview will be rendered here */}
        </Preview>
      )}

      {showPromptViewer && currentRequest && (
        <PromptViewer
          request={currentRequest}
          status={promptViewerStatus}
          error={error}
          onVote={handleVote}
          data-testid="prompt-viewer"
          onClose={() => setShowPromptViewer(false)}
        />
      )}

      {styleGuideOpen && (
        <StyleGuideModal
          styleGuide={formData.styleGuide}
          onClose={() => setStyleGuideOpen(false)}
          onSave={handleStyleGuideUpdate}
        />
      )}
    </Container>
  );
};

