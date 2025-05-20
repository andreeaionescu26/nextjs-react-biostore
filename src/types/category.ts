export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    parentId?: number;
    children?: Category[];
    productCount?: number;
}

export interface CategoryListResponse {
    categories: Category[];
    total: number;
}