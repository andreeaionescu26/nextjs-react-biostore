// core navigation data structures

// page types that our system will handle
export type PageType = 
  | 'product'
  | 'category'
  | 'article'
  | 'static'
  | 'account'
  | 'basket'
  | 'custom'
  | 'landing';

  // individual navigation menu item
  export interface NavigationItem {
    id: string;
    title: string;
    slug: string;
    pageType: PageType;
    parentId?: string; // for nested menus
    sortOrder: number;
    isVisible: boolean;
    children?: NavigationItem[]; // for nested items
    metadata?: {
        description?: string;
        keywords?: string[];
        customData?: Record<string, any>;
    };
  }

  // slug to page mapping for URL resolution
  export interface SlugMapping {
    slug: string;
    pageId: string;
    pageType: PageType;
    fullUrl: string;
    redirectFrom?: string[];
  }

  // page registry entry - complete page information 
  export interface PageRegistryEntry {
    id: string;
    title: string;
    slug: string;
    pageType: PageType;
    status: 'active' | 'draft' | 'archived';
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    template?: string;
    seoData?: {
        title?: string;
        description?: string;
        keywords?: string[];
        openGraph?: Record<string, string>;
    };
    content?: Record<string, any>; // flexible content structure
  }

  // main navigation system structure 
  export interface NavigationSystem {
    menuStructure: NavigationItem[];
    pageRegistry: PageRegistryEntry[];
    slugMappings: SlugMapping[];
    pageTypes: Record<PageType, {
        template: string;
        apiEndpoint?: string;
        requiresAuth?: boolean;
    }>;
    lastUpdated: string;
    version: string;
  }

  // API response wrapper
  export interface NavigationApiResponse {
    success: boolean;
    data: NavigationSystem;
    error?: string;
    timestamp: string;
  }

