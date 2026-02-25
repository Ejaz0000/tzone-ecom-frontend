'use client';

import React from 'react';
import Link from 'next/link';
import ImageComponent from './shared/ImageComponent';

/**
 * ProductCard Component
 * Displays a single product card with image, title, and price
 * The entire card is a clickable link to the product details page
 */
const ProductCard = ({ product }) => {
  if (!product) return null;

  const productDetailsUrl = `/products/${product.slug || product.id}`;
  
  // Support both API format (title) and internal format (name)
  const productName = product.title || product.name;
  const productImage = product.image || product.primary_image;
  const productPrice = product.price;
  const productSalePrice = product.salePrice || product.sale_price;
  const hasSale = productSalePrice && productSalePrice < productPrice;

  return (
    <Link href={productDetailsUrl}>
      <div 
        className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group h-full flex flex-col gold-border gold-card-background"
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 right-2 z-10">
            <span className="px-3 py-1 text-xs font-normal gold-border text-(--primary-gold) bg-orange-50 rounded-full">
              {product.badge}
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="relative overflow-hidden aspect-square shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'var(--neutral-gray300)' }}>
          <ImageComponent
            src={productImage}
            alt={productName}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="p-3 md:p-6 flex flex-col grow">
          {/* Product Title */}
          <h3 className="text-base font-medium mb-2 leading-tight min-h-12" style={{ color: 'var(--neutral-gray600)' }}>
            {productName}
          </h3>

          {/* Price */}
          <div className="mt-auto">
            {hasSale ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-lg font-bold" style={{ color: 'var(--accent-brown)' }}>
                  Tk. {parseFloat(productSalePrice).toFixed(2)}
                </span>
                <span className="text-sm line-through text-gray-500">
                  Tk. {parseFloat(productPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold" style={{ color: 'var(--accent-brown)' }}>
                Tk. {parseFloat(productPrice).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
