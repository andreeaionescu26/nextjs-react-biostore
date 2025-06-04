import { PageRegistryEntry } from "@/types/navigation";

interface PageComponentProps {
    page: PageRegistryEntry;
    params: {
        slug: string [];
    };
}

export default function ArticlePage({ page, params }: PageComponentProps) {
    const articleContent = page.content;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <article className="bg-white rounded-lg shadow-md p-8">
                {/*Breadcrumn*/}
                <nav className="text-sm mb-4">
                    <span className="text-gray-500">Home</span>
                    <span className="mx-2"></span>
                    <span className="text-gray-500">Guides</span>
                    <span className="mx-2"></span>
                    <span className="text-gray-900">{page.title}</span>
                </nav>

                {/*Article Header*/}
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {page.title}
                    </h1>

                    <div className="flex items-center text-gray-600 text-sm space-x-4">
                        {articleContent?.author && (
                            <span> By {articleContent.author}</span>
                        )}

                        {articleContent?.readTime && (
                            <span> {articleContent.readtTime} read</span>
                        )}

                        <time dateTime={page.updatedAt}>
                            {new Date(page.updatedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                        </time>
                    </div>
                </header>

                {/*Article Content*/}
                <div className="prose max-w-none">
                    {page.title.toLowerCase().includes('installation') && (
                        <div>
                            <h2>Installation Guidelines</h2>
                            <p>Follow these steps to install the software:</p>

                            <h3>Before you begin</h3>
                            <ul>
                                <li> Read all manufacturer instructions Carefully</li>
                                <li> ENsure adequate ventitlation in the installation area</li>
                                <li>Check local building codes and regulations</li>
                                <li>Gather all necessary tools and materials</li>
                            </ul>

                            <h3>Installation Steps</h3>
                            <ol>
                                <li><strong>Choose the Location:</strong> Select a suitable wall or area with proper clearances</li>
                                <li><strong>Mark Mounting Points:</strong> Use the provided template to mark drilling points</li>
                                <li><strong>Install Mounting Hardware:</strong> Drill holes and install wall anchors</li>
                                <li><strong>Mount the Fireplace:</strong> Carefully hang the unit on the mounting brackets</li>
                                <li><strong>Test the Installation:</strong> Verify secure mounting and proper clearances</li>
                            </ol>
                        </div>
                    )}

                    {page.title.toLowerCase().includes('safety') && (
                    <div>
                       <h2>Safety Guidelines</h2>
                       <p>Bioethanol fireplaces are safe when used properly. Follow these important safety rules:</p>
              
                       <h3>Essential Safety Rules</h3>
                       <ul>
                          <li>Never refill the burner while it's hot or burning</li>
                          <li>Use only high-quality bioethanol fuel</li>
                          <li>Keep flammable materials away from the fireplace</li>
                          <li>Ensure proper ventilation at all times</li>
                          <li>Never leave the fireplace unattended while burning</li>
                       </ul>

                       <h3>Emergency Procedures</h3>
                       <p>In case of an emergency:</p>
                       <ul>
                          <li>Keep a fire extinguisher nearby</li>
                          <li>Know how to quickly extinguish the flame</li>
                          <li>Have an evacuation plan</li>
                          <li>Contact emergency services if needed</li>
                       </ul>
                    </div>     
                    )}

                    {/* Generic Article Content */}
                    {!page.title.toLowerCase().includes('installation') && !page.title.toLowerCase().includes('safety') && (
                        <div>
                            <p>This article content will be loaded from the PHP backend.</p>
                            <p>Article Category: <strong>{articleContent?.category || 'General'}</strong></p>
                        </div>
                    )}
                    </div>

                    {/* Artcle Footer */}
                    <footer className="mt-8 pt-8 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Was this article helpful?</p>
                                <div className="flex space-x-2 mt-2">
                                    <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200">Yes</button>
                                    <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">No</button>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-sm text-gray-600">Share this article</p>
                                <div className="flex space-x-2 mt-2">
                                   <button className="text-blue-600 hover:text-blue-800">Facebook</button>
                                   <button className="text-blue-400 hover:text-blue-600">Twitter</button>
                                   <button className="text-blue-700 hover:text-blue-900">LinkedIn</button>
                                </div>
                            </div>
                        </div>
                    </footer>
            </article>
        </div>
    );
}