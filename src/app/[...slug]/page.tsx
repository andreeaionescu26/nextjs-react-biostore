import { notFound } from 'next/navigation';
import { findPageBySlug, getTemplate } from '@/lib/navigation-utils';
import ProductPage from '../products/[slug]/page';

// import page components 
import ProductPage from '@/components/pages/ProductPage';
import CategoryPage from '@/components/pages/CategoryPage';
import ArticlePage from '@/components/pages/ArticlePage';
import StaticPage from '@/components/pages/StaticPage';
import AccountPage from '@/components/pages/AccountPage';
import BasketPage from '@/components/pages/BasketPage';
import CustomPage from '@/components/pages/CustomPage';
import LandingPage from '@/components/pages/LandingPage';

// define the props interface
interface DynamicPageProps {
    params: {
        slug: string[];
    };
}

//Page components mapping based on page type 
const PAGE_COMPONENTS = {
    ProductPage,
    CategoryPage,
    ArticlePage,
    StaticPage,
    AccountPage,
    BasketPage,
    CustomPage,
    LandingPage,
    //fallback component
    DefaultPage: StaticPage
} as const;

// dynamic page component thta resolves URLs to pages
// this handles the core routing logic for out ecommerce site

export default async function DynamicPage({ params }: DynamicPageProps) {
    //convert slug array to url path
    const slugPath = params.slug?.join('/') || '';
     
    console.log('resolving dynamic route: ', `/${slugPath}`);

    try {
        //use our utility function to find the page
        const pageResult = findPageBySlug(slugPath);

        //Handle page not found
        if(!pageResult.success || !pageResult.page) {
            console.log('page not found: ', slugPath, pageResult.error);
            notFound();
        }

        const page =  pageResult.page;
        console.log(' page found', page.title, `(${page.pageType})`);

        // get the appropiate template/component for this page type
        const templateName = getTemplate(page.pageType);
        const PageComponents = PAGE_COMPONENTS[templateName as keyof typeof PAGE_COMPONENTS] || PAGE_COMPONENTS.DefaultPage;

        // render the appropiate page components with the page data
        return (
            <div className="dynamic-page">
                <PageComponent
                    page={page}
                    params={params}
                />
            </div>
        );

    } catch (error) {
        console.error('Error resolving dynamic page:', error);
        
        // in development, show error details
        if(process.env.NODE_ENV === 'development') {
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

        // in production show 404
        notFound();
    }
}

//generate metadata for seo
// this uses the page data to create dynamic meta tags
export async function generateMetadata({ params }: DynamicPageProps) {
    const slugPath = params.slug?.join('/') || '';
    const pageResult = findPageBySlug(slugPath);

    if(!pageResult.success || !pageResult.page) {
        return {
            title: 'Page Not Found',
            description: 'The page you are looking for does not exist.'
        };
    }

    const page = pageResult.page;

    return {
        title: page.seoData?.title || page.title,
        description: page.seoData?.description ||  `${page.title} - Bioethanol Fireplace Shop`,
        keywords: page.seoData?.keywords?.join(', '),
        openGraph: {
            title: page.seoData?.title || page.title,
            description: page.seoData?.description,
            ...page.seoData?.openGraph,
        }
    };
}

// generate static params for known pages
export async function generateStaticParams() {
    return [];
}

// page behaviour
export const dynamic = 'force-dynamic'; // always render dynamically
export const revalidate = false; // don't cache in development
