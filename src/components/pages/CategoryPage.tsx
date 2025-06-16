import { PageRegistryEntry } from "@/types/navigation";
import ProductGrid from '@/components/products/ProductGrid';
import { getProductsMock } from '@/lib/mock-data/products';
import { Product } from '@/types/product';

interface ProductPageProps {
    page: PageRegistryEntry;
    params: {
        slug: string[];
    };
}

export function CategoryPage({ page, params }: ProductPageProps) {
    //get products from mock data
    const productResponse = getProductsMock(1, 12);
    const products: Product[] = productResponse.products;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-8">
                {/* Category Header */}
                <div className="mb-8">
                    <nav className="text-sm mb-4">
                        <span className="text-gray-500">Home</span>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">{page.title}</span>
                    </nav>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {page.title}
                    </h1>

                    <p className="text-lg text-gray-600">
                        Browse our selection of {page.title.toLowerCase()}
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex flex-wrap gap-4">
                            <select className="border border-gray-300 rounded-lg px-4 py-2">
                                <option>Sort by Price</option>
                                <option>Low to High</option>
                                <option>High to Low</option>
                            </select>
                            <select className="border border-gray-300 rounded-lg px-4 py-2">
                                <option>All Types</option>
                                <option>Wall mounted</option>
                                <option>Freestanding</option>
                            </select>
                            <select className="border border-gray-300 rounded-lg px-4 py-2">
                                <option>Price range</option>
                                <option>Under $500</option>
                                <option>$500 - $1000</option>
                                <option>Over $1000</option>
                            </select>
                        </div>
                        
                        {/* Product count */}
                        <div className="text-gray-600 text-sm">
                            Showing {products.length} products
                        </div>
                    </div>
                </div>

                {/* Real Products Grid */}
                {products.length > 0 ? (
                    <ProductGrid 
                        products={products} 
                        columns={3} 
                    />
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600">Try adjusting your filter criteria.</p>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                    <nav className="flex items-center space-x-2">
                        <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">
                            Previous
                        </button>
                        <button className="px-3 py-2 text-sm font-medium text-white bg-[#f58232] border border-[#f58232] rounded-md">
                            1
                        </button>
                        <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                            2
                        </button>
                        <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                            Next
                        </button>
                    </nav>
                </div>

                {/* Debug Info (Development only) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Debug Info:</h3>
                        <div className="space-y-2">
                            <p className="text-xs text-gray-600">
                                <strong>Products loaded:</strong> {products.length}
                            </p>
                            <p className="text-xs text-gray-600">
                                <strong>Page:</strong> {page.title}
                            </p>
                            <details className="text-xs text-gray-600">
                                <summary className="cursor-pointer hover:text-gray-800">View full debug data</summary>
                                <pre className="mt-2 overflow-x-auto">
                                    {JSON.stringify({ page, params, productCount: products.length }, null, 2)}
                                </pre>
                            </details>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoryPage;