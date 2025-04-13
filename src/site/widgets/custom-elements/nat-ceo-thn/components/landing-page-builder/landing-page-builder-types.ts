
export interface StyleGuide {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  spacing: number;
  borderRadius: number;
}

export interface LandingPageData {
  mainText: string;
  keywords: string[];
  callsToAction: string[];
  svgGraphic: string;
  styleGuide: StyleGuide;
}

export interface PreviewDimensions {
  width: number;
  height: number;
  padding: number;
}
