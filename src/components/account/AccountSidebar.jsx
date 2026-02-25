'use client';

import { User, Lock, MapPin, ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'password', label: 'Change Password', icon: Lock },
  { id: 'address', label: 'Address', icon: MapPin },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
];

export default function AccountSidebar({ activeSection, onSectionChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSectionChange = (id) => {
    onSectionChange(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-orange-50 transition-colors"
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5" />
              Close Menu
            </>
          ) : (
            <>
              <Menu className="w-5 h-5" />
              Menu
            </>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`md:block md:w-64 md:sticky md:top-24 md:max-h-screen overflow-y-auto transition-all duration-300 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-orange-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-orange-600">My Account</h2>
          </div>

          {/* Navigation Items */}
          <nav className="divide-y divide-gray-200">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-600'
                      : 'text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
