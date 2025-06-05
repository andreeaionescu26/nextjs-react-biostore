'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavigationMenu from '@/components/navigation/NavigationMenu'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-modern border-b border-gray-200/50' 
          : 'bg-white/80 backdrop-blur-sm'
        }
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              E-Commerce Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <NavigationMenu className="flex items-center space-x-1" />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button 
              className="group p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 relative overflow-hidden"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <div className="absolute inset-0 bg-blue-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></div>
            </button>

            {/* User Account Link */}
            <Link 
              href="/my-account" 
              className="group p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 relative overflow-hidden"
              aria-label="My Account"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <div className="absolute inset-0 bg-blue-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></div>
            </Link>

            {/* Cart Link with Item Count */}
            <Link 
              href="/cart" 
              className="group p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 relative overflow-hidden"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {/* Cart Badge */}
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-medium group-hover:scale-110 transition-transform duration-300">
                  3
                </span>
              </div>
              <div className="absolute inset-0 bg-blue-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></div>
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 relative overflow-hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-5 h-5">
                <span 
                  className={`absolute block w-5 h-0.5 bg-gray-600 transform transition-all duration-300 ${
                    isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                  }`}
                />
                <span 
                  className={`absolute block w-5 h-0.5 bg-gray-600 transform transition-all duration-300 ${
                    isOpen ? 'opacity-0' : 'translate-y-0'
                  }`}
                />
                <span 
                  className={`absolute block w-5 h-0.5 bg-gray-600 transform transition-all duration-300 ${
                    isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                  }`}
                />
              </div>
              <div className="absolute inset-0 bg-gray-50 scale-0 hover:scale-100 transition-transform duration-300 rounded-lg"></div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`
            lg:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}
          `}
        >
          <div className="border-t border-gray-200 pt-4">
            <NavigationMenu
              className="flex flex-col space-y-1"
              showLoadingState={false}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;