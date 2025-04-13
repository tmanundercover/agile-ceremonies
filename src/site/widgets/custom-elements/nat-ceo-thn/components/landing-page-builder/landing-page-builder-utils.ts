import {PreviewDimensions, StyleGuide} from './landing-page-builder-types';
import {OpenAIApiRequest} from "./OpenAIBackendAPI";
import {tokens} from "./landing-page-builder-styled-components";

export const defaultStyleGuide: StyleGuide = {
    primaryColor: tokens.colors.primary,
    secondaryColor: tokens.colors.primaryLight,
    fontFamily: 'Inter, system-ui, sans-serif',
    spacing: parseInt(tokens.spacing.md),
    borderRadius: parseInt(tokens.borderRadius.md)
};

export const getPreviewDimensions = (): PreviewDimensions => {
    const viewportWidth = Math.min(window.innerWidth - 100, 1200); // Max width of 1200px
    const aspectRatio = 1.5; // 3:2 aspect ratio
    return {
        width: viewportWidth,
        height: viewportWidth / aspectRatio,
        padding: Math.round(viewportWidth * 0.033) // 3.3% of width for padding
    };
};

export const extractColorsFromSvg = (svgString: string): string[] => {
    const colors: string[] = [];
    const colorRegex = /#[0-9A-Fa-f]{6}|rgb\(\d+,\s*\d+,\s*\d+\)/g;
    const matches = svgString.match(colorRegex) || [];
    return [...new Set(matches)];
};

export const generateMockLandingPage = (dimensions: PreviewDimensions, styleGuide: StyleGuide): string => {


    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" font-family="sans-serif">
  <defs>
    <filter id="neumorphism" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="8" dy="8" stdDeviation="8" flood-color="#d1d9e6" />
      <feDropShadow dx="-8" dy="-8" stdDeviation="8" flood-color="#ffffff" />
    </filter>
    <style>
      .title { font-size: 48px; font-weight: 700; fill: #1f2937; }
      .subhead { font-size: 22px; font-weight: 500; fill: #374151; }
      .desc { font-size: 16px; fill: #4b5563; }
      .cta { font-size: 18px; font-weight: 700; fill: #ffffff; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="1200" height="600" fill="#f3f4f6" />

  <!-- Card Container -->
  <g filter="url(#neumorphism)">
    <rect x="100" y="80" width="1000" height="440" rx="25" fill="#e0e5ec" />
  </g>

  <!-- Headline -->
  <text x="150" y="160" class="title">Remote Jobs for Developers Now</text>
  <text x="150" y="200" class="subhead">Become an AI Model Evaluation Specialist with Outlier</text>

  <!-- Job Details -->
  <g class="desc" transform="translate(150,240)">
    <text y="0">• Learn AI Prompt Writing While Earning from Home</text>
    <text y="25">• Evaluate and Improve Real AI Systems (NLP, Audio, QA)</text>
    <text y="50">• Document AI Behaviors and Craft Natural Language Scenarios</text>
    <text y="75">• Build Experience in Prompt Engineering, QA, and Model Analysis</text>
  </g>

  <!-- CTA -->
  <g cursor="pointer">
    <rect x="150" y="350" width="260" height="50" rx="12" fill="#3B82F6" />
    <text x="280" y="383" text-anchor="middle" class="cta">Apply &amp; Start Earning Now</text>
  </g>

  <!-- Footer note -->
  <text x="150" y="430" class="desc">
    Join the AI revolution. Add real AI experience to your resume.
  </text>
</svg>
`;
};

export const formatConfig = (config: Partial<OpenAIApiRequest>) => {
    const configObj = {
        model: config.model,
        temperature: config.temperature,
        max_tokens: config.max_tokens
    };

    return JSON.stringify(configObj, null, 2)
        .replace(/"([^"]+)":/g, '<span class="json-key">"$1":</span>')
        .replace(/: "([^"]+)"/g, ': <span class="json-string">$1"</span>')
        .replace(/: ([0-9.]+)/g, ': <span class="json-value">$1</span>');
};

