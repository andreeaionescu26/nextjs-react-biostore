'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';

export default function AuthPage() {
  const { state } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get redirect URL from query params (e.g., /login?redirect=/my-account)
  const redirectTo = searchParams.get('redirect') || '/my-account';
  
  // State for toggling between login and register
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // If user is already logged in, redirect them
  useEffect(() => {
    if (state.isAuthentificated && !state.isLoading) {
      router.push(redirectTo);
    }
  }, [state.isAuthentificated, state.isLoading, router, redirectTo]);

  // Handle the toggle animation
  const toggleMode = () => {
    setIsAnimating(true);
    
    // After animation starts, change the mode
    setTimeout(() => {
      setIsRegisterMode(!isRegisterMode);
      setIsAnimating(false);
    }, 200);
  };

  // Show loading spinner while checking authentication
  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent mx-auto mb-3"></div>
          <p className="text-slate-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is already authenticated, show a message while redirecting
  if (state.isAuthentificated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">Already Logged In</h2>
          <p className="text-slate-600 text-sm">Redirecting you to your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      
      {/* Main Content - Centered with no gaps */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          
          {/* Auth Container - Dynamic height based on content */}
          <div className="relative rounded-3xl shadow-2xl bg-white overflow-hidden">
            
            {/* Login Mode */}
            {!isRegisterMode && (
              <div 
                className={`
                  transition-all duration-500 ease-out transform
                  ${isRegisterMode 
                    ? 'translate-x-full opacity-0' 
                    : 'translate-x-0 opacity-100'
                  }
                `}
              >
                <div className="grid lg:grid-cols-2 min-h-[600px]">
                  
                  {/* Login Form Side */}
                  <div className="flex items-center justify-center p-8 lg:p-12">
                    <div className="w-full max-w-sm">
                      <LoginForm 
                        redirectTo={redirectTo}
                        onSuccess={() => {
                          console.log('User logged in successfully!');
                        }}
                      />
                    </div>
                  </div>

                  {/* Create Account Invitation */}
                  <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 -right-4 w-80 h-80 bg-white rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 -left-4 w-60 h-60 bg-white rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="relative text-center text-white">
                      <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-4">New Here?</h2>
                      <p className="text-white/90 mb-8 leading-relaxed">
                        Join thousands of fireplace enthusiasts! Create your account and unlock exclusive features.
                      </p>
                      
                      <div className="space-y-3 mb-8">
                        {[
                          'Track your orders instantly',
                          'Save your favorite products',
                          'Get exclusive member offers'
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center justify-center text-white/90">
                            <div className="w-1 h-1 bg-white rounded-full mr-3"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button
                        onClick={toggleMode}
                        disabled={isAnimating}
                        className="group relative w-full py-4 px-6 bg-white text-orange-600 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white to-orange-50 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        <span className="relative flex items-center justify-center">
                          {isAnimating ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Loading...
                            </>
                          ) : (
                            <>
                              <span>Create Account</span>
                              <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Register Mode */}
            {isRegisterMode && (
              <div 
                className={`
                  transition-all duration-500 ease-out transform
                  ${isRegisterMode 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-full opacity-0'
                  }
                `}
              >
                <div className="grid lg:grid-cols-2">
                  
                  {/* Sign In Invitation */}
                  <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 flex items-center justify-center p-8 lg:p-12 relative overflow-hidden min-h-[600px]">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 -left-4 w-80 h-80 bg-white rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 -right-4 w-60 h-60 bg-white rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="relative text-center text-white">
                      <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
                      <p className="text-white/90 mb-8 leading-relaxed">
                        Already part of our community? Sign in to access your personalized dashboard.
                      </p>
                      
                      <div className="space-y-3 mb-8">
                        {[
                          'Instant access to your data',
                          'Your saved preferences',
                          'Secure and lightning fast'
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center justify-center text-white/90">
                            <div className="w-1 h-1 bg-white rounded-full mr-3"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button
                        onClick={toggleMode}
                        disabled={isAnimating}
                        className="group relative w-full py-4 px-6 bg-white text-blue-600 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        <span className="relative flex items-center justify-center">
                          {isAnimating ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Loading...
                            </>
                          ) : (
                            <>
                              <svg className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                              </svg>
                              <span>Sign In Instead</span>
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Register Form Side */}
                  <div className="flex items-start justify-center p-8 lg:p-12 py-8">
                    <div className="w-full max-w-sm">
                      
                      <RegisterForm 
                        redirectTo={redirectTo}
                        onSuccess={() => {
                          console.log('User registered successfully!');
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Links - Always at bottom */}
      <div className="flex-shrink-0 pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back to Home */}
          <div className="text-center mb-4">
            <Link 
              href="/" 
              className="inline-flex items-center text-slate-600 hover:text-orange-600 transition-colors duration-200 group"
            >
              <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>
          
          {/* Help Links */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-6 text-xs text-slate-500">
              <Link 
                href="/contact" 
                className="hover:text-slate-700 transition-colors duration-200"
              >
                Contact Support
              </Link>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <Link 
                href="/privacy-policy" 
                className="hover:text-slate-700 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <Link 
                href="/terms-of-service" 
                className="hover:text-slate-700 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}