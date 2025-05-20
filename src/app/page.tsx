// src/app/page.tsx
import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/services/api/products';
import { getCategories } from '@/services/api/categories';
import ProductGrid from '@/components/products/ProductGrid';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';

export default async function Home() {
  const productsResponse = await getProducts({ limit: 3 });
  const categoriesResponse = await getCategories();
  
  const featuredProducts = productsResponse.success ? productsResponse.data!.products : [];
  const categories = categoriesResponse.success ? categoriesResponse.data!.categories : [];
  
  return (
    
    <main className="flex min-h-screen flex-col">
      < Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Eco-Friendly Bioethanol Fireplaces
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Beautiful, clean-burning fireplaces for your home with no installation required
          </p>
          <div className="space-x-4">
            <Button variant="primary">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button variant="outline">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link href="/products" className="text-blue-600 hover:underline">
              View All Products
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map(category => (
              <Link 
                key={category.id} 
                href={`/categories/${category.slug}`}
                className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-video relative bg-gray-100">
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <span>No image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{category.productCount} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Our Bioethanol Fireplaces?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">No Installation Required</h3>
              <p className="text-gray-600">Simply place it where you want and enjoy a beautiful flame within minutes.</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Clean burning with no smoke, soot, ash or harmful emissions.</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Versatile Design</h3>
              <p className="text-gray-600">Available in various styles to match any interior design aesthetic.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}