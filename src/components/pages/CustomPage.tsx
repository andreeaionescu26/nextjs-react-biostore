import { PageRegistryEntry } from "@/types/navigation";

interface PageComponentProps {
    page: PageRegistryEntry;
    params: {
        slug: string[];
    };
}

export function CustomPage({ page, params}: PageComponentProps) {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {page.title}
                </h1>
                
                <div className="prose max-w-none">
                <p className="text-lg text-gray-600 mb-6">
                    This is a custom page created through your PHP admin system.
                </p>
                
                <p className="text-gray-600">
                    The content for this page will be loaded from your backend API and rendered here.
                    This allows your content team to create and manage pages through the familiar PHP editor interface.
                </p>
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

export default CustomPage;