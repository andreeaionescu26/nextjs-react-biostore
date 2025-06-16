'use client';

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginFormProps {
    redirectTo?: string; 
    onSuccess?: () => void;
}

export default function LoginForm({ redirectTo = '/my-account', onSuccess }: LoginFormProps) {
    const { state, login, clearError } = useAuth();
    const router = useRouter();

    // form state
    const [ formData, setFormData ] = useState({
        email: '',
        password: '',
    });

    // local form validation state 
    const [validationErrors, setValidationErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

    // handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // clear validation error when user starts typing
        if (validationErrors[name as keyof typeof validationErrors]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }

        // clear auth error when  user starts typing
        if (state.error) {
            clearError();
        }
    };

    //  basic form validation
    const validateForm = (): boolean => {
        const errors: typeof validationErrors = {};

        // email validation 
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        //password validaiton
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password= 'Password must be at least 6 characters';
        }

        setValidationErrors(errors);
        return Object.keys(errors). length === 0;
    };

    // handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // validate form first 
        if (!validateForm()) {
            return;
        }

        try {
            await login(formData.email, formData.password);

            // Success! clear form and redirect
            setFormData({ email: '', password: '' });

            // call success callback if provided
            if (onSuccess) {
                onSuccess();
            } else {
                // default redirect behaviour
                router.push(redirectTo);
            }
        } catch (error) {
            // error is already handled by the context
            console.log('Login failed', error);
        }
    };

    // quick login helper for demo/testing
    const quickLogin = async (email: string, password: string) => {
        setFormData({ email, password });
        try {
            await login(email, password);
            if (onSuccess) {
                onSuccess();
            } else {
                router.push(redirectTo);
            }
        } catch (error) {
            console.log('Quick login failed:', error);
        }
    };

    return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Demo Accounts (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-800 mb-2">Demo Accounts:</p>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => quickLogin('john@example.com', 'password123')}
                className="block w-full text-left text-xs text-blue-700 hover:text-blue-900 hover:underline"
              >
                📧 andreea@example.com / password123
              </button>
              <button
                type="button"
                onClick={() => quickLogin('jane@example.com', 'password123')}
                className="block w-full text-left text-xs text-blue-700 hover:text-blue-900 hover:underline"
              >
                📧 jack@example.com / password123
              </button>
              <button
                type="button"
                onClick={() => quickLogin('admin@bioethanol.com', 'admin123')}
                className="block w-full text-left text-xs text-blue-700 hover:text-blue-900 hover:underline"
              >
                👤 casper-admin@bioethanol.com / admin123
              </button>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`
                w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors
                ${validationErrors.email || state.error
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-[#f58232] focus:border-[#f58232]'
                }
              `}
              placeholder="Enter your email"
              disabled={state.isLoading}
            />
            {validationErrors.email && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`
                w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors
                ${validationErrors.password || state.error
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-[#f58232] focus:border-[#f58232]'
                }
              `}
              placeholder="Enter your password"
              disabled={state.isLoading}
            />
            {validationErrors.password && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
            )}
          </div>

          {/* Auth Error Display */}
          {state.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-red-700">{state.error}</span>
              </div>
            </div>
          )}

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-[#f58232] border-gray-300 rounded focus:ring-[#f58232] focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link 
              href="/forgot-password" 
              className="text-sm text-[#f58232] hover:text-[#e6742d] font-medium"
            >
              Forgot password?
            </Link>
          </div>

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
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link 
              href="/register" 
              className="text-[#f58232] hover:text-[#e6742d] font-medium hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
    );
}