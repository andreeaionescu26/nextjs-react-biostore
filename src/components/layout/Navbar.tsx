'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import SearchInput from '@/components/ui/SearchInput';
import { useCart } from '@/hooks/useCart';
import { useAuth, authHelpers } from '@/context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const pathname = usePathname();

  // Get cart item count
  const { state: cartState } = useCart();
  const { itemCount } = cartState;

  // Get authentication state
  const { state: authState, logout } = useAuth();
  const { isAuthentificated, user, isLoading } = authState;

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
    setShowSearch(false);
    setShowUserDropdown(false);
  }, [pathname]);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserDropdown && !(event.target as Element)?.closest('.user-dropdown')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserDropdown]);

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

  // Get search input styles based on context
  const getSearchStyles = () => {
    if (isVideoPage && !isScrolled) {
      // Over video: minimal glass effect
      return {
        container: 'max-w-sm transition-all duration-500 ease-out',
        input: `
          w-full px-4 py-2 pl-10 pr-3 text-sm
          ${searchFocused 
            ? 'bg-white/20 backdrop-blur-xl border-white/40 text-white placeholder-white/70' 
            : 'bg-transparent border-white/30 text-white/90 placeholder-white/50 hover:border-white/50'
          }
          border rounded-full
          focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/60
          transition-all duration-300 ease-out
        `,
        icon: `absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
          searchFocused ? 'text-white/80' : 'text-white/60'
        }`,
        clear: 'text-white/60 hover:text-white/90'
      };
    } else {
      // Normal state: subtle solid background
      return {
        container: 'max-w-md transition-all duration-500 ease-out',
        input: `
          w-full px-4 py-2.5 pl-10 pr-3 text-sm
          ${searchFocused 
            ? 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500 shadow-md' 
            : 'bg-neutral-50/80 border-neutral-200 text-neutral-700 placeholder-neutral-400 hover:bg-white hover:border-neutral-300'
          }
          border rounded-full
          focus:outline-none focus:ring-2 focus:ring-[#f58232]/20 focus:border-[#f58232]/40
          transition-all duration-300 ease-out backdrop-blur-sm
        `,
        icon: `absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
          searchFocused ? 'text-neutral-500' : 'text-neutral-400'
        }`,
        clear: 'text-neutral-400 hover:text-neutral-600'
      };
    }
  };

  const searchStyles = getSearchStyles();

  // Handle search toggle for mobile
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
  };

  // SearchInput with custom styling
  const StyledSearchInput = ({ isMobile = false }) => {
    return (
      <div className={searchStyles.container}>
        <SearchInput 
          placeholder={isMobile ? "Search..." : "Search products & guides"}
          maxResults={isMobile ? 5 : 6}
          onResultClick={() => {
            if (isMobile) setShowSearch(false);
            setSearchFocused(false);
          }}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="w-full"
          customStyles={{
            input: searchStyles.input,
            icon: searchStyles.icon,
            clear: searchStyles.clear,
            dropdown: `
              absolute top-full left-0 right-0 mt-2 z-50
              bg-white border border-neutral-200 rounded-xl shadow-lg
              max-h-96 overflow-y-auto
              ${isVideoPage && !isScrolled ? 'backdrop-blur-xl bg-white/95' : ''}
            `
          }}
        />
      </div>
    );
  };

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
        <div className="flex justify-between items-center py-4 lg:py-6">
          
          {/* Minimal Premium Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group relative z-10"
          >
            {/* Simplified Logo Icon */}
            <div className="relative">
              <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ease-out">
                {/* Flame icon with clean styling */}
                <svg 
                  className={`w-6 h-6 lg:w-8 lg:h-8 transition-all duration-500 ease-out ${
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
                text-xl lg:text-2xl xl:text-3xl font-light tracking-wide transition-all duration-500
                ${isVideoPage && !isScrolled 
                  ? 'text-white drop-shadow-lg group-hover:text-[#f58232]' 
                  : 'text-neutral-900 group-hover:text-[#f58232]'
                }
              `}>
                Bioethanol
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

          {/* Desktop Search - Subtle and Minimal */}
          <div className="hidden lg:block">
            <StyledSearchInput />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            
            {/* Mobile Search Toggle Button */}
            <button 
              className="lg:hidden group relative transition-all duration-300"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <svg
                className={`
                  w-5 h-5 lg:w-6 lg:h-6 transition-all duration-300
                  ${isVideoPage && !isScrolled 
                    ? 'text-white/90 hover:text-[#f58232] drop-shadow-sm' 
                    : 'text-neutral-600 hover:text-[#f58232]'
                  }
                  group-hover:scale-110 ${showSearch ? 'text-[#f58232]' : ''}
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

            {/* Account Button - Now with Authentication Logic */}
            <div className="relative user-dropdown">
              {isLoading ? (
                // Loading state
                <div className={`
                  w-5 h-5 lg:w-6 lg:h-6 rounded-full animate-pulse
                  ${isVideoPage && !isScrolled ? 'bg-white/30' : 'bg-gray-300'}
                `}></div>
              ) : isAuthentificated && user ? (
                // Logged in - Show user dropdown
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="group relative transition-all duration-300 flex items-center space-x-2"
                  aria-label="Account Menu"
                >
                  {/* User Avatar */}
                  <div className={`
                    w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center font-semibold text-sm
                    transition-all duration-300 group-hover:scale-110
                    ${isVideoPage && !isScrolled 
                      ? 'bg-white/20 text-white border-2 border-white/30' 
                      : 'bg-[#f58232] text-white border-2 border-transparent'
                    }
                  `}>
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                  
                  {/* User name (desktop only) */}
                  <span className={`
                    hidden lg:block text-sm font-medium transition-colors duration-300
                    ${isVideoPage && !isScrolled 
                      ? 'text-white/90 group-hover:text-white' 
                      : 'text-neutral-700 group-hover:text-neutral-900'
                    }
                  `}>
                    {user.firstName}
                  </span>
                  
                  {/* Dropdown arrow */}
                  <svg
                    className={`
                      w-4 h-4 transition-all duration-300
                      ${showUserDropdown ? 'rotate-180' : ''}
                      ${isVideoPage && !isScrolled 
                        ? 'text-white/70' 
                        : 'text-neutral-500'
                      }
                    `}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              ) : (
                // Not logged in - Show login button
                <Link 
                  href="/login" 
                  className="group relative transition-all duration-300 flex items-center space-x-2"
                  aria-label="Sign In"
                >
                  <svg
                    className={`
                      w-5 h-5 lg:w-6 lg:h-6 transition-all duration-300
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
                  <span className={`
                    hidden lg:block text-sm font-medium transition-colors duration-300
                    ${isVideoPage && !isScrolled 
                      ? 'text-white/90 group-hover:text-white' 
                      : 'text-neutral-700 group-hover:text-neutral-900'
                    }
                  `}>
                    Sign In
                  </span>
                </Link>
              )}

              {/* User Dropdown Menu */}
              {showUserDropdown && isAuthentificated && user && (
                <div className={`
                  absolute right-0 top-full mt-2 w-64 z-50
                  bg-white border border-neutral-200 rounded-xl shadow-lg
                  transform transition-all duration-200 ease-out
                  ${isVideoPage && !isScrolled ? 'backdrop-blur-xl bg-white/95' : ''}
                `}>
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-neutral-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#f58232] text-white rounded-full flex items-center justify-center font-semibold">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900">
                          {authHelpers.getDisplayName(user)}
                        </div>
                        <div className="text-sm text-neutral-600">{user.email}</div>
                        {user.role && (
                          <span className={`
                            inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1
                            ${user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-blue-100 text-blue-700'
                            }
                          `}>
                            {user.role === 'admin' ? '👑 Admin' : '🛒 Customer'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      href="/my-account"
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <svg className="w-4 h-4 mr-3 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Account
                    </Link>
                    
                    <Link
                      href="/my-account"
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <svg className="w-4 h-4 mr-3 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Orders
                    </Link>
                    
                    <Link
                      href="/my-account"
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <svg className="w-4 h-4 mr-3 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Wishlist
                    </Link>

                    <div className="border-t border-neutral-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button with Badge */}
            <Link 
              href="/cart" 
              className="group relative transition-all duration-300"
              aria-label="Shopping Cart"
            >
              <svg
                className={`
                  w-5 h-5 lg:w-6 lg:h-6 transition-all duration-300
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
              className="lg:hidden relative transition-all duration-300 ml-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-5 h-4">
                <span 
                  className={`
                    absolute block w-5 h-0.5 transform transition-all duration-300 ease-in-out
                    ${isOpen ? 'rotate-45 translate-y-1.5' : 'translate-y-0'}
                    ${isVideoPage && !isScrolled ? 'bg-white drop-shadow-sm' : 'bg-neutral-700'}
                  `}
                />
                <span 
                  className={`
                    absolute block w-5 h-0.5 transform transition-all duration-300 ease-in-out translate-y-1.5
                    ${isOpen ? 'opacity-0' : 'opacity-100'}
                    ${isVideoPage && !isScrolled ? 'bg-white drop-shadow-sm' : 'bg-neutral-700'}
                  `}
                />
                <span 
                  className={`
                    absolute block w-5 h-0.5 transform transition-all duration-300 ease-in-out translate-y-3
                    ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-0'}
                    ${isVideoPage && !isScrolled ? 'bg-white drop-shadow-sm' : 'bg-neutral-700'}
                  `}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Subtle slide-down */}
        <div 
          className={`
            lg:hidden overflow-hidden transition-all duration-500 ease-out
            ${showSearch ? 'max-h-20 pb-4' : 'max-h-0'}
          `}
        >
          <div className="pt-2">
            <StyledSearchInput isMobile={true} />
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
            border-t pt-6 mt-4
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
            
            {/* Mobile Auth Section */}
            <div className="mt-6 pt-6 border-t border-current border-opacity-20">
              {isAuthentificated && user ? (
                <div className="space-y-3">
                  <div className={`
                    text-sm font-medium
                    ${isVideoPage && !isScrolled ? 'text-white/90' : 'text-neutral-700'}
                  `}>
                    Welcome, {user.firstName}!
                  </div>
                  <Link
                    href="/my-account"
                    className={`
                      block w-full text-center py-3 px-6 font-medium text-base
                      transform hover:scale-105 transition-all duration-300 border-2 rounded-lg
                      ${isVideoPage && !isScrolled 
                        ? 'text-white border-white hover:bg-white hover:text-neutral-900 backdrop-blur-sm' 
                        : 'text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                      }
                    `}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`
                      block w-full text-center py-2 px-6 font-medium text-sm
                      transition-all duration-300 rounded-lg
                      ${isVideoPage && !isScrolled 
                        ? 'text-white/80 hover:text-white hover:bg-white/10' 
                        : 'text-red-600 hover:bg-red-50'
                      }
                    `}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`
                    block w-full text-center py-3 px-6 font-medium text-base
                    transform hover:scale-105 transition-all duration-300 border-2 rounded-lg
                    ${isVideoPage && !isScrolled 
                      ? 'text-[#f58232] border-[#f58232] hover:bg-[#f58232] hover:text-white backdrop-blur-sm' 
                      : 'text-[#f58232] border-[#f58232] hover:bg-[#f58232] hover:text-white'
                    }
                  `}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;