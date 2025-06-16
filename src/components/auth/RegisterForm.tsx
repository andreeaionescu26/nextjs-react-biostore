'use client';

import React, { useState } from 'react';
import { useAuth, RegisterData } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface RegisterFormProps {
  redirectTo?: string; // Where to redirect after successful registration
  onSuccess?: () => void; // Optional callback after registration
}

export default function RegisterForm({ redirectTo = '/my-account', onSuccess }: RegisterFormProps) {
  const { state, register, clearError } = useAuth();
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  
  // Additional form state
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // Local form validation state
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    agreeToTerms?: string;
  }>({});

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    // Clear auth error when user starts typing
    if (state.error) {
      clearError();
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
    
    if (validationErrors.agreeToTerms) {
      setValidationErrors(prev => ({
        ...prev,
        agreeToTerms: undefined
      }));
    }
  };

  // Comprehensive form validation
  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {};
    
    // First name validation
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
        errors.phone = 'Please enter a valid phone number';
      }
    }
    
    // Terms agreement validation
    if (!agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form first
    if (!validateForm()) {
      return;
    }
    
    try {
      // Clean up phone number (remove spaces, dashes, etc.)
      const cleanedFormData = {
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone?.trim() || undefined,
      };
      
      await register(cleanedFormData);
      
      // Success! Clear form
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
      });
      setConfirmPassword('');
      setAgreeToTerms(false);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      } else {
        // Default redirect behavior
        router.push(redirectTo);
      }
      
    } catch (error) {
      // Error is already handled by the context
      console.log('Registration failed:', error);
    }
  };

  // Quick register helper for demo/testing
  const quickRegister = async () => {
    const demoData = {
      firstName: 'Demo',
      lastName: 'User',
      email: `demo${Date.now()}@example.com`,
      password: 'DemoPassword123',
      phone: '+44 20 1234 5678'
    };
    
    setFormData(demoData);
    setConfirmPassword(demoData.password);
    setAgreeToTerms(true);
    
    try {
      await register(demoData);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(redirectTo);
      }
    } catch (error) {
      console.log('Quick registration failed:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl  p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
          <p className="text-gray-600">Join our community of fireplace enthusiasts</p>
        </div>

        {/* Demo Account Creation (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-800 mb-2">Quick Demo Registration:</p>
            <button
              type="button"
              onClick={quickRegister}
              className="text-xs text-green-700 hover:text-green-900 hover:underline"
            >
              🚀 Create demo account with random email
            </button>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`
                  w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm
                  ${validationErrors.firstName || state.error
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-[#f58232] focus:border-[#f58232]'
                  }
                `}
                placeholder="First name"
                disabled={state.isLoading}
              />
              {validationErrors.firstName && (
                <p className="mt-1 text-xs text-red-600">{validationErrors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`
                  w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm
                  ${validationErrors.lastName || state.error
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-[#f58232] focus:border-[#f58232]'
                  }
                `}
                placeholder="Last name"
                disabled={state.isLoading}
              />
              {validationErrors.lastName && (
                <p className="mt-1 text-xs text-red-600">{validationErrors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`
                w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm
                ${validationErrors.email || state.error
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-[#f58232] focus:border-[#f58232]'
                }
              `}
              placeholder="Enter your email"
              disabled={state.isLoading}
            />
            {validationErrors.email && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.email}</p>
            )}
          </div>

          {/* Phone Field (Optional) */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`
                w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm
                ${validationErrors.phone
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-[#f58232] focus:border-[#f58232]'
                }
              `}
              placeholder="+44 20 1234 5678"
              disabled={state.isLoading}
            />
            {validationErrors.phone && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.phone}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`
                w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm
                ${validationErrors.password || state.error
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-[#f58232] focus:border-[#f58232]'
                }
              `}
              placeholder="Create a strong password"
              disabled={state.isLoading}
            />
            {validationErrors.password && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.password}</p>
            )}
            {/* Password requirements */}
            <p className="mt-1 text-xs text-gray-500">
              Must be 8+ characters with uppercase, lowercase, and number
            </p>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              className={`
                w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm
                ${validationErrors.confirmPassword
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-[#f58232] focus:border-[#f58232]'
                }
              `}
              placeholder="Confirm your password"
              disabled={state.isLoading}
            />
            {validationErrors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.confirmPassword}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div>
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={handleCheckboxChange}
                className={`
                  w-4 h-4 mt-0.5 text-[#f58232] border-gray-300 rounded focus:ring-[#f58232] focus:ring-2
                  ${validationErrors.agreeToTerms ? 'border-red-300' : ''}
                `}
                disabled={state.isLoading}
              />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <Link href="/terms-of-service" className="text-[#f58232] hover:text-[#e6742d] underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="text-[#f58232] hover:text-[#e6742d] underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {validationErrors.agreeToTerms && (
              <p className="mt-1 text-xs text-red-600">{validationErrors.agreeToTerms}</p>
            )}
          </div>

          {/* Auth Error Display */}
          {state.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-red-700">{state.error}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={state.isLoading}
            className={`
              w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200
              ${state.isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#f58232] hover:bg-[#e6742d] hover:shadow-lg transform hover:-translate-y-0.5'
              }
            `}
          >
            {state.isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating your account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="text-[#f58232] hover:text-[#e6742d] font-medium hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}