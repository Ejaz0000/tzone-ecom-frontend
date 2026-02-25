'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard';

const RelatedProductsCarousel = ({ products = [], title = 'Related Products' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!products || products.length === 0) {
    return null;
  }

  const itemsPerView = 4;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="mt-20 pt-12 border-t border-gray-200">
      {/* Section Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--neutral-gray600)' }}>
          {title}
        </h2>
        <div className="w-20 h-1 rounded-full" style={{ backgroundColor: 'var(--accent-brown)' }} />
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Navigation Buttons */}
        {products.length > itemsPerView && (
          <>
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-white w-10 h-10 rounded-full items-center justify-center transition-colors hover:opacity-80 hidden lg:flex"
              style={{ backgroundColor: 'var(--accent-brown)' }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-white w-10 h-10 rounded-full items-center justify-center transition-colors hover:opacity-80 hidden lg:flex"
              style={{ backgroundColor: 'var(--accent-brown)' }}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Indicators */}
        {products.length > itemsPerView && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(products.length / itemsPerView) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * itemsPerView)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: currentIndex === idx * itemsPerView ? '2rem' : '0.5rem',
                  height: '0.5rem',
                  backgroundColor:
                    currentIndex === idx * itemsPerView ? 'var(--accent-brown)' : 'var(--neutral-gray300)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedProductsCarousel;
