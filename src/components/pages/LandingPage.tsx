import { PageRegistryEntry } from "@/types/navigation";

interface PageComponentProps {
    page: PageRegistryEntry;
    params: {
        slug: string[];
    };
}

export function LandingPage({ page, params }: PageComponentProps) {
    return (
        <div className="full">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Hero Video Section */}
                <div className="relative h-screen w-full overflow-hidden">
                    {/* Video Background */}
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="/videos/hero-poster.jpg"
                    >
                        <source src="/videos/frontpage_hero_video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    
                    {/* Hero Content */}
                    <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
                        <div className="max-w-8xl">
                            <h1 className="text-5xl font-semibold mb-6 drop-shadow-lg">
                              Discover the world of decorative luxury fireplaces!
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
                                Expert guidance, bespoke solutions, and smokeless fireplaces!
                            </p>
                            <button className="bg-trasnparent text-white border-2 border-[#f58232] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gradient-to-r hover:from-[#f58232] hover:to-[#ff9500] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                               Read more
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Section - keeping your existing content */}
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