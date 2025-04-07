export interface ValidationDetails {
    structure: {
        hasSvgTag: boolean;
        hasValidNamespace: boolean;
        hasValidViewBox: boolean;
        hasValidDimensions: boolean;
    };
    content: {
        elementCount: number;
        hasDefinitions: boolean;
        hasScripts: boolean;
        hasExternalRefs: boolean;
    };
    optimization: {
        originalSize: number;
        optimizedSize: number;
        compressionRatio: number;
        removedElements: string[];
    };
    errors: string[];
    warnings: string[];
}

export interface ValidationResult {
    isValid: boolean;
    details: ValidationDetails;
}

export function validateSvg(svgContent: string): ValidationResult {
    const details: ValidationDetails = {
        structure: {
            hasSvgTag: false,
            hasValidNamespace: false,
            hasValidViewBox: false,
            hasValidDimensions: false
        },
        content: {
            elementCount: 0,
            hasDefinitions: false,
            hasScripts: false,
            hasExternalRefs: false
        },
        optimization: {
            originalSize: svgContent.length,
            optimizedSize: 0,
            compressionRatio: 0,
            removedElements: []
        },
        errors: [],
        warnings: []
    };

    // Parse SVG
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');

    // Check for parsing errors
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
        details.errors.push('SVG parsing error: Invalid XML structure');
        return { isValid: false, details };
    }

    // Get SVG root element
    const svgElement = doc.querySelector('svg');
    if (!svgElement) {
        details.errors.push('No SVG element found');
        return { isValid: false, details };
    }

    // Validate structure
    details.structure.hasSvgTag = true;
    details.structure.hasValidNamespace = svgElement.hasAttribute('xmlns');
    
    const viewBox = svgElement.getAttribute('viewBox');
    details.structure.hasValidViewBox = Boolean(viewBox && /^\s*\d+\s+\d+\s+\d+\s+\d+\s*$/.test(viewBox));
    
    const hasWidth = svgElement.hasAttribute('width');
    const hasHeight = svgElement.hasAttribute('height');
    details.structure.hasValidDimensions = hasWidth && hasHeight;

    if (!details.structure.hasValidNamespace) {
        details.errors.push('Missing xmlns attribute on SVG element');
    }

    if (!details.structure.hasValidViewBox && !details.structure.hasValidDimensions) {
        details.warnings.push('SVG lacks both viewBox and explicit dimensions');
    }

    // Validate content
    const allElements = doc.getElementsByTagName('*');
    details.content.elementCount = allElements.length;

    details.content.hasDefinitions = Boolean(doc.querySelector('defs'));
    details.content.hasScripts = Boolean(doc.querySelector('script'));
    
    if (details.content.hasScripts) {
        details.warnings.push('SVG contains script elements which may pose security risks');
    }

    // Check for external references
    const externalRefs = [
        'xlink:href',
        'href',
        'src',
        'data',
        'use'
    ].some(attr => doc.querySelector(`[${attr}]`));
    
    details.content.hasExternalRefs = externalRefs;
    if (externalRefs) {
        details.warnings.push('SVG contains external references which may not render correctly');
    }

    // Validate required sections for agile workflow diagram
    const requiredSections = [
        'Frontend Development',
        'Backend Development',
        'Testing & QA',
        'Development Workflows'
    ];

    const textElements = Array.from(doc.querySelectorAll('text'));
    const foundSections = new Set(
        textElements.map(el => el.textContent?.trim()).filter(Boolean)
    );

    requiredSections.forEach(section => {
        if (!Array.from(foundSections).some(text => text?.includes(section))) {
            details.warnings.push(`Missing required section: ${section}`);
        }
    });

    // Calculate optimization metrics
    const serializer = new XMLSerializer();
    const cleanedSvg = serializer.serializeToString(doc);
    details.optimization.optimizedSize = cleanedSvg.length;
    details.optimization.compressionRatio = cleanedSvg.length / svgContent.length;

    // Remove any empty elements or unused definitions
    const emptyElements = Array.from(allElements).filter(el => 
        el.children.length === 0 && !el.textContent?.trim()
    );
    details.optimization.removedElements = emptyElements.map(el => el.tagName);

    const isValid = details.errors.length === 0;

    return {
        isValid,
        details
    };
}
