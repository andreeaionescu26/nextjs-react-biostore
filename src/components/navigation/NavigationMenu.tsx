'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationItem } from '@/types/navigation';
import { useNavigation } from '@/hooks/useNavigation';

interface NavigationMenuProps {
    className?: string;
    showLoadingState?: boolean;
    isVideoOverlay?: boolean;
    isScrolled?: boolean;
}

export default function NavigationMenu({
    className = '',
    showLoadingState = true,
    isVideoOverlay = false,
    isScrolled = false,
}: NavigationMenuProps) {
    const { navigationItems, isLoading, error } = useNavigation();
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // Detect mobile/desktop
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle loading state
    if (isLoading && showLoadingState) {
        return (
            <nav className={`navigation-menu ${className}`}>
                <div className="flex space-x-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div 
                            key={i}
                            className={`
                                h-5 w-16 animate-pulse rounded
                                ${isVideoOverlay 
                                    ? 'bg-white/30' 
                                    : 'bg-neutral-200'
                                }
                            `}
                        />
                    ))}
                </div>
            </nav>
        );
    }

    // Handle error state
    if (error) {
        return (
            <nav className={`navigation-menu ${className}`}>
                <div className={`text-sm ${isVideoOverlay ? 'text-white/80' : 'text-red-500'}`}>
                    Navigation unavailable
                </div>
            </nav>
        );
    }

    // Handle mouse enter for desktop hover
    const handleMouseEnter = (itemId: string) => {
        if (!isMobile) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            setActiveDropdown(itemId);
        }
    };

    // Handle mouse leave for desktop hover
    const handleMouseLeave = () => {
        if (!isMobile) {
            timeoutRef.current = setTimeout(() => {
                setActiveDropdown(null);
            }, 200);
        }
    };

    // Handle click for mobile
    const handleClick = (itemId: string, hasChildren: boolean) => {
        if (isMobile && hasChildren) {
            setActiveDropdown(activeDropdown === itemId ? null : itemId);
        }
    };

    // Check if current path matches or is child of navigation item 
    const isActiveNavItem = (item: NavigationItem): boolean => {
        if (item.slug === '' && pathname === '/') {
            return true;
        }

        if (item.slug !== '' && pathname.startsWith(`/${item.slug}`)) {
            return true;
        }

        if (item.children) {
            return item.children.some(child => isActiveNavItem(child));
        }

        return false;
    };

    // Render a single navigation item
    const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
        const isActive = isActiveNavItem(item);
        const hasChildren = item.children && item.children.length > 0;
        const isDropdownOpen = activeDropdown === item.id;
        const href = item.slug === '' ? '/' : `/${item.slug}`;

        return (
            <div 
                key={item.id} 
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
            >
                <div className='flex items-center'>
                    {/* Clean minimalist navigation link */}
                    <Link
                        href={href}
                        onClick={() => handleClick(item.id, !!hasChildren)}
                        className={`
                            relative px-3 py-2 font-normal text-base tracking-wide
                            transition-all duration-200 ease-out
                            flex items-center space-x-2 group/link
                            ${level > 0 ? 'w-full justify-start px-0 py-3' : ''}
                            ${isVideoOverlay && !isScrolled
                                ? isActive 
                                    ? 'text-white font-medium' 
                                    : 'text-white/90 hover:text-white'
                                : isActive 
                                    ? 'text-neutral-900 font-medium' 
                                    : 'text-neutral-600 hover:text-neutral-900'
                            }
                        `}
                    >
                        <span className="relative">
                            {item.title}
                        </span>
                    </Link>

                    {/* Minimal dropdown arrow */}
                    {hasChildren && (
                        <button
                            onClick={() => handleClick(item.id, true)}
                            className={`
                                ml-1 p-1 transition-all duration-200 ease-out
                                ${isMobile ? 'block' : 'lg:hidden group-hover:lg:block'}
                            `}
                            aria-label={`Toggle ${item.title} menu`}
                        >
                            <svg
                                className={`
                                    w-3 h-3 transition-all duration-200 
                                    ${isDropdownOpen ? 'rotate-180' : ''}
                                    ${isVideoOverlay && !isScrolled
                                        ? 'text-white/70' 
                                        : 'text-neutral-400'
                                    }
                                `}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Minimalist dropdown menu */}
                {hasChildren && (
                    <div 
                        className={`
                            ${level === 0 
                                ? `absolute left-0 top-full pt-4 min-w-64 z-50
                                   ${isMobile 
                                       ? (isDropdownOpen ? 'block' : 'hidden')
                                       : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none group-hover:pointer-events-auto'
                                   }
                                   transition-all duration-300 ease-out`
                                : `ml-0 mt-2 ${isDropdownOpen ? 'block' : 'hidden'}`
                            }
                        `}
                        onMouseEnter={() => handleMouseEnter(item.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Clean dropdown container */}
                        <div className={`
                            ${level === 0 
                                ? `${isVideoOverlay && !isScrolled
                                    ? 'bg-white' 
                                    : 'bg-white'
                                  } 
                                  rounded-lg shadow-lg border border-neutral-100 overflow-hidden`
                                : ''
                            }
                        `}>
                            {/* List of items with nested support */}
                            <div className={level === 0 ? 'py-2' : 'space-y-1'}>
                                {item.children!.map((child, index) => (
                                    <div 
                                        key={child.id}
                                        className={`
                                            ${level === 0 
                                                ? 'px-1 hover:bg-neutral-50 transition-colors duration-150' 
                                                : ''
                                            }
                                        `}
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {/* Render nested items recursively */}
                                        {child.children && child.children.length > 0 ? (
                                            <div>
                                                {/* Parent category (like "Fireplaces") */}
                                                <div className="px-4 py-2 text-sm font-medium text-neutral-800 border-b border-neutral-100 bg-neutral-25">
                                                    {child.title}
                                                </div>
                                                {/* Nested children (like "Wall Mounted", "Freestanding") */}
                                                <div className="py-1">
                                                    {child.children.map((grandchild) => (
                                                        <Link
                                                            key={grandchild.id}
                                                            href={grandchild.slug === '' ? '/' : `/${grandchild.slug}`}
                                                            className="block px-6 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors duration-150"
                                                        >
                                                            {grandchild.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            /* Simple category without nested children */
                                            <Link
                                                href={child.slug === '' ? '/' : `/${child.slug}`}
                                                className={`
                                                    block px-4 py-3 text-sm transition-colors duration-150
                                                    ${level === 0
                                                        ? 'text-neutral-700 hover:text-neutral-900'
                                                        : 'text-neutral-600 hover:text-neutral-800 pl-4 border-l-2 border-transparent hover:border-neutral-300'
                                                    }
                                                `}
                                            >
                                                {child.title}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Clean footer for main categories */}
                            {level === 0 && item.slug === 'products' && (
                                <div className="border-t border-neutral-100 px-1">
                                    <Link 
                                        href="/products"
                                        className="block px-4 py-3 text-sm font-medium text-[#f58232] hover:text-[#e6742d] hover:bg-orange-50 transition-colors duration-150"
                                    >
                                        View All Products →
                                    </Link>
                                </div>
                            )}
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
        </nav>
    );
}