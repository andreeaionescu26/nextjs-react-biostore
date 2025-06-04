import { PageRegistryEntry } from "@/types/navigation";

interface PageComponentProps {
    page: PageRegistryEntry;
    params: {
        slug: string[];
    };
}

export function LandingPage({ page, params }: PageComponentProps) {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 text-center">
                    <h1 className="text-5xl font-bold mb-4">
                        {page.title}
                    </h1>
                    <p className="text-xl mb-8">
                        Special campaign landing page
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                        Get Started
                    </button>
                </div>

                {/* Content Section */}
                <div className="p-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Special Offer
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                This landing page content will be managed through your PHP admin system, 
                                allowing you to create targeted marketing campaigns.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li>✓ Customizable content</li>
                                <li>✓ Track conversions</li>
                                <li>✓ A/B testing ready</li>
                                <li>✓ Mobile optimized</li>
                            </ul>
                        </div>
                        
                        <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-lg">Campaign Image</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>       
    );
}

export default LandingPage;
