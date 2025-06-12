'use client';

import { PageRegistryEntry } from '@/types/navigation';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';;
import Link from 'next/link';

interface PageComponentProps {
    page: PageRegistryEntry;
    params: {
        slug: string[];
    };
}

export function BasketPage({ page, params }: PageComponentProps) {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart();
  const { items, total, itemCount } = state;

  //calculate shipping
  const shippingCost = total > 100 ? 0 : (total > 0 ? 10 : 0);

  //calculate tax
  const taxRate = 0.20;
  const taxAmount = total * taxRate;

  //calculate final total
  const finalTotal = total + shippingCost + taxAmount;

  //handle quantity updates 
  const  handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

    return (
         <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                {/* Cart Items */}
                {items.length > 0 ? (
                    <div className="space-y-6 mb-8">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                                {/* Product Image */}
                                <div className="bg-gray-100 w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-500">No Image</span>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-600">Product ID: {item.productId}</p>
                                    <Link 
                                        href={`/products/${item.slug}`}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        View Product Details →
                                    </Link>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-gray-300 rounded">
                                        <button 
                                            className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 min-w-[3rem] text-center">{item.quantity}</span>
                                        <button 
                                            className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            disabled={item.quantity >= item.maxStock}
                                        >
                                            +
                                        </button>
                                    </div>
                    
                                    <div className="text-right">
                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                        <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                                        <button 
                                            className="text-red-600 text-sm hover:text-red-800 mt-1"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty Cart Message */
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v4.01" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                        <p className="text-gray-600 mb-6">Add some products to get started!</p>
                        <Link 
                            href="/products"
                            className="inline-block bg-[#f58232] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#e6742d] transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}

                {/* Cart Summary - Only show if items exist */}
                {items.length > 0 && (
                    <>
                        {/* Clear Cart Button */}
                        <div className="mb-6 flex justify-between items-center">
                            <span className="text-gray-600">{itemCount} item{itemCount !== 1 ? 's' : ''} in cart</span>
                            <button 
                                onClick={clearCart}
                                className="text-red-600 text-sm hover:text-red-800"
                            >
                                Clear Cart
                            </button>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Shipping & Promo */}
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-4">Shipping Options</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input type="radio" name="shipping" className="mr-2" defaultChecked />
                                            <span className="text-sm">
                                                {shippingCost === 0 ? 'Free Shipping (orders over $100)' : `Standard Delivery - $${shippingCost.toFixed(2)}`}
                                            </span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="shipping" className="mr-2" />
                                            <span className="text-sm">Express Delivery (1-2 days) - $19.99</span>
                                        </label>
                                    </div>
                    
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Promo Code
                                        </label>
                                        <div className="flex gap-2">
                                            <input 
                                                type="text" 
                                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2" 
                                                placeholder="Enter code"
                                            />
                                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''}):</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shipping:</span>
                                            <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Tax (20%):</span>
                                            <span>${taxAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-2 mt-2">
                                            <div className="flex justify-between font-medium text-lg">
                                                <span>Total:</span>
                                                <span>${finalTotal.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                    
                                    <button className="w-full mt-6 bg-[#f58232] text-white py-3 px-6 rounded-lg hover:bg-[#e6742d] transition-colors font-medium">
                                        Proceed to Checkout
                                    </button>
                    
                                    <Link 
                                        href="/products"
                                        className="block w-full mt-2 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors text-center"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
  );
}

export default BasketPage;