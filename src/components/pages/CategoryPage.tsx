import { PageRegistryEntry } from "@/types/navigation";

interface ProductPageProps {
    page: PageRegistryEntry;
    params: {
        slug: string[];
    };
}

export function CategoryPage({ page, params }: ProductPageProps) {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-lg shaodw-md p-8">
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

                {/* FIlters */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-4">
                        <select className="border border-gray-300 rounded-lg px-4 py-2">
                            <option> Sort by Price</option>
                            <option> Low to High</option>
                            <option> High to Low</option>
                        </select>
                        <select className="border border-gray-300 rounded-lg px-4 py-2">
                            <option> All Types</option>
                            <option> Wall mounted</option>
                            <option> Freestanding</option>
                        </select>
                        <select className="border border-gray-300 rounded-lg px-4 py-2">
                            <option> Price range</option>
                            <option> Under 500</option>
                            <option> 500 - 1000</option>
                            <option> Over 1000</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid Placeholder */}
                <div className="grid md:grid-cols3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                       <div key={item} className="bg-gray-50 rounded-lg p-4">
                          <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-gray-500">Product {item}</span>
                          </div>
                          <h3 className="font-medium text-gray-900 mb-2">Sample Product {item}</h3>
                          <p className="text-gray-600 text-sm mb-2">Sample description</p>
                          <p className="font-bold text-green-600">{(5000 + item * 1000).toLocaleString()} GBP</p>
                       </div>
                   ))}
                </div>

                {/* Debug Info (Development only) */}
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

export default CategoryPage;