'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { toast } from 'react-toastify';
import ImageGallery from './ImageGallery';
import VariantSelector from './VariantSelector';
import RelatedProductsCarousel from './RelatedProductsCarousel';
import { addToCart, fetchCart } from '@/redux/slices/cartSlice';

const ProductDetailsPage = ({ productData }) => {
  const dispatch = useDispatch();
  const cartLoading = useSelector((state) => state.cart.loading);
  
  // Check if product has variants
  const hasVariants = productData.variants && productData.variants.length > 0;
  
  // Find the first available variant or fallback to first variant
  const getInitialVariant = () => {
    if (!hasVariants) return null;
    const availableVariant = productData.variants?.find(v => v.is_in_stock);
    return availableVariant || productData.variants?.[0] || null;
  };

  const initialVariant = getInitialVariant();
  
  // Initialize selected attributes based on initial variant
  const getInitialAttributes = () => {
    if (!initialVariant) return {};
    const attrs = {};
    initialVariant.attributes.forEach(attr => {
      attrs[attr.type] = attr.value;
    });
    return attrs;
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState(getInitialAttributes());
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Find matching variant based on selected attributes
  const currentVariant = useMemo(() => {
    if (!hasVariants) return null;
    
    return productData.variants.find(variant => {
      return variant.attributes.every(attr => 
        selectedAttributes[attr.type] === attr.value
      );
    });
  }, [selectedAttributes, productData.variants, hasVariants]);

  // Get current price and stock based on selected variant or base product
  const currentPrice = currentVariant 
    ? (currentVariant.sale_price || currentVariant.price)
    : (productData.sale_price || productData.price);
  
  const originalPrice = currentVariant 
    ? currentVariant.price 
    : productData.price;
  
  const currentStock = currentVariant 
    ? currentVariant.stock 
    : productData.stock;
  
  const isInStock = currentVariant 
    ? currentVariant.is_in_stock 
    : productData.stock > 0;

  const isOnSale = currentVariant 
    ? currentVariant.is_on_sale 
    : productData.is_on_sale;
  
  const discountPercentage = currentVariant 
    ? currentVariant.discount_percentage 
    : productData.discount_percentage;

  const handleAttributeChange = (attributeType, value) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeType]: value
    }));
  };

  const handleAddToCart = async () => {
    // For products with variants, ensure a valid variant is selected
    if (hasVariants && !currentVariant) {
      toast.error('Please select a valid variant combination');
      return;
    }
    
    try {
      let payload = { quantity };

      if (hasVariants) {
        // Product has variants - use variant_id
        const variantId = currentVariant?.id;
        if (!variantId) {
          toast.error('Product variant not available');
          return;
        }
        payload.variant_id = variantId;
      } else {
        // Product has no variants - use product_id
        if (!productData.id) {
          toast.error('Product not available');
          return;
        }
        payload.product_id = productData.id;
      }

      const result = await dispatch(addToCart(payload)).unwrap();

      if (result.status) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
        toast.success(result.message || 'Item added to cart successfully!');
        
        // Refresh cart data
        dispatch(fetchCart());
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      
      if (error?.data?.errors) {
        const errors = error.data.errors;
        
        // Show field-specific errors
        if (errors.variant_id) {
          toast.error(errors.variant_id[0]);
        } else if (errors.product_id) {
          toast.error(errors.product_id[0]);
        } else if (errors.variant_required) {
          toast.error(errors.variant_required[0]);
        } else if (errors.quantity) {
          toast.error(errors.quantity[0]);
        } else if (errors.stock) {
          toast.error(errors.stock[0]);
        } else if (errors.error) {
          toast.error(errors.error[0]);
        } else {
          toast.error(error.message || 'Failed to add item to cart');
        }
      } else {
        toast.error(error.message || 'Failed to add item to cart');
      }
    }
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(currentStock, value));
    setQuantity(newQuantity);
  };

  const handleBuyNow = async () => {
    // For products with variants, ensure a valid variant is selected
    if (hasVariants && !currentVariant) {
      toast.error('Please select a valid variant combination');
      return;
    }
    
    try {
      let payload = { quantity };

      if (hasVariants) {
        // Product has variants - use variant_id
        const variantId = currentVariant?.id;
        if (!variantId) {
          toast.error('Product variant not available');
          return;
        }
        payload.variant_id = variantId;
      } else {
        // Product has no variants - use product_id
        if (!productData.id) {
          toast.error('Product not available');
          return;
        }
        payload.product_id = productData.id;
      }

      const result = await dispatch(addToCart(payload)).unwrap();

      if (result.status) {
        toast.success('Redirecting to checkout...');
        
        // Redirect to checkout page
        setTimeout(() => {
          window.location.href = '/checkout';
        }, 500);
      }
    } catch (error) {
      console.error('Buy now error:', error);
      
      if (error?.data?.errors) {
        const errors = error.data.errors;
        
        // Show field-specific errors
        if (errors.variant_id) {
          toast.error(errors.variant_id[0]);
        } else if (errors.product_id) {
          toast.error(errors.product_id[0]);
        } else if (errors.variant_required) {
          toast.error(errors.variant_required[0]);
        } else if (errors.quantity) {
          toast.error(errors.quantity[0]);
        } else if (errors.stock) {
          toast.error(errors.stock[0]);
        } else if (errors.error) {
          toast.error(errors.error[0]);
        } else {
          toast.error(error.message || 'Failed to process your request');
        }
      } else {
        toast.error(error.message || 'Failed to process your request');
      }
    }
  };

  // Prepare images for gallery (ImageGallery expects array of URLs)
  const galleryImages = productData.images?.map(img => img.image) || [];

  return (
    <div className="w-full bg-orange-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-orange-600">
          <a href="/products" className="hover:opacity-75">
            Products
          </a>
          <span>/</span>
          <a href={`/products?category=${productData.category?.slug}`} className="hover:opacity-75">
            {productData.category?.name}
          </a>
          <span>/</span>
          <span className="text-orange-500">{productData.title}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Images */}
          <div>
            <ImageGallery images={galleryImages} title={productData.title} />
          </div>

          {/* Right Column - Product Details */}
          <div>
            {/* Product Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <p  className="text-sm font-medium text-(--primary-gold) mb-2">
                    {productData.brand?.name}
                  </p>
                  <h1 className="text-4xl font-normal mb-2 text-(--primary-gold)">
                    {productData.title}
                  </h1>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-3 rounded-lg border border-orange-300 hover:border-orange-500 transition-colors"
                >
                  <Heart
                    size={24}
                    fill={isWishlisted ? 'var(--accent-gold)' : 'none'}
                    color={isWishlisted ? 'var(--accent-gold)' : 'var(--primary-gold)'}
                  />
                </button>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <span className="text-3xl font-semibold text-orange-400">
                    Tk. {parseFloat(currentPrice).toFixed(0)}
                  </span>
                  {isOnSale && (
                    <span
                      className="ml-2 text-lg line-through  text-(--primary-gold)"
                    >
                      Tk. {parseFloat(originalPrice).toFixed(0)}
                    </span>
                  )}
                </div>
                {isOnSale && discountPercentage > 0 && (
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold text-white bg-orange-300"
                  >
                    Save {Math.round(discountPercentage)}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mb-6 text-(--primary-gold)">
                {productData.description}
              </p>
            </div>

            {/* Variant Selection */}
            {productData.available_attributes && productData.available_attributes.length > 0 && (
              <VariantSelector
                availableAttributes={productData.available_attributes}
                variants={productData.variants}
                selectedAttributes={selectedAttributes}
                onAttributeChange={handleAttributeChange}
              />
            )}

            {/* Stock Status / Availability Message */}
            <div className="mb-6 mt-6">
              {hasVariants && !currentVariant ? (
                <div className="p-4 rounded-lg border-2" style={{ borderColor: 'var(--error)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                  <p className="text-sm font-semibold" style={{ color: 'var(--error)' }}>
                    ⚠ Product not available with current specifications
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--neutral-gray600)' }}>
                    Please try a different combination of options
                  </p>
                </div>
              ) : isInStock ? (
                <p className="text-sm font-semibold" style={{ color: 'var(--success)' }}>
                  ✓ In Stock ({currentStock} available)
                </p>
              ) : (
                <p className="text-sm font-semibold" style={{ color: 'var(--error)' }}>
                  ✗ Out of Stock
                </p>
              )}
            </div>

            {/* SKU Display */}
            {currentVariant && (
              <div className="mb-6 text-sm text-orange-800">
                <span className="font-semibold">SKU:</span> {currentVariant.sku}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center border border-orange-300 rounded-lg text-orange-600 w-fit">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-4 py-3 font-semibold hover:bg-orange-100 transition-colors rounded-l-lg"
                  disabled={!isInStock}
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border-l border-r border-orange-300 py-3 outline-none"
                  disabled={!isInStock}
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-4 py-3 font-semibold hover:bg-orange-100 transition-colors rounded-r-lg"
                  disabled={!isInStock}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={(hasVariants && !currentVariant) || !isInStock || cartLoading}
                className="flex-1 flex items-center border-2 border-orange-400 justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: addedToCart ? 'var(--accent-brown)' : 'var(--accent-gold)',
                }}
              >
                <ShoppingCart size={20} />
                {cartLoading ? 'Adding...' : hasVariants && !currentVariant ? 'Select Options' : addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              disabled={(hasVariants && !currentVariant) || !isInStock || cartLoading}
              className="w-full py-3 px-6 rounded-lg font-semibold text-(--accent-gold) gold-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-100 hover:text-(--accent-brown) bg-white"
            >
              {cartLoading ? 'Processing...' : 'Buy Now'}
            </button>

            {/* Shipping & Return Info */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-orange-200">
              <div className="text-center">
                <Truck
                  size={24}
                  className="mx-auto mb-2 text-orange-600"
                />
                <p className="text-xs font-semibold text-orange-600">
                  Free Shipping
                </p>
                <p style={{ color: 'var(--neutral-gray600)' }} className="text-xs">
                  On orders over Tk. 5,000
                </p>
              </div>
              <div className="text-center">
                <Shield
                  size={24}
                  className="mx-auto mb-2 text-orange-600"
                />
                <p className="text-xs font-semibold text-orange-600">
                  Secure Payment
                </p>
                <p style={{ color: 'var(--neutral-gray600)' }} className="text-xs">
                  100% secure transactions
                </p>
              </div>
              <div className="text-center">
                <RotateCcw
                  size={24}
                  className="mx-auto mb-2 text-orange-600"
                />
                <p className="text-xs font-semibold text-orange-600">
                  Easy Returns
                </p>
                <p style={{ color: 'var(--neutral-gray600)' }} className="text-xs">
                  30-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="border-t border-orange-200 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-medium mb-4 text-orange-600">
                Product Details
              </h2>
              <p style={{ color: 'var(--neutral-gray600)' }} className="mb-6 leading-relaxed">
                {productData.description}
              </p>

              {/* Product Specifications */}
              {productData.weight && (
                <>
                  <h3 className="text-lg font-medium mb-4 text-orange-600">
                    Specifications
                  </h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-3" style={{ color: 'var(--neutral-gray600)' }}>
                      <span className="font-semibold min-w-[100px]">Weight:</span>
                      <span>{productData.weight} kg</span>
                    </li>
                  </ul>
                </>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="bg-orange-50 rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-sm text-orange-600">
                    Category
                  </p>
                  <p className="font-medium text-orange-600">
                    {productData.category?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-orange-600">
                    Brand
                  </p>
                  <p className="font-medium text-orange-600">
                    {productData.brand?.name}
                  </p>
                </div>
                {currentVariant && (
                  <div>
                    <p className="text-sm text-orange-600">
                      SKU
                    </p>
                    <p className="font-medium text-orange-600" >
                      {currentVariant.sku}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-orange-600">
                    Availability
                  </p>
                  <p
                    className="font-medium"
                    style={{ color: isInStock ? 'var(--primary-gold)' : 'var(--accent-brown)' }}
                  >
                    {!currentVariant ? 'Select options' : isInStock ? `${currentStock} in stock` : 'Out of stock'}
                  </p>
                </div>
                {productData.variant_count > 0 && (
                  <div>
                    <p  className="text-sm text-orange-600">
                      Variants Available
                    </p>
                    <p className="font-medium text-orange-600">
                      {productData.variant_count} options
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
