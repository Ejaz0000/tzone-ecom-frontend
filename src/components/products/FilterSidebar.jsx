'use client';

import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  isOpen, 
  onClose,
  categories = [],
  brands = []
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    category: true,
    brand: false,
  });

  

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (type, value) => {
    onFilterChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: parseFloat(value) || 0,
      },
    });
  };

  const handleCategoryChange = (categorySlug) => {
    const updatedCategories = filters.selectedCategories.includes(categorySlug)
      ? filters.selectedCategories.filter((c) => c !== categorySlug)
      : [...filters.selectedCategories, categorySlug];

    onFilterChange({
      ...filters,
      selectedCategories: updatedCategories,
    });
  };

  const handleBrandChange = (brandSlug) => {
    const updatedBrands = filters.selectedBrands.includes(brandSlug)
      ? filters.selectedBrands.filter((b) => b !== brandSlug)
      : [...filters.selectedBrands, brandSlug];

    onFilterChange({
      ...filters,
      selectedBrands: updatedBrands,
    });
  };

  const handleResetFilters = () => {
    onFilterChange({
      priceRange: { min: 0, max: 25000 },
      selectedCategories: [],
      selectedBrands: [],
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static lg:rounded-2xl top-0 left-0 w-80 h-screen lg:h-auto gold-background z-50 lg:z-0 transform transition-transform duration-300 px-4 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } overflow-y-auto`}
      >
        <div className="p-6 lg:p-0">
          {/* Close Button (Mobile) */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--neutral-gray600)' }}>
              Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className="w-full mb-6 py-2 px-4 border border-(--primary-gold) bg-orange-200 rounded-lg font-semibold transition-colors hover:bg-(--accent-gold) text-orange-800"
          >
            Reset Filters
          </button>

          {/* Price Filter */}
          <div className="mb-8 pb-8 border-b border-orange-200">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="text-lg font-medium text-orange-600">
                Price Range
              </h3>
              <ChevronDown
                size={20}
                className='text-orange-600'
                style={{
                  transform: expandedSections.price ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 300ms',
                }}
              />
            </button>

            {expandedSections.price && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-orange-600">
                    Min Price
                  </label>
                  <input
                    type="number"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'var(--accent-gold)' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-orange-600">
                    Max Price
                  </label>
                  <input
                    type="number"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'var(--accent-gold)' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="mb-8 pb-8 border-b border-orange-200">
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="text-lg font-medium text-orange-600">
                Category
              </h3>
              <ChevronDown
                size={20}
                className='text-orange-600'
                style={{
                  transform: expandedSections.category ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 300ms',
                }}
              />
            </button>

            {expandedSections.category && (
              <div className="space-y-3">
                {categories.map((category) => (
                  <label key={category.slug} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.selectedCategories.includes(category.slug)}
                      onChange={() => handleCategoryChange(category.slug)}
                      className="w-4 h-4 rounded accent-orange-500"
                    />
                    <span className="ml-3 text-sm" style={{ color: 'var(--neutral-gray600)' }}>
                      {category.name}
                      <span className="text-xs ml-1" style={{ color: 'var(--neutral-gray500)' }}>
                        ({category.product_count})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div className="mb-8">
            <button
              onClick={() => toggleSection('brand')}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="text-lg font-medium text-orange-600">
                Brand
              </h3>
              <ChevronDown
                size={20}
                className='text-orange-600'
                style={{
                  transform: expandedSections.brand ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 300ms',
                }}
              />
            </button>

            {expandedSections.brand && (
              <div className="space-y-3">
                {brands.map((brand) => (
                  <label key={brand.slug} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.selectedBrands.includes(brand.slug)}
                      onChange={() => handleBrandChange(brand.slug)}
                      className="w-4 h-4 rounded accent-orange-500"
                    />
                    <span className="ml-3 text-sm" style={{ color: 'var(--neutral-gray600)' }}>
                      {brand.name}
                      <span className="text-xs ml-1" style={{ color: 'var(--neutral-gray500)' }}>
                        ({brand.product_count})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
