'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Settings, Watch } from 'lucide-react';
import Cookies from 'js-cookie';
import { designConfig } from '@/config/design-config';
import WatchPreferenceModal from './WatchPreferenceModal';

export default function WatchPreferenceButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  // Automatically open modal if no preference is set
  useEffect(() => {
    const checkPreference = () => {
      const preference = Cookies.get('watch_pref');
      if (!preference) {
        // Open modal after a short delay to ensure page is loaded
        setTimeout(() => {
          setIsModalOpen(true);
        }, 500);
      }else {
        setSelectedPreference(preference);
      }
    };
    
    checkPreference();
  }, []);

  // Toggle between icon and message every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage((prev) => !prev);
    }, 5000); // Toggle every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePreferenceSelect = (preference) => {
    // You can dispatch Redux action or handle preference change here
    console.log('Watch preference selected:', preference);
    // Optionally reload the page to fetch new data based on preference
    window.location.reload();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-30 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 flex items-center justify-center group overflow-hidden text-orange-300 bg-orange-50 border-2 border-orange-600 cursor-pointer"
        style={{
          padding: '1rem',
          width: showMessage ? '316px' : '56px',
          minWidth: '56px',
          height: '56px',
          transition: 'width 0.5s ease-in-out, min-width 0.5s ease-in-out',
        }}
        aria-label="Change watch preference"
        title="Change watch preference"
      >
        {/* Icon View */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: showMessage ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          <Watch size={24} />
        </div>

        {/* Message View */}
        <div
          className="text-orange-600 text-sm whitespace-nowrap px-2"
          style={{
            opacity: showMessage ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            pointerEvents: showMessage ? 'auto' : 'none',
          }}
        >
          {
            selectedPreference ? (
              <div>
                You are now seeing <span className='text-(--primary-gold) font-semibold'>{selectedPreference === 'authentic' ? 'authentic' : 'replicated'}</span> watches
                <div className='flex items-center justify-center mt-1 gap-1'>
                  Click to change <ArrowRight size={16} />
                </div>
              </div>
            ) : (
              <div>
                You have not set a watch preference yet.
                <div className='flex items-center justify-center mt-1 gap-1'>
                  Click to set <ArrowRight size={16} />
                </div>
              </div>
            )
          }
        </div>

        {/* Tooltip */}
        <span
          className="absolute bottom-16 right-0 px-3 py-2 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: designConfig.colors.primary.dark }}
        >
          Change Preference
        </span>
      </button>

      {/* Modal */}
      <WatchPreferenceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectPreference={handlePreferenceSelect}
      />
    </>
  );
}
