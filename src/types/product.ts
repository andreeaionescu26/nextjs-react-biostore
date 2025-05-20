export interface Product {
    id: number;
    slug: string;
    name: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    currency: string;
    images: ProductImage[];
    thumbnail: string;
    categoryId: number;
    stock: number;
    sku: string;
    attributes: ProductAttribute[];
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProductImage {
    id: number;
    url:string
    alt: string;
    isFeatured: boolean;
}

export interface ProductAttribute {
    name: string;
    value: string;
}

export interface ProductListResponse {
    products: Product[];
    total: number;
    page: number;
    limit: number;
}

export interface ProductFilterParams {
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    query?: string;
    sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
    page?: number;
    limit?: number;
}