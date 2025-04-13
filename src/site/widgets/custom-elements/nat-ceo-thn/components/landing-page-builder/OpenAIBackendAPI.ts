import {LandingPageData, StyleGuide} from './landing-page-builder-types';
import {generateLandingPage} from "../../../../../../server/api/openai/landing-page";
import {generateMockLandingPage} from "./landing-page-builder-utils";

export interface OpenAIConfig {
  frequency_penalty?: number;
  presence_penalty?: number;
  top_p?: number;
  stop?: string | string[];
  stream?: boolean;
  n?: number;
}

export interface OpenAIApiRequest {
  messages: {
    role: 'system' | 'user';
    content: string;
  }[];
  model: string;
  temperature: number;
  max_tokens: number;
  config?: OpenAIConfig;
}

export const convertFormDataToApiRequest = (formData: LandingPageData): OpenAIApiRequest => {
  const systemPrompt = `You are a professional web designer specializing in landing pages.
You will create an SVG-based landing page optimized for conversion.
Consider these design principles:
- Use whitespace effectively
- Create clear visual hierarchy
- Ensure high contrast for readability
- Use consistent brand colors
- Create compelling call-to-action buttons`;

  const userPrompt = `Create a landing page with the following content:
Main Message: ${formData.mainText}
Keywords: ${formData.keywords.join(', ')}
Calls to Action: ${formData.callsToAction.join(', ')}
Style Guide:
- Primary Color: ${formData.styleGuide.primaryColor}
- Secondary Color: ${formData.styleGuide.secondaryColor}
- Font Family: ${formData.styleGuide.fontFamily}
- Spacing: ${formData.styleGuide.spacing}px
- Border Radius: ${formData.styleGuide.borderRadius}px

Please generate an SVG that includes:
1. A hero section with the main message
2. Visual elements highlighting the keywords
3. prominent call-to-action buttons
4. Responsive layout that works well at different sizes`;

  return {
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: userPrompt
      }
    ],
    model: 'gpt-4',
    temperature: 0.7,
    max_tokens: 2000,
  };
};

interface OpenAIApiResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    index: number;
    finish_reason: string;
  }>;
  error?: {
    message: string;
  };
}

export const callOpenAI = async (formData: LandingPageData, styleGuide: StyleGuide): Promise<string> => {
  const apiRequest = convertFormDataToApiRequest(formData);
  
  try {
    const mockSVG = generateMockLandingPage({width:1200, height:800, padding:8}, styleGuide);

    // Explicitly type the response
    const response = await generateLandingPage(apiRequest, mockSVG) as OpenAIApiResponse;

    if (response.error) {
      throw new Error(response.error.message);
    }

    const content = response.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Invalid response format from landing page generator');
    }

    return content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate landing page: ${error.message}`);
    }
    throw new Error('An unknown error occurred while generating the landing page');
  }
};
