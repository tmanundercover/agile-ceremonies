// ...existing imports...

export function cleanSvgWithNewStrategy(svgString: string): CleanSvgResult {
    const diagnostics = {
        originalLength: svgString.length,
        cleanedLength: 0,
        hasSvgTag: false,
        hasXmlns: false,
        parseSuccess: false,
        svgElement: false,
        processingStep: 'Starting cleaning'
    };

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, 'image/svg+xml');
        const originalSvg = doc.querySelector('svg');

        if (!originalSvg) {
            throw new Error('No SVG element found');
        }

        // Create new SVG with same attributes as original
        const newDoc = document.implementation.createDocument(null, 'svg', null);
        const newSvg = newDoc.documentElement;
        
        // Copy attributes from original SVG
        Array.from(originalSvg.attributes).forEach(attr => {
            newSvg.setAttribute(attr.name, attr.value);
        });

        // Ensure xmlns is present
        if (!newSvg.hasAttribute('xmlns')) {
            newSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        }

        // Function to safely clone and append elements
        const safeCloneElement = (element: Element): Element | null => {
            try {
                const clone = element.cloneNode(false) as Element;
                
                // Copy attributes
                Array.from(element.attributes).forEach(attr => {
                    clone.setAttribute(attr.name, attr.value);
                });

                // Recursively process children
                element.childNodes.forEach(child => {
                    if (child.nodeType === Node.ELEMENT_NODE) {
                        const childClone = safeCloneElement(child as Element);
                        if (childClone) {
                            clone.appendChild(childClone);
                        }
                    } else if (child.nodeType === Node.TEXT_NODE) {
                        clone.appendChild(child.cloneNode(true));
                    }
                });

                return clone;
            } catch (error) {
                console.warn('Failed to clone element:', error);
                return null;
            }
        };

        // Process all child elements
        originalSvg.childNodes.forEach(child => {
            if (child.nodeType === Node.ELEMENT_NODE) {
                const cloned = safeCloneElement(child as Element);
                if (cloned) {
                    newSvg.appendChild(cloned);
                }
            }
        });

        const cleanedSvg = new XMLSerializer().serializeToString(newDoc);
        
        diagnostics.cleanedLength = cleanedSvg.length;
        diagnostics.hasSvgTag = true;
        diagnostics.hasXmlns = true;
        diagnostics.parseSuccess = true;
        diagnostics.svgElement = true;
        diagnostics.cleanedSvg = cleanedSvg;
        diagnostics.processingStep = 'Cleaning complete';

        return { cleanedSvg, diagnostics };
    } catch (error) {
        console.error('SVG cleaning failed:', error);
        diagnostics.processingStep = 'Cleaning failed';
        return { cleanedSvg: svgString, diagnostics };
    }
}
