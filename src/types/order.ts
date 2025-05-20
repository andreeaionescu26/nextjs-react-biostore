export interface Order {
    id: number;
    orderNumber: string;
    userId: number;
    status: OrderStatus;
    items: OrderItem[];
    shippingAddress: OrderAddress;
    billingAddress: OrderAddress;
    paymentMethod: string;
    paymentStatus: PaymentStatus;
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
    currency: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderAddress {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
}

export interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    productSku: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    attributes?: Record<string, string>;
}

export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHIPPED ='shipped',
    DELIVERED = 'delivered',
    CANCELED = 'canceled',
    REFUNDED = 'refunded',
}

export enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
    FAILED = 'failed',
    REFUNDED = 'refunded',
}

export interface OrderListResponse {
    orders: Order[];
    total: number;
    page: number;
    limit: number;
}