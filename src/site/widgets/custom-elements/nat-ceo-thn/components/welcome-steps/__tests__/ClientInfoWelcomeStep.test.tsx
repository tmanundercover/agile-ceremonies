import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClientInfoWelcomeStep } from '../ClientInfoWelcomeStep';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

describe('ClientInfoWelcomeStep', () => {
  const mockOnNextStep = jest.fn();

  beforeEach(() => {
    mockOnNextStep.mockClear();
  });

  it('renders all form fields correctly', () => {
    render(<ClientInfoWelcomeStep onNextStep={mockOnNextStep} />);
    
    // Check for required fields
    expect(screen.getByLabelText('Company Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Company Website')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Role *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address *')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number *')).toBeInTheDocument();
    
    // Check for optional address fields
    expect(screen.getByRole('textbox', { name: /^Address$/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'City' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'State' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'ZIP Code' })).toBeInTheDocument();
  });

  it('handles optional fields correctly', async () => {
    render(<ClientInfoWelcomeStep onNextStep={mockOnNextStep} />);
    
    // Fill in required fields
    await userEvent.type(screen.getByLabelText(/Company Name/i), 'Test Company');
    await userEvent.type(screen.getByLabelText(/Your Name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/Your Role/i), 'Manager');
    await userEvent.type(screen.getByLabelText(/Email Address/i), 'john@test.com');
    await userEvent.type(screen.getByLabelText(/Phone Number/i), '1234567890');
    
    // Fill in some optional fields
    await userEvent.type(screen.getByLabelText(/Company Website/i), 'www.test.com');
    await userEvent.type(screen.getByLabelText(/City/i), 'Test City');
    
    // Submit form
    fireEvent.click(screen.getByText(/Next: Project Overview/i));

    await waitFor(() => {
      expect(mockOnNextStep).toHaveBeenCalledWith(expect.objectContaining({
        companyWebsite: 'www.test.com',
        city: 'Test City',
        // Other required fields should be present too
      }));
    });
  });

  it('displays validation errors for required fields when submitting empty form', async () => {
    render(<ClientInfoWelcomeStep onNextStep={mockOnNextStep} />);
    
    fireEvent.click(screen.getByText(/Next: Project Overview/i));

    await waitFor(() => {
      expect(screen.getByText(/Company Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Your Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Your Role is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email Address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Phone Number is required/i)).toBeInTheDocument();
    });
    
    expect(mockOnNextStep).not.toHaveBeenCalled();
  });

  it('validates email format correctly', async () => {
    render(<ClientInfoWelcomeStep onNextStep={mockOnNextStep} />);
    
    // Fill required fields except email
    await userEvent.type(screen.getByLabelText(/Company Name/i), 'Test Company');
    await userEvent.type(screen.getByLabelText(/Your Name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/Your Role/i), 'Manager');
    await userEvent.type(screen.getByLabelText(/Phone Number/i), '1234567890');
    
    const emailInput = screen.getByLabelText(/Email Address/i);
    
    // Test invalid email
    await userEvent.type(emailInput, 'invalid@');
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
        const errorElement = screen.getByText('Please enter a valid email address');
        expect(errorElement).toBeInTheDocument();
    });
  });

  it('preserves email validation state on blur', async () => {
    render(<ClientInfoWelcomeStep onNextStep={mockOnNextStep} />);
    
    const emailInput = screen.getByLabelText(/Email Address/i);
    
    // Test invalid email
    await userEvent.type(emailInput, 'invalid@');
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
        const errorElement = screen.getByText('Please enter a valid email address');
        expect(errorElement).toBeInTheDocument();
    });
    
    // Test valid email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'valid@email.com');
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
        expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    });
  });

  it('formats phone number correctly', async () => {
    render(<ClientInfoWelcomeStep onNextStep={mockOnNextStep} />);
    
    const phoneInput = screen.getByLabelText(/Phone Number/i);
    await userEvent.type(phoneInput, '1234567890');
    
    expect(phoneInput).toHaveValue('(123) 456-7890');
  });

  it('preserves field values on re-render', async () => {
    const { rerender } = render(<ClientInfoWelcomeStep onNextStep={mockOnNextStep} />);
    
    await userEvent.type(screen.getByLabelText(/Company Name/i), 'Test Company');
    
    rerender(<ClientInfoWelcomeStep onNextStep={mockOnNextStep} />);
    
    expect(screen.getByLabelText(/Company Name/i)).toHaveValue('Test Company');
  });
});

