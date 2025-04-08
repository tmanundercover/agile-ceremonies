import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ClientInfoWelcomeStep } from '../ClientInfoWelcomeStep';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

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
        
        const emailInput = screen.getByTestId('email-input');
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        
        const submitButton = screen.getByText('Next: Project Overview');
        fireEvent.click(submitButton);

        await waitFor(() => {
            const errorMessage = screen.getByTestId('email-error');
            expect(errorMessage).toHaveTextContent('Invalid email format');
        });
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

