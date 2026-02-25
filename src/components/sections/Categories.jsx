'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ImageComponent from '../shared/ImageComponent';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
/**
 * Categories Component
 * 
 * Displays product categories in a responsive grid:
 * - Desktop: 4 columns
 * - Tablet: 2 columns
 * - Mobile: 2 columns
 * 
 * Features:
 * - Category cards with images
 * - Hover effects with overlay and CTA
 * - Responsive grid layout
 * 
 * Props:
 * - categories: Array of category objects from API
 */

const Categories = ({ categories = [] }) => {
  const title = 'Choose Your Category';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  
  // Transform API categories data to items format
  const items = categories.map(category => ({
    name: category.name,
    image: category.image_url,
    href: `/products?category=${category.slug}`,
    productCount: category.product_count
  }));

  // Responsive items per slide: lg=3, md=2, sm=1
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1400) {
        setItemsPerSlide(4); // xl screens
      } else if (width >= 1024) {
        setItemsPerSlide(3); // lg screens
      } else if (width >= 768) {
        setItemsPerSlide(2); // md screens
      } else {
        setItemsPerSlide(1); // sm screens
      }
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Total items for looping
  const totalItems = items.length;

  // Ref for pausing auto-slide on hover
  const isPaused = useRef(false);

  // Create extended items array for infinite loop (clone items at both ends)
  const extendedItems = totalItems > 0 
    ? [...items.slice(-itemsPerSlide), ...items, ...items.slice(0, itemsPerSlide)]
    : [];

  // Offset to account for cloned items at the start
  const cloneOffset = itemsPerSlide;

  // Auto-slide effect - slides one item at a time
  useEffect(() => {
    if (totalItems <= itemsPerSlide) return;

    const interval = setInterval(() => {
      if (!isPaused.current) {
        setCurrentIndex(prev => prev + 1);
      }
    }, 4000); // 4 seconds interval

    return () => clearInterval(interval);
  }, [totalItems]);

  // Handle infinite loop reset
  useEffect(() => {
    if (currentIndex >= totalItems) {
      // After transition ends, instantly reset to the real first item
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
    if (currentIndex < 0) {
      // After transition ends, instantly reset to the real last item
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalItems - 1);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, totalItems]);

  // Re-enable transition after instant reset
  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  // Handle next slide - move by one item
  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  // Handle prev slide - move by one item
  const handlePrev = () => {
    setCurrentIndex(prev => prev - 1);
  };

  return (
    <section className="w-full bg-(--accent-black) md:h-screen py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl h-full flex flex-col justify-center mx-auto">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-normal mb-4 text-(--accent-gold)">{title}</h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-(--primary-gold)" />
        </div>

        {/* Categories Grid */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <Link key={idx} href={item.href} className="group cursor-pointer">
              <div
                className="relative overflow-hidden rounded-lg min-h-[250px] shadow-md hover:shadow-xl transition-all"
                style={{
                  minHeight: '250px',
                  backgroundColor: 'var(--neutral-gray300)',
                }}
              >
                
                <ImageComponent
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={250}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />

                
                <div
                  className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"
                />

                
                <div
                  className="absolute inset-0 p-6 text-white flex flex-col justify-end"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    zIndex: 2,
                  }}
                >
                  <h3 className="text-lg font-bold mb-2">{item.name}</h3>

                  
                  <div
                    className="opacity-0 group-hover:opacity-100 -translate-x-2.5 group-hover:translate-x-0 transition-all duration-300"
                  >
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div> */}


        <div
          className="relative px-8 lg:px-14"
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
        >
          {/* Navigation Buttons - positioned outside the overflow hidden area */}
          {true && (
            <>
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="hidden text-(--accent-gold) lg:flex absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center transition-all hover:scale-110 z-40"
                
                aria-label="Previous categories"
              >
                <ChevronLeft size={34} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="hidden text-(--accent-gold) lg:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center transition-all hover:scale-110 z-40"
                
                aria-label="Next categories"
              >
                <ChevronRight size={34} />
              </button>
            </>
          )}

          {/* Carousel Container - clips the slides */}
          <div className="overflow-hidden">
            {/* Categories Carousel Track */}
            <div
              className="flex"
              style={{
                gap: '24px',
                transform: `translateX(calc(-${(currentIndex + cloneOffset)} * (100% + 24px) / ${itemsPerSlide}))`,
                transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
              }}
            >
              {extendedItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="group cursor-pointer flex-shrink-0"
                  style={{ width: `calc((100% - ${(itemsPerSlide - 1) * 24}px) / ${itemsPerSlide})` }}
                >
                  <div
                className="relative overflow-hidden rounded-lg min-h-[400px] md:min-h-[500px] shadow-md hover:shadow-xl transition-all border border-gray-800"
              >
                
                <ImageComponent
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={500}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />

                
                <div
                  className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"
                />

                
                <div
                  className="absolute inset-0 p-6 text-(--primary-gold) flex flex-col justify-end"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    zIndex: 2,
                  }}
                >
                  <h3 className="text-lg font-normal mb-2">{item.name}</h3>

                  
                  <div
                    className="opacity-0 group-hover:opacity-100 -translate-x-2.5 group-hover:translate-x-0 transition-all duration-300"
                  >
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
                </Link>
              ))}
            </div>
          </div>

          

          {/* Slide Indicators */}
          {totalItems > itemsPerSlide && (
            <div className="flex gap-2 mt-6 justify-center">
              {Array.from({ length: totalItems }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: ((currentIndex % totalItems) + totalItems) % totalItems === idx ? '24px' : '8px',
                    backgroundColor: ((currentIndex % totalItems) + totalItems) % totalItems === idx ? 'var(--accent-orange)' : 'var(--neutral-gray400)',
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>


        
      </div>
    </section>
  );
};

export default Categories;
