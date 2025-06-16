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
                    totalSpent: state.user.id === 1 ? 5240 : state.user.id === 2 ? 3120 : 8900,
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
                return 'text-emerald-600 bg-emerald-50';
            case 'processing':
                return 'text-amber-600 bg-amber-50';
            case 'shipped':
                return 'text-blue-600 bg-blue-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    // Navigation items for the sidebar
    const navigationItems = [
        { id: 'dashboard', label: 'Overview', icon: '○' },
        { id: 'orders', label: 'Orders', icon: '□' },
        { id: 'profile', label: 'Profile', icon: '△' },
        { id: 'addresses', label: 'Addresses', icon: '◇' },
        { id: 'wishlist', label: 'Wishlist', icon: '♡' },
        { id: 'settings', label: 'Settings', icon: '⚙' },
    ];

    // Show loading state
    if (state.isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-white border-b border-gray-100">
                        <div className="px-6 py-8 sm:px-8">
                            <div className="animate-pulse">
                                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-64 bg-white border-r border-gray-100 min-h-screen">
                            <div className="p-6 animate-pulse">
                                <div className="space-y-2">
                                    {[1,2,3,4,5,6].map(i => (
                                        <div key={i} className="h-10 bg-gray-200 rounded"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 p-8">
                            <div className="animate-pulse">
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
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b border-gray-100">
                    <div className="px-6 py-8 sm:px-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-medium text-gray-900 tracking-tight">
                                    Good morning, {state.user.firstName}
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Member since {new Date(state.user.createdAt).getFullYear()}
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                {/* User role badge */}
                                {state.user.role && (
                                    <div className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                                        state.user.role === 'admin' 
                                            ? 'bg-[#F58232] text-white' 
                                            : 'bg-orange-50 text-[#F58232]'
                                    }`}>
                                        {state.user.role === 'admin' ? '👑 Admin' : 'Customer'}
                                    </div>
                                )}
                                
                                <button
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50"
                                >
                                    {isLoggingOut ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                                            Signing out
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign out</span>
                                            <span className="text-gray-400">→</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    {/* Sidebar */}
                    <div className="w-64 bg-white border-r border-gray-100 min-h-screen">
                        <nav className="p-6">
                            <div className="space-y-1">
                                {navigationItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                                            activeTab === item.id
                                                ? 'text-white bg-[#F58232] shadow-sm'
                                                : 'text-gray-600 hover:text-[#F58232] hover:bg-orange-50'
                                        }`}
                                    >
                                        <span className="w-4 text-center opacity-60">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-8">
                        {activeTab === 'dashboard' && (
                            <div className="space-y-8">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-white p-6 rounded-xl border border-gray-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#F58232] to-orange-400 opacity-10 rounded-full -mr-8 -mt-8"></div>
                                        <div className="text-2xl font-semibold text-gray-900 relative">
                                            £{accountData.stats.totalSpent.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">Total spent</div>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl border border-gray-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-400 opacity-10 rounded-full -mr-8 -mt-8"></div>
                                        <div className="text-2xl font-semibold text-gray-900 relative">
                                            {accountData.stats.ordersPlaced}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">Orders placed</div>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl border border-gray-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-400 opacity-10 rounded-full -mr-8 -mt-8"></div>
                                        <div className="text-2xl font-semibold text-gray-900 relative">
                                            {accountData.stats.wishlistItems}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">Wishlist items</div>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl border border-gray-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-400 opacity-10 rounded-full -mr-8 -mt-8"></div>
                                        <div className="text-2xl font-semibold text-gray-900 relative">
                                            {accountData.stats.loyaltyPoints}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">Points earned</div>
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-8">
                                    {/* Recent Orders */}
                                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#F58232] to-orange-400">
                                            <h3 className="font-medium text-white">Recent orders</h3>
                                        </div>
                                        <div className="p-6 space-y-4">
                                            {accountData.recentOrders.map((order) => (
                                                <div key={order.id} className="flex items-center justify-between py-3">
                                                    <div>
                                                        <div className="font-medium text-gray-900 text-sm">
                                                            {order.orderNumber}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-0.5">
                                                            {new Date(order.date).toLocaleDateString('en-GB', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                        <div className="font-medium text-gray-900">
                                                            £{order.total}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button 
                                                onClick={() => setActiveTab('orders')}
                                                className="text-sm text-[#F58232] hover:text-orange-600 font-medium mt-4 flex items-center gap-1"
                                            >
                                                View all orders 
                                                <span className="transition-transform group-hover:translate-x-1">→</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-orange-50">
                                            <h3 className="font-medium text-gray-900">Quick actions</h3>
                                        </div>
                                        <div className="p-6 grid grid-cols-2 gap-4">
                                            <button 
                                                onClick={() => setActiveTab('orders')}
                                                className="p-4 text-left border border-gray-100 rounded-lg hover:border-[#F58232] hover:bg-orange-50 transition-colors group"
                                            >
                                                <div className="font-medium text-gray-900 text-sm mb-1 group-hover:text-[#F58232]">Track order</div>
                                                <div className="text-xs text-gray-500">View order status</div>
                                            </button>
                                            <button 
                                                onClick={() => setActiveTab('profile')}
                                                className="p-4 text-left border border-gray-100 rounded-lg hover:border-[#F58232] hover:bg-orange-50 transition-colors group"
                                            >
                                                <div className="font-medium text-gray-900 text-sm mb-1 group-hover:text-[#F58232]">Edit profile</div>
                                                <div className="text-xs text-gray-500">Update information</div>
                                            </button>
                                            <button 
                                                onClick={() => setActiveTab('wishlist')}
                                                className="p-4 text-left border border-gray-100 rounded-lg hover:border-[#F58232] hover:bg-orange-50 transition-colors group"
                                            >
                                                <div className="font-medium text-gray-900 text-sm mb-1 group-hover:text-[#F58232]">Wishlist</div>
                                                <div className="text-xs text-gray-500">Saved items</div>
                                            </button>
                                            <button 
                                                onClick={() => setActiveTab('addresses')}
                                                className="p-4 text-left border border-gray-100 rounded-lg hover:border-[#F58232] hover:bg-orange-50 transition-colors group"
                                            >
                                                <div className="font-medium text-gray-900 text-sm mb-1 group-hover:text-[#F58232]">Addresses</div>
                                                <div className="text-xs text-gray-500">Manage locations</div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="max-w-4xl">
                                <div className="bg-white rounded-xl border border-gray-100">
                                    <div className="p-6 border-b border-gray-100">
                                        <h3 className="font-medium text-gray-900">Profile information</h3>
                                        <p className="text-sm text-gray-500 mt-1">Update your account details and preferences</p>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    First name
                                                </label>
                                                <div className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900">
                                                    {state.user.firstName}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Last name
                                                </label>
                                                <div className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900">
                                                    {state.user.lastName}
                                                </div>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email address
                                                </label>
                                                <div className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900">
                                                    {state.user.email}
                                                </div>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone number
                                                </label>
                                                <div className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900">
                                                    {state.user.phone || 'Not provided'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-gray-100">
                                            <button className="px-6 py-2.5 bg-[#F58232] text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                                                Edit profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Placeholder for other tabs */}
                        {activeTab !== 'dashboard' && activeTab !== 'profile' && (
                            <div className="max-w-4xl">
                                <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-gray-400">
                                            {navigationItems.find(item => item.id === activeTab)?.icon}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        {navigationItems.find(item => item.id === activeTab)?.label}
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        This section is currently under development.
                                    </p>
                                    <button 
                                        onClick={() => setActiveTab('dashboard')}
                                        className="px-6 py-2.5 bg-[#F58232] text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
                                    >
                                        Back to overview
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountPage;