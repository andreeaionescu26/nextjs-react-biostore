'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import { useCart } from '@/hooks/useCart';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  //Get cart item count
  const { state } = useCart();
  const { itemCount } = state;

  // Check if we're on a page with hero video (like landing page)
  const isVideoPage = pathname === '/' || pathname.includes('/landing');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Dynamic navbar styles based on context
  const getNavbarStyles = () => {
    if (isVideoPage && !isScrolled) {
      // Over video: transparent with white text
      return {
        background: isHovered 
          ? 'bg-black/10 backdrop-blur-md' 
          : 'bg-transparent',
        textColor: 'text-white',
        logoColor: 'text-white',
        iconColor: 'text-white/90 hover:text-[#f58232]',
        accentColor: '#f58232'
      };
    } else {
      // Normal state: clean white background
      return {
        background: isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-neutral-100' 
          : 'bg-white/90 backdrop-blur-md',
        textColor: 'text-neutral-800',
        logoColor: 'text-neutral-900',
        iconColor: 'text-neutral-600 hover:text-[#f58232]',
        accentColor: '#f58232'
      };
    }
  };

  const styles = getNavbarStyles();

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out
        ${styles.background}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 lg:py-8">
          
          {/* Minimal Premium Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-4 group relative z-10"
          >
            {/* Simplified Logo Icon */}
            <div className="relative">
              <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ease-out">
                {/* Flame icon with clean styling */}
                <svg 
                  className={`w-8 h-8 transition-all duration-500 ease-out ${
                    isVideoPage && !isScrolled 
                      ? 'text-white drop-shadow-lg group-hover:text-[#f58232]' 
                      : 'text-[#f58232] group-hover:text-[#e6742d]'
                  }`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </div>
            
            {/* Clean Brand Text */}
            <div className="flex flex-col">
              <span className={`
                text-2xl lg:text-3xl font-light tracking-wide transition-all duration-500
                ${isVideoPage && !isScrolled 
                  ? 'text-white drop-shadow-lg group-hover:text-[#f58232]' 
                  : 'text-neutral-900 group-hover:text-[#f58232]'
                }
              `}>
                Biothanol
              </span>
              <span className={`
                text-xs lg:text-sm font-normal tracking-[0.2em] uppercase transition-colors duration-500
                ${isVideoPage && !isScrolled 
                  ? 'text-white/70 drop-shadow-md' 
                  : 'text-neutral-500'
                }
              `}>
                Eco Fireplaces
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu 
              className="flex items-center space-x-1" 
              isVideoOverlay={isVideoPage && !isScrolled}
              isScrolled={isScrolled}
            />
          </div>

          {/* Minimal Action Buttons */}
          <div className="flex items-center space-x-6">
            
            {/* Search Button */}
            <button 
              className="group relative transition-all duration-300"
              aria-label="Search"
            >
              <svg
                className={`
                  w-6 h-6 transition-all duration-300
                  ${isVideoPage && !isScrolled 
                    ? 'text-white/90 hover:text-[#f58232] drop-shadow-sm' 
                    : 'text-neutral-600 hover:text-[#f58232]'
                  }
                  group-hover:scale-110
                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Account Button */}
            <Link 
              href="/my-account" 
              className="group relative transition-all duration-300"
              aria-label="My Account"
            >
              <svg
                className={`
                  w-6 h-6 transition-all duration-300
                  ${isVideoPage && !isScrolled 
                    ? 'text-white/90 hover:text-[#f58232] drop-shadow-sm' 
                    : 'text-neutral-600 hover:text-[#f58232]'
                  }
                  group-hover:scale-110
                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>

            {/* Cart Button with Badge */}
            <Link 
              href="/cart" 
              className="group relative transition-all duration-300"
              aria-label="Shopping Cart"
            >
              <svg
                className={`
                  w-6 h-6 transition-all duration-300
                  ${isVideoPage && !isScrolled 
                    ? 'text-white/90 hover:text-[#f58232] drop-shadow-sm' 
                    : 'text-neutral-600 hover:text-[#f58232]'
                  }
                  group-hover:scale-110
                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              
              {/* Dynamic cart badge */}
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[1rem] h-4 bg-[#f58232] text-white rounded-full text-xs font-medium flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-sm px-1">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* Minimal Mobile Menu Button */}
            <button
              className="lg:hidden relative transition-all duration-300 ml-4"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-6 h-5">
                <span 
                  className={`
                    absolute block w-6 h-0.5 transform transition-all duration-300 ease-in-out
                    ${isOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'}
                    ${isVideoPage && !isScrolled ? 'bg-white drop-shadow-sm' : 'bg-neutral-700'}
                  `}
                />
                <span 
                  className={`
                    absolute block w-6 h-0.5 transform transition-all duration-300 ease-in-out translate-y-2
                    ${isOpen ? 'opacity-0' : 'opacity-100'}
                    ${isVideoPage && !isScrolled ? 'bg-white drop-shadow-sm' : 'bg-neutral-700'}
                  `}
                />
                <span 
                  className={`
                    absolute block w-6 h-0.5 transform transition-all duration-300 ease-in-out translate-y-4
                    ${isOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'}
                    ${isVideoPage && !isScrolled ? 'bg-white drop-shadow-sm' : 'bg-neutral-700'}
                  `}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Clean Mobile Navigation */}
        <div 
          className={`
            lg:hidden overflow-hidden transition-all duration-700 ease-out
            ${isOpen ? 'max-h-screen pb-8' : 'max-h-0'}
          `}
        >
          <div className={`
            border-t pt-8 mt-4
            ${isVideoPage && !isScrolled 
              ? 'border-white/20' 
              : 'border-neutral-200'
            }
          `}>
            <NavigationMenu
              className="flex flex-col space-y-1"
              showLoadingState={false}
              isVideoOverlay={isVideoPage && !isScrolled}
              isScrolled={isScrolled}
            />
            
            {/* Clean Mobile CTA */}
            <div className="mt-8 pt-8 border-t border-current border-opacity-20">
              <Link
                href="/contact"
                className={`
                  block w-full text-center py-4 px-6 font-medium text-lg
                  transform hover:scale-105 transition-all duration-300 border-2 rounded-lg
                  ${isVideoPage && !isScrolled 
                    ? 'text-[#f58232] border-[#f58232] hover:bg-[#f58232] hover:text-white backdrop-blur-sm' 
                    : 'text-[#f58232] border-[#f58232] hover:bg-[#f58232] hover:text-white'
                  }
                `}
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;