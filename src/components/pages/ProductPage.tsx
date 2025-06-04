import { PageRegistryEntry } from '@/types/navigation';

interface ProductPageProps {
    page: PageRegistryEntry;
    params: {
        slug: string[];
    };
}

export default function ProductPage({ page, params }: ProductPageProps) {
    const productContent = page.content;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-8">
                {/* Breadcrumb */}
                <nav className="text-sm mb-4">
                    <span className="text-gray-500">Home</span>
                    <span className="mx-2"></span>
                    <span className="text-gray-500">Products</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">{page.title}</span>
                </nav>

                {/* Product Header */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Product Image Placeholder */}
                    <div className="text-gray-100 rounded-lg h-96 flex items-center justify-center">
                        <span className="text=gray-500 text-lg">Product Image</span>
                    </div>

                    {/* Product Info */}
                    <div>
                        {productContent?.price && (
                            <div className="mb-4">
                                <span className='text-3xl font-bold text-green-600'>
                                    {productContent.price} {productContent.currency || 'GBP'}
                                </span>
                            </div>
                        )}

                        {productContent?.inStock !== undefined && (
                            <div className='mb-4'>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                    productContent.inStock
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {productContent.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                        )}

                        <div className="space-y-4">
                            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                                Add to Cart
                            </button>
                            <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
                                Add to WishList
                            </button>
                        </div>

                        {/* Categories */}
                        {productContent?.categories && (
                            <div className="mt-6">
                                <h3 className="font-medium text-gray-9000 mb-2">Categories:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {productContent.categories.map((category: string, index: number) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Debug Info (Development Only) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Debug Info:</h3>
                        <pre className="text-xs text-gray-600 overflow-x-auto">
                            {JSON.stringify({ page, params }, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}