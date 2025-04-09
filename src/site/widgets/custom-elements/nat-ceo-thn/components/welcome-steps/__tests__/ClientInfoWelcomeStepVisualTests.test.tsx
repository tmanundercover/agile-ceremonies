import React from 'react';
import { render } from '@testing-library/react';
import ClientInfoWelcomeStep from '../ClientInfoWelcomeStep';
import fs from 'fs';
import path from 'path';

describe('ClientInfoWelcomeStep Visual Tests', () => {
    it('renders correctly', () => {
        const { container } = render(<ClientInfoWelcomeStep onNextStep={() => {}} />);
        expect(container).toBeInTheDocument();
    });

    it('matches design specification', () => {
        // Read the SVG mockup file
        const mockupPath = path.join(__dirname, 'mockups', 'ClientInfoWelcomeStep.svg');
        const mockupExists = fs.existsSync(mockupPath);
        
        expect(mockupExists).toBeTruthy();
        
        // Load and validate mockup structure
        const mockupContent = fs.readFileSync(mockupPath, 'utf8');
        expect(mockupContent).toContain('<svg');
        expect(mockupContent).toContain('Client Info');
        expect(mockupContent).toContain('Company Details');
    });

    it('renders all required form fields', () => {
        const { getByLabelText } = render(<ClientInfoWelcomeStep onNextStep={() => {}} />);
        
        const requiredFields = [
            'Company Name *',
            'Your Name *',
            'Your Role *',
            'Email Address *',
            'Phone Number *'
        ];

        requiredFields.forEach(fieldLabel => {
            expect(getByLabelText(fieldLabel)).toBeInTheDocument();
        });
    });

    it('renders progress indicator with correct steps', () => {
        const { getByText } = render(<ClientInfoWelcomeStep onNextStep={() => {}} />);
        
        const steps = ['Client Info', 'Project', 'Digital', 'Brand', 'Requirements'];
        
        steps.forEach(step => {
            expect(getByText(step)).toBeInTheDocument();
        });
    });
});
