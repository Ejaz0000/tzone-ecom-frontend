'use client';

import React from 'react';
import ProductCard from '../ProductCard';
import FeaturedProductCard from '../FeaturedProductCard';

/**
 * FeaturedProducts Component
 * Displays featured products in a responsive grid using the ProductCard component
 * 
 * Props:
 * - featuredSection: Featured section object from API
 */

const FeaturedProducts = ({ featuredSection }) => {
  if (!featuredSection) return null;

  const title = featuredSection.title || 'Featured Products';
  const subtitle = featuredSection.subtitle || '';
  
  // Transform API products data
  const products = (featuredSection.products || []).map(product => ({
    id: product.id,
    name: product.title,
    slug: product.slug,
    price: parseFloat(product.price),
    salePrice: product.sale_price ? parseFloat(product.sale_price) : null,
    image: product.primary_image || '/placeholder-image.jpg',
    rating: 4.5,
    reviews: 0,
    badge: product.is_on_sale ? 'Sale' : null
  }));

  return (
    <section className="w-full gold-background py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-normal  text-gray-600 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 text-lg mb-4">{subtitle}</p>
          )}
          <div className="w-20 h-1 bg-(--accent-gold) mx-auto rounded-full" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <FeaturedProductCard key={product.id || idx} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
