'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItem, removeFromCart, fetchCart } from '@/redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { Trash2, Minus, Plus } from 'lucide-react';
import Image from 'next/image';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.cart.loading);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Handle both variant and product items
  const itemType = item.item_type; // 'variant' or 'product'
  const isVariantItem = itemType === 'variant';
  
  // Get item details based on type
  const itemData = isVariantItem ? item.variant : item.product;
  const productInfo = isVariantItem ? itemData.product : itemData;
  
  // Handle image URL - add localhost prefix if needed
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl}`;
  };
  
  const price = parseFloat(item.price_snapshot);
  const totalPrice = parseFloat(item.total);
  const savings = parseFloat(item.savings || 0);
  
  // For variant items, show original price from variant
  const originalPrice = isVariantItem ? parseFloat(itemData.price) : parseFloat(itemData.price || item.price_snapshot);
  const hasSalePrice = savings > 0;

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || isUpdating) return;
    
    setIsUpdating(true);

    try {
      const result = await dispatch(updateCartItem({ 
        itemId: item.id, 
        quantity: newQuantity 
      })).unwrap();

      if (result.status) {
        toast.success('Cart updated successfully!');
        // Refresh cart data
        dispatch(fetchCart());
      }
    } catch (error) {
      console.error('Update cart error:', error);
      
      if (error?.data?.errors) {
        const errors = error.data.errors;
        
        if (errors.quantity) {
          toast.error(errors.quantity[0]);
        } else if (errors.stock) {
          toast.error(errors.stock[0]);
        } else {
          toast.error(error.message || 'Failed to update cart');
        }
      } else {
        toast.error(error.message || 'Failed to update cart');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (isRemoving) return;
    
    setIsRemoving(true);

    try {
      const result = await dispatch(removeFromCart(item.id)).unwrap();

      if (result.data.status) {
        toast.success(result.data.message || 'Item removed from cart');
        // Refresh cart data
        dispatch(fetchCart());
      }
    } catch (error) {
      console.error('Remove from cart error:', error);
      toast.error(error.message || 'Failed to remove item from cart');
      setIsRemoving(false);
    }
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="shrink-0 w-full md:w-32 h-32 relative">
            <Image
              src={getImageUrl(productInfo.primary_image)}
              alt={productInfo.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-2">
                {productInfo.title}
              </h3>

              {/* Attributes - Only for variant items */}
              {isVariantItem && itemData.attributes && itemData.attributes.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {itemData.attributes.map((attr, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-1 bg-orange-100 text-gray-700 text-xs font-medium rounded-full"
                    >
                      {attr.type}: {attr.value}
                    </span>
                  ))}
                </div>
              )}

              {/* SKU - Only for variant items */}
              {isVariantItem && itemData.sku && (
                <p className="text-xs text-gray-500 mb-2">SKU: {itemData.sku}</p>
              )}

              {/* Category & Brand - Only for product items */}
              {!isVariantItem && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {itemData.category && (
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {itemData.category.name}
                    </span>
                  )}
                  {itemData.brand && (
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      {itemData.brand.name}
                    </span>
                  )}
                </div>
              )}

              {/* Stock Status */}
              {!item.is_available && (
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full mb-3">
                  Out of Stock
                </span>
              )}

              {/* Prices */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-orange-600">
                  Tk. {price.toFixed(2)}
                </span>
                {hasSalePrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      Tk. {originalPrice.toFixed(2)}
                    </span>
                    {savings > 0 && (
                      <span className="inline-block px-2 py-1 bg-orange-100 text-red-700 text-xs font-semibold rounded">
                        Save Tk. {savings.toFixed(2)}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Quantity and Remove */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={!item.is_available || isUpdating || loading}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="w-12 text-center font-semibold text-orange-600">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={!item.is_available || isUpdating || loading}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="text-right">
                <p className="text-sm text-orange-600">Line Total</p>
                <p className="text-2xl font-bold text-orange-900">
                  Tk. {totalPrice.toFixed(2)}
                </p>
              </div>

              <button
                onClick={handleRemove}
                disabled={isRemoving || loading}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
