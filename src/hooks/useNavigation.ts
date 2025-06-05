'use client';

import {useState, useEffect } from 'react';
import { NavigationItem } from '@/types/navigation';
import { getNavigationMenu, getBreadcrumbs } from '@/lib/navigation-utils';

interface UseNavigationReturn {
    navigationItems: NavigationItem[];
    isLoading: boolean;
    error: string | null;
    getBreadcrumbsForSlug: (slug: string) => NavigationItem[];
    refreshNavigation: () => void;
}

// custom hook for managing navigation data
// foundation for all navigation components
export function useNavigation(): UseNavigationReturn {
    const [navigationItems, setNavigationItems]= useState<NavigationItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // function to load navigation data
    const loadNavigation = async () => {
        try {
            setIsLoading(true);
            setError(null);

            //get navigation menu from our utility function 
            const result = getNavigationMenu();

            if( result.succes && result.navigation) {
                setNavigationItems(result.navigation);
            } else {
                setError(result.error || 'Failed to load navigation');
                setNavigationItems([]);
            }
        } catch (err) {
            setError('An unexpected error occurred while loading navigation');
            setNavigationItems([]);
            console.error('Navigation loading error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // load naviagtion on component mount
    useEffect(() => {
        loadNavigation();
    }, []);

    // function to get breadcrumbs for a given slug
    const getBreadcrumbsForSlug = (slug: string): NavigationItem[] => {
        try {
            return getBreadcrumbs(slug); 
        } catch (err) {
            console.error('Error getting breadcrumbs:',slug, err);
            return [];
        }
    };

    // function to manually refresh navigation

    const refreshNavigation = () => {
        loadNavigation();
    };

    return {
        navigationItems,
        isLoading,
        error,
        getBreadcrumbsForSlug,
        refreshNavigation
    };
}

// helper hook to find a specific navigation item by slug
export function useNavigationItem(slug: string): NavigationItem | null {
    const { navigationItems } = useNavigation();

    const findItemBySlug = (items: NavigationItem[], targetSlug: string): NavigationItem | null => {
        for (const item of items) {
            if (item.slug === targetSlug) {
                return item;
            }
            if (item.children) {
                const found = findItemBySlug(item.children, targetSlug);
                if (found) return found;
            }
        }
        return null;
    };

    return findItemBySlug(navigationItems, slug);
}

