import { NavigationSystem, NavigationItem, SlugMapping, PageRegistryEntry, PageType } from '../types/navigation';
import { mockNavigationSystem } from './mock-data/navigation';

// type for function return values
export interface PageResolutionResult {
    success: boolean;
    page?: PageRegistryEntry;
    error?: string;
}

export interface NavigationResult {
    succes: boolean;
    navigation?: NavigationItem[];
    error?: string;
}

// find a page by its URl slug 
// this is the core function for URL -> Page resolution 
export function findPageBySlug(slug: string): PageResolutionResult {
    try {
        // handle empty slug (home page) 
        const searchSlug = slug === '/' ? '' : slug.replace(/^\/+|\/+$/g, '');

        // first find the slug mapping 
        const slugMapping = mockNavigationSystem.slugMappings.find(
            mapping => mapping.slug === searchSlug
        );

        if(!slugMapping) {
            return {
                success: false,
                error: `No page found for slug: ${slug}`
            };
        }

        // then find the actual page data
        const page = mockNavigationSystem.pageRegistry.find(
            page => page.id === slugMapping.pageId
        );

        if(!page) {
            return {
                success: false,
                error: `No page found for slug mapping: ${slugMapping.slug}`
            };
        }

        //check if page is active
        if (page.status !== 'active') {
            return {
                success: false,
                error: `Page is not active: "${slug}" (status: ${page.status})`
            };
        }

        return {
            success: true,
            page
        };

    } catch (error) {
        return {
            success: false,
            error: `Error resolving slug "${slug}": ${error}`
        };
    }
} 

// get page by internal ID 

export function getPageById(pageId: string): PageResolutionResult {
    try {
        const page = mockNavigationSystem.pageRegistry.find(
            page => page.id === pageId 
        );

        if(!page) {
            return {
                success: false,
                error: `Page not found for ID: ${pageId}`
            };
        }

        return {
            success: true,
            page
        };
    } catch (error) {
        return {
            success: false,
            error: `Error finding page by ID "${pageId}": ${error}`
        };
    }
}
        
// get navigation menu structure
// only returns visible items
export function getNavigationMenu(): NavigationResult {
    try {
        // filter to only visible items and their visible children 
        const filterVisible = (items: NavigationItem[]): NavigationItem[] => {
            return items
            .filter(item => item.isVisible)
            .map(item => ({
                ...item,
                children: item.children ? filterVisible(item.children) : undefined
            }));
        };

        const visibleNavigation = filterVisible(mockNavigationSystem.menuStructure);

        return {
            succes: true,
            navigation: visibleNavigation
        };

    } catch (error) {
        return {
            succes: false,
            error: `Error getting naviagtion menu: ${error}`
        };
    }
}

// get breadcrumb trail for a given slug
// returns array of navigation items from root to current page
export function getBreadcrumbs(slug: string): NavigationItem[] {
    const breadcrumbs: NavigationItem[] = [];

    //first find the page
    const pageResult = findPageBySlug(slug);
    if (!pageResult.success || !pageResult.page) {
        return breadcrumbs;
    }

    //find navigation item for this page
    const findNavItem = (items: NavigationItem[], targetSlug: string): NavigationItem | null => {
        for (const item of items) {
            if(item.slug === targetSlug) {
                return item;
            }
            if(item.children) {
                const found = findNavItem(item.children, targetSlug);
                if (found) return found;
            }
        }
        return null;
    };

    const navItem = findNavItem(mockNavigationSystem.menuStructure, pageResult.page.slug);
    if(!navItem) {
        return breadcrumbs;
    }

    //build breadcrumb trail by walking up the parent chain
    const buildTrail = (item: NavigationItem) => {
        breadcrumbs.unshift(item);

        if(item.parentId) {
            //find parent item
            const findParent = (items: NavigationItem[], parentId: string): NavigationItem | null => {
                for (const parentItem of items) {
                    if (parentItem.id === parentId) {
                        return parentItem;
                    }
                    if(parentItem.children) {
                        const found = findParent(parentItem.children, parentId);
                        if (found) return found;
                    }
                }
                return null;
            };

            const parent = findParent(mockNavigationSystem.menuStructure, item.parentId);
            if (parent) {
                buildTrail(parent);
            }
        }
    };

    buildTrail(navItem);
    return breadcrumbs;
}

// get child pages of a category 

export function getChildPages(parentId: string): NavigationItem[] {
    const findChildren = (items: NavigationItem[]): NavigationItem[] => {
        let children: NavigationItem[] = [];

        for (const item of items) {
            if (item.parentId === parentId && item.isVisible) {
                children.push(item);
            }
            if(item.children) {
                children = children.concat(findChildren(item.children));
            }
        }
        return children;
    };
    return findChildren(mockNavigationSystem.menuStructure);
}

// resolve full url for a page
// handles the slug_id.html pattern for products
export function getPageUrl(pageId: string): string | null {
    const slugMapping = mockNavigationSystem.slugMappings.find(
        mapping => mapping.pageId === pageId
    );

    return slugMapping ? slugMapping.fullUrl : null;
}

// check if a page type type requires authentification
export function requiresAuth(pageType: PageType): boolean {
  const pageTypeConfig = mockNavigationSystem.pageTypes[pageType];
  return pageTypeConfig?.requiresAuth ?? false;
}

// get template name for a page type
export function getTemplate(pageType: PageType): string {
    const pageTypeConfig = mockNavigationSystem.pageTypes[pageType];
    return pageTypeConfig?.template ?? 'DefaultPage';
}

// search pages by title or slug (simple search)
export function searchPages(query: string): PageRegistryEntry[] {
    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) {
        return [];
    }

    return mockNavigationSystem.pageRegistry.filter(page =>
        page.status === 'active' && (
            page.title.toLowerCase().includes(searchTerm) ||
            page.slug.toLowerCase().includes(searchTerm) ||
            page.seoData?.keywords?.some(keyword =>
                keyword.toLowerCase().includes(searchTerm)
            )
        )
    );
}

// debug/development helper functions

export const debug = {
    getAllSlugs: (): string[] => {
        return mockNavigationSystem.slugMappings.map(mapping => mapping.slug);
    },

    getStats: () => {
        const totalPages=  mockNavigationSystem.pageRegistry.length;
        const activePages = mockNavigationSystem.pageRegistry.filter(p => p.status === 'active').length;
        const pagesByType = mockNavigationSystem.pageRegistry.reduce((acc, page) => {
            acc[page.pageType] = (acc[page.pageType] ||0) + 1;
            return acc;
        }, {} as Record<PageType, number>);

        return {
            totalPages,
            activePages,
            pagesByType,
            totalSlugs: mockNavigationSystem.slugMappings.length
        };
    },

    validateData: () => {
        const issues: string[] = [];

        for (const mapping of mockNavigationSystem.slugMappings) {
            const page = mockNavigationSystem.pageRegistry.find(p => p.id === mapping.pageId);
            if (!page) {
                issues.push(`Slug mapping "${mapping.slug}" references missing page ID "${mapping.pageId}"`);
            }
        }

        const checkNavItems = (items: NavigationItem[]) => {
            for (const item of items) {
                if (item.pageType !== 'category') {
                    const page = mockNavigationSystem.pageRegistry.find(p => p.slug === item.slug);
                    if (!page) {
                        issues.push(`Navigation item "${item.title}" (${item.slug}) has no correspoing page`);
                    }
                }
                if (item.children) {
                    checkNavItems(item.children);
                }
            }
        };

        checkNavItems(mockNavigationSystem.menuStructure);

        return {
            isValid: issues.length === 0,
            issues
        };
    }
};