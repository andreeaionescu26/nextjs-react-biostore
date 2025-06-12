// src/hooks/useNavigationSimple.ts
// Simple real-time navigation updates - replace your existing useNavigation hook

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { NavigationItem } from '@/types/navigation';
import { getNavigationMenu } from '@/lib/navigation-utils';

interface UseNavigationReturn {
    navigationItems: NavigationItem[];
    isLoading: boolean;
    error: string | null;
    refreshNavigation: () => void;
}

export function useNavigationSimple(): UseNavigationReturn {
    const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const lastHashRef = useRef<string>('');

    // Function to load navigation data
    const loadNavigation = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Get navigation menu from utility function
            const result = getNavigationMenu();

            if (result.succes && result.navigation) {
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
    }, []);

    // Check for navigation data changes
    const checkForUpdates = useCallback(async () => {
        try {
            // Re-import the navigation module to get fresh data
            const freshModule = await import('@/lib/mock-data/navigation');
            const currentHash = JSON.stringify(freshModule.mockNavigationSystem);
            
            if (currentHash !== lastHashRef.current && lastHashRef.current !== '') {
                console.log('🔄 Navigation data changed, reloading...');
                loadNavigation();
            }
            
            lastHashRef.current = currentHash;
        } catch (error) {
            console.error('Error checking for navigation updates:', error);
        }
    }, [loadNavigation]);

    // Load navigation on component mount
    useEffect(() => {
        loadNavigation();
    }, [loadNavigation]);

    // Set up real-time checking in development
    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') return;

        // Check for changes every 500ms
        const interval = setInterval(checkForUpdates, 500);

        return () => clearInterval(interval);
    }, [checkForUpdates]);

    // Listen for manual refresh events
    useEffect(() => {
        const handleRefresh = () => {
            console.log('🔄 Manual navigation refresh triggered');
            loadNavigation();
        };

        window.addEventListener('refreshNavigation', handleRefresh);
        
        return () => {
            window.removeEventListener('refreshNavigation', handleRefresh);
        };
    }, [loadNavigation]);

    // Manual refresh function
    const refreshNavigation = useCallback(() => {
        loadNavigation();
        // Also trigger global refresh event
        window.dispatchEvent(new CustomEvent('refreshNavigation'));
    }, [loadNavigation]);

    return {
        navigationItems,
        isLoading,
        error,
        refreshNavigation
    };
}

// Development helpers
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    // Add global refresh function
    (window as any).refreshNav = () => {
        window.dispatchEvent(new CustomEvent('refreshNavigation'));
    };
    
    console.log('🛠️ Dev mode: Use refreshNav() in console to refresh navigation');
}