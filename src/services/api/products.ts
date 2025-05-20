import { Product, ProductFilterParams, ProductListResponse } from '@/types/product';
import { getProductBySlugMock, getProductsMock } from '@/lib/mock-data/products';
import { ApiResponse } from '@/types/api';

// Function to get products with optional filtering
export async function getProducts(
  params?: ProductFilterParams
): Promise<ApiResponse<ProductListResponse>> {
  try {
    // This will be a fatch call to the API
    const response = getProductsMock(params?.page || 1, params?.limit || 10);
    
    return {
      success: true,
      data: response
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'FETCH_PRODUCTS_ERROR',
        message: 'Failed to fetch products'
      }
    };
  }
}

// Function to egt a product by its slug
export async function getProductBySlug(slug: string): Promise<ApiResponse<Product>> {
  try {
    // This will be a fetch call to the API
    const product = getProductBySlugMock(slug);
    
    if (!product) {
      return {
        success: false,
        error: {
          code: 'PRODUCT_NOT_FOUND',
          message: `Product with slug "${slug}" not found`
        }
      };
    }
    
    return {
      success: true,
      data: product
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'FETCH_PRODUCT_ERROR',
        message: 'Failed to fetch product details'
      }
    };
  }
}