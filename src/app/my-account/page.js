'use client';

import { useState } from 'react';
import AccountSidebar from '@/components/account/AccountSidebar';
import ProfileSection from '@/components/account/ProfileSection';
import ChangePasswordSection from '@/components/account/ChangePasswordSection';
import AddressSection from '@/components/account/AddressSection';
import OrdersSection from '@/components/account/OrdersSection';
import { useSelector } from 'react-redux';

export default function MyAccountPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const user = useSelector((state) => state.user.user);

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'password':
        return <ChangePasswordSection />;
      case 'address':
        return <AddressSection />;
      case 'orders':
        return <OrdersSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        {/* Page Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <AccountSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}
