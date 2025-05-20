export interface CartItem {
    id: number;
    productId: number;
    product: {
        name: string;
        price: number;
        thumbnail: string;
        sku: string;
    };
    quantity: number;
    price: number;
    attributes?: Record<string, string>;
}

export interface Cart {
    id: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    currency: string;
    userId?: number;
}