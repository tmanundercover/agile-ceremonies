import React, {useRef, useState} from 'react';
import {Container, Flex, Text, TextField, Theme} from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import isEmail from 'validator/lib/isEmail';
import {Step, StepProgressIndicator} from './StepProgressIndicator';
import {ErrorText, ErrorTextField, FormContainer, FormFieldWrapper} from '../../styledComponents';

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

interface Props {
    onNextStep?: (data: FormData) => void;
}

export const ClientInfoWelcomeStep: React.FC<Props> = ({onNextStep}) => {
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
    const formRef = useRef<HTMLFormElement>(null);

    const steps: Step[] = [
        {number: 1, name: 'Client Info', active: true},
        {number: 2, name: 'Project', active: false},
        {number: 3, name: 'Digital', active: false},
        {number: 4, name: 'Brand', active: false},
        {number: 5, name: 'Requirements', active: false}
    ];

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Your name is required';
        }

        if (!formData.role.trim()) {
            newErrors.role = 'Your role is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required';
        } else if (!isEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formatPhoneNumber = (value: string): string => {
        const numbers = value.replace(/\D/g, '').substring(0, 10);
        if (numbers.length === 10) {
            return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
        }
        return numbers;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        let newValue = value;

        if (name === 'phone') {
            newValue = formatPhoneNumber(value);
        }

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Immediately validate email on change
        if (name === 'email' && value) {
            if (!isEmail(value)) {
                setErrors(prev => ({
                    ...prev,
                    email: 'Please enter a valid email address'
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    email: undefined
                }));
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = validateForm();

        if (formRef.current?.checkValidity() && isValid) {
            console.log('Form submitted:', formData);
            if (onNextStep) {
                onNextStep(formData);
            }
        }
    };

    const FieldErrorText = (props: { fieldName: string }) =>
        (<ErrorText size="1" as="p" role="alert" aria-label={`${props.fieldName} error`}>
            {errors[props.fieldName as keyof FormErrors]}
        </ErrorText>)

    return (
        <Theme accentColor="purple" grayColor="slate" radius="medium">
            <Container size="3" p="4">
                <Flex direction="column" gap="4">
                    <div>
                        <StepProgressIndicator steps={steps} progress={20}/>
                    </div>

                    <Form.Root ref={formRef} onSubmit={handleSubmit}>
                        <FormContainer>
                            <Flex direction="column" gap="6">
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
                                    <Flex gap="4">
                                        <FormFieldWrapper $width="50%">
                                            <Form.Field name="companyName">
                                                <Form.Label>Company Name *</Form.Label>
                                                <Form.Control asChild>
                                                    <ErrorTextField
                                                        size="3"
                                                        value={formData.companyName}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter company name"
                                                        $hasError={!!errors.companyName}
                                                        aria-label="Company Name *"
                                                        name="companyName"
                                                    />
                                                </Form.Control>
                                                {errors.companyName && (
                                                    <FieldErrorText fieldName={'companyName'}/>
                                                )}
                                            </Form.Field>
                                        </FormFieldWrapper>

                                        <FormFieldWrapper $width="50%">
                                            <Form.Field name="companyWebsite">
                                                <Form.Label>Company Website</Form.Label>
                                                <Form.Control asChild>
                                                    <TextField.Input
                                                        size="3"
                                                        value={formData.companyWebsite}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter website URL"
                                                        aria-label="Company Website"
                                                        name="companyWebsite"
                                                    />
                                                </Form.Control>
                                            </Form.Field>
                                        </FormFieldWrapper>
                                    </Flex>
                                </Flex>

                                {/* Contact Information */}
                                <Flex direction="column" gap="4">
                                    <Text size="3" weight="bold">Contact Information</Text>
                                    <Flex direction="column" gap="4">
                                        <Flex gap="4">
                                            <FormFieldWrapper $width="50%">
                                                <Form.Field name="fullName">
                                                    <Form.Label>Your Name *</Form.Label>
                                                    <Form.Control asChild>
                                                        <ErrorTextField
                                                            size="3"
                                                            value={formData.fullName}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter your full name"
                                                            $hasError={!!errors.fullName}
                                                            aria-label="Your Name *"
                                                            name="fullName"
                                                        />
                                                    </Form.Control>
                                                    {errors.fullName && (
                                                        <FieldErrorText fieldName={'fullName'}/>
                                                    )}
                                                </Form.Field>
                                            </FormFieldWrapper>

                                            <FormFieldWrapper $width="50%">
                                                <Form.Field name="role">
                                                    <Form.Label>Your Role *</Form.Label>
                                                    <Form.Control asChild>
                                                        <ErrorTextField
                                                            size="3"
                                                            value={formData.role}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter your role"
                                                            $hasError={!!errors.role}
                                                            aria-label="Your Role *"
                                                            name="role"
                                                        />
                                                    </Form.Control>
                                                    {errors.role && (
                                                        <FieldErrorText fieldName={'role'}/>
                                                    )}
                                                </Form.Field>
                                            </FormFieldWrapper>
                                        </Flex>

                                        <Flex gap="4">
                                            <FormFieldWrapper $width="50%">
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
                                                        <FieldErrorText fieldName="email" />
                                                    )}
                                                </Form.Field>
                                            </FormFieldWrapper>

                                            <FormFieldWrapper $width="50%">
                                                <Form.Field name="phone">
                                                    <Form.Label>Phone Number *</Form.Label>
                                                    <Form.Control asChild>
                                                        <ErrorTextField
                                                            size="3"
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter phone number"
                                                            $hasError={!!errors.phone}
                                                            aria-label="Phone Number *"
                                                            name="phone"
                                                        />
                                                    </Form.Control>
                                                    {errors.phone && (
                                                        <FieldErrorText fieldName={'phone'} />
                                                    )}
                                                </Form.Field>
                                            </FormFieldWrapper>
                                        </Flex>
                                    </Flex>
                                </Flex>

                                {/* Location */}
                                <Flex direction="column" gap="4">
                                    <Text size="3" weight="bold">Location</Text>
                                    <Form.Field name="address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control asChild>
                                            <TextField.Input
                                                size="3"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                placeholder="Enter street address"
                                                aria-label="Address"
                                                name="address"
                                            />
                                        </Form.Control>
                                    </Form.Field>

                                    <Flex gap="4">
                                        <FormFieldWrapper $width="33.33%">
                                            <Form.Field name="city">
                                                <Form.Label>City</Form.Label>
                                                <Form.Control asChild>
                                                    <TextField.Input
                                                        size="3"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter city"
                                                        aria-label="City"
                                                        name="city"
                                                    />
                                                </Form.Control>
                                            </Form.Field>
                                        </FormFieldWrapper>

                                        <FormFieldWrapper $width="33.33%">
                                            <Form.Field name="state">
                                                <Form.Label>State</Form.Label>
                                                <Form.Control asChild>
                                                    <TextField.Input
                                                        size="3"
                                                        value={formData.state}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter state"
                                                        aria-label="State"
                                                        name="state"
                                                    />
                                                </Form.Control>
                                            </Form.Field>
                                        </FormFieldWrapper>

                                        <FormFieldWrapper $width="33.33%">
                                            <Form.Field name="zipCode">
                                                <Form.Label>ZIP Code</Form.Label>
                                                <Form.Control asChild>
                                                    <TextField.Input
                                                        size="3"
                                                        value={formData.zipCode}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter ZIP code"
                                                        aria-label="ZIP Code"
                                                        name="zipCode"
                                                    />
                                                </Form.Control>
                                            </Form.Field>
                                        </FormFieldWrapper>
                                    </Flex>
                                </Flex>

                                {/* Submit Button */}
                                <Flex gap="4">

                                </Flex>
                            </Flex>
                        </FormContainer>
                    </Form.Root>
                </Flex>
            </Container>
        </Theme>
    );
};

export default ClientInfoWelcomeStep;
