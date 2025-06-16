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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#F58232] border-t-transparent mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is already authenticated, show a message while redirecting
  if (state.isAuthentificated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Already Logged In</h2>
          <p className="text-gray-600 text-sm">Redirecting you to your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Auth Container */}
        <div className="relative rounded-3xl shadow-2xl bg-white overflow-hidden border border-gray-200">
          
          {/* Login Mode */}
          <div 
            className={`
              transition-all duration-700 ease-in-out transform
              ${isRegisterMode 
                ? 'translate-x-full opacity-0' 
                : 'translate-x-0 opacity-100'
              }
            `}
            style={{ display: isRegisterMode ? 'none' : 'block' }}
          >
            <div className="grid lg:grid-cols-2">
              
              {/* Login Form Side */}
              <div className="flex items-start justify-center p-8 lg:p-12 py-12 relative">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-[#F58232] rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 right-10 w-24 h-24 bg-emerald-500 rounded-full blur-3xl"></div>
                </div>
                
                <div className="w-full max-w-sm relative z-10">
                  <LoginForm 
                    redirectTo={redirectTo}
                    onSuccess={() => {
                      console.log('User logged in successfully!');
                    }}
                  />
                </div>
              </div>

              {/* Create Account Invitation */}
              <div className="bg-gradient-to-br from-[#F58232] via-orange-500 to-red-500 flex items-center justify-center p-8 lg:p-12 relative overflow-hidden min-h-[600px]">
                {/* Dynamic Background Pattern */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 -right-4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 -left-4 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
                </div>
                
                <div className="relative text-center text-white max-w-sm">
                  <div className="w-20 h-20 mx-auto mb-8 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm transform hover:scale-110 transition-transform duration-300 group">
                    <svg className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
                    New Here?
                  </h2>
                  <p className="text-white/90 mb-8 leading-relaxed text-lg">
                    Join thousands of fireplace enthusiasts! Create your account and unlock exclusive features.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      { icon: '🔥', text: 'Track your orders instantly' },
                      { icon: '❤️', text: 'Save your favorite products' },
                      { icon: '🎁', text: 'Get exclusive member offers' }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center text-white/90 group hover:text-white transition-colors">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-white/30 transition-colors">
                          <span className="text-sm">{feature.icon}</span>
                        </div>
                        <span className="text-sm font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={toggleMode}
                    disabled={isAnimating}
                    className="group relative w-full py-4 px-8 bg-white text-[#F58232] font-bold rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-orange-50 to-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                    <span className="relative flex items-center justify-center">
                      {isAnimating ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Switching...
                        </>
                      ) : (
                        <>
                          <span className="text-lg">Create Account</span>
                          <svg className="ml-3 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Register Mode */}
          <div 
            className={`
              transition-all duration-700 ease-in-out transform
              ${isRegisterMode 
                ? 'translate-x-0 opacity-100' 
                : '-translate-x-full opacity-0'
              }
            `}
            style={{ display: isRegisterMode ? 'block' : 'none' }}
          >
            <div className="grid lg:grid-cols-2">
              
              {/* Sign In Invitation */}
              <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 flex items-center justify-center p-8 lg:p-12 relative overflow-hidden min-h-[600px]">
                {/* Dynamic Background Pattern */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 -left-4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 -right-4 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-spin" style={{animationDuration: '25s'}}></div>
                </div>
                
                <div className="relative text-center text-white max-w-sm">
                  <div className="w-20 h-20 mx-auto mb-8 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm transform hover:scale-110 transition-transform duration-300 group">
                    <svg className="w-10 h-10 group-hover:-rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                    Welcome Back!
                  </h2>
                  <p className="text-white/90 mb-8 leading-relaxed text-lg">
                    Already part of our community? Sign in to access your personalized dashboard.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      { icon: '⚡', text: 'Instant access to your data' },
                      { icon: '🎯', text: 'Your saved preferences' },
                      { icon: '🔒', text: 'Secure and lightning fast' }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center text-white/90 group hover:text-white transition-colors">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-white/30 transition-colors">
                          <span className="text-sm">{feature.icon}</span>
                        </div>
                        <span className="text-sm font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={toggleMode}
                    disabled={isAnimating}
                    className="group relative w-full py-4 px-8 bg-white text-emerald-600 font-bold rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-green-50 to-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                    <span className="relative flex items-center justify-center">
                      {isAnimating ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Switching...
                        </>
                      ) : (
                        <>
                          <svg className="mr-3 w-5 h-5 transform group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                          </svg>
                          <span className="text-lg">Sign In Instead</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>

              {/* Register Form Side */}
              <div className="flex items-start justify-center p-8 lg:p-12 py-12 relative">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#F58232] rounded-full blur-3xl"></div>
                </div>
                
                <div className="w-full max-w-sm relative z-10">
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
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-[#F58232] transition-all duration-300 group mb-4 transform hover:scale-105"
          >
            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
            <Link 
              href="/contact" 
              className="hover:text-[#F58232] transition-colors duration-300 transform hover:scale-105"
            >
              Contact Support
            </Link>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
            <Link 
              href="/privacy-policy" 
              className="hover:text-emerald-600 transition-colors duration-300 transform hover:scale-105"
            >
              Privacy Policy
            </Link>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
            <Link 
              href="/terms-of-service" 
              className="hover:text-[#F58232] transition-colors duration-300 transform hover:scale-105"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}