import { PageRegistryEntry } from "@/types/navigation";

interface PageComponentProps {
    page: PageRegistryEntry;
    params: {
        slug: string[];
    };
}

export function BasketPage({ page, params }: PageComponentProps) {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                {/*Cart items */}
                <div className="space-y-6 mb-8">
                    {/*Sample cart item */}
                    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                        <div className="bg-gray-100 w-20 h-20 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-500">Image</span>
                        </div>

                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900">Double sided built in fireplace</h3>
                            <p className="text-sm text-gray-600"> SKU: FP-4889</p>
                            <p className="text-sm text-gray-600">Color: black</p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button className="px-2 py-1 hover:bg-gray-100">-</button>
                            <span className="px-4 py-1">1</span>
                            <button className="px-2 py-1 hover:bg-gray-100">+</button>
                          </div>
              
                          <div className="text-right">
                            <p className="font-medium">12,999 DKK</p>
                            <button className="text-red-600 text-sm hover:text-red-800">Remove</button>
                          </div>
                         </div>
                        </div>
                        
                        {/* Another Sample Item */}
                        <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                          <div className="bg-gray-100 w-20 h-20 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-500">Image</span>
                          </div>
            
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">Bioethanol Fuel - 5L</h3>
                          <p className="text-sm text-gray-600">SKU: FUEL-5L</p>
                        </div>
            
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button className="px-2 py-1 hover:bg-gray-100">-</button>
                            <span className="px-4 py-1">2</span>
                            <button className="px-2 py-1 hover:bg-gray-100">+</button>
                        </div>
              
                        <div className="text-right">
                           <p className="font-medium">599 DKK</p>
                           <button className="text-red-600 text-sm hover:text-red-800">Remove</button>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Cart Summary */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="grid md:grid-cols-2 gap-8">
                  {/* Shipping & Promo */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Shipping Options</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="shipping" className="mr-2" defaultChecked />
                        <span className="text-sm">Standard Delivery (3-5 days) - Free</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="shipping" className="mr-2" />
                        <span className="text-sm">Express Delivery (1-2 days) - 299 DKK</span>
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
                  <span>Subtotal:</span>
                  <span>14,197 DKK</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>3,549 DKK</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>17,746 DKK</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Proceed to Checkout
              </button>
              
              <button className="w-full mt-2 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketPage;