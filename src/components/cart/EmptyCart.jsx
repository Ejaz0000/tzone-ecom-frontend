'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-orange-100 p-6 rounded-full mb-6">
        <ShoppingCart className="w-16 h-16 text-orange-600" />
      </div>

      <h2 className="text-3xl font-bold text-orange-600 mb-2">Your cart is empty</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Looks like you haven't added anything to your cart yet. <br />
        Start shopping to find amazing products!
      </p>

      <Link
        href="/products"
        className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-200"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
