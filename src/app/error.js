'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw, Mail } from 'lucide-react';

/**
 * Error Boundary Component
 * Catches runtime errors and displays a friendly error page
 * Handles 500 Server Errors and other unexpected errors
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
          >
            <AlertTriangle 
              size={64} 
              style={{ color: 'var(--error)' }}
            />
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 
            className="text-6xl md:text-8xl font-bold mb-2"
            style={{ color: 'var(--error)' }}
          >
            500
          </h1>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: 'var(--error)' }}
          />
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--neutral-gray600)' }}
          >
            Something Went Wrong
          </h2>
          <p 
            className="text-lg mb-2"
            style={{ color: 'var(--neutral-gray600)' }}
          >
            We're sorry, but something unexpected happened.
          </p>
          <p 
            className="text-base"
            style={{ color: 'var(--neutral-gray600)' }}
          >
            Our team has been notified and we're working to fix the issue.
          </p>
        </div>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === 'development' && error?.message && (
          <div 
            className="mb-8 p-4 rounded-lg text-left overflow-auto max-h-40"
            style={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid var(--error)'
            }}
          >
            <p className="text-sm font-mono" style={{ color: 'var(--error)' }}>
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 border-none cursor-pointer"
            style={{ backgroundColor: 'var(--accent-orange)' }}
          >
            <RefreshCw size={20} />
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all border-2 no-underline"
            style={{ 
              borderColor: 'var(--accent-orange)',
              color: 'var(--accent-orange)',
              backgroundColor: 'transparent'
            }}
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>

        {/* Help Section */}
        <div className="pt-8 border-t border-gray-300">
          <p 
            className="text-sm font-semibold mb-4"
            style={{ color: 'var(--neutral-gray600)' }}
          >
            Need help? Try these options:
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Link
              href="/products"
              className="text-sm hover:underline"
              style={{ color: 'var(--accent-orange)' }}
            >
              Browse Products
            </Link>
            <span style={{ color: 'var(--neutral-gray400)' }}>•</span>
            <Link
              href="/cart"
              className="text-sm hover:underline"
              style={{ color: 'var(--accent-orange)' }}
            >
              View Cart
            </Link>
            <span style={{ color: 'var(--neutral-gray400)' }}>•</span>
            <Link
              href="/my-account"
              className="text-sm hover:underline"
              style={{ color: 'var(--accent-orange)' }}
            >
              My Account
            </Link>
          </div>
          
          {/* Contact Support */}
          <div 
            className="inline-flex items-center gap-2 text-sm"
            style={{ color: 'var(--neutral-gray600)' }}
          >
            <Mail size={16} />
            <span>
              If the problem persists, contact us at{' '}
              <a 
                href="mailto:info@tzonebd.com"
                className="font-semibold hover:underline"
                style={{ color: 'var(--accent-orange)' }}
              >
                info@tzonebd.com
              </a>
            </span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-6 opacity-20">
          <div className="w-12 h-12 rounded-full" style={{ backgroundColor: 'var(--error)' }} />
          <div className="w-16 h-16 rounded-full" style={{ backgroundColor: 'var(--error)' }} />
          <div className="w-10 h-10 rounded-full" style={{ backgroundColor: 'var(--error)' }} />
        </div>
      </div>
    </div>
  );
}
