'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';

export default function MiniCart() {
  const items = useSelector((state) => state.cart.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative inline-block">
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {totalItems}
          </span>
        )}
      </button>
    </Link>
  );
}
