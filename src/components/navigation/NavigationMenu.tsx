'use client';

import { useState } from 'react';
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
    const [ openDropdowns, setOpenDropdowns ] = useState<Set<string>>(new Set());
    
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

    // function to toggle dropdowns
    const toggleDropdown = (itemId: string) => {
        const newOpenDropdowns = new Set(openDropdowns);
        if (newOpenDropdowns.has(itemId)) {
            newOpenDropdowns.delete(itemId);
        } else {
            newOpenDropdowns.add(itemId);
        }
        setOpenDropdowns(newOpenDropdowns);
    };

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
        const isDropdownOpen = openDropdowns.has(item.id);
        const href = item.slug === '' ? '/' : `/${item.slug}`;

        return (
            <div key={item.id} className="relative">
                < div className='flex items-center'>
                    {/*Main Navigation Link*/}
                    <Link
                    href={href}
                    className={`
                          px-3 py-2 rounded-md text-sm font-medium transition-colors
                          ${isActive
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                          }
                          ${level > 0 ? 'pl-6' : ''}
                        `}
                    >
                        {item.title}
                    </Link>

                    {/*Dropdown toggle button for items with children*/}
                    {hasChildren && (
                        <button
                        onClick={() => toggleDropdown(item.id)}
                        className="ml-1 p-1 rounded hover:bg-gray-100"
                        aria-label={`Toggle ${item.title} menu`}
                        >
                            <svg
                              className={`w-4 h-4 transition-transform ${
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

                {/*Dropdown menu for children */}
                {hasChildren && isDropdownOpen && (
                    <div className={`
                        mt-1 space-y-1
                        ${level === 0
                            ? 'absolute left-0 top-full bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-48'
                            : 'ml-4 border-1 border-gray-200 pl-2'
                        }
                    `}>
                        {item.children!.map(child => (
                            <div key={child.id} className="py-1">
                                {renderNavigationItem(child, level + 1)}
                            </div>
                        ))}
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
                    <div>Open: {Array.from(openDropdowns).join(', ')}</div>
                </div>
            )}
        </nav>
    );
}
