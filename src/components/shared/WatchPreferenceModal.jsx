'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Cookies from 'js-cookie';
import { designConfig } from '@/config/design-config';

export default function WatchPreferenceModal({ isOpen, onClose, onSelectPreference }) {
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [savedPreference, setSavedPreference] = useState(null);

  // Load saved preference from cookies on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = Cookies.get('watch_pref');
      setSavedPreference(saved);
      if (saved) {
        setSelectedPreference(saved);
      }
    }
  }, []);

  const handlePreferenceSelect = (preference) => {
    setSelectedPreference(preference);
    // Save to cookies with 7-day expiration
    Cookies.set('watch_pref', preference, {
  expires: 7,
  sameSite: 'Lax',
  secure: false,
});
    setSavedPreference(preference);
    if (onSelectPreference) {
      onSelectPreference(preference);
    }
    // Keep modal open to show confirmation, auto-close after 500ms
    setTimeout(() => {
      onClose();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 flex items-center justify-center p-4 z-40 bg-[rgba(0,0,0,0.25)]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-orange-50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-medium text-orange-600">
              Choose Your Watch Style
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Authentic Watches Card */}
              <div
                className="rounded-3xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 border-transparent"
                style={{
                  backgroundColor: 'var(--neutral-gray300)',
                  borderColor: selectedPreference === 'authentic' ? designConfig.colors.accent.orange : 'transparent',
                }}
                onClick={() => handlePreferenceSelect('authentic')}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-gray-300">
                    <img
                      src="/assets/authentic-watch.jpg"
                      alt="Authentic Watches"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <button
                  className="w-full py-3 rounded-full font-semibold text-white transition-all duration-300"
                  style={{ backgroundColor: designConfig.colors.accent.orange }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = designConfig.colors.accent.orangeDark;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = designConfig.colors.accent.orange;
                  }}
                >
                  Authentic Watches
                </button>

                <p className="text-center mt-4 text-gray-700 text-sm leading-relaxed">
                  Explore a collection of genuine, high-quality watches crafted with precision.
                </p>
              </div>

              {/* Replicated Watches Card */}
              <div
                className="rounded-3xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 border-transparent"
                style={{
                  backgroundColor: 'var(--neutral-gray300)',
                  borderColor: selectedPreference === 'replica' ? designConfig.colors.accent.orange : 'transparent',
                }}
                onClick={() => handlePreferenceSelect('replica')}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-gray-300">
                    <img
                      src="/assets/replicated-watch.jpg"
                      alt="Replicated Watches"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <button
                  className="w-full py-3 rounded-full font-semibold text-white transition-all duration-300"
                  style={{ backgroundColor: designConfig.colors.accent.orange }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = designConfig.colors.accent.orangeDark;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = designConfig.colors.accent.orange;
                  }}
                >
                  Replicated Watches
                </button>

                <p className="text-center mt-4 text-gray-700 text-sm leading-relaxed">
                  Discover stylish replicated watches that offer both elegance and affordability.
                </p>
              </div>
            </div>

            {/* Note Section */}
            <div
              className="p-4 rounded-lg border-l-4"
              style={{
                backgroundColor: 'var(--neutral-gray300)',
                borderColor: designConfig.colors.accent.orange,
              }}
            >
              <p className="text-sm text-gray-700">
                <span className="font-semibold">💡 Note:</span> You can change your preference anytime using the button in the bottom right corner. Your preference will be saved for 7 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
