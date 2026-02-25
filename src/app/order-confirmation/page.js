'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Parse order data from search params
    const orderDataParam = searchParams.get('order');
    if (orderDataParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(orderDataParam));
        setOrderData(decoded);
      } catch (error) {
        console.error('Failed to parse order data:', error);
      }
    }
  }, [searchParams]);

  if (!orderData) {
    return (
      <div className="bg-orange-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex items-center justify-center h-64">
            <p style={{ color: 'var(--neutral-gray600)' }}>Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-12">
        {/* Success Message */}
        <div className="mb-8 bg-white p-8 rounded-lg" style={{ border: `1px solid var(--neutral-gray400)` }}>
          <div className="flex items-center justify-center mb-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: 'var(--accent-green)' }}
            >
              ✓
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center mb-2" style={{ color: 'var(--primary-main)' }}>
            Order Confirmed!
          </h1>
          <p className="text-center text-lg" style={{ color: 'var(--neutral-gray600)' }}>
            Thank you for your purchase. Your order has been successfully created.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white p-8 rounded-lg mb-8" style={{ border: `1px solid var(--neutral-gray400)` }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-main)' }}>
            Order Details
          </h2>

          {/* Order Number and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6" style={{ borderBottom: `1px solid var(--neutral-gray400)` }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--neutral-gray600)' }}>
                Order Number
              </p>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent-brown)' }}>
                {orderData.order_number}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--neutral-gray600)' }}>
                Order Date
              </p>
              <p className="text-lg" style={{ color: 'var(--primary-main)' }}>
                {new Date(orderData.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          {/* Status Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6" style={{ borderBottom: `1px solid var(--neutral-gray400)` }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--neutral-gray600)' }}>
                Order Status
              </p>
              <div className="mt-2">
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                  style={{
                    backgroundColor:
                      orderData.status === 'pending'
                        ? 'var(--warning)'
                        : orderData.status === 'completed'
                        ? 'var(--accent-green)'
                        : 'var(--error)',
                  }}
                >
                  {typeof orderData.status === 'string' 
                    ? orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)
                    : 'N/A'}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--neutral-gray600)' }}>
                Payment Status
              </p>
              <div className="mt-2">
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                  style={{
                    backgroundColor:
                      orderData.payment_status === 'unpaid'
                        ? 'var(--error)'
                        : orderData.payment_status === 'paid'
                        ? 'var(--accent-green)'
                        : 'var(--warning)',
                  }}
                >
                  {typeof orderData.payment_status === 'string'
                    ? orderData.payment_status.charAt(0).toUpperCase() + orderData.payment_status.slice(1)
                    : 'N/A'}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--neutral-gray600)' }}>
                Payment Method
              </p>
              <p className="text-lg mt-2" style={{ color: 'var(--primary-main)' }}>
                {orderData.payment_method}
              </p>
            </div>
          </div>

          {/* Items Summary */}
          <div className="mb-6 pb-6" style={{ borderBottom: `1px solid var(--neutral-gray400)` }}>
            <p className="text-sm font-medium mb-3" style={{ color: 'var(--neutral-gray600)' }}>
              Items ({orderData.total_items})
            </p>
            <p style={{ color: 'var(--primary-main)' }}>
              Total: <span className="font-semibold">{orderData.total_items} item(s)</span> in your order
            </p>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-3 mb-6 pb-6" style={{ borderBottom: `1px solid var(--neutral-gray400)` }}>
            <div className="flex justify-between" style={{ color: 'var(--neutral-gray600)' }}>
              <span>Subtotal</span>
              <span>Tk. {parseFloat(orderData.subtotal).toFixed(2)}</span>
            </div>
            {orderData.discount > 0 && (
              <div className="flex justify-between" style={{ color: 'var(--accent-green)' }}>
                <span>Discount</span>
                <span>-Tk. {parseFloat(orderData.discount).toFixed(2)}</span>
              </div>
            )}
            {orderData.shipping_cost > 0 && (
              <div className="flex justify-between" style={{ color: 'var(--neutral-gray600)' }}>
                <span>Shipping Cost</span>
                <span>+Tk. {parseFloat(orderData.shipping_cost).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between pt-3" style={{ borderTop: `1px solid var(--neutral-gray400)` }}>
              <span className="font-semibold" style={{ color: 'var(--primary-main)' }}>
                Total Amount
              </span>
              <span className="text-2xl font-bold" style={{ color: 'var(--accent-brown)' }}>
                Tk. {parseFloat(orderData.total_price).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Notes */}
          {orderData.notes && (
            <div className="bg-blue-50 p-4 rounded-lg" style={{ border: `1px solid var(--neutral-gray400)`, borderLeft: `4px solid var(--accent-brown)` }}>
              <p className="text-sm font-medium" style={{ color: 'var(--neutral-gray600)' }}>
                Order Notes
              </p>
              <p className="mt-2" style={{ color: 'var(--primary-main)' }}>
                {orderData.notes}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 rounded-lg font-semibold text-center transition hover:opacity-90"
            style={{
              backgroundColor: 'var(--neutral-gray300)',
              color: 'var(--primary-main)',
            }}
          >
            Continue Shopping
          </Link>
          {!orderData.isGuest && (
            <Link
              href="/my-account?tab=orders"
              className="px-8 py-3 rounded-lg font-semibold text-white text-center transition hover:opacity-90"
              style={{
                backgroundColor: 'var(--accent-brown)',
              }}
            >
              Track Order
            </Link>
          )}
        </div>

       
      </div>
    </div>
  );
}
