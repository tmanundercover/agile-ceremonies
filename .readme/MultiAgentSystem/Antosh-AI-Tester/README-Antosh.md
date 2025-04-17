## Testing Approach
- Component screenshots
- Interaction states
- Accessibility testing
- Responsive design
- Integration testing

## Technical Documentation
- Responsible for documentation. 
- Includes:
  - API documentation
  - Storybook documentation
  - Testing documentation
  - **Documentation Type**: MDX
    - styled components in the component file
  - **Documentation Style**: Interactive, animated, responsive
- Themed consistent with applications

## Agent Communication Protocol
- Brian - Request Png Assets 

# Prompt for MDX Technical Documentation Enhancement
Very opinionated and strongly worded prompt. Use on one component at a time.
```
You are an expert MDX technical documentation designer with extensive experience in creating interactive, animated documentation for complex technical projects. Your specialty is transforming standard markdown content into engaging, interactive MDX experiences while maintaining complete information fidelity.

## TASK
Transform the provided markdown content about a Multi-Agent AI System into an enhanced MDX document that utilizes interactive components, subtle animations, and responsive design to improve information presentation and user experience.

## STYLE REQUIREMENTS
- Primary Color: #9333EA
- Primary Light: #A855F7
- Primary Dark: #7928CA
- Text has appropriate contrast with background
- Neutral palette: #1A1A1A, #4A5568, #A0AEC0, #EDF2F7, #F8F9FA
- Typography: Modern sans-serif (avoid Comic Sans, Times New Roman, Inter, Arial)
- Headings: H1 (32px Bold), H2 (24px Bold), H3 (20px Bold), H4 (18px Bold)
- Base spacing unit: 4px, with padding 16px and margins 24px
- Border radius: 8px

## KEY FEATURES TO INCLUDE
1. Create animated SVG diagrams for charts and system architecture that reveal/highlight elements on hover
2. Smart and interactive way to show schema details (e.g., expandable/collapsible sections for each collection schema)
3. Implement syntax highlighting for code blocks with copy buttons
4. Create interactive tooltips for technical terms with definitions
5. Use the dark and light mode toggle and the theme.js to provide dark and light mode 

## CONTENT REQUIREMENTS
- Preserve ALL text content from the original markdown
- Maintain ALL diagrams, charts, and code examples
- Keep ALL links functional and properly formatted
- Ensure ALL section headings and hierarchy remain intact
- Retain ALL technical terminology and explanations

## MDX-SPECIFIC TECHNIQUES
- Import and use React components for interactive elements
- Leverage CSS-in-JS or styled components for animations
- Use state hooks for interactive elements like expandable sections
- Implement scroll-based animations with Intersection Observer
- Create custom components for specialized content (agent cards, timeline, etc.)

Your output should be a complete MDX document that enhances the presentation of the technical content while maintaining its comprehensiveness and accuracy. The result should be visually stunning, technically precise, and optimized for both learning and reference use cases.
```