import { PageRegistryEntry } from "@/types/navigation";

interface PageComponentProps {
    page: PageRegistryEntry;
    params: {
        slug: string[];
    };
}

export function AccountPage({ page, params }: PageComponentProps) {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My account</h1>

                <div className="grid md:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="md:col-span-1">
                        <nav className="space-y-2">
                            <a href="#" className="block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                                Dashboard
                            </a>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Orders
                            </a>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Profile
                            </a>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Addresses
                            </a>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Wishlist
                            </a>
                            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Settings
                            </a>
                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-3">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/*Recent Orders*/}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Order #12345</span>
                                        <span className="text-sm font-medium"> 785 GBP</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Order #12346</span>
                                        <span className="text-sm font-medium"> 1200 GBP</span>
                                    </div>
                                    <button className="mt-4 text-blue-600 text-sm hover:text-blue-800">
                                        View all orders →
                                    </button>
                                </div>

                                {/*Account stats*/}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4">Account Summary</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Total Spent</span>
                                            <span className="text-sm font-medium"> 5000 GBP</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Orders Placed</span>
                                            <span className="text-sm font-medium"> 15</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Wishlist Items</span>
                                            <span className="text-sm font-medium"> 8</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">📦</div>
                                            <span className="text-sm">Track Order</span>
                                        </div>
                                    </button>
                                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">⚙️</div>
                                            <span className="text-sm">Account Settings</span>
                                        </div>
                                    </button>
                                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">❤️</div>
                                            <span className="text-sm">View Wishlist</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    );
}

export default AccountPage;