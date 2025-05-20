import { Product, ProductListResponse } from '@/types/product';

export const products: Product[] = [
    {
    id: 1,
    slug: 'wall-mounted-elegance-fireplace',
    name: 'Elegance Wall-Mounted Bioethanol Fireplace',
    description: 'Contemporary wall-mounted bioethanol fireplace with sleek stainless steel frame. Easy installation and clean-burning flame with no smoke or harmful emissions.',
    price: 499.99,
    compareAtPrice: 599.99,
    currency: 'USD',
    images: [
      {
        id: 1,
        url: '/images/products/wall-mounted-1.jpg',
        alt: 'Elegance Wall-Mounted Bioethanol Fireplace - Front View',
        isFeatured: true
      },
      {
        id: 2,
        url: '/images/products/wall-mounted-2.jpg',
        alt: 'Elegance Wall-Mounted Bioethanol Fireplace - Side View',
        isFeatured: false
      }
    ],
    thumbnail: '/images/products/wall-mounted-thumbnail.jpg',
    categoryId: 1,
    stock: 25,
    sku: 'WM-BF-001',
    attributes: [
      { name: 'Material', value: 'Stainless Steel, Tempered Glass' },
      { name: 'Dimensions', value: '90cm × 40cm × 12cm' },
      { name: 'Fuel Capacity', value: '2.5L' },
      { name: 'Burn Time', value: 'Up to 6 hours' }
    ],
    isPublished: true,
    createdAt: '2023-01-15T08:00:00Z',
    updatedAt: '2023-01-15T08:00:00Z'
  },
  {
    id: 2,
    slug: 'freestanding-zen-fireplace',
    name: 'Zen Freestanding Bioethanol Fireplace',
    description: 'Modern freestanding bioethanol fireplace with cylindrical design. Perfect for creating a warm ambiance in any room without the need for a chimney or gas line.',
    price: 749.99,
    currency: 'USD',
    images: [
      {
        id: 3,
        url: '/images/products/freestanding-1.jpg',
        alt: 'Zen Freestanding Bioethanol Fireplace - Full View',
        isFeatured: true
      },
      {
        id: 4,
        url: '/images/products/freestanding-2.jpg',
        alt: 'Zen Freestanding Bioethanol Fireplace - In Use',
        isFeatured: false
      }
    ],
    thumbnail: '/images/products/freestanding-thumbnail.jpg',
    categoryId: 2,
    stock: 15,
    sku: 'FS-BF-002',
    attributes: [
      { name: 'Material', value: 'Powder-coated Steel, Tempered Glass' },
      { name: 'Dimensions', value: '45cm × 45cm × 100cm' },
      { name: 'Fuel Capacity', value: '3L' },
      { name: 'Burn Time', value: 'Up to 7 hours' },
      { name: 'Color', value: 'Black, White' }
    ],
    isPublished: true,
    createdAt: '2023-02-10T09:30:00Z',
    updatedAt: '2023-02-12T11:20:00Z'
  },
  {
    id: 3,
    slug: 'tabletop-mini-fireplace',
    name: 'Mini Tabletop Bioethanol Fireplace',
    description: 'Compact tabletop bioethanol fireplace, perfect for dining tables, coffee tables, or outdoor gatherings. Creates beautiful dancing flames without smoke or ash.',
    price: 129.99,
    compareAtPrice: 149.99,
    currency: 'USD',
    images: [
      {
        id: 5,
        url: '/images/products/tabletop-1.jpg',
        alt: 'Mini Tabletop Bioethanol Fireplace',
        isFeatured: true
      },
      {
        id: 6,
        url: '/images/products/tabletop-2.jpg',
        alt: 'Mini Tabletop Bioethanol Fireplace - In Use',
        isFeatured: false
      }
    ],
    thumbnail: '/images/products/tabletop-thumbnail.jpg',
    categoryId: 3,
    stock: 50,
    sku: 'TT-BF-003',
    attributes: [
      { name: 'Material', value: 'Tempered Glass, Stainless Steel' },
      { name: 'Dimensions', value: '20cm × 20cm × 30cm' },
      { name: 'Fuel Capacity', value: '0.5L' },
      { name: 'Burn Time', value: 'Up to 3 hours' }
    ],
    isPublished: true,
    createdAt: '2023-03-05T10:15:00Z',
    updatedAt: '2023-03-05T10:15:00Z'
  },
  {
    id: 4,
    slug: 'built-in-luxury-fireplace',
    name: 'Luxury Built-In Bioethanol Fireplace',
    description: 'High-end built-in bioethanol fireplace designed for luxury homes. Custom sizing available for perfect integration with your interior design.',
    price: 1299.99,
    currency: 'USD',
    images: [
      {
        id: 7,
        url: '/images/products/built-in-1.jpg',
        alt: 'Luxury Built-In Bioethanol Fireplace',
        isFeatured: true
      },
      {
        id: 8,
        url: '/images/products/built-in-2.jpg',
        alt: 'Luxury Built-In Bioethanol Fireplace - Installed Example',
        isFeatured: false
      }
    ],
    thumbnail: '/images/products/built-in-thumbnail.jpg',
    categoryId: 4,
    stock: 10,
    sku: 'BI-BF-004',
    attributes: [
      { name: 'Material', value: 'Stainless Steel, Ceramic' },
      { name: 'Dimensions', value: '120cm × 30cm × 25cm (Custom sizes available)' },
      { name: 'Fuel Capacity', value: '5L' },
      { name: 'Burn Time', value: 'Up to 12 hours' },
      { name: 'Installation', value: 'Professional installation recommended' }
    ],
    isPublished: true,
    createdAt: '2023-01-20T14:25:00Z',
    updatedAt: '2023-02-15T09:30:00Z'
  },
  {
    id: 5,
    slug: 'outdoor-terrace-fireplace',
    name: 'Terrace Outdoor Bioethanol Fireplace',
    description: 'Weather-resistant outdoor bioethanol fireplace perfect for patios, terraces, and gardens. Provides warmth and ambiance for your outdoor living space.',
    price: 899.99,
    compareAtPrice: 999.99,
    currency: 'USD',
    images: [
      {
        id: 9,
        url: '/images/products/outdoor-1.jpg',
        alt: 'Terrace Outdoor Bioethanol Fireplace',
        isFeatured: true
      },
      {
        id: 10,
        url: '/images/products/outdoor-2.jpg',
        alt: 'Terrace Outdoor Bioethanol Fireplace - In Use',
        isFeatured: false
      }
    ],
    thumbnail: '/images/products/outdoor-thumbnail.jpg',
    categoryId: 5,
    stock: 20,
    sku: 'OD-BF-005',
    attributes: [
      { name: 'Material', value: 'Powder-coated Aluminum, Tempered Glass' },
      { name: 'Dimensions', value: '60cm × 60cm × 120cm' },
      { name: 'Fuel Capacity', value: '4L' },
      { name: 'Burn Time', value: 'Up to 9 hours' },
      { name: 'Weather Resistance', value: 'High' }
    ],
    isPublished: true,
    createdAt: '2023-03-10T11:00:00Z',
    updatedAt: '2023-03-15T13:45:00Z'
  }
];

export const getProductsMock = (page=1, limit = 10): ProductListResponse => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return {
        products: paginatedProducts,
        total: products.length,
        page,
        limit
    };
};

export const getProductBySlugMock = (slug: string): Product | undefined => {
    return products.find(product => product.slug === slug);
}
