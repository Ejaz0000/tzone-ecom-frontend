'use client';

import { useEffect } from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

/**
 * Global Error Component
 * Catches errors in the root layout
 * Must be a Client Component
 */
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
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
                  color="#ef4444"
                />
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-6">
              <h1 className="text-6xl md:text-8xl font-bold mb-2 text-red-600">
                Error
              </h1>
              <div className="w-24 h-1 mx-auto rounded-full bg-red-600" />
            </div>

            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-600">
                Application Error
              </h2>
              <p className="text-lg mb-2 text-gray-700">
                We're sorry, but something went terribly wrong.
              </p>
              <p className="text-base text-gray-600">
                Please try refreshing the page or return to the homepage.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-all border-none cursor-pointer"
              >
                <RefreshCw size={20} />
                Try Again
              </button>
              
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-orange-600 border-2 border-orange-600 hover:bg-orange-50 transition-all no-underline"
              >
                <Home size={20} />
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
