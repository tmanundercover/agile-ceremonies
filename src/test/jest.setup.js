import '@testing-library/jest-dom';
import React from 'react';
// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation((callback, options) => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
window.IntersectionObserver = mockIntersectionObserver;
// Add required DOM methods for Radix UI
Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    })),
});
// Add required DOM properties for form validation
Object.defineProperty(window.HTMLFormElement.prototype, 'checkValidity', {
    writable: true,
    value: () => true,
});
// Mock the ValidityState interface
Object.defineProperty(window.HTMLInputElement.prototype, 'validity', {
    writable: true,
    value: {
        valid: true,
        badInput: false,
        customError: false,
        patternMismatch: false,
        rangeOverflow: false,
        rangeUnderflow: false,
        stepMismatch: false,
        tooLong: false,
        tooShort: false,
        typeMismatch: false,
        valueMissing: false,
    },
});
jest.mock('@radix-ui/react-form', () => ({
    Root: React.forwardRef(({ children, onSubmit }, ref) => (React.createElement('form', {
        'data-testid': 'radix-form',
        onSubmit,
        ref
    }, children))),
    Field: React.forwardRef(({ children, name }, ref) => (React.createElement('div', {
        'data-field': name,
        ref
    }, children))),
    Label: React.forwardRef(({ children }, ref) => (React.createElement('label', { ref }, children))),
    Control: React.forwardRef(({ children, asChild }, ref) => {
        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children, { ref });
        }
        return React.createElement('input', { ref }, children);
    }),
    Submit: React.forwardRef(({ children }, ref) => (React.createElement('button', { type: 'submit', ref }, children))),
    Message: React.forwardRef(({ children }, ref) => (React.createElement('span', { role: 'alert', ref }, children)))
}));
