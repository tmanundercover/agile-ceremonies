interface CleaningStep {
    name: string;
    process: (svg: string) => string;
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

export function cleanSvg(svg: string): string {
    const cleaningPipeline: CleaningStep[] = [
        { name: 'Remove XML Declaration', process: removeXmlDeclaration },
        { name: 'Normalize Quotes', process: normalizeQuotes },
        { name: 'Extract SVG Content', process: extractSvgContent },
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
