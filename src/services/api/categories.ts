import { Category, CategoryListResponse } from '@/types/category';
import { getCategoriesMock, getCategoryBySlugMock } from '@/lib/mock-data/categories'; 
import { ApiResponse } from '@/types/api';

// Function to get categories with optional filtering
export async function getCategories(): Promise<ApiResponse<CategoryListResponse>> {
  try {
    // This will be a fetch call to the API
    const response = getCategoriesMock();
    
    return {
      success: true,
      data: response
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'FETCH_CATEGORIES_ERROR',
        message: 'Failed to fetch categories'
      }
    };
  }
}

// Function to get a category by its slug
export async function getCategoryBySlug(slug: string): Promise<ApiResponse<Category>> {
  try {
    // This will be a fetch call to the API
    const category = getCategoryBySlugMock(slug);
    
    if (!category) {
      return {
        success: false,
        error: {
          code: 'CATEGORY_NOT_FOUND',
          message: `Category with slug "${slug}" not found`
        }
      };
    }
    
    return {
      success: true,
      data: category
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'FETCH_CATEGORY_ERROR',
        message: 'Failed to fetch category details'
      }
    };
  }
}
 
