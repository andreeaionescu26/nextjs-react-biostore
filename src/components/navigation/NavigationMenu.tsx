'use client';

import { useState, useEffect, useRef } from 'react';
import  Link  from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationItem } from '@/types/navigation';
import { useNavigation } from '@/hooks/useNavigation';

interface NavigationMenuProps {
    className?: string;
    showLoadingState?: boolean;
}

// main navigation menu component that renders the navigation structure
// uses the useNaviagtion hook to get dynamic navigation data
export default function NavigationMenu({
    className = '',
    showLoadingState = true,
}: NavigationMenuProps) {
    const { navigationItems, isLoading, error } = useNavigation();
    const pathname = usePathname();
    const [ activeDropdown, setActiveDropdown ] = useState<string | null>(null);
    const [ isMobile, setIsMobile ] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    //detect mobile/desktop
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <768); 
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
    }, []);

    // handle loading state
    if (isLoading && showLoadingState) {
        return (
            <nav className={`navigation-menu ${className}`}>
                <div className="flex space-x-4">
                    {/*Loading skeletom*/}
                    {[1, 2, 3, 4].map((i) => (
                        <div 
                        key={i}
                        className="h-6 w-16 bg-gray-200 animate-pulse rounded"
                        />
                    ))}
                </div>
            </nav>
        );
    }

    // handle error state
    if (error) {
        return (
            <nav className={`navigation-menu ${className}`}>
                <div className="text-red-500">
                    Error loading navigation: {error}
                </div>
            </nav>
        );
    }

    // handle mouse enter for desktop hover
    const handleMouseEnter = (itemId: string) => {
        if(!isMobile) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            setActiveDropdown(itemId);
        }
    };

    // handle mouse leave for desktop hover
    const handleMouseLeave = () => {
        if(!isMobile) {
            timeoutRef.current = setTimeout(() => {
                setActiveDropdown(null);
            }, 150);
        }
    };

    // handle click for mobile
    const handleClick = (itemId: string, hasChildren: boolean) => {
        if(isMobile && hasChildren) {
            setActiveDropdown(activeDropdown === itemId ? null : itemId);
        };
    }

    // check if current path matches or is child of navigation item 
    const isActiveNavItem = (item: NavigationItem): boolean => {
        if (item.slug === '' && pathname === '/') {
            return true; // root item is active if on home page
        }

        if (item.slug !== '' && pathname.startsWith(`/${item.slug}`)) {
            return true; // active if path starts with item's slug
        }

        // check if any child item is active
        if (item.children) {
            return item.children.some(child => isActiveNavItem(child));
        }

        return false; // not active
    };

    // render a single navigation item (recursive for children)
    const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
        const isActive = isActiveNavItem(item);
        const hasChildren = item.children && item.children.length > 0;
        const isDropdownOpen = activeDropdown === item.id;
        const href = item.slug === '' ? '/' : `/${item.slug}`;

        return (
            <div key={item.id} 
            className="relative group"
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
            >
                < div className='flex items-center'>
                    {/*Main Navigation Link*/}
                    <Link
                    href={href}
                    onClick={() => handleClick(item.id, !!hasChildren)}
                    className={`
                          relative px-4 py-3 rounded-lg text-sm font-medium 
                          transition-all duration-300 ease-in-out
                          flex items-center space-x-1
                          hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50
                          hover:shadow-md hover:scale-105
                          ${isActive
                            ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md'
                            : 'text-gray-700 hover:text-blue-600'
                          }
                          ${level > 0 ? 'w-full justify-start' : ''}
                        `}
                    >
                       <span>{item.title}</span> 

                       {/*Active indicator */}
                       {isActive && level === 0 && (
                        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full'></div>
                       )}
                    </Link>

                    {/*Dropdown toggle button for items with children*/}
                    {hasChildren && (
                        <button
                        onClick={() => handleClick(item.id, true)}
                        className={`
                            ml-1 p-1 rounded-md hover:bg-gray-100 
                            transition-all duration-300 ease-in-out
                            ${isMobile ? 'block' : 'hidden group-hover:block'}
                        `}
                        aria-label={`Toggle ${item.title} menu`}
                        >
                            <svg
                              className={`w-4 h-4 transition-transform duration-300 ${
                                isDropdownOpen ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7-7-7-7"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Dropdown menu */}
                {hasChildren && (
                    <div 
                        className={`
                            ${level === 0 
                                ? `absolute left-0 top-full mt-2 bg-white border border-gray-200 
                                   rounded-xl shadow-2xl z-50 min-w-64 overflow-hidden
                                   backdrop-blur-sm bg-white/95
                                   ${isMobile 
                                       ? (isDropdownOpen ? 'block' : 'hidden')
                                       : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
                                   }
                                   transition-all duration-300 ease-out
                                   transform translate-y-2 group-hover:translate-y-0`
                                : `ml-4 mt-2 space-y-1 pl-4 border-l-2 border-gray-100
                                   ${isDropdownOpen ? 'block animate-slideIn' : 'hidden'}`
                            }
                        `}
                    >
                        {/* Dropdown arrow for top-level items */}
                        {level === 0 && (
                            <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                        )}
                        
                        <div className={level === 0 ? 'p-2' : ''}>
                            {item.children!.map((child, index) => (
                                <div 
                                    key={child.id}
                                    className={`
                                        ${level === 0 ? 'hover:bg-gray-50 rounded-lg transition-colors duration-200' : ''}
                                        ${level === 0 ? 'animation-delay-' + (index * 50) : ''}
                                    `}
                                    style={{
                                        animationDelay: level === 0 ? `${index * 50}ms` : '0ms'
                                    }}
                                >
                                    {renderNavigationItem(child, level + 1)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <nav className={`navigation-menu ${className}`}>
            <div className='flex items-center space-x-1'>
                {navigationItems.map(item => renderNavigationItem(item))}
            </div>

            {/* defug info in development */}
            {process.env.NODE_ENV === 'development' && (
                <div className='fixed bottom-4 right-4 bg-black text-white text-xs p-2 rounded opacity-50 max-w-xs'>
                    <div>Active: {pathname}</div>
                    <div>Items: {navigationItems.length}</div>
                    <div>Mobile: {isMobile ? 'yes' : 'no'}</div>
                    <div>Dropdown: {activeDropdown || 'None'}</div>
                </div>
            )}

            {/* Custom styles for animations */}
            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
                
                .animation-delay-50 {
                    animation-delay: 50ms;
                }
                
                .animation-delay-100 {
                    animation-delay: 100ms;
                }
                
                .animation-delay-150 {
                    animation-delay: 150ms;
                }
                
                .animation-delay-200 {
                    animation-delay: 200ms;
                }
                
                .animation-delay-250 {
                    animation-delay: 250ms;
                }
            `}</style>
        </nav>
    );
}
