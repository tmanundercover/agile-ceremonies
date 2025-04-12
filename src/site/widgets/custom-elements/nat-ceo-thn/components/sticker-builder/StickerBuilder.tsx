import React, {useCallback, useRef, useState} from 'react';

import {Layer, LayerControlsProps, StickerBuilderProps, StickerBuilderState} from './sticker-builder-types';

import {
    FileInputButton,
    FileInputContainer,
    HiddenFileInput,
    ImagePreviewContainer,
    LayerControlItem,
    LayerControlsContainer,
    LayerInfo,
    LayerInfoContainer,
    PreviewContainer,
    ProcessingOverlay,
    StickerBuilderContainer,
    StyledButton
} from './sticker-builder-styled-components';

import {Pablo} from './sticker-builder-utils';


const LayerControls: React.FC<LayerControlsProps> = ({layer, onToggle, isVisible}) => (
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

export const StickerBuilder: React.FC<StickerBuilderProps> = ({onSave}) => {
    const [state, setState] = useState<StickerBuilderState>({
        originalImage: null,
        vectorizedImage: null,
        hiddenLayers: new Set(),
        isProcessing: false
    });

    const svgRef = useRef<SVGSVGElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const processImage = async (imageUrl: string): Promise<{ layers: Layer[], width: number, height: number }> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d', {willReadFrequently: true});
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

                resolve({
                    layers,
                    width: img.width,
                    height: img.height
                });
            };
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = imageUrl;
        });
    };

    const createOutlineLayer = (ctx: CanvasRenderingContext2D, width: number, height: number): Layer => {
        // Enhance edge detection for better outlines
        const imageData = ctx.getImageData(0, 0, width, height);
        const edges = detectEdges(imageData);
        const path = generatePathFromEdges(edges);

        return {
            id: 'outline',
            type: 'path',
            path,
            style: {
                fill: 'none',
                stroke: '#000000',
                strokeWidth: 2,
                opacity: 1
            },
            transform: {
                translate: [0, 0],
                scale: [1, 1]
            }
        };
    };

    const createColorLayer = (ctx: CanvasRenderingContext2D, width: number, height: number): Layer => {
        const imageData = ctx.getImageData(0, 0, width, height);
        const colors = quantizeColors(imageData, 12); // Increased number of colors
        const colorPaths = generateColorPaths(imageData, colors);

        return {
            id: 'color-layer',
            type: 'g',
            children: colorPaths.map((pathData, index) => ({
                id: `color-${index}`,
                type: 'path',
                path: pathData.path,
                style: {
                    fill: pathData.color,
                    opacity: 0.85, // Slightly transparent to show overlaps
                    stroke: 'none'
                },
                transform: {
                    matrix: [1, 0, 0, 1, 0, 0]
                }
            })),
            style: {},
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
            id: 'details',
            type: 'path',
            path,
            style: {
                fill: 'none',
                stroke: '#333333',
                strokeWidth: 1,
                opacity: 0.6
            },
            transform: {
                translate: [0, 0],
                scale: [1, 1]
            }
        };
    };

    const quantizeColors = (imageData: ImageData, maxColors: number = 12): string[] => {
        const data = imageData.data;
        const pixels: number[][] = [];

        // Sample pixels at a lower frequency for better performance
        for (let i = 0; i < data.length; i += 16) {
            // Ignore very light (near white) and very dark (near black) colors
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const brightness = (r + g + b) / 3;

            if (brightness > 20 && brightness < 235) {
                pixels.push([r, g, b]);
            }
        }

        // Use K-means clustering for better color quantization
        const clusters = kMeansClustering(pixels, maxColors);

        return clusters.map(centroid => {
            const [r, g, b] = centroid.map(Math.round);
            return `rgb(${r},${g},${b})`;
        });
    };

    // Add K-means clustering for better color quantization
    const kMeansClustering = (pixels: number[][], k: number): number[][] => {
        // Initialize centroids randomly from the pixels
        let centroids = pixels
            .sort(() => Math.random() - 0.5)
            .slice(0, k);

        const maxIterations = 10;

        for (let iteration = 0; iteration < maxIterations; iteration++) {
            // Assign pixels to nearest centroid
            const clusters: number[][][] = Array(k).fill(0).map(() => []);

            pixels.forEach(pixel => {
                let minDist = Infinity;
                let closestCentroid = 0;

                centroids.forEach((centroid, i) => {
                    const dist = colorDistance(pixel, centroid);
                    if (dist < minDist) {
                        minDist = dist;
                        closestCentroid = i;
                    }
                });

                clusters[closestCentroid].push(pixel);
            });

            // Update centroids
            const newCentroids = clusters.map(cluster => {
                if (cluster.length === 0) return centroids[0];

                return cluster.reduce((acc, pixel) => {
                    return [
                        acc[0] + pixel[0] / cluster.length,
                        acc[1] + pixel[1] / cluster.length,
                        acc[2] + pixel[2] / cluster.length
                    ];
                }, [0, 0, 0]);
            });

            // Check for convergence
            if (centroids.every((centroid, i) =>
                colorDistance(centroid, newCentroids[i]) < 1
            )) {
                break;
            }

            centroids = newCentroids;
        }

        return centroids;
    };

    const colorDistance = (a: number[], b: number[]): number => {
        // Using weighted Euclidean distance for perceptual color difference
        const rMean = (a[0] + b[0]) / 2;
        const dr = a[0] - b[0];
        const dg = a[1] - b[1];
        const db = a[2] - b[2];

        return Math.sqrt(
            (2 + rMean / 256) * dr * dr +
            4 * dg * dg +
            (2 + (255 - rMean) / 256) * db * db
        );
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setState(prev => ({...prev, isProcessing: true}));

        try {
            const imageUrl = URL.createObjectURL(file);
            const result = await processImage(imageUrl);

            setState(prev => ({
                ...prev,
                originalImage: imageUrl,
                vectorizedImage: {
                    layers: result.layers,
                    width: result.width,
                    height: result.height
                },
                isProcessing: false
            }));
        } catch (error) {
            console.error('Error processing image:', error);
            setState(prev => ({...prev, isProcessing: false}));
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
            return {...prev, hiddenLayers: newHiddenLayers};
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
            const svgBlob = new Blob([svgString], {type: 'image/svg+xml'});
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

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <StickerBuilderContainer>
            <FileInputContainer>
                <HiddenFileInput
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={state.isProcessing}
                />
                <FileInputButton
                    onClick={handleFileButtonClick}
                    disabled={state.isProcessing}
                >
                    Choose File
                </FileInputButton>
                <StyledButton
                    onClick={handleSave}
                    disabled={!state.vectorizedImage || state.isProcessing}
                >
                    Save SVG
                </StyledButton>
            </FileInputContainer>

            <PreviewContainer>
                <ImagePreviewContainer $isOriginal>
                    {state.originalImage && (
                        <img
                            src={state.originalImage}
                            alt="Original"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain'
                            }}
                        />
                    )}
                </ImagePreviewContainer>

                <ImagePreviewContainer>
                    {state.vectorizedImage && (
                        <svg
                            ref={svgRef}
                            width="100%"
                            height="100%"
                            viewBox={`0 0 ${state.vectorizedImage.width} ${state.vectorizedImage.height}`}
                            preserveAspectRatio="xMidYMid meet"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{maxWidth: '100%', maxHeight: '100%'}}
                        >
                            {state.vectorizedImage.layers
                                .filter(layer => !state.hiddenLayers.has(layer.id))
                                .map(layer => (
                                    <g
                                        key={layer.id}
                                        style={{
                                            ...layer.style,
                                            pointerEvents: 'none'
                                        }}
                                        transform={
                                            layer.transform.translate
                                                ? `translate(${layer.transform.translate[0]},${layer.transform.translate[1]})` +
                                                (layer.transform.scale ? ` scale(${layer.transform.scale[0]},${layer.transform.scale[1]})` : '')
                                                : undefined
                                        }
                                    >
                                        {layer.path && <path d={layer.path}/>}
                                    </g>
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
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const edges: number[][] = Array(height).fill(0).map(() => Array(width).fill(0));

    // Increased kernel size for better edge detection
    const kernelSize = 3;
    const threshold = 15; // Lower threshold to catch more edges

    for (let y = kernelSize; y < height - kernelSize; y++) {
        for (let x = kernelSize; x < width - kernelSize; x++) {
            let sumX = 0;
            let sumY = 0;

            // Apply larger Sobel kernel
            for (let i = -kernelSize; i <= kernelSize; i++) {
                for (let j = -kernelSize; j <= kernelSize; j++) {
                    const idx = ((y + i) * width + (x + j)) * 4;
                    const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;

                    sumX += gray * (j / (i * i + j * j + 1));
                    sumY += gray * (i / (i * i + j * j + 1));
                }
            }

            const magnitude = Math.sqrt(sumX * sumX + sumY * sumY);
            edges[y][x] = magnitude > threshold ? 1 : 0;
        }
    }

    // Apply noise reduction
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let neighbors = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    neighbors += edges[y + i][x + j];
                }
            }
            // Remove isolated pixels
            if (neighbors < 3) {
                edges[y][x] = 0;
            }
        }
    }

    return edges;
};

const extractDominantColors = (imageData: ImageData): string[] => {
    const data = imageData.data;
    const colors: { [key: string]: number } = {};

    // Sample pixels at intervals
    for (let i = 0; i < data.length; i += 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const hex = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
        colors[hex] = (colors[hex] || 0) + 1;
    }

    // Sort by frequency and return top colors
    return Object.entries(colors)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([color]) => color);
};

const generatePathFromEdges = (edges: number[][]): string => {
    const height = edges.length;
    const width = edges[0].length;
    let path = '';
    let firstPoint = true;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (edges[y][x]) {
                if (firstPoint) {
                    path += `M ${x} ${y} `;
                    firstPoint = false;
                } else {
                    path += `L ${x} ${y} `;
                }
            }
        }
    }

    return path;
};

const generateColorMask = (colors: string[], width: number, height: number): string => {
    // Create a simple rectangle for the base color
    return `M0 0 h${width} v${height} h-${width}z`;
};

const detectDetails = (imageData: ImageData): number[][] => {
    // Simplified version - use edge detection with lower threshold
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const details: number[][] = Array(height).fill(0).map(() => Array(width).fill(0));

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const idx = (y * width + x) * 4;
            const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;

            const idxLeft = (y * width + (x - 1)) * 4;
            const grayLeft = (data[idxLeft] + data[idxLeft + 1] + data[idxLeft + 2]) / 3;

            if (Math.abs(gray - grayLeft) > 15) { // Lower threshold for details
                details[y][x] = 1;
            }
        }
    }

    return details;
};

const generateDetailPath = (details: number[][]): string => {
    const height = details.length;
    const width = details[0].length;
    let path = '';
    let firstPoint = true;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (details[y][x]) {
                if (firstPoint) {
                    path += `M ${x} ${y} `;
                    firstPoint = false;
                } else {
                    path += `L ${x} ${y} `;
                }
            }
        }
    }

    return path;
};

const generateColorPaths = (imageData: ImageData, colors: string[]): { path: string, color: string }[] => {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const paths: { path: string, color: string }[] = [];
    const visited = new Set<number>();

    colors.forEach(color => {
        const [r, g, b] = color.match(/\d+/g)!.map(Number);
        let paths_for_color: string[] = [];

        // Use a smaller step size for better performance
        const step = Math.max(1, Math.floor(Math.min(width, height) / 100));

        for (let y = 0; y < height; y += step) {
            let currentPath = '';
            let isInRegion = false;

            for (let x = 0; x < width; x += step) {
                const idx = (y * width + x) * 4;
                if (visited.has(idx)) continue;

                const pixelR = data[idx];
                const pixelG = data[idx + 1];
                const pixelB = data[idx + 2];

                // Color matching with tolerance
                const tolerance = 30;
                const matches = Math.abs(pixelR - r) < tolerance &&
                              Math.abs(pixelG - g) < tolerance &&
                              Math.abs(pixelB - b) < tolerance;

                if (matches && !isInRegion) {
                    currentPath += `M ${x} ${y} `;
                    isInRegion = true;
                    visited.add(idx);
                } else if (matches) {
                    currentPath += `L ${x} ${y} `;
                    visited.add(idx);
                } else if (isInRegion) {
                    currentPath += 'Z ';
                    isInRegion = false;
                    if (currentPath.length > 10) {
                        paths_for_color.push(currentPath);
                    }
                    currentPath = '';
                }
            }

            if (isInRegion) {
                currentPath += 'Z ';
                if (currentPath.length > 10) {
                    paths_for_color.push(currentPath);
                }
            }
        }

        if (paths_for_color.length > 0) {
            // Combine paths for this color
            paths.push({
                path: paths_for_color.join(' '),
                color: color
            });
        }
    });

    // Sort by simple path length as a rough estimate of area
    // This avoids the expensive area calculation
    return paths.sort((a, b) => b.path.length - a.path.length);
};

const getPathArea = (path: string): number => {
    // Simple and efficient path area calculation
    const numbers = path.match(/-?\d+(\.\d+)?/g);
    if (!numbers) return 0;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (let i = 0; i < numbers.length; i += 2) {
        const x = parseFloat(numbers[i]);
        const y = parseFloat(numbers[i + 1]);

        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    }

    return (maxX - minX) * (maxY - minY);
};

