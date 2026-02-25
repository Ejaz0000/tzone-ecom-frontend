'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

/**
 * TopBar Component
 * 
 * Upper navigation bar containing:
 * - Welcome text
 * - Quick links (warranty, dealers, account)
 * - Support information (phone and email)
 * 
 * Responsive: Hidden on mobile, shown on desktop
 */

const TopBar = ({ topbarData, user }) => {
  return (
    <div
      className="hidden sm:flex items-center justify-center px-4 md:px-6 lg:px-12 py-2 bg-(--accent-black) text-(--accent-gold) border-b border-[--primary-light]"
    >
      {/* Left Section - Welcome Text */}
      <div className="flex items-center gap-4">
        
        
        {/* Quick Links */}
        <div className="hidden md:flex items-center gap-4 ml-4  pl-4">
            {topbarData?.links?.map((link, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <Link
                  key={idx}
                  href={link.href}
                  className="text-xs  hover:text-(--primary-gold) transition-colors no-underline flex items-center gap-2"
                > 
                  <span >{link.icon}</span>
                  <span>{link.label}</span>
                </Link>

                <div className={`${idx === topbarData.links.length - 1 ? 'hidden' : ''} h-4 border-r border-(--primary-gold)`} />
              </div>
            ))}

            
          </div>
      </div>

      
    </div>
  );
};

export default TopBar;
