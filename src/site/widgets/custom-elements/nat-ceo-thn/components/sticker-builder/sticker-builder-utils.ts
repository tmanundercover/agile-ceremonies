import {
  PabloAttributes,
  PabloCollection,
  PabloEventCallback,
  PabloEventOptions,
  Layer,
  LayerTransform,
  LayerStyle,
  LayerManipulationOptions,
  LayerOperationResult
} from './sticker-builder-types';

// SVG namespace constant
export const SVG_NS = 'http://www.w3.org/2000/svg';

// Basic SVG element creation utilities
export function createSvgElement(type: string, attributes: Record<string, any> = {}): SVGElement {
  const el = document.createElementNS(SVG_NS, type);
  setSvgAttributes(el, attributes);
  return el;
}

export function setSvgAttributes(el: SVGElement, attributes: Record<string, any>): void {
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value.toString());
  });
}

export function getSvgAttribute(el: SVGElement, attribute: string): string | null {
  return el.getAttribute(attribute);
}

export function removeSvgAttribute(el: SVGElement, attribute: string): void {
  el.removeAttribute(attribute);
}

export function appendSvgChild(parent: SVGElement, child: SVGElement): void {
  parent.appendChild(child);
}

// SVG Creation Helpers
export function createSvg(attributes: Record<string, any> = {}): SVGElement {
  const el = document.createElementNS(SVG_NS, 'svg');
  setSvgAttributes(el, {
    version: '1.1',
    xmlns: SVG_NS,
    ...attributes
  });
  return el;
}

export function createGroup(attributes: Record<string, any> = {}): SVGElement {
  const el = document.createElementNS(SVG_NS, 'g');
  setSvgAttributes(el, attributes);
  return el;
}

export function createPath(attributes: Record<string, any> = {}): SVGElement {
  const el = document.createElementNS(SVG_NS, 'path');
  setSvgAttributes(el, attributes);
  return el;
}

// Transform utilities
export function applyTransform(el: SVGElement, transform: LayerTransform): void {
  const transforms: string[] = [];
  
  if (transform.translate) {
    transforms.push(`translate(${transform.translate.join(',')})`);
  }
  if (transform.rotate !== undefined) {
    transforms.push(`rotate(${transform.rotate})`);
  }
  if (transform.scale) {
    transforms.push(`scale(${transform.scale.join(',')})`);
  }
  if (transform.skew) {
    transforms.push(`skew(${transform.skew.join(',')})`);
  }
  if (transform.matrix) {
    transforms.push(`matrix(${transform.matrix.join(',')})`);
  }
  
  el.setAttribute('transform', transforms.join(' '));
}

export function getTransform(el: SVGElement): LayerTransform {
  const transform: LayerTransform = {};
  const transformStr = el.getAttribute('transform') || '';
  
  const translateMatch = /translate\(([-\d.,\s]+)\)/.exec(transformStr);
  if (translateMatch) {
    transform.translate = translateMatch[1].split(',').map(Number) as [number, number];
  }
  
  const rotateMatch = /rotate\(([-\d.]+)\)/.exec(transformStr);
  if (rotateMatch) {
    transform.rotate = Number(rotateMatch[1]);
  }
  
  const scaleMatch = /scale\(([-\d.,\s]+)\)/.exec(transformStr);
  if (scaleMatch) {
    transform.scale = scaleMatch[1].split(',').map(Number) as [number, number];
  }
  
  return transform;
}

// Style utilities
export function applyStyle(el: SVGElement, style: LayerStyle): void {
  Object.entries(style).forEach(([prop, value]) => {
    if (value !== undefined) {
      el.style[prop as any] = value.toString();
    }
  });
}

export function getStyle(el: SVGElement): LayerStyle {
  const style: LayerStyle = {};
  const computedStyle = window.getComputedStyle(el);
  
  ['fill', 'stroke', 'strokeWidth', 'opacity'].forEach(prop => {
    const value = computedStyle.getPropertyValue(prop);
    if (value) {
      style[prop as keyof LayerStyle] = value;
    }
  });
  
  return style;
}

// Layer manipulation
export function createLayer(type: string, options: Partial<Layer> = {}): SVGElement {
  const el = document.createElementNS(SVG_NS, type);
  
  if (options.transform) {
    applyTransform(el, options.transform);
  }
  if (options.style) {
    applyStyle(el, options.style);
  }
  if (options.id) {
    el.id = options.id;
  }
  
  return el;
}

// Convert SVG to data URL
export function svgToDataUrl(svg: SVGElement): string {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  const encoded = window.btoa(unescape(encodeURIComponent(svgString)));
  return `data:image/svg+xml;base64,${encoded}`;
}

// Animation utilities
export function animateTransform(
  el: SVGElement,
  transform: LayerTransform,
  options: LayerManipulationOptions = {}
): void {
  const duration = options.duration || 300;
  const easing = options.easing || 'ease';
  const delay = options.delay || 0;
  
  el.style.transition = `transform ${duration}ms ${easing} ${delay}ms`;
  applyTransform(el, transform);
}

export function animateStyle(
  el: SVGElement,
  style: LayerStyle,
  options: LayerManipulationOptions = {}
): void {
  const duration = options.duration || 300;
  const easing = options.easing || 'ease';
  const delay = options.delay || 0;
  
  const properties = Object.keys(style).join(',');
  el.style.transition = `${properties} ${duration}ms ${easing} ${delay}ms`;
  applyStyle(el, style);
}

// Pablo namespace (minimal implementation)
export const Pablo = {
  svg: createSvg,
  g: createGroup,
  path: createPath,
  load: (url: string, callback: (collection: any) => void): void => {
    const img = new Image();
    img.onload = () => {
      callback([img]);
    };
    img.src = url;
  }
};

export type { PabloCollection as Collection };
