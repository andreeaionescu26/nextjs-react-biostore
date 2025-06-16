'use client';

import React, { useState, useEffect } from 'react';
import { useAuth, authHelpers } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { PageRegistryEntry } from "@/types/navigation";

interface PageComponentProps {
    page: PageRegistryEntry;
    params: {
        slug: string[];
    };
}

// Mock data interfaces for the account
interface OrderSummary {
    id: string;
    orderNumber: string;
    total: number;
    date: string;
    status: 'delivered' | 'processing' | 'shipped';
}

interface AccountStats {
    totalSpent: number;
    ordersPlaced: number;
    wishlistItems: number;
    loyaltyPoints: number;
}

export function AccountPage({ page, params }: PageComponentProps) {
    const { state, logout } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!state.isLoading && !state.isAuthentificated) {
            router.push('/login?redirect=/my-account');
        }
    }, [state.isAuthentificated, state.isLoading, router]);

    // Mock account data (in real app, this would come from API)
    const [accountData, setAccountData] = useState<{
        recentOrders: OrderSummary[];
        stats: AccountStats;
    }>({
        recentOrders: [],
        stats: {
            totalSpent: 0,
            ordersPlaced: 0,
            wishlistItems: 0,
            loyaltyPoints: 0
        }
    });

    // Load mock account data based on logged-in user
    useEffect(() => {
        if (state.user) {
            // Mock data based on user ID
            const mockData = {
                recentOrders: [
                    {
                        id: '1',
                        orderNumber: '#ORD-2024-001',
                        total: 785,
                        date: '2024-05-15',
                        status: 'delivered' as const
                    },
                    {
                        id: '2',
                        orderNumber: '#ORD-2024-002',
                        total: 1200,
                        date: '2024-05-20',
                        status: 'processing' as const
                    },
                    {
                        id: '3',
                        orderNumber: '#ORD-2024-003',
                        total: 450,
                        date: '2024-06-01',
                        status: 'shipped' as const
                    }
                ],
                stats: {
                    totalSpent: state.user.id === 1 ? 5240 : state.user.id === 2 ? 3120 : 8900, // Different amounts per user
                    ordersPlaced: state.user.id === 1 ? 15 : state.user.id === 2 ? 8 : 24,
                    wishlistItems: state.user.id === 1 ? 8 : state.user.id === 2 ? 12 : 5,
                    loyaltyPoints: state.user.id === 1 ? 524 : state.user.id === 2 ? 312 : 890
                }
            };
            setAccountData(mockData);
        }
    }, [state.user]);

    // Handle logout
    const handleLogout = async () => {
        setIsLoggingOut(true);
        
        // Add a small delay for better UX
        setTimeout(() => {
            logout();
            router.push('/');
        }, 500);
    };

    // Get status color for orders
    const getStatusColor = (status: OrderSummary['status']) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Navigation items for the sidebar
    const navigationItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
        { id: 'orders', label: 'Orders', icon: '📦' },
        { id: 'profile', label: 'Profile', icon: '👤' },
        { id: 'addresses', label: 'Addresses', icon: '📍' },
        { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];

    // Show loading state
    if (state.isLoading) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="md:col-span-1">
                                <div className="space-y-2">
                                    {[1,2,3,4,5,6].map(i => (
                                        <div key={i} className="h-10 bg-gray-200 rounded"></div>
                                    ))}
                                </div>
                            </div>
                            <div className="md:col-span-3">
                                <div className="h-64 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Don't render if not authenticated (will redirect)
    if (!state.isAuthentificated || !state.user) {
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-8">
                {/* Header with user info and logout */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome back, {state.user.firstName}!
                        </h1>
                        <p className="text-gray-600">
                            Member since {new Date(state.user.createdAt).getFullYear()}
                        </p>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                        {/* User role badge */}
                        {state.user.role && (
                            <span className={`
                                px-3 py-1 rounded-full text-sm font-medium
                                ${state.user.role === 'admin' 
                                    ? 'bg-purple-100 text-purple-800' 
                                    : 'bg-blue-100 text-blue-800'
                                }
                            `}>
                                {state.user.role === 'admin' ? '👑 Admin' : '🛒 Customer'}
                            </span>
                        )}
                        
                        {/* Logout button */}
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className={`
                                px-4 py-2 rounded-lg font-medium transition-all duration-200
                                ${isLoggingOut
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-md'
                                }
                            `}
                        >
                            {isLoggingOut ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing out...
                                </div>
                            ) : (
                                '🚪 Sign Out'
                            )}
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="md:col-span-1">
                        <nav className="space-y-2">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`
                                        w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3
                                        ${activeTab === item.id
                                            ? 'bg-[#f58232] text-white shadow-md'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-3">
                        {activeTab === 'dashboard' && (
                            <div className="space-y-6">
                                {/* Account Stats Cards */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
                                        <div className="text-2xl font-bold">£{accountData.stats.totalSpent.toLocaleString()}</div>
                                        <div className="text-blue-100 text-sm">Total Spent</div>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
                                        <div className="text-2xl font-bold">{accountData.stats.ordersPlaced}</div>
                                        <div className="text-green-100 text-sm">Orders Placed</div>
                                    </div>
                                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
                                        <div className="text-2xl font-bold">{accountData.stats.wishlistItems}</div>
                                        <div className="text-purple-100 text-sm">Wishlist Items</div>
                                    </div>
                                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
                                        <div className="text-2xl font-bold">{accountData.stats.loyaltyPoints}</div>
                                        <div className="text-orange-100 text-sm">Loyalty Points</div>
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-6">
                                    {/* Recent Orders */}
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                                            📦 Recent Orders
                                        </h3>
                                        <div className="space-y-3">
                                            {accountData.recentOrders.map((order) => (
                                                <div key={order.id} className="bg-white p-4 rounded-lg border">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <div className="font-medium text-gray-900">{order.orderNumber}</div>
                                                            <div className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="font-bold text-gray-900">£{order.total}</div>
                                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button 
                                                onClick={() => setActiveTab('orders')}
                                                className="mt-4 text-[#f58232] text-sm hover:text-[#e6742d] font-medium"
                                            >
                                                View all orders →
                                            </button>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                                            ⚡ Quick Actions
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button 
                                                onClick={() => setActiveTab('orders')}
                                                className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="text-center">
                                                    <div className="text-2xl mb-2">📦</div>
                                                    <span className="text-sm font-medium">Track Order</span>
                                                </div>
                                            </button>
                                            <button 
                                                onClick={() => setActiveTab('profile')}
                                                className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="text-center">
                                                    <div className="text-2xl mb-2">👤</div>
                                                    <span className="text-sm font-medium">Edit Profile</span>
                                                </div>
                                            </button>
                                            <button 
                                                onClick={() => setActiveTab('wishlist')}
                                                className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="text-center">
                                                    <div className="text-2xl mb-2">❤️</div>
                                                    <span className="text-sm font-medium">View Wishlist</span>
                                                </div>
                                            </button>
                                            <button 
                                                onClick={() => setActiveTab('addresses')}
                                                className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="text-center">
                                                    <div className="text-2xl mb-2">📍</div>
                                                    <span className="text-sm font-medium">Addresses</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">👤 Profile Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <div className="p-3 bg-white border border-gray-200 rounded-lg">{state.user.firstName}</div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <div className="p-3 bg-white border border-gray-200 rounded-lg">{state.user.lastName}</div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <div className="p-3 bg-white border border-gray-200 rounded-lg">{state.user.email}</div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <div className="p-3 bg-white border border-gray-200 rounded-lg">{state.user.phone || 'Not provided'}</div>
                                    </div>
                                </div>
                                <button className="mt-4 px-4 py-2 bg-[#f58232] text-white rounded-lg hover:bg-[#e6742d] transition-colors">
                                    Edit Profile
                                </button>
                            </div>
                        )}

                        {/* Placeholder content for other tabs */}
                        {activeTab !== 'dashboard' && activeTab !== 'profile' && (
                            <div className="bg-gray-50 p-8 rounded-lg text-center">
                                <div className="text-4xl mb-4">
                                    {navigationItems.find(item => item.id === activeTab)?.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {navigationItems.find(item => item.id === activeTab)?.label}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    This section is coming soon! We're working on making your account even better.
                                </p>
                                <button 
                                    onClick={() => setActiveTab('dashboard')}
                                    className="px-4 py-2 bg-[#f58232] text-white rounded-lg hover:bg-[#e6742d] transition-colors"
                                >
                                    Back to Dashboard
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountPage;