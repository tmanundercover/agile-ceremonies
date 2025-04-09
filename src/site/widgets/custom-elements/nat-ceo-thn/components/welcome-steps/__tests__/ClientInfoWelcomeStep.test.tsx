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
});
