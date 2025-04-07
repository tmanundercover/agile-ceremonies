import {useCallback, useState } from 'react';
import { SvgThumbnail } from '../types';

const getComponentContainers = (element: Element): string[] => {
    const containers: string[] = [];
    let parent = element.parentElement;
    
    while (parent && parent.tagName !== 'svg') {
        containers.unshift(parent.outerHTML.split('>')[0] + '>');
        parent = parent.parentElement;
    }
    
    return containers;
};

export const useProcessSvg = () => {
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [processedSvg, setProcessedSvg] = useState<SVGSVGElement | null>(null);
    const [thumbnails, setThumbnails] = useState<SvgThumbnail[]>([]);
    const [selectedThumbnails, setSelectedThumbnails] = useState<SvgThumbnail[]>([]);
    const [componentCount, setComponentCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [parentSvgProps, setParentSvgProps] = useState<{[key: string]: string}>({});
    const [originalSvgShell, setOriginalSvgShell] = useState<string | null>(null);
    const [originalContainer, setOriginalContainer] = useState<string | null>(null);
    const [processedResult, setProcessedResult] = useState<string | null>(null);

    const cleanupSvg = useCallback((svgElement: SVGSVGElement) => {
        // Remove empty groups
        const emptyGroups = svgElement.querySelectorAll('g:empty');
        emptyGroups.forEach(group => group.remove());

        // Remove hidden elements
        const hiddenElements = svgElement.querySelectorAll('[display="none"], [visibility="hidden"]');
        hiddenElements.forEach(el => el.remove());

        // Remove unused definitions
        const defs = svgElement.querySelector('defs');
        if (defs) {
            const defsIds = Array.from(defs.querySelectorAll('[id]')).map(el => el.id);
            const usedIds = new Set<string>();

            // Find all elements referencing ids
            svgElement.querySelectorAll('*').forEach(el => {
                ['href', 'xlink:href', 'fill', 'stroke', 'filter', 'mask', 'clip-path'].forEach(attr => {
                    const value = el.getAttribute(attr);
                    if (value?.startsWith('#')) {
                        usedIds.add(value.substring(1));
                    }
                });
            });

            // Remove unused definitions
            defsIds.forEach(id => {
                if (!usedIds.has(id)) {
                    const el = defs.querySelector(`#${id}`);
                    el?.remove();
                }
            });

            // Remove defs if empty
            if (!defs.children.length) {
                defs.remove();
            }
        }

        // Remove unnecessary metadata and comments
        svgElement.querySelectorAll('metadata, desc, title').forEach(el => el.remove());

        // Ensure viewBox is set
        if (!svgElement.getAttribute('viewBox')) {
            const width = svgElement.getAttribute('width') || '100%';
            const height = svgElement.getAttribute('height') || '100%';
            svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
        }

        return svgElement;
    }, []);

    const handleFileSelect = useCallback(async (file: File) => {
        setLoading(true);
        setError(null);

        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setSvgContent(content);

                const parser = new DOMParser();
                const doc = parser.parseFromString(content, 'image/svg+xml');
                const svgElement = doc.querySelector('svg');

                if (!svgElement) {
                    throw new Error('Invalid SVG file');
                }

                // Store parent SVG properties
                const props = Array.from(svgElement.attributes).reduce((acc, attr) => {
                    acc[attr.name] = attr.value;
                    return acc;
                }, {} as {[key: string]: string});
                setParentSvgProps(props);

                // Create SVG shell by removing all paths, rects, circles, etc.
                const shellElement = svgElement.cloneNode(true) as SVGSVGElement;
                const removeElements = shellElement.querySelectorAll('path, rect, circle, ellipse, polygon, polyline, line');
                removeElements.forEach(el => el.remove());
                setOriginalSvgShell(shellElement.innerHTML);

                // Hide parent SVG before processing
                svgElement.style.display = 'none';

                const processedElement = svgElement.cloneNode(true) as SVGSVGElement;
                const cleanedSvg = cleanupSvg(processedElement);

                // Remove style attribute after cleaning
                cleanedSvg.removeAttribute('style');

                // Optimize SVG attributes
                cleanedSvg.removeAttribute('xml:space');
                cleanedSvg.removeAttribute('version');
                cleanedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

                setProcessedSvg(cleanedSvg);

                const components = svgElement.querySelectorAll('path, rect, circle, ellipse, polygon, polyline, line');
                setComponentCount(components.length);

                const newThumbnails: SvgThumbnail[] = Array.from(components).map((component, index) => {
                    const componentClone = component.cloneNode(true) as SVGElement;
                    const bbox = (component as SVGGraphicsElement).getBBox();
                    
                    // Get all parent containers
                    const containers = getComponentContainers(component);

                    // Create a complete SVG wrapper with proper viewBox
                    const svgString = `
                        <svg xmlns="http://www.w3.org/2000/svg" 
                             viewBox="${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}"
                             width="100%" 
                             height="100%">
                            ${containers.join('\n')}
                                ${componentClone.outerHTML}
                            ${Array(containers.length).fill('</g>').join('\n')}
                        </svg>
                    `.trim();

                    const componentName = componentClone.id ||
                        componentClone.getAttribute('class') ||
                        `${componentClone.tagName}-${index + 1}`;

                    return {
                        id: `thumb-${index}`,
                        name: componentName,
                        src: `data:image/svg+xml,${encodeURIComponent(svgString)}`,
                        width: bbox.width,
                        height: bbox.height,
                        x: bbox.x,
                        y: bbox.y,
                        disabled: false,
                        containers: containers
                    };
                });

                setThumbnails(newThumbnails);

                // Store original container
                const containerElements = svgElement.querySelectorAll('g');
                if (containerElements.length > 0) {
                    // Find the outermost container that contains all paths
                    const mainContainer = Array.from(containerElements).find(container => {
                        const paths = container.querySelectorAll('path, rect, circle, ellipse, polygon, polyline, line');
                        return paths.length === componentCount;
                    });
                    if (mainContainer) {
                        setOriginalContainer(mainContainer.outerHTML.split('>')[0] + '>');
                    }
                }

                setLoading(false);

                setSvgContent(cleanedSvg.outerHTML);
            };

            reader.readAsText(file);
        } catch (err) {
            setError('Error processing SVG file');
            setLoading(false);
        }
    }, [cleanupSvg]);

    const handleThumbnailClick = useCallback((index: number) => {
        const thumbnail = thumbnails[index];
        if (thumbnail.disabled) {
            setSelectedThumbnails(prev => prev.filter(t => t.id !== thumbnail.id));
            setThumbnails(prev => prev.map((t, i) =>
                i === index ? { ...t, disabled: false } : t
            ));
        } else {
            setSelectedThumbnails(prev => [...prev, thumbnail]);
            setThumbnails(prev => prev.map((t, i) =>
                i === index ? { ...t, disabled: true } : t
            ));
        }
    }, [thumbnails]);

    const processLayeredView = useCallback(() => {
        if (!processedSvg || !selectedThumbnails.length) return;
        const layeredSvg = document.createElement('svg');
        Object.entries(parentSvgProps).forEach(([key, value]) => {
            layeredSvg.setAttribute(key, value);
        });
        
        if (originalSvgShell) {
            const shell = document.createElement('g');
            shell.innerHTML = originalSvgShell;
            layeredSvg.appendChild(shell);
        }

        selectedThumbnails.forEach(thumbnail => {
            const content = decodeURIComponent(thumbnail.src.split(',')[1]);
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'image/svg+xml');
            const element = doc.querySelector('svg > *');
            if (element) {
                layeredSvg.appendChild(element);
            }
        });

        setProcessedResult(layeredSvg.outerHTML);
    }, [processedSvg, selectedThumbnails, parentSvgProps, originalSvgShell]);

    const processOriginalSvg = useCallback(() => {
        if (!svgContent) return;
        setProcessedResult(svgContent);
    }, [svgContent]);

    const processIndividualComponents = useCallback(() => {
        if (!selectedThumbnails.length) return;
        
        const components = selectedThumbnails.map(thumbnail => {
            // Create a new SVG wrapper with the parent SVG properties
            const svgWrapper = document.createElement('svg');
            Object.entries(parentSvgProps).forEach(([key, value]) => {
                svgWrapper.setAttribute(key, value);
            });
            
            // Set viewBox based on the component's dimensions
            svgWrapper.setAttribute('viewBox', `${thumbnail.x} ${thumbnail.y} ${thumbnail.width} ${thumbnail.height}`);
            
            // Get the original content
            const content = decodeURIComponent(thumbnail.src.split(',')[1]);
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'image/svg+xml');
            const componentElement = doc.querySelector('svg > *:last-child');
            
            if (componentElement) {
                // If there are container elements, add them hierarchically
                if (thumbnail.containers && thumbnail.containers.length > 0) {
                    let currentContainer: Element | null = null;
                    
                    // Create container hierarchy from outside in
                    thumbnail.containers.forEach((containerHTML) => {
                        const containerDoc = parser.parseFromString(containerHTML, 'text/html');
                        const container = containerDoc.querySelector('g');
                        
                        if (container) {
                            if (!currentContainer) {
                                svgWrapper.appendChild(container);
                                currentContainer = container;
                            } else {
                                currentContainer.appendChild(container);
                                currentContainer = container;
                            }
                        }
                    });
                    
                    // Add the component to the innermost container
                    if (currentContainer) {
                        currentContainer.appendChild(componentElement);
                    }
                } else {
                    // If no containers, add component directly to SVG
                    svgWrapper.appendChild(componentElement);
                }
            }
            
            return svgWrapper.outerHTML;
        });
        
        setProcessedResult(components.join('\n'));
    }, [selectedThumbnails, parentSvgProps]);

    return {
        svgContent,
        processedSvg,
        thumbnails,
        selectedThumbnails,
        componentCount,
        loading,
        error,
        parentSvgProps,
        originalSvgShell,
        originalContainer,
        handleFileSelect,
        handleThumbnailClick,
        processedResult,
        processLayeredView,
        processOriginalSvg,
        processIndividualComponents
    };
};

