'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product';
import { PageRegistryEntry } from '@/types/navigation';
import { products } from '@/lib/mock-data/products';
import { searchPages } from '@/lib/navigation-utils';
import { debounce } from '@/lib/utils';

// define what type of content we can search
export type SearchResultType = 'product' | 'page' | 'category';

// define the structure of a search result 
export interface SearchResult {
    id: string;
    type: SearchResultType;
    title: string;
    description: string;
    url: string;
    thumbnail?: string;
    price?: number;
    category?: string;
}

// define our search state
interface SearchState {
    query: string;
    results: SearchResult[];
    isLoading: boolean;
    hasSearched: boolean;
    resultCount: number;
}

// define search filters
export interface SearchFilters {
    type?: SearchResultType;
    minPrice?: number;
    maxPrice?: number;
    category?: string;
}

export function useSearch() {
    //Initialize search state
    const [state, setState] = useState<SearchState>({
        query: '',
        results: [],
        isLoading: false,
        hasSearched: false,
        resultCount: 0
    });

    const [filters, setFilters] = useState<SearchFilters>({});

    // Function to convert a product to a saerch result 
    const productToSearchResult = (product: Product): SearchResult => ({
        id: `product-${product.id}`,
        type: `product`,
        title: product.name,
        description: product.description,
        url: `/products/${product.slug}`,
        thumbnail: product.thumbnail,
        price: product.price,
        category: `Category ${product.categoryId}`
    });

    // function to convert a page to a search result 
    const pageToSearchResult = (page: PageRegistryEntry): SearchResult => ({
        id: `page-${page.id}`,
        type: 'page',
        title: page.title,
        description: page.seoData?.description || 'Learn more about our product and services',
        url: page.slug === '' ? '/' : `/${page.slug}`,
        category: page.pageType
    });

    // core search function that searches through our mock data
    const performSearch = useCallback((searchQuery: string, searchFilters: SearchFilters = {}) => {
        console.log('🔍 Performing search for:', searchQuery, 'with filters:', searchFilters);

        // if no query return empty results
        if (!searchQuery.trim()) {
            return [];
        }

        const query  = searchQuery.toLowerCase().trim();
        const results: SearchResult[] = [];

        // search products if no type filter or if filtering for products
        if (!searchFilters.type || searchFilters.type === 'product') {
            const productResults = products
            .filter(product => {
                // text matching 
                const matchesText =
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.sku.toLowerCase().includes(query);

                // price filtering 
                const matchesPrice =
                (!searchFilters.minPrice || product.price >= searchFilters.minPrice) &&
                (!searchFilters.maxPrice || product.price <= searchFilters.maxPrice);

                // category filtering (basic for now)
                const matchesCategory =
                !searchFilters.category ||
                product.categoryId.toString() === searchFilters.category;

                return matchesText && matchesPrice && matchesCategory && product.isPublished;
            })
            .map(productToSearchResult);

            results.push(...productResults);
        }

        // search pages if no type filter or if filtering for pages
        if (!searchFilters.type || searchFilters.type === 'page') {
            const pageResults = searchPages(query)
            .map(pageToSearchResult);

            results.push(...pageResults);
        }

        // Sort results by relevance (simple scoring)
        const scoredResults = results.map(result => {
            let score = 0;

            //exact title match gets highest score
            if (result.title.toLowerCase() === query) {
                score += 100;
            }
            // title starts query
            else if (result.title.toLowerCase().startsWith(query)) {
                score += 50;
            }
            // title contains query
            else if (result.title.toLowerCase().includes(query)) {
                score += 25;
            }

            // description contains query
            if (result.description.toLowerCase().includes(query)) {
                score += 10;
            }

            //product get slight boost (assuming they are more important)
            if (result.type === 'product') {
                score += 5;
            }

            return { ...result, score };
        });

        // sort by score (highest first) and remove score property
        return scoredResults 
        .sort((a, b) => b.score - a.score)
        .map(({ score, ...result }) => result);
    }, []);
    
    //debounced search function  to avoid too many searches while typing 
    const debouncedSearch = useCallback(
        debounce((query: string, searchFilters: SearchFilters) => {
        setState(prev => ({ ...prev, isLoading: true }));

        // Simulate API delay for realistic UX
        setTimeout(() => {
            const results = performSearch(query, searchFilters);
            
            setState(prev => ({
            ...prev,
            results,
            isLoading: false,
            hasSearched: true,
            resultCount: results.length
            }));

            console.log('✅ Search completed:', results.length, 'results found');
        }, 300);
        }, 300),
        [performSearch]
    );

    // public search function
    const search = useCallback((query: string, searchFilters: SearchFilters = {}) => {
        setState(prev => ({
            ...prev,
            query: query.trim(),
            isLoading: query.trim() !== '',
            hasSearched: false
        }));

        setFilters(searchFilters);

        if (query.trim()) {
            debouncedSearch(query.trim(), searchFilters);
        } else {
            // clear results if query is empty
            setState(prev => ({
                ...prev,
                results: [],
                isLoading: false,
                hasSearched: false,
                resultCount: 0
            }));
        }
    }, [debouncedSearch]);

    // clear search results
    const clearSearch = useCallback(() => {
        setState({
            query: '',
            results: [],
            isLoading: false,
            hasSearched: false,
            resultCount: 0
        });
        setFilters({});
    }, []);

    // ipdate filters without chnaging query
    const updateFilters = useCallback((newFilters: SearchFilters) => {
        setFilters(newFilters);
        if (state.query) {
            search(state.query, newFilters);
        }
    }, [state.query, search]);

    return {
        // state
        query: state.query,
        results: state.results,
        isLoading: state.isLoading,
        hasSearched: state.hasSearched,
        resultCount: state.resultCount,
        filters,

        // actions
        search,
        clearSearch,
        updateFilters
    };
}