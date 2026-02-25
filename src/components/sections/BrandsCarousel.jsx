'use client';

import React from 'react';
import Link from 'next/link';
import ImageComponent from '../shared/ImageComponent';

/**
 * BrandsCarousel Component
 * Displays brand logos in a smooth, continuous auto-scrolling carousel
 * 
 * Props:
 * - brands: Array of brand objects from API
 */

const BrandsCarousel = ({ brands: brandsArray = [] }) => {
  const title = 'Our Brands';
  
  // Transform API brands data to items format
  const brands = brandsArray.map(brand => ({
    name: brand.name,
    logo: brand.logo_url,
    href: `/products?brand=${brand.slug}`
  }));

  if (brands.length === 0) return null;

  // Duplicate brands array for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="w-full py-16 px-4 md:px-6 lg:px-12 gold-card-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-normal  text-gray-600 mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-(--accent-gold) mx-auto rounded-full"/>
        </div>

        {/* Infinite Scroll Carousel */}
        <div className="relative overflow-hidden py-8">
          {/* Scrolling Container */}
          <div 
            className="flex gap-6"
            style={{
              width: 'fit-content',
              animation: `scroll ${brands.length * 3}s linear infinite`,
            }}
            onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
            onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
          >
            {duplicatedBrands.map((brand, idx) => (
              <Link
                key={idx}
                href={brand.href || '/products'}
                className="shrink-0 w-[200px] gold-border rounded-lg p-8 flex items-center justify-center h-[150px] shadow-sm hover:shadow-lg hover:scale-105 transition-all cursor-pointer no-underline bg-(--neutral-white)"
              >
                <div className="relative w-full h-20 flex items-center justify-center">
                  {/* Brand Logo or Name */}
                  {brand.logo ? (
                    <ImageComponent
                      src={brand.logo}
                      alt={brand.name}
                      width={150}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-lg font-bold text-center" style={{ color: 'var(--primary-main)' }}>
                      {brand.name}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-${(200 + 24) * brands.length}px));
          }
        }
      `}</style>
    </section>
  );
};

export default BrandsCarousel;
