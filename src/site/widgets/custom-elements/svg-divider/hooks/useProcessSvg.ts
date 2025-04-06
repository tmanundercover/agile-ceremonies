import { useState, useCallback } from 'react';
import { SvgThumbnail, SubThumbnailMap } from '../types';

export const useProcessSvg = () => {
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [thumbnails, setThumbnails] = useState<SvgThumbnail[]>([]);
    const [selectedThumbnails, setSelectedThumbnails] = useState<SvgThumbnail[]>([]);
    const [componentCount, setComponentCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [subThumbnails, setSubThumbnails] = useState<SubThumbnailMap>({});

    const handleFileSelect = useCallback(async (file: File) => {
        setLoading(true);
        setError(null);

        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setSvgContent(content);
                
                // Parse SVG and extract components
                const parser = new DOMParser();
                const doc = parser.parseFromString(content, 'image/svg+xml');
                const svgElement = doc.querySelector('svg');
                const components = doc.querySelectorAll('path, rect, circle, ellipse');
                
                setComponentCount(components.length);
                
                // Create thumbnails from components with preserved SVG context
                const newThumbnails: SvgThumbnail[] = Array.from(components).map((component, index) => {
                    const svgContainer = svgElement?.cloneNode(false) as SVGElement;
                    const componentClone = component.cloneNode(true);
                    svgContainer.appendChild(componentClone);
                    
                    // Preserve viewBox and other relevant attributes
                    if (svgElement?.hasAttribute('viewBox')) {
                        svgContainer.setAttribute('viewBox', svgElement.getAttribute('viewBox')!);
                    }
                    // Set width and height if not present
                    if (!svgElement?.hasAttribute('width')) {
                        svgContainer.setAttribute('width', '100%');
                    }
                    if (!svgElement?.hasAttribute('height')) {
                        svgContainer.setAttribute('height', '100%');
                    }
                    
                    return {
                        id: `thumb-${index}`,
                        src: `data:image/svg+xml,${encodeURIComponent(svgContainer.outerHTML)}`,
                        disabled: false
                    };
                });
                
                setThumbnails(newThumbnails);
                setLoading(false);
            };
            
            reader.readAsText(file);
        } catch (err) {
            setError('Error processing SVG file');
            setLoading(false);
        }
    }, []);

    const handleThumbnailClick = useCallback((index: number) => {
        const thumbnail = thumbnails[index];
        if (!thumbnail.disabled) {
            setSelectedThumbnails(prev => [...prev, thumbnail]);
            setThumbnails(prev => prev.map((t, i) => 
                i === index ? { ...t, disabled: true } : t
            ));
        }
    }, [thumbnails]);

    const handleThumbnailRemove = useCallback((index: number) => {
        const removedThumbnail = selectedThumbnails[index];
        setSelectedThumbnails(prev => prev.filter((_, i) => i !== index));
        setThumbnails(prev => prev.map(t => 
            t.id === removedThumbnail.id ? { ...t, disabled: false } : t
        ));
    }, [selectedThumbnails]);

    const handleSubThumbnailClick = useCallback((parentId: string, subIndex: number) => {
        // Handle sub-thumbnail selection logic here
        console.log('Sub thumbnail clicked:', parentId, subIndex);
    }, []);

    return {
        svgContent,
        thumbnails,
        selectedThumbnails,
        componentCount,
        loading,
        error,
        handleFileSelect,
        handleThumbnailClick,
        handleThumbnailRemove,
        handleSubThumbnailClick
    };
};

