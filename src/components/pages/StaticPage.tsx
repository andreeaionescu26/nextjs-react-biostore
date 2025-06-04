import { PageRegistryEntry } from "@/types/navigation"

interface ProductPageProps {
    page: PageRegistryEntry;
    params: {
        slug: string[];
    };
}

export function StaticPage({page, params }: ProductPageProps) {
 return (
    <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {page.title}
                </h1>

                {page.seoData?.description && (
                    <p className="text-xl text-gray-600">
                        {page.seoData.description}
                    </p>
                )}
            </div>

            {/* Content Area */}
            <div className="prose max-w-none">
                {page.pageType === 'static' && page.slug === '' && (
                    /* Home page Component */
                    <div>
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">Premium Fireplaces</h3>
                                <p className="text-gray-600">Explore our range of premium fireplaces designed for comfort and style.</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
                                <p className="text-gray-600">Quick and secure delivery across the world.</p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
                                <p className="text-gray-600">Get help from our fireplace specialists.</p>
                            </div>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4"> Featured Products </h2>
                        <p className="text-gray-600 mb-6">Browse our latest and most popular products.</p> 
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                          Shop Now
                        </button>
                    </div>
                 </div>                   
                )}

                {page.pageType === 'static' && page.slug === 'about-us' && (
                    /* About Page Content */
                    <div>
                        <p className="text-lg mb-6">
                           Welcome to Bioethanol Fireplace Shop, leading provider of premium bioethanol fireplaces.
                        </p>
                        <p className="mb-4">
                           We specialize in high-quality, eco-friendly fireplace solutions that bring warmth and ambiance to your home without the need for traditional chimneys or gas connections.
                        </p>
                        <p className="mb-4">
                           Our extensive collection includes wall-mounted, freestanding, and built-in bioethanol fireplaces from top manufacturers, ensuring you find the perfect match for your space.
                        </p>
                    </div>
                )}

                {/* Generic Static Content */}
                {page.pageType === 'static' && !['', 'about-us'].includes(page.slug) && (
                    <div>
                        <p className="text-gray-600 mb-4">
                            This is a static page: <strong> {page.title} </strong>
                        </p>
                        <p className="text-gray-600">
                            Page content will be managed through PHP backend and displayed here.
                        </p>
                    </div>    
                )}
            </div>

            { /* Debug Info (Development only) */}
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h2 className="font-medium text-gray-900 mb-2">Debug Info:</h2>
                    <pre className="text-xs text-gray-600 overflow-x-auto">
                        {JSON.stringify({ page, params }, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    </div>
 );
}

export default StaticPage;