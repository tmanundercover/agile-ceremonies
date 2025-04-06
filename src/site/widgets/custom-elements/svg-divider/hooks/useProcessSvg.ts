import {useCallback, useState } from 'react';
import { SvgThumbnail } from '../types';

export const useProcessSvg = () => {
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [processedSvg, setProcessedSvg] = useState<SVGSVGElement | null>(null);
    const [thumbnails, setThumbnails] = useState<SvgThumbnail[]>([]);
    const [selectedThumbnails, setSelectedThumbnails] = useState<SvgThumbnail[]>([]);
    const [componentCount, setComponentCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [parentSvgProps, setParentSvgProps] = useState<{[key: string]: string}>({});

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

                    // Create a complete SVG wrapper with proper viewBox
                    const svgString = `
                        <svg xmlns="http://www.w3.org/2000/svg" 
                             viewBox="${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}"
                             width="100%" 
                             height="100%">
                            ${componentClone.outerHTML}
                        </svg>
                    `.trim().replace(/>\s+</g, '><').replace(/\s+/g, ' ');

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
                        disabled: false
                    };
                });

                setThumbnails(newThumbnails);
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

    return {
        svgContent,
        processedSvg,
        thumbnails,
        selectedThumbnails,
        componentCount,
        loading,
        error,
        parentSvgProps,
        handleFileSelect,
        handleThumbnailClick
    };
};
