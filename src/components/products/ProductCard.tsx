'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import Button from '@/components/ui/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/products/${product.slug}`} className="block relative h-64 overflow-hidden">
        <div className="w-full h-full bg-gray-100 relative">
          {/* You'll need placeholder images until you have real ones */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            {product.thumbnail ? (
              <Image 
                src={product.thumbnail}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center"
              />
            ) : (
              <span>No image</span>
            )}
          </div>
        </div>
        
        {product.compareAtPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Sale
          </div>
        )}
      </Link>
      
      <div className="p-4">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
        </Link>
        
        <div className="mb-3 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <Button variant="primary" onClick={(e) => {
            e.preventDefault();
            // This will be connected to cart functionality later
            alert(`Added ${product.name} to cart!`);
          }}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;