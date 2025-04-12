import { Layer } from './sticker-builder-types';

interface ColorCluster {
    r: number;
    g: number;
    b: number;
    pixels: number[];
}

export const enhancedVectorize = async (imageData: ImageData): Promise<Layer[]> => {
    const layers: Layer[] = [];
    
    // 1. Enhanced edge detection layer
    const edgeLayer = createEnhancedEdgeLayer(imageData);
    layers.push(edgeLayer);

    // 2. Advanced color quantization layer
    const colorLayers = await createColorLayers(imageData);
    layers.push(...colorLayers);

    // 3. Detail enhancement layer
    const detailLayer = createDetailEnhancementLayer(imageData);
    layers.push(detailLayer);

    return layers;
};

const createEnhancedEdgeLayer = (imageData: ImageData): Layer => {
    const edges = detectEdgesWithCanny(imageData);
    const path = generateOptimizedPath(edges);

    return {
        id: 'enhanced-edges',
        type: 'path',
        path,
        style: {
            fill: 'none',
            stroke: '#000000',
            strokeWidth: 1,
            opacity: 0.8
        },
        transform: {
            translate: [0, 0],
            scale: [1, 1]
        }
    };
};

const detectEdgesWithCanny = (imageData: ImageData): number[][] => {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const edges: number[][] = Array(height).fill(0).map(() => Array(width).fill(0));
    
    // 1. Gaussian blur for noise reduction
    const blurred = applyGaussianBlur(data, width, height);
    
    // 2. Sobel operator for gradient calculation
    const [gradientMagnitude, gradientDirection] = applySobelOperator(blurred, width, height);
    
    // 3. Non-maximum suppression
    const suppressed = applyNonMaxSuppression(gradientMagnitude, gradientDirection, width, height);
    
    // 4. Double threshold and edge tracking
    const lowThreshold = 20;
    const highThreshold = 60;
    
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            if (suppressed[y][x] > highThreshold) {
                edges[y][x] = 1;
            } else if (suppressed[y][x] > lowThreshold) {
                // Check if connected to strong edge
                let isConnected = false;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (suppressed[y + dy][x + dx] > highThreshold) {
                            isConnected = true;
                            break;
                        }
                    }
                }
                edges[y][x] = isConnected ? 1 : 0;
            }
        }
    }
    
    return edges;
};

const applyGaussianBlur = (data: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray => {
    const kernel = [
        [1, 4, 6, 4, 1],
        [4, 16, 24, 16, 4],
        [6, 24, 36, 24, 6],
        [4, 16, 24, 16, 4],
        [1, 4, 6, 4, 1]
    ].map(row => row.map(v => v / 256));
    
    const result = new Uint8ClampedArray(data.length);
    
    for (let y = 2; y < height - 2; y++) {
        for (let x = 2; x < width - 2; x++) {
            let r = 0, g = 0, b = 0;
            
            for (let ky = -2; ky <= 2; ky++) {
                for (let kx = -2; kx <= 2; kx++) {
                    const idx = ((y + ky) * width + (x + kx)) * 4;
                    const weight = kernel[ky + 2][kx + 2];
                    r += data[idx] * weight;
                    g += data[idx + 1] * weight;
                    b += data[idx + 2] * weight;
                }
            }
            
            const idx = (y * width + x) * 4;
            result[idx] = r;
            result[idx + 1] = g;
            result[idx + 2] = b;
            result[idx + 3] = data[idx + 3];
        }
    }
    
    return result;
};

const applySobelOperator = (
    data: Uint8ClampedArray,
    width: number,
    height: number
): [number[][], number[][]] => {
    const magnitude: number[][] = Array(height).fill(0).map(() => Array(width).fill(0));
    const direction: number[][] = Array(height).fill(0).map(() => Array(width).fill(0));
    
    const sobelX = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
    const sobelY = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
    
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let gx = 0, gy = 0;
            
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const idx = ((y + ky) * width + (x + kx)) * 4;
                    const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
                    
                    gx += gray * sobelX[ky + 1][kx + 1];
                    gy += gray * sobelY[ky + 1][kx + 1];
                }
            }
            
            magnitude[y][x] = Math.sqrt(gx * gx + gy * gy);
            direction[y][x] = Math.atan2(gy, gx);
        }
    }
    
    return [magnitude, direction];
};

const applyNonMaxSuppression = (
    magnitude: number[][],
    direction: number[][],
    width: number,
    height: number
): number[][] => {
    const result: number[][] = Array(height).fill(0).map(() => Array(width).fill(0));
    
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const angle = ((direction[y][x] * 180 / Math.PI + 180) % 180);
            let r1 = 0, r2 = 0;
            
            // Horizontal edge
            if ((angle >= 0 && angle < 22.5) || (angle >= 157.5 && angle < 180)) {
                r1 = magnitude[y][x - 1];
                r2 = magnitude[y][x + 1];
            }
            // Diagonal edge (45 degrees)
            else if (angle >= 22.5 && angle < 67.5) {
                r1 = magnitude[y + 1][x - 1];
                r2 = magnitude[y - 1][x + 1];
            }
            // Vertical edge
            else if (angle >= 67.5 && angle < 112.5) {
                r1 = magnitude[y - 1][x];
                r2 = magnitude[y + 1][x];
            }
            // Diagonal edge (135 degrees)
            else {
                r1 = magnitude[y - 1][x - 1];
                r2 = magnitude[y + 1][x + 1];
            }
            
            result[y][x] = (magnitude[y][x] >= r1 && magnitude[y][x] >= r2) ?
                magnitude[y][x] : 0;
        }
    }
    
    return result;
};

const generateOptimizedPath = (edges: number[][]): string => {
    const height = edges.length;
    const width = edges[0].length;
    let path = '';
    
    // Use Douglas-Peucker algorithm for path simplification
    const points: [number, number][] = [];
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (edges[y][x]) {
                points.push([x, y]);
            }
        }
    }
    
    if (points.length === 0) return '';
    
    const simplified = douglasPeuckerSimplification(points, 1.5);
    path = `M ${simplified[0][0]} ${simplified[0][1]} `;
    
    for (let i = 1; i < simplified.length; i++) {
        path += `L ${simplified[i][0]} ${simplified[i][1]} `;
    }
    
    return path;
};

const douglasPeuckerSimplification = (
    points: [number, number][],
    epsilon: number
): [number, number][] => {
    if (points.length <= 2) return points;
    
    let maxDistance = 0;
    let maxIndex = 0;
    
    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    
    for (let i = 1; i < points.length - 1; i++) {
        const distance = pointLineDistance(points[i], firstPoint, lastPoint);
        if (distance > maxDistance) {
            maxDistance = distance;
            maxIndex = i;
        }
    }
    
    if (maxDistance > epsilon) {
        const firstHalf = douglasPeuckerSimplification(
            points.slice(0, maxIndex + 1),
            epsilon
        );
        const secondHalf = douglasPeuckerSimplification(
            points.slice(maxIndex),
            epsilon
        );
        return [...firstHalf.slice(0, -1), ...secondHalf];
    }
    
    return [firstPoint, lastPoint];
};

const pointLineDistance = (
    point: [number, number],
    lineStart: [number, number],
    lineEnd: [number, number]
): number => {
    const numerator = Math.abs(
        (lineEnd[1] - lineStart[1]) * point[0] -
        (lineEnd[0] - lineStart[0]) * point[1] +
        lineEnd[0] * lineStart[1] -
        lineEnd[1] * lineStart[0]
    );
    
    const denominator = Math.sqrt(
        Math.pow(lineEnd[1] - lineStart[1], 2) +
        Math.pow(lineEnd[0] - lineStart[0], 2)
    );
    
    return numerator / denominator;
};
