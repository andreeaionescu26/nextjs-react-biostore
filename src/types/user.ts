export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    addresses: Address[];
    createdAt: string;
}

export interface Address {
    id: number;
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
    isDefault: boolean;
}

export interface AuthResponse {
    user: User;
    token: string;
}