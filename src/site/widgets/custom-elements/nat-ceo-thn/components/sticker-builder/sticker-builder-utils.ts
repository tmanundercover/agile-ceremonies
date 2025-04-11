import { PabloAttributes, PabloCollection, PabloEventCallback, PabloEventOptions } from './sticker-builder-types';
import { Layer, LayerTransform, LayerStyle, LayerManipulationOptions, LayerOperationResult } from './sticker-builder-types';

// SVG namespace constant
export const SVG_NS = 'http://www.w3.org/2000/svg';

// Create SVG element
export function createSvgElement(tagName: string, attrs?: PabloAttributes): SVGElement {
  const el = document.createElementNS(SVG_NS, tagName);
  if (attrs) {
    setAttributes(el, attrs);
  }
  return el;
}

// Set multiple attributes
export function setAttributes(el: SVGElement, attrs: PabloAttributes): void {
  Object.entries(attrs).forEach(([name, value]) => {
    el.setAttribute(name, value.toString());
  });
}

// Convert DOM collection to array
export function toArray<T>(collection: ArrayLike<T>): T[] {
  return Array.prototype.slice.call(collection);
}

// Parse transform string to object
export function parseTransform(transform: string): Record<string, number[]> {
  const transforms: Record<string, number[]> = {};
  const regex = /(\w+)\s*\(([-\d\s,.]+)\)/g;
  let match;

  while ((match = regex.exec(transform)) !== null) {
    const [, name, valueStr] = match;
    transforms[name] = valueStr.split(/[\s,]+/).map(Number);
  }

  return transforms;
}

// Convert transform object to string
export function stringifyTransform(transforms: Record<string, number[]>): string {
  return Object.entries(transforms)
    .map(([name, values]) => `${name}(${values.join(' ')})`)
    .join(' ');
}

// Create data URL from SVG
export function svgToDataUrl(svg: SVGElement): string {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
}

// Convert SVG to Canvas
export function svgToCanvas(svg: SVGElement): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx?.drawImage(image, 0, 0);
      resolve(canvas);
    };

    image.onerror = reject;
    image.src = svgToDataUrl(svg);
  });
}

// Event handling
export function addEvent(
  el: SVGElement, 
  type: string,
  listener: PabloEventCallback,
  options?: PabloEventOptions
): void {
  el.addEventListener(type, listener, options);
}

export function removeEvent(
  el: SVGElement,
  type: string, 
  listener: PabloEventCallback,
  options?: PabloEventOptions
): void {
  el.removeEventListener(type, listener, options);
}

// CSS class handling
export function addClass(el: SVGElement, className: string): void {
  el.classList.add(className);
}

export function removeClass(el: SVGElement, className: string): void {
  el.classList.remove(className);
}

export function hasClass(el: SVGElement, className: string): boolean {
  return el.classList.contains(className);
}

// CSS style handling
export function setStyles(el: SVGElement, styles: Partial<CSSStyleDeclaration>): void {
  Object.assign(el.style, styles);
}

// Selection utilities 
export function findElements(selector: string, context: Element = document.documentElement): Element[] {
  return toArray(context.querySelectorAll(selector));
}

// DOM manipulation
export function appendElement(parent: SVGElement, child: SVGElement): void {
  parent.appendChild(child);
}

export function prependElement(parent: SVGElement, child: SVGElement): void {
  parent.insertBefore(child, parent.firstChild);
}

export function removeElement(el: SVGElement): void {
  el.parentNode?.removeChild(el);
}

// Cloning
export function cloneElement(el: SVGElement, deep: boolean = true): SVGElement {
  return el.cloneNode(deep) as SVGElement;
}

// Layer Transform Utilities
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

// Layer Style Utilities 
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
      style[prop] = value;
    }
  });
  
  return style;
}

// Layer Manipulation
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

export function updateLayer(
  el: SVGElement, 
  options: Partial<Layer>, 
  animationOptions?: LayerManipulationOptions
): LayerOperationResult {
  try {
    if (options.transform) {
      if (animationOptions) {
        animateTransform(el, options.transform, animationOptions);
      } else {
        applyTransform(el, options.transform);
      }
    }
    
    if (options.style) {
      if (animationOptions) {
        animateStyle(el, options.style, animationOptions);
      } else {
        applyStyle(el, options.style);
      }
    }
    
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Animation Utilities
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

// Layer Hierarchy
export function appendChild(parent: SVGElement, child: SVGElement): LayerOperationResult {
  try {
    parent.appendChild(child);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export function insertBefore(
  referenceEl: SVGElement, 
  newEl: SVGElement
): LayerOperationResult {
  try {
    if (referenceEl.parentNode) {
      referenceEl.parentNode.insertBefore(newEl, referenceEl);
      return { success: true };
    }
    return {
      success: false,
      error: 'Reference element has no parent'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export function removeLayer(el: SVGElement): LayerOperationResult {
  try {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
      return { success: true };
    }
    return {
      success: false,
      error: 'Element has no parent'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

