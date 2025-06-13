'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSearch, SearchResult } from '@/hooks/useSearch';
import type { SearchFilters } from '@/hooks/useSearch';
import SearchInput from '@/components/ui/SearchInput';

// Loading component for search results
const SearchResultsLoading = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="animate-pulse">
        <div className="bg-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Individual search result component
const SearchResultItem = ({ result }: { result: SearchResult }) => {
  return (
    <Link 
      href={result.url}
      className="block bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex items-start space-x-4">
        {/* Result Type Icon */}
        <div className="flex-shrink-0">
          {result.type === 'product' ? (
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          ) : (
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Result Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#f58232] transition-colors">
                {result.title}
              </h3>
              <p className="text-gray-600 mt-1 line-clamp-2">
                {result.description}
              </p>
              <div className="flex items-center space-x-3 mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                  {result.type}
                </span>
                {result.category && (
                  <span className="text-sm text-gray-500">
                    {result.category}
                  </span>
                )}
              </div>
            </div>
            
            {/* Price for products */}
            {result.price && (
              <div className="ml-4 text-right">
                <span className="text-xl font-bold text-gray-900">
                  ${result.price.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

// Filter sidebar component
const SearchFilters = ({ 
  filters, 
  onFiltersChange, 
  resultCount 
}: { 
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  resultCount: number;
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Results</h3>
      
      {/* Result count */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <p className="text-sm text-gray-600">
          {resultCount} result{resultCount !== 1 ? 's' : ''} found
        </p>
      </div>
      
      {/* Content Type Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Content Type</h4>
        <div className="space-y-2">
          {[
            { value: undefined, label: 'All Results' },
            { value: 'product', label: 'Products' },
            { value: 'page', label: 'Pages & Guides' }
          ].map((option) => (
            <label key={option.label} className="flex items-center">
              <input
                type="radio"
                name="contentType"
                checked={filters.type === option.value}
                onChange={() => onFiltersChange({ ...filters, type: option.value as 'product' | 'page' | undefined })}
                className="w-4 h-4 text-[#f58232] border-gray-300 focus:ring-[#f58232]"
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Min Price</label>
            <input
              type="number"
              placeholder="$0"
              value={filters.minPrice || ''}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                minPrice: e.target.value ? Number(e.target.value) : undefined 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f58232] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Max Price</label>
            <input
              type="number"
              placeholder="$999+"
              value={filters.maxPrice || ''}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                maxPrice: e.target.value ? Number(e.target.value) : undefined 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f58232] focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      {/* Clear Filters */}
      <button
        onClick={() => onFiltersChange({})}
        className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};

// Main search page component wrapped in Suspense boundary
function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';
  
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState<'relevance' | 'price_asc' | 'price_desc' | 'name'>('relevance');
  const [searchQuery, setSearchQuery] = useState(queryParam); // Local search state
  
  const { query, results, isLoading, search, resultCount, clearSearch } = useSearch();

  // Sync local search state with URL parameter
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  // Search when component mounts or query param changes
  useEffect(() => {
    if (queryParam) {
      search(queryParam, filters);
    } else {
      clearSearch();
    }
  }, [queryParam, filters, search, clearSearch]);

  // Handle search input changes (for dynamic search)
  const handleSearchChange = (newQuery: string) => {
    setSearchQuery(newQuery);
    
    // Dynamic search - search as user types (with debouncing handled by the hook)
    if (newQuery.trim()) {
      search(newQuery.trim(), filters);
    } else {
      clearSearch();
    }
  };

  // Handle "View all results" when user presses enter or wants full results
  const handleViewAllResults = (newQuery: string) => {
    if (newQuery && newQuery.trim()) {
      // Update URL to show full results page
      router.push(`/search?q=${encodeURIComponent(newQuery.trim())}`);
    }
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  // Sort results based on selected option
  const sortedResults = React.useMemo(() => {
    if (!results.length) return [];
    
    const sorted = [...results];
    
    switch (sortBy) {
      case 'price_asc':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price_desc':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'name':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'relevance':
      default:
        return sorted; // Already sorted by relevance from the hook
    }
  }, [results, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Results</h1>
          
          {/* Search Input */}
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleViewAllResults(searchQuery);
                  }
                }}
                placeholder="Search products, guides, and more..."
                className="w-full px-5 py-3 pl-12 pr-10 text-sm bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f58232] focus:border-transparent placeholder-gray-500 text-gray-900 transition-all duration-200"
              />
              
              {/* Search Icon */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
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
              </div>

              {/* Clear Button */}
              {searchQuery && !isLoading && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    clearSearch();
                    router.push('/search');
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Loading indicator */}
              {isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#f58232] border-t-transparent"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Query Display */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing results for <span className="font-semibold text-gray-900">"{searchQuery}"</span>
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters 
              filters={filters}
              onFiltersChange={handleFiltersChange}
              resultCount={resultCount}
            />
          </div>

          {/* Main Results Area */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#f58232] focus:border-transparent"
                >
                  <option value="relevance">Relevance</option>
                  <option value="name">Name A-Z</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
              
              <div className="text-sm text-gray-600">
                {resultCount} result{resultCount !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Results */}
            {isLoading ? (
              <SearchResultsLoading />
            ) : sortedResults.length > 0 ? (
              <div className="space-y-4">
                {sortedResults.map((result) => (
                  <SearchResultItem key={result.id} result={result} />
                ))}
              </div>
            ) : queryParam ? (
              /* No Results */
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find anything matching "{queryParam}". Try searching for something else or check your spelling.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Try searching for:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['fireplace', 'wall mounted', 'safety', 'installation'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => search(suggestion)}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Welcome state */
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-[#f58232]/10 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#f58232]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Start your search</h3>
                <p className="text-gray-600 mb-6">
                  Search through our products, guides, and more to find exactly what you need.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Popular searches:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['bioethanol fireplace', 'wall mounted', 'freestanding', 'safety guide'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => search(suggestion)}
                        className="px-3 py-1 text-sm bg-[#f58232]/10 hover:bg-[#f58232]/20 text-[#f58232] rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense wrapper
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#f58232] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading search...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}