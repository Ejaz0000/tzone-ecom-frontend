'use client';

import { useDispatch, useSelector } from 'react-redux';
import { clearCart, fetchCart } from '@/redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartSummary({ summary }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.cart.loading);
  const router = useRouter();

  if (!summary) {
    return null;
  }

  const subtotal = parseFloat(summary.subtotal || 0);
  const totalSavings = parseFloat(summary.total_savings || 0);
  const tax = parseFloat(summary.tax || 0);
  // const shipping = parseFloat(summary.shipping || 0);
  const grandTotal = parseFloat(summary.grand_total || 0);
  const totalItems = summary.total_items || 0;

  const handleClearCart = async () => {
    if (!confirm('Are you sure you want to clear your entire cart?')) {
      return;
    }

    try {
      const result = await dispatch(clearCart()).unwrap();

      if (result.status) {
        toast.success(result.message || 'Cart cleared successfully!');
        dispatch(fetchCart());
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      toast.error(error.message || 'Failed to clear cart');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md p-8 sticky top-24 h-fit">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="w-6 h-6 text-orange-600" />
        <h2 className="text-2xl font-medium text-orange-600">Order Summary</h2>
      </div>

      {/* Summary Items */}
      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span className="font-semibold text-orange-600">Tk. {subtotal.toFixed(2)}</span>
        </div>

        {/* Savings */}
        {totalSavings > 0 && (
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span className="text-green-700 font-medium">Total Savings</span>
            <span className="font-semibold text-green-700">-Tk. {totalSavings.toFixed(2)}</span>
          </div>
        )}

        {/* Shipping */}
        {/* <div className="flex justify-between items-center text-gray-600">
          <span>Shipping</span>
          <span className="font-semibold text-green-600">
            {shipping > 0 ? `Tk. ${shipping.toFixed(2)}` : 'FREE'}
          </span>
        </div> */}

        {/* Tax */}
        {tax > 0 && (
          <div className="flex justify-between items-center text-gray-600">
            <span>Tax</span>
            <span className="font-semibold text-orange-600">Tk. {tax.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-6" />

      {/* Grand Total */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-orange-600">Grand Total</span>
          <span className="text-3xl font-bold text-orange-600">
            Tk. {grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <button onClick={() => router.push('/checkout')} className="w-full bg-orange-200 hover:bg-orange-400 text-orange-800 hover:text-orange-50 font-bold py-3 px-4 rounded-lg transition-colors duration-200 text-lg">
          Proceed to Checkout
        </button>
        <button
          onClick={handleClearCart}
          disabled={loading}
          className="w-full bg-transparent border-2 border-red-300 text-red-600 hover:bg-red-50 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Clearing...' : 'Clear Cart'}
        </button>
      </div>

      {/* Info */}
     
    </div>
  );
}
