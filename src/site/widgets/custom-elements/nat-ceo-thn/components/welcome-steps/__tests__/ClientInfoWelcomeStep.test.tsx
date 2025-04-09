import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../../../../../test/test-utils';
import { ClientInfoWelcomeStep } from '../ClientInfoWelcomeStep';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { act } from "react-dom/test-utils";
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

expect.extend({ toMatchImageSnapshot });

describe('ClientInfoWelcomeStep', () => {
    const getInputByName = (name: string) => {
        return screen.getByRole('textbox', { name: new RegExp(name, 'i') });
    };

    const fillRequiredFields = (customValues = {}) => {
        const defaultValues = {
            companyName: 'Test Company',
            fullName: 'John Doe',
            role: 'Manager',
            phone: '1234567890',
            email: 'valid@email.com',
            ...customValues
        };

        Object.entries(defaultValues).forEach(([key, value]) => {
            const input = getInputByName(key === 'fullName' ? 'Your Name' : 
                          key === 'companyName' ? 'Company Name' :
                          key === 'role' ? 'Your Role' :
                          key === 'phone' ? 'Phone Number' :
                          'Email Address');
            fireEvent.change(input, { target: { name: key, value } });
        });

        return defaultValues;
    };

    describe('Rendering', () => {
        it('renders without crashing and displays all sections', () => {
            render(<ClientInfoWelcomeStep />);
            
            expect(screen.getByText('Tell us about you and your company')).toBeTruthy();
            expect(screen.getByText('Company Details')).toBeTruthy();
            expect(screen.getByText('Contact Information')).toBeTruthy();
            expect(screen.getByText('Location')).toBeTruthy();
        });
    });

    describe('Form Validation', () => {
        it('shows error messages for all required fields when submitting empty form', async () => {
            const onNextStep = jest.fn();
            render(<ClientInfoWelcomeStep onNextStep={onNextStep} />);

            await act(async () => {
                const form = screen.getByTestId('radix-form');
                fireEvent.submit(form);
            });

            await waitFor(() => {
                expect(screen.getAllByRole('alert')).toHaveLength(5);
                expect(onNextStep).not.toHaveBeenCalled();
            });
        });

        it('clears error message when user starts typing', async () => {
            render(<ClientInfoWelcomeStep />);
            
            await act(async () => {
                const form = screen.getByTestId('radix-form');
                fireEvent.submit(form);
            });

            await waitFor(() => {
                expect(screen.getByText('Company name is required')).toBeInTheDocument();
            });

            const input = getInputByName('Company Name');
            await act(async () => {
                fireEvent.change(input, {
                    target: { name: 'companyName', value: 'Test Company' }
                });
            });

            await waitFor(() => {
                expect(screen.queryByText('Company name is required')).not.toBeInTheDocument();
            });
        });
    });

    describe('Email Validation', () => {
        const testEmailFormats = async (email: string, shouldPass: boolean) => {
            const onNextStep = jest.fn();
            render(<ClientInfoWelcomeStep onNextStep={onNextStep} />);
            
            fillRequiredFields({ email });
            
            await act(async () => {
                const form = screen.getByTestId('radix-form');
                fireEvent.submit(form);
            });
            
            await waitFor(() => {
                if (shouldPass) {
                    expect(screen.queryByText('Invalid email format')).not.toBeInTheDocument();
                    expect(onNextStep).toHaveBeenCalled();
                } else {
                    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
                    expect(onNextStep).not.toHaveBeenCalled();
                }
            });
        };

        it.each([
            ['invalid-email', false],
            ['test@', false],
            ['@example.com', false],
            ['test@example', false],
            ['valid@email.com', true],
            ['valid+label@email.co.uk', true]
        ])('validates email format: %s', async (email, shouldPass) => {
            await testEmailFormats(email, shouldPass);
        });
    });

    describe('Form Submission', () => {
        it('successfully submits form with valid data', async () => {
            const consoleSpy = jest.spyOn(console, 'log');
            const onNextStep = jest.fn();
            render(<ClientInfoWelcomeStep onNextStep={onNextStep} />);

            const formData = fillRequiredFields();

            await act(async () => {
                const form = screen.getByTestId('radix-form');
                fireEvent.submit(form);
            });

            await waitFor(() => {
                expect(consoleSpy).toHaveBeenCalledWith(
                    'Form submitted:',
                    expect.objectContaining(formData)
                );
                expect(onNextStep).toHaveBeenCalledWith(expect.objectContaining(formData));
            });

            consoleSpy.mockRestore();
        });
    });

    describe('ClientInfoWelcomeStep visual comparison', () => {
        let browser: puppeteer.Browser;
        
        // Increase timeout for visual tests
        jest.setTimeout(15000);

        beforeAll(async () => {
            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
        });

        afterAll(async () => {
            await browser.close();
        });

        it('matches the component screenshot with the SVG mockup', async () => {
            try {
                // Render the component
                const { container } = render(<ClientInfoWelcomeStep />);

                // Create a new page
                const page = await browser.newPage();
                await page.setViewport({ width: 1024, height: 768 });

                try {
                    // Set the page content to the rendered component's HTML
                    await page.setContent(container.innerHTML, {
                        waitUntil: 'networkidle0',
                        timeout: 5000,
                    });

                    // Take a screenshot of the rendered component
                    const screenshot = await page.screenshot();

                    // Load the SVG mockup
                    const svgMockupPath = path.resolve(__dirname, 'mockups', 'ClientInfoWelcomeStep.svg');
                    const svgMockup = fs.readFileSync(svgMockupPath, 'utf8');

                    // Convert SVG to PNG
                    await page.setContent(svgMockup, {
                        waitUntil: 'networkidle0',
                        timeout: 5000,
                    });
                    const svgScreenshot = await page.screenshot();

                    // Compare the screenshots
                    expect(screenshot).toMatchImageSnapshot();
                    expect(svgScreenshot).toMatchImageSnapshot();
                } finally {
                    // Always close the page
                    await page.close();
                }
            } catch (error) {
                console.error('Visual comparison test failed:', error);
                throw error;
            }
        });
    });
});
