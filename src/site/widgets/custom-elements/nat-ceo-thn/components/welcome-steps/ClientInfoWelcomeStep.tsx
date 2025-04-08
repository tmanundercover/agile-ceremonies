import React, { useState } from 'react';
import { Theme, Container, Flex, Text, Button, TextField } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import styled from 'styled-components';
import isEmail from 'validator/lib/isEmail';
import { StepProgressIndicator, Step } from './StepProgressIndicator';

interface FormData {
    companyName: string;
    companyWebsite: string;
    fullName: string;
    role: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
}

interface FormErrors {
    companyName?: string;
    email?: string;
    fullName?: string;
    role?: string;
    phone?: string;
}

const ErrorText = styled(Text)`
  color: var(--red-9);
  margin-top: 4px;
`;

const ErrorTextField = styled(TextField.Input)<{ $hasError: boolean }>`
    &:focus {
        box-shadow: ${props => props.$hasError ? '0 0 0 2px var(--red-7)' : '0 0 0 2px var(--purple-7)'};
    }

    border-color: ${props => props.$hasError ? 'var(--red-7)' : 'var(--gray-7)'};
`;

export const ClientInfoWelcomeStep: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        companyWebsite: '',
        fullName: '',
        role: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const steps: Step[] = [
        { number: 1, name: 'Client Info', active: true },
        { number: 2, name: 'Project', active: false },
        { number: 3, name: 'Digital', active: false },
        { number: 4, name: 'Brand', active: false },
        { number: 5, name: 'Requirements', active: false }
    ];

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.role.trim()) {
            newErrors.role = 'Role is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!isEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle form submission
            console.log('Form submitted:', formData);
            // Proceed to next step
        }
    };

    return (
        <Theme accentColor="purple" grayColor="slate" radius="medium">
            <Container size="3" p="4">
                <Flex direction="column" gap="4">
                    <div>
                        <StepProgressIndicator steps={steps} progress={20} />
                    </div>

                    {/* Form Container */}
                    <Form.Root onSubmit={handleSubmit}>
                        <Flex 
                            direction="column" 
                            gap="6" 
                            style={{ 
                                background: 'white', 
                                padding: '32px',
                                borderRadius: '16px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                            }}
                        >
                            <div>
                                <h2><Text size="6" weight="bold">
                                    Tell us about you and your company
                                </Text></h2>
                                <Text size="2" color="gray">
                                    We'll use this information to better understand your needs
                                </Text>
                            </div>

                            {/* Company Information */}
                            <Flex direction="column" gap="4">
                                <Text size="3" weight="bold">Company Details</Text>
                                <Flex gap="4" wrap="wrap">
                                    <Form.Field name="companyName">
                                        <Form.Label>Company Name *</Form.Label>
                                        <Form.Control asChild>
                                            <ErrorTextField 
                                                size="3"
                                                value={formData.companyName}
                                                onChange={handleInputChange}
                                                placeholder="Enter company name"
                                                $hasError={!!errors.companyName}
                                            />
                                        </Form.Control>
                                        {errors.companyName && (
                                            <ErrorText size="1" as="p" role="alert">
                                                {errors.companyName}
                                            </ErrorText>
                                        )}
                                    </Form.Field>

                                    <Form.Field name="companyWebsite">
                                        <Form.Label>Company Website</Form.Label>
                                        <Form.Control asChild>
                                            <TextField.Input 
                                                size="3"
                                                value={formData.companyWebsite}
                                                onChange={handleInputChange}
                                                placeholder="Enter website URL"
                                            />
                                        </Form.Control>
                                    </Form.Field>
                                </Flex>
                            </Flex>

                            {/* Contact Information */}
                            <Flex direction="column" gap="4">
                                <Text size="3" weight="bold">Contact Information</Text>
                                <Flex gap="4" wrap="wrap">
                                    <Form.Field name="fullName">
                                        <Form.Label>Your Name *</Form.Label>
                                        <Form.Control asChild>
                                            <ErrorTextField 
                                                size="3"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="Enter your full name"
                                                $hasError={!!errors.fullName}
                                            />
                                        </Form.Control>
                                        {errors.fullName && (
                                            <ErrorText size="1" as="p" role="alert">
                                                {errors.fullName}
                                            </ErrorText>
                                        )}
                                    </Form.Field>

                                    <Form.Field name="role">
                                        <Form.Label>Your Role *</Form.Label>
                                        <Form.Control asChild>
                                            <ErrorTextField 
                                                size="3"
                                                value={formData.role}
                                                onChange={handleInputChange}
                                                placeholder="Enter your role"
                                                $hasError={!!errors.role}
                                            />
                                        </Form.Control>
                                        {errors.role && (
                                            <ErrorText size="1" as="p" role="alert">
                                                {errors.role}
                                            </ErrorText>
                                        )}
                                    </Form.Field>

                                    <Form.Field name="email">
                                        <Form.Label>Email Address *</Form.Label>
                                        <Form.Control asChild>
                                            <ErrorTextField 
                                                size="3"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Enter your email"
                                                $hasError={!!errors.email}
                                                aria-label="Email Address *"
                                            />
                                        </Form.Control>
                                        {errors.email && (
                                            <ErrorText size="1" as="p" role="alert">
                                                {errors.email}
                                            </ErrorText>
                                        )}
                                    </Form.Field>

                                    <Form.Field name="phone">
                                        <Form.Label>Phone Number *</Form.Label>
                                        <Form.Control asChild>
                                            <ErrorTextField 
                                                size="3"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Enter phone number"
                                                $hasError={!!errors.phone}
                                            />
                                        </Form.Control>
                                        {errors.phone && (
                                            <ErrorText size="1" as="p" role="alert">
                                                {errors.phone}
                                            </ErrorText>
                                        )}
                                    </Form.Field>
                                </Flex>
                            </Flex>

                            {/* Location */}
                            <Flex direction="column" gap="4">
                                <Text size="3" weight="bold">Location</Text>
                                <Flex direction="column" gap="4">
                                    <Form.Field name="address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control asChild>
                                            <TextField.Input 
                                                size="3"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                placeholder="Enter street address"
                                            />
                                        </Form.Control>
                                    </Form.Field>

                                    <Flex gap="4" wrap="wrap">
                                        <Form.Field name="city">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control asChild>
                                                <TextField.Input 
                                                    size="3"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter city"
                                                />
                                            </Form.Control>
                                        </Form.Field>

                                        <Form.Field name="state">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control asChild>
                                                <TextField.Input 
                                                    size="3"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter state"
                                                />
                                            </Form.Control>
                                        </Form.Field>

                                        <Form.Field name="zipCode">
                                            <Form.Label>ZIP Code</Form.Label>
                                            <Form.Control asChild>
                                                <TextField.Input 
                                                    size="3"
                                                    value={formData.zipCode}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter ZIP code"
                                                />
                                            </Form.Control>
                                        </Form.Field>
                                    </Flex>
                                </Flex>
                            </Flex>

                            {/* Submit Button */}
                            <Button 
                                size="3" 
                                style={{
                                    background: 'linear-gradient(90deg, #9333EA 0%, #A855F7 100%)',
                                    width: '100%'
                                }}
                                type="submit"
                            >
                                Next: Project Overview
                            </Button>
                        </Flex>
                    </Form.Root>
                </Flex>
            </Container>
        </Theme>
    );
};

export default ClientInfoWelcomeStep;
