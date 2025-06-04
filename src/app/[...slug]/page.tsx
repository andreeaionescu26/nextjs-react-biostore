// Dynamic catch-all route that handles all unknown URLs
// This is the core of our dynamic routing system

import { notFound } from 'next/navigation';
import { findPageBySlug, getTemplate } from '@/lib/navigation-utils';
import { PageRegistryEntry } from '@/types/navigation';

// Import page components from components/pages directory
import ProductPage from '@/components/pages/ProductPage';
import CategoryPage from '@/components/pages/CategoryPage';
import ArticlePage from '@/components/pages/ArticlePage';
import StaticPage from '@/components/pages/StaticPage';
import AccountPage from '@/components/pages/AccountPage';
import BasketPage from '@/components/pages/BasketPage';
import CustomPage from '@/components/pages/CustomPage';
import LandingPage from '@/components/pages/LandingPage';

// Define the props interface for URL params
interface DynamicPageProps {
  params: {
    slug: string[];
  };
}

// Common interface that ALL page components must implement
interface PageComponentProps {
  page: PageRegistryEntry;
  params: {
    slug: string[];
  };
}

// Page component mapping based on page type
const PAGE_COMPONENTS: Record<string, React.ComponentType<PageComponentProps>> = {
  ProductPage,
  CategoryPage,
  ArticlePage,
  StaticPage,
  AccountPage,
  BasketPage,
  CustomPage,
  LandingPage,
  // Fallback component
  DefaultPage: StaticPage
} as const;

/**
 * Dynamic page component that resolves URLs to pages
 * This handles the core routing logic for our e-commerce site
 */
export default async function DynamicPage({ params }: DynamicPageProps) {
  // Convert slug array to URL path
  const slugPath = params.slug?.join('/') || '';
  
  console.log('🔍 Resolving dynamic route:', `/${slugPath}`);
  
  try {
    // Use our utility function to find the page
    const pageResult = findPageBySlug(slugPath);
    
    // Handle page not found
    if (!pageResult.success || !pageResult.page) {
      console.log('❌ Page not found:', slugPath, pageResult.error);
      notFound();
    }
    
    const page = pageResult.page;
    console.log('✅ Page found:', page.title, `(${page.pageType})`);
    
    // Get the appropriate template/component for this page type
    const templateName = getTemplate(page.pageType);
    const PageComponent = PAGE_COMPONENTS[templateName] || PAGE_COMPONENTS.DefaultPage;
    
    // Render the appropriate page component with the page data
    return (
      <div className="dynamic-page">
        {/* Pass the page data to the component */}
        <PageComponent 
          page={page}
          params={params}
        />
      </div>
    );
    
  } catch (error) {
    console.error('💥 Error in dynamic page resolution:', error);
    
    // In development, show error details
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="p-8 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Dynamic Route Error
          </h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 mb-2">
              <strong>URL:</strong> /{slugPath}
            </p>
            <p className="text-red-700 mb-2">
              <strong>Error:</strong> {error instanceof Error ? error.message : String(error)}
            </p>
            <pre className="text-sm text-red-600 mt-4 overflow-x-auto">
              {error instanceof Error ? error.stack : 'Unknown error'}
            </pre>
          </div>
        </div>
      );
    }
    
    // In production, show 404
    notFound();
  }
}

/**
 * Generate metadata for SEO
 * This uses the page data to create dynamic meta tags
 */
export async function generateMetadata({ params }: DynamicPageProps) {
  const slugPath = params.slug?.join('/') || '';
  const pageResult = findPageBySlug(slugPath);
  
  if (!pageResult.success || !pageResult.page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    };
  }
  
  const page = pageResult.page;
  
  return {
    title: page.seoData?.title || page.title,
    description: page.seoData?.description || `${page.title} - Bioethanol Fireplace Shop`,
    keywords: page.seoData?.keywords?.join(', '),
    openGraph: {
      title: page.seoData?.title || page.title,
      description: page.seoData?.description,
      ...page.seoData?.openGraph
    }
  };
}

/**
 * Optional: Generate static params for known pages
 * This can improve performance by pre-generating pages
 */
export async function generateStaticParams() {
  // In a real app, you might want to generate static params for common pages
  // For now, we'll let everything be dynamic
  return [];
}

// Optional: Configure page behavior
export const dynamic = 'force-dynamic'; // Always render dynamically
export const revalidate = false; // Don't cache in development