'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter } from 'lucide-react';
import ProductCard from '../ProductCard';
import FilterSidebar from './FilterSidebar';
import Pagination from './Pagination';

/**
 * ProductsPage Component
 * 
 * Props:
 * - initialProductsData: Products data from API
 * - categoriesData: Categories for filters
 * - brandsData: Brands for filters
 * - initialSearchParams: Initial URL search params
 */

const ProductsPage = ({ 
  initialProductsData, 
  categoriesData = [], 
  brandsData = [],
  initialSearchParams = {}
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);

  // Transform API products data to component format
  const productsArray = Array.isArray(initialProductsData?.data) 
    ? initialProductsData.data 
    : Array.isArray(initialProductsData) 
    ? initialProductsData 
    : [];

  const products = productsArray.map(product => ({
    id: product.id,
    name: product.title,
    slug: product.slug,
    price: parseFloat(product.price),
    salePrice: product.sale_price ? parseFloat(product.sale_price) : null,
    image: product.primary_image || '/placeholder-image.jpg',
    category: product.category?.name,
    categorySlug: product.category?.slug,
    brand: product.brand?.name,
    brandSlug: product.brand?.slug,
    rating: 4.5,
    reviews: 0,
    badge: product.is_on_sale ? 'Sale' : null,
    stock: product.stock,
    variantCount: product.variant_count
  }));

  const meta = initialProductsData?.meta || initialProductsData?.pagination || {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 20,
    from: 0,
    to: 0
  };

  // Get current filters from URL
  const getCurrentFilters = () => ({
    priceRange: {
      min: parseInt(searchParams.get('min_price') || '0'),
      max: parseInt(searchParams.get('max_price') || '25000')
    },
    selectedCategories: searchParams.get('category')?.split(',').filter(Boolean) || [],
    selectedBrands: searchParams.get('brand')?.split(',').filter(Boolean) || [],
    search: searchParams.get('search') || '',
    onSale: searchParams.get('on_sale') === 'true',
    isFeatured: searchParams.get('is_featured') === 'true'
  });

  const [filters, setFilters] = useState(getCurrentFilters());

  // Get current sort from URL
  const getSortBy = () => {
    const ordering = searchParams.get('ordering');
    if (ordering === 'price') return 'price-asc';
    if (ordering === '-price') return 'price-desc';
    if (ordering === 'created_at') return 'oldest';
    if (ordering === '-created_at') return 'newest';
    if (ordering === 'name') return 'name-asc';
    if (ordering === '-name') return 'name-desc';
    return 'newest';
  };

  const [sortBy, setSortBy] = useState(getSortBy());

  // Update URL with new query params
  const updateURL = (newFilters, newSortBy, newPage) => {
    const params = new URLSearchParams();

    // Add filters
    if (newFilters.priceRange.min > 0) {
      params.set('min_price', newFilters.priceRange.min.toString());
    }
    if (newFilters.priceRange.max < 25000) {
      params.set('max_price', newFilters.priceRange.max.toString());
    }
    if (newFilters.selectedCategories.length > 0) {
      params.set('category', newFilters.selectedCategories.join(','));
    }
    if (newFilters.selectedBrands.length > 0) {
      params.set('brand', newFilters.selectedBrands.join(','));
    }
    if (newFilters.search) {
      params.set('search', newFilters.search);
    }
    if (newFilters.onSale) {
      params.set('on_sale', 'true');
    }
    if (newFilters.isFeatured) {
      params.set('is_featured', 'true');
    }

    // Add sorting
    if (newSortBy && newSortBy !== 'newest') {
      const orderingMap = {
        'price-asc': 'price',
        'price-desc': '-price',
        'oldest': 'created_at',
        'newest': '-created_at',
        'name-asc': 'name',
        'name-desc': '-name'
      };
      params.set('ordering', orderingMap[newSortBy] || '-created_at');
    }

    // Add pagination
    if (newPage && newPage > 1) {
      params.set('page', newPage.toString());
    }

    // Navigate to new URL
    const queryString = params.toString();
    router.push(queryString ? `/products?${queryString}` : '/products');
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    updateURL(newFilters, sortBy, 1); // Reset to page 1
  };

  // Handle sort changes
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    updateURL(filters, newSortBy, 1); // Reset to page 1
  };

  // Handle page changes
  const handlePageChange = (newPage) => {
    updateURL(filters, sortBy, newPage);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-orange-50 min-h-screen px-6">
      <div className="max-w-7xl mx-auto py-16">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-normal text-(--primary-gold) mb-2">
            All Products
          </h1>
          <p className="text-lg text-(--accent-gold)">
            Showing {meta.from || 0} to {meta.to || 0} of {meta.total || 0} products
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex items-center justify-between mb-8 gap-4">
          {/* Filter Button (Mobile) */}
          <button
            onClick={() => setFilterSidebarOpen(!filterSidebarOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-(--primary-gold) bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 ml-auto text-orange-800"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>

        {/* Main Content */}
        <div className="flex lg:gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-80 shrink-0 ">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              isOpen={true}
              onClose={() => {}}
              categories={categoriesData}
              brands={brandsData}
            />
          </div>

          {/* Mobile Sidebar */}
          <div className='block lg:hidden'>
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              isOpen={filterSidebarOpen}
              onClose={() => setFilterSidebarOpen(false)}
              categories={categoriesData}
              brands={brandsData}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {meta.last_page > 1 && (
                  <Pagination
                    currentPage={meta.current_page}
                    totalPages={meta.last_page}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold mb-2" style={{ color: 'var(--neutral-gray600)' }}>
                  No products found
                </h3>
                <p style={{ color: 'var(--neutral-gray600)' }}>
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      priceRange: { min: 0, max: 25000 },
                      selectedCategories: [],
                      selectedBrands: [],
                    })
                  }
                  className="mt-6 px-6 py-2 rounded-lg font-semibold transition-colors hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--accent-brown)',
                    color: 'white',
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
