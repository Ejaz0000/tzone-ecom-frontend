import Link from 'next/link';
import { Home, Search, ShoppingBag, ArrowLeft } from 'lucide-react';

/**
 * Custom 404 Not Found Page
 * Displayed when a route is not found
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Large Text */}
        <div className="mb-8">
          <h1 
            className="text-[150px] md:text-[200px] font-bold leading-none"
            style={{ color: 'var(--accent-brown)' }}
          >
            404
          </h1>
          <div 
            className="w-32 h-2 mx-auto rounded-full mb-6"
            style={{ backgroundColor: 'var(--accent-brown)' }}
          />
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--neutral-gray600)' }}
          >
            Page Not Found
          </h2>
          <p 
            className="text-lg mb-2"
            style={{ color: 'var(--neutral-gray600)' }}
          >
            Oops! The page you're looking for doesn't exist.
          </p>
          <p 
            className="text-base"
            style={{ color: 'var(--neutral-gray600)' }}
          >
            It might have been moved or deleted, or you may have mistyped the URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 no-underline"
            style={{ backgroundColor: 'var(--accent-brown)' }}
          >
            <Home size={20} />
            Back to Home
          </Link>
          
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all border-2 no-underline"
            style={{ 
              borderColor: 'var(--accent-brown)',
              color: 'var(--accent-brown)',
              backgroundColor: 'transparent'
            }}
          >
            <ShoppingBag size={20} />
            Browse Products
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-gray-300">
          <p 
            className="text-sm font-semibold mb-4"
            style={{ color: 'var(--neutral-gray600)' }}
          >
            You might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="text-sm hover:underline"
              style={{ color: 'var(--accent-brown)' }}
            >
              All Products
            </Link>
            <span style={{ color: 'var(--neutral-gray400)' }}>•</span>
            <Link
              href="/cart"
              className="text-sm hover:underline"
              style={{ color: 'var(--accent-brown)' }}
            >
              Shopping Cart
            </Link>
            <span style={{ color: 'var(--neutral-gray400)' }}>•</span>
            <Link
              href="/my-account"
              className="text-sm hover:underline"
              style={{ color: 'var(--accent-brown)' }}
            >
              My Account
            </Link>
            <span style={{ color: 'var(--neutral-gray400)' }}>•</span>
            <Link
              href="/contact"
              className="text-sm hover:underline"
              style={{ color: 'var(--accent-brown)' }}
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-8 opacity-20">
          <div className="w-16 h-16 rounded-full" style={{ backgroundColor: 'var(--accent-brown)' }} />
          <div className="w-12 h-12 rounded-full" style={{ backgroundColor: 'var(--accent-brown)' }} />
          <div className="w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--accent-brown)' }} />
        </div>
      </div>
    </div>
  );
}
