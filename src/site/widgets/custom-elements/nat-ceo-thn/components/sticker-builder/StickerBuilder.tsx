import React, { useState, useCallback, useRef } from 'react';

import {
  StickerBuilderProps,
  StickerBuilderState,
  Layer,
  LayerControlsProps
} from './sticker-builder-types';

import {
  StickerBuilderContainer,
  PreviewContainer,
  ImagePreviewContainer,
  LayerControlsContainer,
  LayerControlItem,
  FileInputContainer,
  StyledButton,
  ProcessingOverlay,
  LayerInfoContainer,
  LayerInfo
} from './sticker-builder-styled-components';

import {
  createSvg,
  createGroup,
  createPath,
  setSvgAttributes,
  appendSvgChild
} from './sticker-builder-utils';
import { Pablo } from './sticker-builder-utils';


const LayerControls: React.FC<LayerControlsProps> = ({ layer, onToggle, isVisible }) => (
  <LayerControlItem>
    <input
      type="checkbox"
      checked={isVisible}
      onChange={() => onToggle(layer.id)}
      id={`layer-${layer.id}`}
    />
    <label htmlFor={`layer-${layer.id}`}>
      {layer.id}
    </label>
  </LayerControlItem>
);

export const StickerBuilder: React.FC<StickerBuilderProps> = ({ onSave }) => {
  const [state, setState] = useState<StickerBuilderState>({
    originalImage: null,
    vectorizedImage: null,
    hiddenLayers: new Set(),
    isProcessing: false
  });

  const svgRef = useRef<SVGSVGElement>(null);

  const processImage = async (imageUrl: string): Promise<Layer[]> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Create multiple layers for different aspects of the image
        const layers: Layer[] = [
          createOutlineLayer(ctx, img.width, img.height),
          createColorLayer(ctx, img.width, img.height),
          createDetailLayer(ctx, img.width, img.height)
        ];

        resolve(layers);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageUrl;
    });
  };

  const createOutlineLayer = (ctx: CanvasRenderingContext2D, width: number, height: number): Layer => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const edges = detectEdges(imageData);
    const path = generatePathFromEdges(edges);

    return {
      id: 'outline-layer',
      type: 'path',
      path,
      style: {
        fill: 'none',
        stroke: '#000000',
        strokeWidth: 1,
        opacity: 1
      },
      transform: {
        matrix: [1, 0, 0, 1, 0, 0]
      }
    };
  };

  const createColorLayer = (ctx: CanvasRenderingContext2D, width: number, height: number): Layer => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const colors = extractDominantColors(imageData);
    const path = generateColorMask(colors, width, height);

    return {
      id: 'color-layer',
      type: 'path',
      path,
      style: {
        fill: colors[0] || '#000000',
        opacity: 0.5
      },
      transform: {
        matrix: [1, 0, 0, 1, 0, 0]
      }
    };
  };

  const createDetailLayer = (ctx: CanvasRenderingContext2D, width: number, height: number): Layer => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const details = detectDetails(imageData);
    const path = generateDetailPath(details);

    return {
      id: 'detail-layer',
      type: 'path',
      path,
      style: {
        fill: 'none',
        stroke: '#666666',
        strokeWidth: 0.5,
        opacity: 0.8
      },
      transform: {
        matrix: [1, 0, 0, 1, 0, 0]
      }
    };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setState(prev => ({ ...prev, isProcessing: true }));

    try {
      const imageUrl = URL.createObjectURL(file);
      const layers = await processImage(imageUrl);

      setState(prev => ({
        ...prev,
        originalImage: imageUrl,
        vectorizedImage: {
          layers,
          width: layers[0].width || 0,
          height: layers[0].height || 0
        },
        isProcessing: false
      }));
    } catch (error) {
      console.error('Error processing image:', error);
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const toggleLayer = useCallback((layerId: string) => {
    setState(prev => {
      const newHiddenLayers = new Set(prev.hiddenLayers);
      if (newHiddenLayers.has(layerId)) {
        newHiddenLayers.delete(layerId);
      } else {
        newHiddenLayers.add(layerId);
      }
      return { ...prev, hiddenLayers: newHiddenLayers };
    });
  }, []);

  const handleSave = useCallback(() => {
    if (!svgRef.current || !onSave) return;

    try {
      // Create a new SVG element with the current SVG's content
      const svg = Pablo.svg({
        width: svgRef.current.getAttribute('width'),
        height: svgRef.current.getAttribute('height'),
        viewBox: svgRef.current.getAttribute('viewBox')
      });

      // Clone the current SVG content into the new SVG element
      const content = svgRef.current.innerHTML;
      if (content) {
        const container = Pablo.g();
        container.innerHTML = content;
        svg.appendChild(container);
      }

      // Clean up SVG before saving
      cleanupSvg(svg);
      onSave(svg);

      // Create a data URL and trigger download
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'sticker.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error saving SVG:', error);
    }
  }, [onSave]);

  const cleanupSvg = (svg: SVGElement) => {
    // Remove any empty groups
    const emptyGroups = svg.querySelectorAll('g:empty');
    emptyGroups.forEach(group => group.remove());

    // Optimize paths
    const paths = svg.querySelectorAll('path');
    paths.forEach(path => {
      if (path.getTotalLength() === 0) {
        path.remove();
      }
    });

    // Ensure proper viewBox
    if (!svg.getAttribute('viewBox')) {
      // Cast to SVGGraphicsElement to access getBBox()
      const bbox = (svg as SVGGraphicsElement).getBBox();
      svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
    }
  };

  return (
    <StickerBuilderContainer>
      <FileInputContainer>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={state.isProcessing}
        />
        <StyledButton
          onClick={handleSave}
          disabled={!state.vectorizedImage || state.isProcessing}
        >
          Save SVG
        </StyledButton>
      </FileInputContainer>

      <PreviewContainer>
        <ImagePreviewContainer isOriginal>
          {state.originalImage && (
            <img
              src={state.originalImage}
              alt="Original"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          )}
        </ImagePreviewContainer>

        <ImagePreviewContainer>
          {state.vectorizedImage && (
            <svg
              ref={svgRef}
              width={state.vectorizedImage.width}
              height={state.vectorizedImage.height}
              viewBox={`0 0 ${state.vectorizedImage.width} ${state.vectorizedImage.height}`}
              xmlns="http://www.w3.org/2000/svg"
            >
              {state.vectorizedImage.layers.map(layer => (
                !state.hiddenLayers.has(layer.id) && (
                  <g
                    key={layer.id}
                    style={layer.style}
                    transform={layer.transform?.matrix ?
                      `matrix(${layer.transform.matrix.join(',')})` : undefined}
                  >
                    <path d={layer.path} />
                  </g>
                )
              ))}
            </svg>
          )}
        </ImagePreviewContainer>
      </PreviewContainer>

      {state.vectorizedImage && (
        <>
          <LayerControlsContainer>
            {state.vectorizedImage.layers.map(layer => (
              <LayerControls
                key={layer.id}
                layer={layer}
                onToggle={toggleLayer}
                isVisible={!state.hiddenLayers.has(layer.id)}
              />
            ))}
          </LayerControlsContainer>

          <LayerInfoContainer>
            <h3>SVG Layer Information:</h3>
            {state.vectorizedImage.layers.map(layer => (
              <LayerInfo key={layer.id}>
                <h4>Layer: {layer.id}</h4>
                <p>Type: {layer.type}</p>
                <p>Style: {JSON.stringify(layer.style)}</p>
                <p>Path Data: {layer.path?.substring(0, 50)}...</p>
              </LayerInfo>
            ))}
          </LayerInfoContainer>
        </>
      )}

      {state.isProcessing && (
        <ProcessingOverlay>
          Processing image...
        </ProcessingOverlay>
      )}
    </StickerBuilderContainer>
  );
};

// Helper functions for image processing
const detectEdges = (imageData: ImageData): number[][] => {
  // Implement Sobel edge detection or similar algorithm
  // Return a 2D array of edge intensities
  return [];
};

const extractDominantColors = (imageData: ImageData): string[] => {
  // Implement color quantization algorithm
  // Return array of hex color values
  return ['#000000'];
};

const detectDetails = (imageData: ImageData): number[][] => {
  // Implement detail detection algorithm
  // Return a 2D array of detail points
  return [];
};

const generatePathFromEdges = (edges: number[][]): string => {
  // Convert edge data to SVG path string
  return '';
};

const generateColorMask = (colors: string[], width: number, height: number): string => {
  // Generate SVG path for color regions
  return '';
};

const generateDetailPath = (details: number[][]): string => {
  // Convert detail points to SVG path string
  return '';
};

