// Simple mock navigation data to validate our TypeScript interfaces
// This represents a small subset of the full site structure (English version for development)

import { NavigationSystem, NavigationItem, SlugMapping, PageRegistryEntry, PageType } from '../../types/navigation';

// Mock navigation menu structure (2-3 levels deep)
const mockMenuStructure: NavigationItem[] = [
  {
    id: "home",
    title: "Home",
    slug: "",
    pageType: "static",
    sortOrder: 1,
    isVisible: true,
    metadata: {
      description: "Bioethanol Fireplace Shop - Largest selection of bio fireplaces"
    }
  },
  {
    id: "products",
    title: "Products",
    slug: "products",
    pageType: "category",
    sortOrder: 2,
    isVisible: true,
    children: [
      {
        id: "fireplaces",
        title: "Fireplaces",
        slug: "fireplaces",
        pageType: "category",
        parentId: "products",
        sortOrder: 1,
        isVisible: true,
        children: [
          {
            id: "wall-mounted",
            title: "Wall Mounted",
            slug: "wall-mounted",
            pageType: "category",
            parentId: "fireplaces",
            sortOrder: 1,
            isVisible: true
          },
          {
            id: "freestanding",
            title: "Freestanding",
            slug: "freestanding",
            pageType: "category",
            parentId: "fireplaces",
            sortOrder: 2,
            isVisible: true
          }
        ]
      },
      {
        id: "accessories",
        title: "Accessories",
        slug: "accessories",
        pageType: "category",
        parentId: "products",
        sortOrder: 2,
        isVisible: true
      }
    ]
  },
  {
    id: "guides",
    title: "Guides",
    slug: "guides",
    pageType: "category",
    sortOrder: 3,
    isVisible: true,
    children: [
      {
        id: "installation",
        title: "Installation",
        slug: "installation",
        pageType: "category",
        parentId: "guides",
        sortOrder: 1,
        isVisible: true
      },
      {
        id: "safety",
        title: "Safety",
        slug: "safety",
        pageType: "category",
        parentId: "guides",
        sortOrder: 2,
        isVisible: true
      }
    ]
  },
  {
    id: "about",
    title: "About Us",
    slug: "about-us",
    pageType: "static",
    sortOrder: 4,
    isVisible: true
  },
  {
    id: "account",
    title: "My Account",
    slug: "my-account",
    pageType: "account",
    sortOrder: 5,
    isVisible: true
  },
  {
    id: "basket",
    title: "Cart",
    slug: "cart",
    pageType: "basket",
    sortOrder: 6,
    isVisible: true
  }
];

// Mock slug mappings (URL to page ID conversions)
const mockSlugMappings: SlugMapping[] = [
  // Home page
  {
    slug: "",
    pageId: "home",
    pageType: "static",
    fullUrl: "/"
  },
  
  // Product examples (following your URL pattern)
  {
    slug: "double-sided-built-in-hybrid-fireplace",
    pageId: "4889",
    pageType: "product",
    fullUrl: "/double-sided-built-in-hybrid-fireplace_4889.html"
  },
  {
    slug: "wall-mounted-bioethanol-fireplace-black",
    pageId: "4892",
    pageType: "product", 
    fullUrl: "/wall-mounted-bioethanol-fireplace-black_4892.html"
  },
  {
    slug: "freestanding-glass-bioethanol-fireplace",
    pageId: "4895",
    pageType: "product",
    fullUrl: "/freestanding-glass-bioethanol-fireplace_4895.html"
  },
  
  // Category pages
  {
    slug: "fireplaces",
    pageId: "cat_100",
    pageType: "category",
    fullUrl: "/fireplaces"
  },
  {
    slug: "wall-mounted",
    pageId: "cat_101",
    pageType: "category",
    fullUrl: "/fireplaces/wall-mounted"
  },
  
  // Article examples
  {
    slug: "installation-guide",
    pageId: "art_200",
    pageType: "article",
    fullUrl: "/guides/installation-guide"
  },
  {
    slug: "safety-rules",
    pageId: "art_201",
    pageType: "article",
    fullUrl: "/guides/safety-rules"
  },
  
  // Static pages
  {
    slug: "about-us",
    pageId: "static_about",
    pageType: "static",
    fullUrl: "/about-us"
  },
  
  // Main products page
  {
    slug: "products",
    pageId: "products_main",
    pageType: "category",
    fullUrl: "/products"
  },
  
  // User pages
  {
    slug: "my-account",
    pageId: "account_main",
    pageType: "account",
    fullUrl: "/my-account"
  },
  {
    slug: "cart",
    pageId: "basket_main",
    pageType: "basket",
    fullUrl: "/cart"
  },
  
  // Accessories page
  {
    slug: "accessories",
    pageId: "accessories_main",
    pageType: "category",
    fullUrl: "/accessories"
  }
];

// Mock page registry entries
const mockPageRegistry: PageRegistryEntry[] = [
  // Home page
  {
    id: "home",
    title: "Bioethanol Fireplace Shop - Largest Selection",
    slug: "",
    pageType: "static",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-06-01T00:00:00Z",
    template: "home",
    seoData: {
      title: "Bioethanol Fireplace Shop - Largest Selection of Bio Fireplaces",
      description: "Buy bioethanol fireplaces online with fast delivery. Large selection of wall-mounted and freestanding bio fireplaces.",
      keywords: ["bioethanol fireplace", "bioethanol", "fireplace", "wall-mounted", "freestanding"]
    }
  },
  
  // Product examples
  {
    id: "4889",
    title: "Double-Sided Built-In Hybrid Fireplace",
    slug: "double-sided-built-in-hybrid-fireplace",
    pageType: "product",
    status: "active",
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2024-05-20T00:00:00Z",
    template: "product",
    seoData: {
      title: "Double-Sided Built-In Hybrid Fireplace - Bioethanol Shop",
      description: "Elegant double-sided hybrid fireplace for built-in installation. Perfect for modern homes.",
      keywords: ["hybrid fireplace", "double-sided", "built-in", "modern"]
    },
    content: {
      price: 12999,
      currency: "DKK",
      inStock: true,
      categories: ["fireplaces", "wall-mounted"]
    }
  },
  {
    id: "4892", 
    title: "Wall-Mounted Bioethanol Fireplace Black",
    slug: "wall-mounted-bioethanol-fireplace-black",
    pageType: "product",
    status: "active",
    createdAt: "2024-04-01T00:00:00Z",
    updatedAt: "2024-05-25T00:00:00Z",
    template: "product",
    content: {
      price: 8999,
      currency: "DKK", 
      inStock: true,
      categories: ["fireplaces", "wall-mounted"]
    }
  },
  
  // Article examples
  {
    id: "art_200",
    title: "Installation Guide for Bioethanol Fireplaces",
    slug: "installation-guide",
    pageType: "article",
    status: "active",
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-04-15T00:00:00Z",
    template: "article",
    content: {
      author: "Fireplace Expert",
      readTime: "5 min",
      category: "installation"
    }
  },
  
  // Category pages
  {
    id: "products_main",
    title: "All Products",
    slug: "products",
    pageType: "category",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
    template: "category",
    seoData: {
      title: "All Bioethanol Fireplaces - Shop Our Complete Collection",
      description: "Browse our complete collection of bioethanol fireplaces. Wall-mounted, freestanding, and built-in models available.",
      keywords: ["bioethanol fireplaces", "shop fireplaces", "fireplace collection"]
    }
  },
  {
    id: "cat_100",
    title: "Fireplaces Category",
    slug: "fireplaces",
    pageType: "category",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
    template: "category",
    seoData: {
      title: "Bioethanol Fireplaces - Browse Our Collection",
      description: "Discover our wide selection of bioethanol fireplaces including wall-mounted and freestanding models.",
      keywords: ["bioethanol fireplaces", "wall-mounted fireplaces", "freestanding fireplaces"]
    }
  },
  
  // Static pages
  {
    id: "static_about",
    title: "About Bioethanol Fireplace Shop",
    slug: "about-us",
    pageType: "static",
    status: "active", 
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
    template: "about"
  },
  
  // User pages
  {
    id: "account_main",
    title: "My Account",
    slug: "my-account",
    pageType: "account",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    template: "account"
  },
  {
    id: "basket_main",
    title: "Shopping Cart",
    slug: "cart",
    pageType: "basket",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    template: "basket"
  },
  
  // Accessories page
  {
    id: "accessories_main",
    title: "Accessories",
    slug: "accessories",
    pageType: "category",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
    template: "category",
    seoData: {
      title: "Fireplace Accessories - Fuel, Tools & More",
      description: "Complete your fireplace setup with our range of accessories including bioethanol fuel, cleaning tools, and safety equipment.",
      keywords: ["fireplace accessories", "bioethanol fuel", "fireplace tools"]
    }
  }
];

// Complete mock navigation system
export const mockNavigationSystem: NavigationSystem = {
  menuStructure: mockMenuStructure,
  pageRegistry: mockPageRegistry,
  slugMappings: mockSlugMappings,
  pageTypes: {
    product: {
      template: "ProductPage",
      apiEndpoint: "/api/products",
      requiresAuth: false
    },
    category: {
      template: "CategoryPage", 
      apiEndpoint: "/api/categories",
      requiresAuth: false
    },
    article: {
      template: "ArticlePage",
      apiEndpoint: "/api/articles",
      requiresAuth: false
    },
    static: {
      template: "StaticPage",
      apiEndpoint: "/api/pages",
      requiresAuth: false
    },
    account: {
      template: "AccountPage",
      apiEndpoint: "/api/account",
      requiresAuth: true
    },
    basket: {
      template: "BasketPage",
      apiEndpoint: "/api/basket",
      requiresAuth: false
    },
    custom: {
      template: "CustomPage",
      apiEndpoint: "/api/custom",
      requiresAuth: false
    },
    landing: {
      template: "LandingPage",
      apiEndpoint: "/api/landing", 
      requiresAuth: false
    }
  },
  lastUpdated: "2024-06-03T10:00:00Z",
  version: "1.0"
};