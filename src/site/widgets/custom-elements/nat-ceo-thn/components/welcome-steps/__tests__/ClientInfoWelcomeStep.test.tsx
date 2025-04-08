import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ClientInfoWelcomeStep } from '../ClientInfoWelcomeStep';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import isEmail from 'validator/lib/isEmail';

expect.extend({ toMatchImageSnapshot });

describe('ClientInfoWelcomeStep', () => {
    beforeEach(() => {
        // Reset any mocks or test state
    });

    it('renders without crashing', () => {
        render(<ClientInfoWelcomeStep />);
        expect(screen.getByText('Tell us about you and your company')).toBeTruthy();
    });

    it('displays all form sections', () => {
        render(<ClientInfoWelcomeStep />);
        expect(screen.getByText('Company Details')).toBeTruthy();
        expect(screen.getByText('Contact Information')).toBeTruthy();
        expect(screen.getByText('Location')).toBeTruthy();
    });

    it('shows error messages for required fields when submitting empty form', async () => {
        render(<ClientInfoWelcomeStep />);
        
        const submitButton = screen.getByText('Next: Project Overview');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Company name is required')).toBeTruthy();
            expect(screen.getByText('Full name is required')).toBeTruthy();
            expect(screen.getByText('Role is required')).toBeTruthy();
            expect(screen.getByText('Email is required')).toBeTruthy();
            expect(screen.getByText('Phone number is required')).toBeTruthy();
        });
    });

    it('validates email format', async () => {
        render(<ClientInfoWelcomeStep />);
        
        // Fill out all required fields
        const companyNameInput = screen.getByPlaceholderText('Enter company name');
        const fullNameInput = screen.getByPlaceholderText('Enter your full name');
        const roleInput = screen.getByPlaceholderText('Enter your role');
        const phoneInput = screen.getByPlaceholderText('Enter phone number');
        const emailInput = screen.getByPlaceholderText('Enter your email');
        
        // Fill in valid data for required fields
        fireEvent.change(companyNameInput, { target: { value: 'Test Company' } });
        fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
        fireEvent.change(roleInput, { target: { value: 'Manager' } });
        fireEvent.change(phoneInput, { target: { value: '1234567890' } });

        // Test invalid email
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

        // Submit form
        const submitButton = screen.getByText('Next: Project Overview');
        fireEvent.click(submitButton);

        // Check for error message using role attribute
        await waitFor(() => {
            const errorMessage = screen.getByRole('alert');
            expect(errorMessage).toHaveTextContent('Invalid email format');
        });

        // Now test with valid email
        fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
        fireEvent.click(submitButton);

        // Error message should be gone
        await waitFor(() => {
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });
    });

    it('validates email format using validator.js', async () => {
        render(<ClientInfoWelcomeStep />);
        
        // Fill out all required fields except email
        const companyNameInput = screen.getByPlaceholderText('Enter company name');
        const fullNameInput = screen.getByPlaceholderText('Enter your full name');
        const roleInput = screen.getByPlaceholderText('Enter your role');
        const phoneInput = screen.getByPlaceholderText('Enter phone number');
        const emailInput = screen.getByPlaceholderText('Enter your email');
        
        fireEvent.change(companyNameInput, { target: { value: 'Test Company' } });
        fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
        fireEvent.change(roleInput, { target: { value: 'Manager' } });
        fireEvent.change(phoneInput, { target: { value: '1234567890' } });

        // Test various email formats
        const testCases = [
            { email: 'invalid-email', shouldPass: false },
            { email: 'test@', shouldPass: false },
            { email: '@example.com', shouldPass: false },
            { email: 'test@example', shouldPass: false },
            { email: 'valid@email.com', shouldPass: true },
            { email: 'valid+label@email.co.uk', shouldPass: true }
        ];

        for (const testCase of testCases) {
            fireEvent.change(emailInput, { target: { value: testCase.email } });
            
            const submitButton = screen.getByText('Next: Project Overview');
            fireEvent.click(submitButton);

            await waitFor(() => {
                const errorElement = screen.queryByText('Invalid email format');
                if (testCase.shouldPass) {
                    expect(errorElement).not.toBeInTheDocument();
                } else {
                    expect(errorElement).toBeInTheDocument();
                }
            });
        }
    });

    it('clears error message when user starts typing', async () => {
        render(<ClientInfoWelcomeStep />);
        
        const companyNameInput = screen.getByPlaceholderText('Enter company name');
        
        // First trigger error
        const submitButton = screen.getByText('Next: Project Overview');
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText('Company name is required')).toBeTruthy();
        });

        // Then clear error by typing
        fireEvent.change(companyNameInput, { target: { value: 'Test Company' } });
        
        await waitFor(() => {
            expect(screen.queryByText('Company name is required')).toBeFalsy();
        });
    });

    it('successfully submits form with valid data', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        render(<ClientInfoWelcomeStep />);

        // Fill in required fields
        fireEvent.change(screen.getByPlaceholderText('Enter company name'), {
            target: { value: 'Test Company' }
        });
        fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
            target: { value: 'John Doe' }
        });
        fireEvent.change(screen.getByPlaceholderText('Enter your role'), {
            target: { value: 'Manager' }
        });
        fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
            target: { value: 'john@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Enter phone number'), {
            target: { value: '1234567890' }
        });

        const submitButton = screen.getByText('Next: Project Overview');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(
                'Form submitted:',
                expect.objectContaining({
                    companyName: 'Test Company',
                    fullName: 'John Doe',
                    role: 'Manager',
                    email: 'john@example.com',
                    phone: '1234567890'
                })
            );
        });

        consoleSpy.mockRestore();
    });
});

