import { HandCoins, Package } from 'lucide-react';
import React from 'react';

export default function CheckoutSummary({ cart }) {
  const subtotal = parseFloat(cart?.subtotal || 0);
  const savings = parseFloat(cart?.total_savings || 0);
  // Subtotal already includes discounted prices, so total should be subtotal (or grand_total if available)
  const total = parseFloat(cart?.grand_total || cart?.subtotal || 0);

  return (
    <div className="bg-white p-6 rounded-lg h-fit sticky top-4 border border-orange-300">
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-main)' }}>
        Order Summary
      </h3>

      {/* Cart Items */}
      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto border-b" style={{ borderColor: 'var(--neutral-gray400)' }}>
        {cart?.items?.map((item) => {
          const itemTitle = item.item_type === 'variant' 
            ? item.variant?.product?.title 
            : item.product?.title;
          const itemImage = item.item_type === 'variant'
            ? item.variant?.image
            : item.product?.image;
          const itemPrice = parseFloat(item.price_snapshot || item.price || 0);
          const itemQuantity = parseInt(item.quantity || 1);
          const itemTotal = parseFloat(item.total || (itemPrice * itemQuantity));

          return (
            <div key={item.id} className="flex gap-3 text-sm pb-3">
              {itemImage && (
                <img
                  src={itemImage.startsWith('http') ? itemImage : `${process.env.NEXT_PUBLIC_BASE_URL}${itemImage}`}
                  alt={itemTitle}
                  className="w-12 h-12 rounded object-cover"
                />
              )}
              <div className="flex-1">
                <p className="font-medium line-clamp-2" style={{ color: 'var(--primary-main)' }}>
                  {itemTitle}
                </p>
                {/* {item.item_type === 'variant' && item.variant?.attributes && (
                  <p className="text-xs" style={{ color: 'var(--neutral-gray600)' }}>
                    {Object.entries(item.variant.attributes)
                      .map(([key, value]) => `${value}`)
                      .join(', ')}
                  </p>
                )} */}
                <p style={{ color: 'var(--neutral-gray600)' }}>
                  Qty: {itemQuantity} × Tk. {itemPrice.toFixed(2)}
                </p>
              </div>
              <div className="text-right font-medium" style={{ color: 'var(--primary-main)' }}>
                Tk. {itemTotal.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between" style={{ color: 'var(--neutral-gray600)' }}>
          <span>Subtotal</span>
          <span>Tk. {(subtotal).toFixed(2)}</span>
        </div>

        {/* Show savings as informational only - not deducted from total */}
        {savings > 0 && (
          <div className="flex justify-between py-2 px-3 rounded bg-orange-50 text-orange-600">
            <div className="font-medium flex items-center gap-1">
              <HandCoins size={14} />
               You saved
               </div>
            <span className="font-semibold">Tk. {(savings).toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="pt-4 flex justify-between items-center" style={{ borderTop: `1px solid var(--neutral-gray400)` }}>
        <span className="font-semibold" style={{ color: 'var(--primary-main)' }}>Total</span>
        <span className="text-2xl font-bold" style={{ color: 'var(--accent-brown)' }}>
          Tk. {(total).toFixed(2)}
        </span>
      </div>

      {/* Items Count */}
      <div className="text-xs mt-4" style={{ color: 'var(--neutral-gray600)' }}>
        {cart?.total_items || 0} item{(cart?.total_items !== 1) ? 's' : ''} in cart
      </div>

      {/* Delivery Charge Info */}
      <div className="mt-6 p-4 rounded-lg bg-orange-50 border border-orange-400">
        <div className="text-sm font-semibold mb-2 flex items-center gap-1" style={{ color: 'var(--accent-brown)' }}>
           <Package size={14} />
           Delivery Charges
        </div>
        <ul className="text-xs space-y-1" style={{ color: 'var(--primary-main)' }}>
          <li>• <span className="font-medium">Inside Dhaka:</span> 60 TK</li>
          <li>• <span className="font-medium">Outside Dhaka:</span> 120 TK</li>
        </ul>
      </div>
    </div>
  );
}
