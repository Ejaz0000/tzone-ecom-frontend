'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import { fetchCart } from '@/redux/slices/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const loading = useSelector((state) => state.cart.loading);
  
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const items = cart?.items || [];
  
  // Handle both nested (summary object) and flat structure
  const summary = cart?.summary || {
    total_items: cart?.total_items || 0,
    subtotal: cart?.subtotal || '0.00',
    total_savings: cart?.total_savings || '0.00',
    tax: cart?.tax || '0.00',
    shipping: cart?.shipping || '0.00',
    grand_total: cart?.grand_total || cart?.subtotal || '0.00'
  };
  
  const totalItems = summary.total_items;

  if (loading && !cart) {
    return (
      <div className="bg-orange-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-600">Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-normal text-(--primary-gold) mb-2">Shopping Cart</h1>
          <p className="text-lg text-(--accent-gold)">
            {totalItems > 0
              ? `You have ${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`
              : 'Your cart is currently empty'}
          </p>
        </div>

        {/* Empty Cart State */}
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Column (70%) */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Cart Summary - Right Column (30%) */}
            <div className="lg:col-span-1">
              <CartSummary summary={summary} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
