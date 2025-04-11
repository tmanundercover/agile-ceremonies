export interface PabloSupport {
  basic: boolean;
  classList: boolean;
  dataUrl: boolean;
  canvas: boolean;
  download: boolean;
  markup: boolean;
  image: {
    svg: boolean;
    png: (callback: (supported: boolean) => void) => void;
    jpeg: (callback: (supported: boolean) => void) => void;
  };
  css: {
    transform: boolean;
    transition: boolean;
  };
}

export interface PabloNamespaces {
  xmlns: string;
  svg: string;
  html: string;
  xlink: string;
}

export interface PabloAttributes {
  [key: string]: string | number;
}

export interface PabloTransform {
  translate?: number[];
  rotate?: number[];
  scale?: number[];
  skew?: number[];
  matrix?: number[];
}

export interface PabloEventCallback {
  (event: Event): void;
}

export interface PabloEventOptions {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
}

export interface PabloCollection {
  [index: number]: SVGElement;
  length: number;
  pablo: string;
  collection: null;

  // Array-like methods
  forEach(callback: (element: SVGElement, index: number, array: SVGElement[]) => void, thisArg?: any): void;
  map<T>(callback: (element: SVGElement, index: number, array: SVGElement[]) => T, thisArg?: any): PabloCollection;
  filter(callback: (element: SVGElement, index: number, array: SVGElement[]) => boolean, thisArg?: any): PabloCollection;
  find(selector: string): PabloCollection;
  indexOf(element: SVGElement): number;
  slice(start?: number, end?: number): PabloCollection;
  push(...elements: SVGElement[]): number;
  pop(): SVGElement;
  shift(): SVGElement;
  unshift(...elements: SVGElement[]): number;
  splice(start: number, deleteCount?: number): PabloCollection;
  join(separator: string): string;
  reverse(): PabloCollection;
  sort(fn?: (a: SVGElement, b: SVGElement) => number): PabloCollection;

  // Pablo-specific methods
  attr(name: string): string;
  attr(attrs: PabloAttributes): this;
  attr(name: string, value: string | number): this;
  
  css(name: string): string;
  css(styles: Partial<CSSStyleDeclaration>): this;
  css(name: string, value: string): this;

  addClass(className: string): this;
  removeClass(className: string): this;
  toggleClass(className: string): this;
  hasClass(className: boolean): boolean;

  append(elements: SVGElement | PabloCollection): this;
  prepend(elements: SVGElement | PabloCollection): this;
  remove(): this;
  detach(): this;
  empty(): this;

  transform(transforms: PabloTransform): this;
  transform(type: keyof PabloTransform, ...values: number[]): this;

  on(type: string, listener: PabloEventCallback, options?: PabloEventOptions): this;
  off(type: string, listener: PabloEventCallback, options?: PabloEventOptions): this;
  trigger(type: string, detail?: any): this;

  children(): PabloCollection;
  parent(): PabloCollection;

  clone(deep?: boolean): PabloCollection;
  
  toDataURL(type?: string): string;
  toCanvas(): HTMLCanvasElement;
  toImage(): HTMLImageElement;

  first(): PabloCollection;
  last(): PabloCollection;
  each(fn: (el: SVGElement, i: number) => void): this;

  content(text?: string): string | this;
  markup(asCompleteFile?: boolean): string;
  toString(): string;

  download(type: string, filename: string): void;
}

export interface PabloStatic {
  version: string;
  support: PabloSupport;
  ns: PabloNamespaces;

  create(tagName: string, attrs?: PabloAttributes): PabloCollection;
  select(selector: string, context?: Element): PabloCollection;
  
  isSupported(): boolean;
  extend<T>(target: T, ...sources: Partial<T>[]): T;
}

export interface LayerTransform {
  translate?: [number, number];
  rotate?: number;
  scale?: [number, number];
  skew?: [number, number];
  matrix?: [number, number, number, number, number, number];
}

export interface LayerStyle {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  [key: string]: string | number | undefined;
}

export interface Layer {
  id: string;
  type: string;
  transform: LayerTransform;
  style: LayerStyle;
  path?: string; // Add path property for SVG path data
  children?: Layer[];
  width?: number;   // Add width property
  height?: number;  // Add height property
}

export interface LayerManipulationOptions {
  duration?: number;
  easing?: string;
  delay?: number;
}

export interface LayerOperationResult {
  success: boolean;
  error?: string;
}

export interface StickerBuilderProps {
  onSave?: (svg: SVGElement) => void;
}

export interface ImagePreviewContainerProps {
  isOriginal?: boolean;
}

export interface LayerControlsProps {
  layer: Layer;
  onToggle: (id: string) => void;
  isVisible: boolean;
}

export interface VectorizedImage {
  layers: Layer[];
  width: number;
  height: number;
}

export interface StickerBuilderState {
  originalImage: string | null;
  vectorizedImage: VectorizedImage | null;
  hiddenLayers: Set<string>;
  isProcessing: boolean;
}

