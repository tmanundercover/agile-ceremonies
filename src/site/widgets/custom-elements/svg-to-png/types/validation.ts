
export interface SvgValidationMetrics {
    elementCount: number;
    depth: number;
    uniqueElements: string[];
    attributeCount: number;
    fileSize: number;
}

export interface AgileWorkflowValidation {
    hasFrontend: boolean;
    hasBackend: boolean;
    hasTesting: boolean;
    hasWorkflow: boolean;
    sections: WorkflowSection[];
}

interface WorkflowSection {
    name: string;
    found: boolean;
    required: boolean;
}

export interface SecurityValidation {
    hasScripts: boolean;
    hasExternalRefs: boolean;
    hasEventHandlers: boolean;
    hasSuspiciousUrls: boolean;
    suspiciousAttributes: string[];
}

export const REQUIRED_SECTIONS = [
    'Frontend Development',
    'Backend Development',
    'Testing & QA',
    'Development Workflows'
];

export const SUSPICIOUS_ATTRIBUTES = [
    'javascript:',
    'data:',
    'eval(',
    'expression(',
    'onclick',
    'onload',
    'onmouseover',
    'onerror',
    'alert('
];

export const ALLOWED_ELEMENTS = [
    'svg',
    'g',
    'path',
    'rect',
    'circle',
    'ellipse',
    'line',
    'polyline',
    'polygon',
    'text',
    'tspan',
    'image',
    'defs',
    'linearGradient',
    'radialGradient',
    'stop',
    'clipPath',
    'pattern',
    'mask',
    'filter',
    'foreignObject',
    'desc',
    'title',
    'metadata'
];
