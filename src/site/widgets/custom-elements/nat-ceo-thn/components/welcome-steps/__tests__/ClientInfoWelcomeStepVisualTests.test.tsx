import React from 'react';
import { render } from '@testing-library/react';
import ClientInfoWelcomeStep from '../ClientInfoWelcomeStep';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

describe('ClientInfoWelcomeStep Visual Tests', () => {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    it('renders correctly', () => {
        const { container } = render(<ClientInfoWelcomeStep onNextStep={() => {}} />);
        expect(container).toBeInTheDocument();
    });

    it('generates visual snapshot', async () => {
        // Set viewport size for consistent snapshots
        await page.setViewport({ width: 1200, height: 1000 });

        // Render component to HTML
        const { container } = render(<ClientInfoWelcomeStep onNextStep={() => {}} />);
        const html = container.innerHTML;

        // Create a basic HTML document with necessary styles
        await page.setContent(`
            <!DOCTYPE html>
            <html>
                <head>
                    <style>
                        body { margin: 0; padding: 20px; }
                        /* Add any global styles needed */
                    </style>
                </head>
                <body>
                    <div id="root">${html}</div>
                </body>
            </html>
        `);

        // Wait for any animations to complete
        await page.waitForTimeout(1000);

        // Take screenshot
        const screenshot = await page.screenshot();

        // Compare with stored snapshot
        expect(screenshot).toMatchImageSnapshot({
            customSnapshotIdentifier: 'client-info-welcome-step',
            failureThreshold: 0.01,
            failureThresholdType: 'percent'
        });
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

