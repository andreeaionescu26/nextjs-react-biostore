'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch, SearchResult } from '@/hooks/useSearch';

interface SearchInputProps {
  placeholder?: string;
  showDropdown?: boolean;
  maxResults?: number;
  onResultClick?: (result: SearchResult) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  customStyles?: {
    input?: string;
    icon?: string;
    clear?: string;
    dropdown?: string;
  };
}

export default function SearchInput({
  placeholder = "Search products, guides, and more...",
  showDropdown = true,
  maxResults = 8,
  onResultClick,
  onFocus,
  onBlur,
  className = "",
  customStyles
}: SearchInputProps) {
  // Get search functionality from our hook
  const { query, results, isLoading, search, clearSearch } = useSearch();
  
  // Local state for component behavior
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  // Refs for DOM manipulation
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Router for navigation
  const router = useRouter();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    search(value);
    
    // Show dropdown if we have a query and are configured to show it
    setIsOpen(showDropdown && value.length > 0);
    setHighlightedIndex(-1); // Reset highlighting
  };

  // Handle focus
  const handleFocus = () => {
    setIsOpen(showDropdown && query.length > 0);
    onFocus?.();
  };

  // Handle blur
  const handleBlur = () => {
    // Delay blur to allow clicking on dropdown items
    setTimeout(() => {
      setIsOpen(false);
      onBlur?.();
    }, 200);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < Math.min(results.length - 1, maxResults - 1) ? prev + 1 : prev
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
        
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < results.length) {
          // User selected a specific result with arrow keys
          handleResultClick(results[highlightedIndex]);
        } else if (query.trim()) {
          // User pressed enter without selecting - go to search results page
          navigateToSearchPage();
        }
        break;
        
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle clicking on a search result
  const handleResultClick = (result: SearchResult) => {
    // Call custom handler if provided
    onResultClick?.(result);
    
    // Navigate to the result URL
    router.push(result.url);
    
    // Close dropdown and clear highlight
    setIsOpen(false);
    setHighlightedIndex(-1);
    
    // Optionally blur the input
    inputRef.current?.blur();
  };

  // Navigate to dedicated search results page
  const navigateToSearchPage = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear search when component unmounts or when explicitly requested
  const handleClear = () => {
    clearSearch();
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  // Limit results to maxResults
  const displayResults = results.slice(0, maxResults);

  // Default styles (can be overridden by customStyles)
  const defaultStyles = {
    input: `
      w-full px-4 py-3 pl-12 pr-10
      bg-white border border-gray-300 rounded-lg
      focus:outline-none
      placeholder-gray-500 text-gray-900
      transition-all duration-200
    `,
    icon: "absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400",
    clear: "text-gray-400",
    dropdown: `
      absolute top-full left-0 right-0 mt-2 z-50
      bg-white border border-gray-200 rounded-lg shadow-lg
      max-h-96 overflow-y-auto
    `
  };

  // Merge custom styles with defaults
  const styles = {
    input: customStyles?.input || defaultStyles.input,
    icon: customStyles?.icon || defaultStyles.icon,
    clear: customStyles?.clear || defaultStyles.clear,
    dropdown: customStyles?.dropdown || defaultStyles.dropdown
  };

  return (
    <div className={`relative w-full max-w-2xl ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={styles.input}
        />
        
        {/* Search Icon */}
        <div className={styles.icon}>
          <svg
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

        {/* Clear Button (shows when there's a query and not loading) */}
        {query && !isLoading && (
          <button
            onClick={handleClear}
            className="
              absolute right-3 top-1/2 transform -translate-y-1/2
              p-1 rounded-full hover:bg-gray-100 transition-colors
              focus:outline-none focus:ring-2 focus:ring-gray-200
            "
            aria-label="Clear search"
          >
            <svg className={`w-4 h-4 ${styles.clear}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#f58232] border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && showDropdown && (
        <div
          ref={dropdownRef}
          className={styles.dropdown}
        >
          {isLoading ? (
            /* Loading State */
            <div className="p-4 text-center text-gray-500">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#f58232] border-t-transparent"></div>
                <span>Searching...</span>
              </div>
            </div>
          ) : displayResults.length > 0 ? (
            /* Results Found */
            <>
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                  </span>
                  {results.length > maxResults && (
                    <button
                      onClick={navigateToSearchPage}
                      className="text-sm text-[#f58232] hover:text-[#e6742d] font-medium"
                    >
                      View all →
                    </button>
                  )}
                </div>
              </div>
              
              {displayResults.map((result, index) => (
                <div
                  key={result.id}
                  className={`
                    px-4 py-3 cursor-pointer transition-colors
                    ${index === highlightedIndex ? 'bg-gray-50' : 'hover:bg-gray-50'}
                    ${index === displayResults.length - 1 ? '' : 'border-b border-gray-100'}
                  `}
                  onClick={() => handleResultClick(result)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="flex items-center space-x-3">
                    {/* Result Type Icon */}
                    <div className="flex-shrink-0">
                      {result.type === 'product' ? (
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Result Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {result.title}
                        </h4>
                        {result.price && (
                          <span className="text-sm font-medium text-gray-900 ml-2">
                            ${result.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 truncate mt-1">
                        {result.description}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500 capitalize">
                          {result.type}
                        </span>
                        {result.category && (
                          <span className="text-xs text-gray-500">
                            {result.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : query.trim() ? (
            /* No Results Found */
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">No results found</h3>
              <p className="text-sm text-gray-600 mb-4">
                Try searching for something else or check your spelling.
              </p>
              <button
                onClick={navigateToSearchPage}
                className="text-sm text-[#f58232] hover:text-[#e6742d] font-medium"
              >
                View all products →
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}