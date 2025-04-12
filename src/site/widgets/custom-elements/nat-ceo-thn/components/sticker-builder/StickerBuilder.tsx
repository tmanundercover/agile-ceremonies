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
  Button
} from './sticker-builder-styled-components';
import { PromptViewer } from './PromptViewer';
import { StyleGuideModal } from './StyleGuideModal';

export const StickerBuilder: React.FC = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const request = convertFormDataToApiRequest(formData);
    setCurrentRequest(request);

    try {
      const generatedContent = await callOpenAI(formData);
      const previewContainer = document.getElementById('preview');
      if (previewContainer) {
        previewContainer.innerHTML = generatedContent;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setCurrentRequest(null);
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

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Preview'}
        </Button>
      </Form>

      <Preview id="preview">
        {/* Preview will be rendered here */}
      </Preview>

      {loading && currentRequest && (
        <PromptViewer request={currentRequest} />
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

