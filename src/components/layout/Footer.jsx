'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Footer Component
 * Main footer with company support, navigation links, and social media
 */

const Footer = () => {
  

  const footerData =  {
    id: "footer",
    logo: "/images/logo.png",
    support: {
      headline: "Got Questions? Call us 24/7!",
      phone: "+88-01789-881111",
      address: "House – 183/8, Pirerbag (60 feet Road), Mirpur, Dhaka, Bangladesh",
      socials: [
        { icon: "facebook", href: "#" },
        { icon: "instagram", href: "#" },
        { icon: "youtube", href: "#" }
      ]
    },
    columns: [
      {
        title: "Find It Fast",
        links: [
          { label: "Helmets", href: "#" },
          { label: "Riding Gears", href: "#" },
          { label: "Rain Gear", href: "#" }
        ]
      },
      {
        title: "Quick Links",
        links: [
          { label: "About Us", href: "#" },
          { label: "My Account", href: "#" },
          { label: "Terms and Conditions", href: "#" },
          { label: "Contact Us", href: "#" },
          { label: "Warranty Policy", href: "#" }
        ]
      }
    ],
    copyright: "© Tzone Bangladesh - All Rights Reserved"
  }

  const support = footerData?.support;
  const columns = footerData?.columns || [];
  const copyright = footerData?.copyright;

  return (
    <footer className="bg-[--accent-black] text-white pt-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Support Section */}
          <div>
            <h3 className="text-lg font-normal mb-6 text-orange-200">
              {support?.headline}
            </h3>

            {/* Phone */}
            {support?.phone && (
              <a
                href={`tel:${support.phone}`}
                className="flex items-center gap-4 text-(--primary-gold) font-semibold mb-6 no-underline transition-colors hover:text-orange-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 8.993c0-1.104.897-2 2-2h3.574c.898 0 1.67.778 1.67 1.734v2.053c0 .956-.772 1.734-1.67 1.734H7.02c-.697 0-1.326.428-1.607 1.103-.281.675-.281 1.422 0 2.097C6.694 17.572 9.723 21 14.5 21c.828 0 1.5-.672 1.5-1.5V18c0-.828.672-1.5 1.5-1.5h2.5c.828 0 1.5.672 1.5 1.5v1.5c0 5.247-4.253 9.5-9.5 9.5-7.732 0-12.5-5.373-12.5-12.007v-2.5z" />
                </svg>
                <span>{support.phone}</span>
              </a>
            )}

            {/* Address */}
            {support?.address && (
              <p className="text-sm text-orange-100 leading-relaxed">
                {support.address}
              </p>
            )}
          </div>

          {/* Footer Columns */}
          {columns.map((column, colIdx) => (
            <div key={colIdx}>
              <h3 className="text-lg font-normal mb-6 text-orange-200">
                {column.title}
              </h3>

              <div className="flex flex-col gap-4">
                {column.links?.map((link, linkIdx) => (
                  <Link
                    key={linkIdx}
                    href={link.href}
                    className="text-sm text-orange-100 no-underline transition-colors hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Social Links */}
          {support?.socials && support.socials.length > 0 && (
            <div>
              <h3 className="text-lg font-normal mb-6 text-orange-200">
                Follow Us
              </h3>

              <div className="flex gap-6">
                {support.socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-md border-2 border-(--primary-gold) flex items-center justify-center text-(--primary-gold) no-underline transition-colors hover:bg-orange-600"
                    title={social.icon}
                  >
                    {social.icon === 'facebook' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    )}
                    {social.icon === 'instagram' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
                      </svg>
                    )}
                    {social.icon === 'youtube' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-orange-900 mb-6" />

        {/* Copyright */}
        {copyright && (
          <div className="text-center py-6 text-orange-100 text-sm">
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;