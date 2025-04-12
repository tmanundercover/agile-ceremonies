
import { PreviewDimensions, StyleGuide } from './sticker-builder-types';

export const defaultStyleGuide: StyleGuide = {
  primaryColor: '#0066ff',
  secondaryColor: '#00cc88',
  fontFamily: 'Inter, system-ui, sans-serif',
  spacing: 24,
  borderRadius: 8
};

export const getPreviewDimensions = (): PreviewDimensions => ({
  width: 1200,
  height: 800,
  padding: 40
});

export const extractColorsFromSvg = (svgString: string): string[] => {
  const colors: string[] = [];
  const colorRegex = /#[0-9A-Fa-f]{6}|rgb\(\d+,\s*\d+,\s*\d+\)/g;
  const matches = svgString.match(colorRegex) || [];
  return [...new Set(matches)];
};

export const generateMockLandingPage = (dimensions: PreviewDimensions, styleGuide: StyleGuide): string => {
  return `
    <svg width="${dimensions.width}" height="${dimensions.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap');
        </style>
      </defs>
      
      <!-- Background -->
      <rect width="100%" height="100%" fill="#f8fafc"/>
      
      <!-- Header -->
      <g transform="translate(${dimensions.padding}, ${dimensions.padding})">
        <text font-family="${styleGuide.fontFamily}" font-size="48" font-weight="bold" fill="${styleGuide.primaryColor}">
          AI Model Evaluation Expert
        </text>
        <text y="80" font-family="${styleGuide.fontFamily}" font-size="24" fill="#475569">
          Join our team as a Remote Technical Consultant
        </text>
      </g>

      <!-- Main Content -->
      <g transform="translate(${dimensions.padding}, 200)">
        <rect width="500" height="400" rx="${styleGuide.borderRadius}" fill="white" filter="url(#shadow)"/>
        <text x="40" y="60" font-family="${styleGuide.fontFamily}" font-size="20" fill="#1e293b">
          We're looking for passionate AI experts to:
        </text>
        <text x="60" y="120" font-family="${styleGuide.fontFamily}" font-size="18" fill="#475569">
          • Evaluate and fine-tune large language models
        </text>
        <text x="60" y="160" font-family="${styleGuide.fontFamily}" font-size="18" fill="#475569">
          • Provide technical consultation on AI implementation
        </text>
        <text x="60" y="200" font-family="${styleGuide.fontFamily}" font-size="18" fill="#475569">
          • Collaborate with global remote teams
        </text>
      </g>

      <!-- CTA -->
      <g transform="translate(${dimensions.padding}, 650)">
        <rect width="300" height="60" rx="${styleGuide.borderRadius}" fill="${styleGuide.secondaryColor}"/>
        <text x="150" y="38" font-family="${styleGuide.fontFamily}" font-size="20" fill="white" text-anchor="middle">
          Apply Now →
        </text>
      </g>

      <!-- Shadow Filter -->
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.1"/>
        </filter>
      </defs>
    </svg>
  `;
};
