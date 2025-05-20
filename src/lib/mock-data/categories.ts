import { Category, CategoryListResponse } from '@/types/category';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Wall-Mounted Fireplaces',
    slug: 'wall-mounted-fireplaces',
    description: 'Space-saving bioethanol fireplaces that can be mounted on any wall',
    imageUrl: '/images/categories/wall-mounted.jpg',
    productCount: 8
  },
  {
    id: 2,
    name: 'Freestanding Fireplaces',
    slug: 'freestanding-fireplaces',
    description: 'Versatile bioethanol fireplaces that can be placed anywhere in your home',
    imageUrl: '/images/categories/freestanding.jpg',
    productCount: 12
  },
  {
    id: 3,
    name: 'Tabletop Fireplaces',
    slug: 'tabletop-fireplaces',
    description: 'Compact bioethanol fireplaces perfect for tables and small spaces',
    imageUrl: '/images/categories/tabletop.jpg',
    productCount: 10
  },
  {
    id: 4,
    name: 'Built-In Fireplaces',
    slug: 'built-in-fireplaces',
    description: 'Custom bioethanol fireplaces designed to be integrated into walls and furniture',
    imageUrl: '/images/categories/built-in.jpg',
    productCount: 5
  },
  {
    id: 5,
    name: 'Outdoor Fireplaces',
    slug: 'outdoor-fireplaces',
    description: 'Weather-resistant bioethanol fireplaces for gardens, patios, and terraces',
    imageUrl: '/images/categories/outdoor.jpg',
    productCount: 7
  },
  {
    id: 6,
    name: 'Bioethanol Fuel',
    slug: 'bioethanol-fuel',
    description: 'High-quality bioethanol fuel for clean and efficient burning',
    imageUrl: '/images/categories/fuel.jpg',
    productCount: 3
  },
  {
    id: 7,
    name: 'Accessories',
    slug: 'accessories',
    description: 'Essential accessories for your bioethanol fireplace',
    imageUrl: '/images/categories/accessories.jpg',
    productCount: 15
  }
];

export const getCategoriesMock = (): CategoryListResponse => {
    return {
        categories,
        total: categories.length
    };
    };

export const getCategoryBySlugMock = (slug: string): Category | undefined => {
    return categories.find(category => category.slug === slug);
}