import { 
    SvgValidationMetrics, 
    AgileWorkflowValidation, 
    SecurityValidation,
    REQUIRED_SECTIONS,
    SUSPICIOUS_ATTRIBUTES,
    ALLOWED_ELEMENTS
} from './types/validation';

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
    metrics: SvgValidationMetrics;
    workflow: AgileWorkflowValidation;
    security: SecurityValidation;
}

export interface ValidationResult {
    isValid: boolean;
    details: ValidationDetails;
}

function sanitizeXmlContent(content: string): string {
    return content
        .replace(/&(?!(amp;|lt;|gt;|quot;|#\d+;|#x[\da-f]+;))/gi, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
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
        warnings: [],
        metrics: {
            elementCount: 0,
            depth: 0,
            uniqueElements: [],
            attributeCount: 0,
            fileSize: svgContent.length
        },
        workflow: {
            hasFrontend: false,
            hasBackend: false,
            hasTesting: false,
            hasWorkflow: false,
            sections: REQUIRED_SECTIONS.map(name => ({
                name,
                found: false,
                required: true
            }))
        },
        security: {
            hasScripts: false,
            hasExternalRefs: false,
            hasEventHandlers: false,
            hasSuspiciousUrls: false,
            suspiciousAttributes: []
        }
    };

    try {
        // Sanitize content before parsing
        const sanitizedContent = sanitizeXmlContent(svgContent);
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(sanitizedContent, 'image/svg+xml');

        const parserError = doc.querySelector('parsererror');
        if (parserError) {
            details.errors.push(`SVG parsing error: ${parserError.textContent?.trim()}`);
            return { isValid: false, details };
        }

        // Validate SVG structure
        const svgElement = validateStructure(doc, details);
        if (!svgElement) return { isValid: false, details };

        // Collect metrics
        details.metrics = collectMetrics(doc);

        // Validate security
        details.security = validateSecurity(doc);
        if (details.security.hasScripts || details.security.hasSuspiciousUrls) {
            details.errors.push('SVG contains potentially unsafe content');
        }

        // Validate workflow sections
        details.workflow = validateWorkflowSections(doc);
        if (!details.workflow.hasTesting || !details.workflow.hasWorkflow) {
            details.warnings.push('Missing critical workflow sections');
        }

        // Validate element types
        validateElements(doc, details);

        // Custom validation for agile workflow diagram
        validateAgileWorkflowContent(doc, details);

        const isValid = details.errors.length === 0;

        return { isValid, details };
    } catch (error) {
        details.errors.push(`Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return { isValid: false, details };
    }
}

function validateStructure(doc: Document, details: ValidationDetails): SVGSVGElement | null {
    const svgElement = doc.querySelector('svg');
    if (!svgElement) {
        details.errors.push('No SVG element found');
        return null;
    }

    if (!svgElement.hasAttribute('xmlns')) {
        details.errors.push('Missing xmlns attribute');
    }

    const viewBox = svgElement.getAttribute('viewBox');
    if (!viewBox && (!svgElement.hasAttribute('width') || !svgElement.hasAttribute('height'))) {
        details.warnings.push('Missing viewBox or dimensions');
    }

    return svgElement as SVGSVGElement;
}

function collectMetrics(doc: Document): SvgValidationMetrics {
    const elements = doc.getElementsByTagName('*');
    const uniqueElements = new Set<string>();
    let maxDepth = 0;
    let attributeCount = 0;

    function calculateDepth(element: Element): number {
        let depth = 0;
        let current = element;
        while (current.parentElement) {
            depth++;
            current = current.parentElement;
        }
        return depth;
    }

    Array.from(elements).forEach(el => {
        uniqueElements.add(el.tagName.toLowerCase());
        attributeCount += el.attributes.length;
        maxDepth = Math.max(maxDepth, calculateDepth(el));
    });

    return {
        elementCount: elements.length,
        depth: maxDepth,
        uniqueElements: Array.from(uniqueElements),
        attributeCount,
        fileSize: new XMLSerializer().serializeToString(doc).length
    };
}

function validateSecurity(doc: Document): SecurityValidation {
    const security: SecurityValidation = {
        hasScripts: false,
        hasExternalRefs: false,
        hasEventHandlers: false,
        hasSuspiciousUrls: false,
        suspiciousAttributes: []
    };

    const elements = doc.getElementsByTagName('*');
    Array.from(elements).forEach(el => {
        // Check for scripts
        if (el.tagName.toLowerCase() === 'script') {
            security.hasScripts = true;
        }

        // Check attributes
        Array.from(el.attributes).forEach(attr => {
            const value = attr.value.toLowerCase();
            if (SUSPICIOUS_ATTRIBUTES.some(sus => value.includes(sus))) {
                security.suspiciousAttributes.push(attr.name);
            }
            if (value.includes('javascript:') || value.includes('data:')) {
                security.hasSuspiciousUrls = true;
            }
            if (attr.name.startsWith('on')) {
                security.hasEventHandlers = true;
            }
        });
    });

    return security;
}

function validateWorkflowSections(doc: Document): AgileWorkflowValidation {
    const workflow: AgileWorkflowValidation = {
        hasFrontend: false,
        hasBackend: false,
        hasTesting: false,
        hasWorkflow: false,
        sections: REQUIRED_SECTIONS.map(name => ({
            name,
            found: false,
            required: true
        }))
    };

    const textElements = Array.from(doc.querySelectorAll('text'));
    const foundSections = new Set(
        textElements.map(el => el.textContent?.trim()).filter(Boolean)
    );

    REQUIRED_SECTIONS.forEach(section => {
        if (Array.from(foundSections).some(text => text?.includes(section))) {
            workflow.sections.find(s => s.name === section)!.found = true;
        }
    });

    workflow.hasFrontend = workflow.sections.some(s => s.name === 'Frontend Development' && s.found);
    workflow.hasBackend = workflow.sections.some(s => s.name === 'Backend Development' && s.found);
    workflow.hasTesting = workflow.sections.some(s => s.name === 'Testing & QA' && s.found);
    workflow.hasWorkflow = workflow.sections.some(s => s.name === 'Development Workflows' && s.found);

    return workflow;
}

function validateElements(doc: Document, details: ValidationDetails): void {
    const elements = doc.getElementsByTagName('*');
    Array.from(elements).forEach(el => {
        if (!ALLOWED_ELEMENTS.includes(el.tagName.toLowerCase())) {
            details.errors.push(`Disallowed element: ${el.tagName}`);
        }
    });
}

function validateAgileWorkflowContent(doc: Document, details: ValidationDetails): void {
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
}
