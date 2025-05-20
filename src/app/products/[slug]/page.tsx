import React from 'react';
import Image from 'next/image';
import { getProductBySlug } from '@/services/api/products';
import Button from '@/components/ui/Button';

interface ProductPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: ProductPageProps) {
    const response = await getProductBySlug(params.slug);

    if(!response.success) {
        return {
            title: 'Product Not Found',
        };
    }

    const product = response.data!;

    return {
      title: `${product.name} | Eco-Friendly Bioethanol Fireplaces`,
      description: product.description,

    };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const response = await getProductBySlug(params.slug);
  
  if (!response.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">{response.error?.message || 'The requested product could not be found'}</p>
        </div>
      </div>
    );
  }
  
  const product = response.data!;
  const featuredImage = product.images.find(img => img.isFeatured) || product.images[0];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            {featuredImage ? (
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span>No image available</span>
              </div>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map(image => (
                <div 
                  key={image.id} 
                  className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="25vw"
                    className="object-cover object-center"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="mb-6 flex items-center">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="ml-3 text-lg text-gray-500 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="prose mb-6">
            <p>{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Features</h3>
            <ul className="space-y-2">
              {product.attributes.map((attr, index) => (
                <li key={index} className="flex">
                  <span className="font-medium w-32">{attr.name}:</span>
                  <span>{attr.value}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Availability</h3>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              variant="primary" 
              onClick={() => alert(`Added ${product.name} to cart!`)}
              disabled={product.stock <= 0}
            >
              Add to Cart
            </Button>
            
            <Button variant="outline">
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}