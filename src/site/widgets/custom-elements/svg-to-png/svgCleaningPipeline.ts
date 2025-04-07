interface CleaningStep {
    name: string;
    process: (svg: string) => string;
}

interface CleaningMetrics {
    originalSize: number;
    currentSize: number;
    compressionRatio: number;
    stepName: string;
}

function trackMetrics(svg: string, stepName: string): CleaningMetrics {
    return {
        originalSize: svg.length,
        currentSize: svg.length,
        compressionRatio: 100,
        stepName
    };
}

function removeXmlDeclaration(svg: string): string {
    return svg.replace(/<\?xml[^>]*\?>/g, '').trim();
}

function normalizeQuotes(svg: string): string {
    return svg.replace(/'/g, '"');
}

function ensureValidSvgTag(svg: string): string {
    if (!svg.includes('<svg')) {
        return `<svg xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
    }
    return svg;
}

function extractSvgContent(svg: string): string {
    const match = svg.match(/<svg[\s\S]*?<\/svg>/i);
    return match ? match[0] : svg;
}

function normalizeNamespaces(svg: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');
    
    if (svgElement) {
        if (!svgElement.hasAttribute('xmlns')) {
            svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        }
        if (!svgElement.hasAttribute('xmlns:xlink') && svg.includes('xlink:')) {
            svgElement.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        }
    }
    
    return new XMLSerializer().serializeToString(doc);
}

function cleanAttributes(svg: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    
    const cleanValue = (value: string) => {
        return value
            .replace(/javascript:/gi, '')
            .replace(/data:/gi, '')
            .replace(/&colon;/gi, ':');
    };
    
    const elements = doc.getElementsByTagName('*');
    for (const el of Array.from(elements)) {
        for (const attr of Array.from(el.attributes)) {
            if (attr.value) {
                el.setAttribute(attr.name, cleanValue(attr.value));
            }
        }
    }
    
    return new XMLSerializer().serializeToString(doc);
}

function removeScriptElements(svg: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    
    const scripts = doc.getElementsByTagName('script');
    for (const script of Array.from(scripts)) {
        script.remove();
    }
    
    return new XMLSerializer().serializeToString(doc);
}

function normalizeViewBox(svg: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');
    
    if (svgElement && !svgElement.hasAttribute('viewBox') && 
        svgElement.hasAttribute('width') && svgElement.hasAttribute('height')) {
        const width = parseFloat(svgElement.getAttribute('width') || '0');
        const height = parseFloat(svgElement.getAttribute('height') || '0');
        if (width && height) {
            svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
        }
    }
    
    return new XMLSerializer().serializeToString(doc);
}

function optimizeSvgAttributes(svg: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');

    if (svgElement) {
        // Ensure essential attributes based on sample file analysis
        const essentialAttrs = ['width', 'height', 'xmlns'];
        essentialAttrs.forEach(attr => {
            if (!svgElement.hasAttribute(attr)) {
                switch (attr) {
                    case 'xmlns':
                        svgElement.setAttribute(attr, 'http://www.w3.org/2000/svg');
                        break;
                    case 'width':
                    case 'height':
                        svgElement.setAttribute(attr, '100%');
                        break;
                }
            }
        });

        // Clean transform attributes
        const elements = doc.querySelectorAll('[transform]');
        elements.forEach(el => {
            const transform = el.getAttribute('transform');
            if (transform) {
                // Normalize translate values
                el.setAttribute('transform', transform.replace(/\s+/g, ' ').trim());
            }
        });
    }

    return new XMLSerializer().serializeToString(doc);
}

function optimizeGradients(svg: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, 'image/svg+xml');
    
    // Optimize gradient definitions
    const gradients = doc.querySelectorAll('linearGradient, radialGradient');
    gradients.forEach(gradient => {
        // Ensure IDs are present
        if (!gradient.id) {
            gradient.id = `gradient-${Math.random().toString(36).substr(2, 9)}`;
        }
        
        // Normalize stop elements
        const stops = gradient.querySelectorAll('stop');
        stops.forEach(stop => {
            if (stop.style.cssText) {
                // Convert style attributes to direct attributes
                const color = stop.style.stopColor;
                const opacity = stop.style.stopOpacity;
                if (color) stop.setAttribute('stop-color', color);
                if (opacity) stop.setAttribute('stop-opacity', opacity);
                stop.removeAttribute('style');
            }
        });
    });

    return new XMLSerializer().serializeToString(doc);
}

export function cleanSvg(svg: string): string {
    const cleaningPipeline: CleaningStep[] = [
        { name: 'Remove XML Declaration', process: removeXmlDeclaration },
        { name: 'Normalize Quotes', process: normalizeQuotes },
        { name: 'Extract SVG Content', process: extractSvgContent },
        { name: 'Optimize SVG Attributes', process: optimizeSvgAttributes },
        { name: 'Optimize Gradients', process: optimizeGradients },
        { name: 'Ensure Valid SVG Tag', process: ensureValidSvgTag },
        { name: 'Normalize Namespaces', process: normalizeNamespaces },
        { name: 'Clean Attributes', process: cleanAttributes },
        { name: 'Remove Script Elements', process: removeScriptElements },
        { name: 'Normalize ViewBox', process: normalizeViewBox }
    ];

    return cleaningPipeline.reduce((result, step) => {
        try {
            return step.process(result);
        } catch (error) {
            console.warn(`Error in ${step.name}:`, error);
            return result;
        }
    }, svg);
}
