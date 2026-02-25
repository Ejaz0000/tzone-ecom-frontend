'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { designConfig } from '@/config/design-config';
import TopBar from './TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '@/redux/slices/userSlice';
import { fetchCart } from '@/redux/slices/cartSlice';
import { axiosInstance } from '@/utils/axiosInstance';
import { ChevronDown, Search, ShoppingCart, User, X } from 'lucide-react';
import SearchBar from './SearchBar';
import Cookies from 'js-cookie';

/**
 * Header Component with TopBar
 * 
 * Two-layer header:
 * 1. TopBar - Welcome text, quick links, support info
 * 2. Navigation - Logo, Home, All Products, Category (dropdown), Brands (dropdown), Search, Cart
 */

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  
  // Handle both nested (summary.total_items) and flat (total_items) structure
  const cartItemsCount = cart?.summary?.total_items || cart?.total_items || 0;


  useEffect(() => {
    // Fetch user profile and cart data
    dispatch(fetchUserData());
    dispatch(fetchCart());
    
    // Fetch categories and brands
    fetchCategories();
    fetchBrands();
  }, [dispatch]);

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.category-dropdown')) {
        setIsCategoryOpen(false);
      }
      if (!event.target.closest('.brand-dropdown')) {
        setIsBrandOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/categories/');
      const categoriesData = response.data?.data || [];
      
      // Organize categories into parent-child structure
      const parentCategories = categoriesData.filter(cat => cat.parent_id === null);
      const childCategories = categoriesData.filter(cat => cat.parent_id !== null);
      
      // Build hierarchical structure
      const hierarchicalCategories = parentCategories.map(parent => ({
        ...parent,
        children: childCategories.filter(child => child.parent_id === parent.id)
      }));

      console.log('Hierarchical Categories:', hierarchicalCategories);
      
      setCategories(hierarchicalCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axiosInstance.get('/brands/');
      const brandsData = response.data?.data?.items || response.data?.data || [];
      setBrands(brandsData);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const headerData = {
    topbar: {
      links: [
        { label: "Tzone Bangladesh Warranty Policy", href: "#" },
        { label: "About Us", href: "#" },
        { label: "Customer Support", href: "#" },
      ],
    },
    
    navbar: {
      logo: {
        src: "/images/logo.png",
        alt: "Tzone Bangladesh"
      },
      menu: [
        { label: "HOME", href: "/" },
        {
          label: "ABOUT US", dropdown: [
            { label: "Our Story", href: "/about" },
            { label: "Our Team", href: "/team" }
          ]
        },
        { label: "TIPS & TRICKS", href: "/tips" },
        { label: "NEWS & UPDATES", href: "/news" },
        { label: "BECOME A DEALER", href: "/dealer" },
        { label: "CONTACT US", href: "/contact" }
      ],
      actions: {
        productDropdown: "OUR PRODUCTS",
        searchPlaceholder: "Search for Products",
        categoryFilter: "All Categories",
        icons: ["search", "refresh", "wishlist", "cart"]
      }
    }
  }

  return (
    <>
      {/* TopBar Section */}
      <TopBar topbarData={headerData.topbar} user={user}/>

      {/* Main Navigation */}
      <nav
      className="sticky top-0 z-50 bg-orange-50 border-b border-gray-300 py-4 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <h1
              className="text-2xl md:text-3xl font-normal text-(--primary-gold) m-0"
            >
              Tzone
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-8 flex-1">
            {/* Home Link */}
            <Link
              href="/"
              className="text-base font-normal text-orange-600 hover:text-orange-600 transition-colors no-underline"
            >
              Home
            </Link>

            {/* All Products Link */}
            <Link
              href="/products"
              className="text-base font-normal text-orange-600 hover:text-orange-600 transition-colors no-underline"
            >
              All Products
            </Link>

            {/* Category Dropdown */}
            <div className="relative group category-dropdown">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="text-base font-normal text-orange-600 hover:text-orange-600 transition-colors py-2 bg-transparent border-none cursor-pointer flex items-center gap-1"
              >
                Categories
                <ChevronDown size={14}/>
              </button>

              {/* Category Dropdown Menu */}
              <div
                className={`absolute top-full py-1 left-0 mt-2 bg-white rounded-md min-w-60 z-50 transition-all ${
                  isCategoryOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                style={{
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <div key={category.id}>
                      {/* Parent Category */}
                      <Link
                        href={`/products?category=${category.slug}`}
                        className="block text-sm font-normal text-orange-600 py-3 px-6 no-underline hover:bg-orange-50 transition-colors border-b border-gray-200"
                        onClick={() => setIsCategoryOpen(false)}
                      >
                        {category.name}
                      </Link>
                      
                      {/* Child Categories */}
                      {category.children && category.children.length > 0 && (
                        <div className="bg-orange-50">
                          {category.children.map((child, childIdx) => (
                            <Link
                              key={child.id}
                              href={`/products?category=${child.slug}`}
                              className={`block text-sm text-gray-700 py-2 pl-10 pr-6 no-underline hover:bg-orange-50 transition-colors ${
                                childIdx < category.children.length - 1 ? 'border-b border-gray-100' : 'border-b border-gray-200'
                              }`}
                              onClick={() => setIsCategoryOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 py-4 px-6">
                    Loading categories...
                  </div>
                )}
              </div>
            </div>

            {/* Brands Dropdown */}
            <div className="relative group brand-dropdown">
              <button
                onClick={() => setIsBrandOpen(!isBrandOpen)}
                className="text-base font-normal text-orange-600 hover:text-orange-600 transition-colors py-2 bg-transparent border-none cursor-pointer flex items-center gap-1"
              >
                Brands
                <ChevronDown size={14}/>
              </button>

              {/* Brands Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 bg-white rounded-md min-w-[200px] z-50 transition-all ${
                  isBrandOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                style={{
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                {brands.length > 0 ? (
                  brands.map((brand, idx) => (
                    <Link
                      key={brand.id || idx}
                      href={`/products?brand=${brand.slug}`}
                      className={`block text-sm text-orange-600 py-4 px-6 no-underline hover:bg-gray-100 transition-colors ${
                        idx < brands.length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                      onClick={() => setIsBrandOpen(false)}
                    >
                      {brand.name}
                    </Link>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 py-4 px-6">
                    Loading brands...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar & Action Icons */}
          <div className="flex items-center gap-4 md:gap-6">
              <div
                onClick={() => setShowSearchBar(!showSearchBar)}
                className="text-gray-600 hover:text-orange-400 relative cursor-pointer"
              >
                {showSearchBar ? <X size={24} /> : <Search size={24} />}
              </div>

              <Link
                href="/cart"
                className="text-gray-600 hover:text-orange-400 relative"
              >
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center bg-(--primary-gold) text-white">
                  {cartItemsCount}
                </span>
              </Link>

              {user ? (
              <div className="relative group">
                <button className="text-xs text-gray-600 hover:text-orange-400 transition-colors no-underline flex items-center gap-1 focus:outline-none">
                  <User className="mr-2" size={24} /> 
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute left-0 min-w-[120px] bg-white text-orange-600 rounded shadow-lg z-500 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity">
                  <Link
                    href="/my-account"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 no-underline"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      Cookies.remove("user_token");
                      window.location.reload();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-xs text-gray-600 hover:text-orange-400 transition-colors no-underline"
              >
                <User className="mr-2" size={24} /> 
              </Link>
            )}

            {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-orange-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
            </div>

          

          
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="mt-4 pt-4 border-t border-gray-300 flex flex-col gap-4"
          >
            <Link
              href="/"
              className="text-sm font-medium text-orange-600 hover:text-orange-600 no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/products"
              className="text-sm font-medium text-orange-600 hover:text-orange-600 no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>

            {/* Categories in Mobile */}
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="text-sm font-medium text-orange-600 hover:text-orange-600 bg-transparent border-none cursor-pointer text-left flex items-center gap-1"
            >
              Categories
              <ChevronDown size={14}/>
            </button>

            {isCategoryOpen && (
              <div className="pl-4 flex flex-col gap-2">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <div key={category.id} className="flex flex-col gap-1">
                      {/* Parent Category */}
                      <Link
                        href={`/products?category=${category.slug}`}
                        className="text-sm font-semibold text-orange-600 hover:text-orange-600 no-underline"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsCategoryOpen(false);
                        }}
                      >
                        {category.name}
                      </Link>
                      
                      {/* Child Categories */}
                      {category.children && category.children.length > 0 && (
                        <div className="pl-4 flex flex-col gap-1">
                          {category.children.map((child) => (
                            <Link
                              key={child.id}
                              href={`/products?category=${child.slug}`}
                              className="text-sm text-gray-700 hover:text-orange-600 no-underline"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsCategoryOpen(false);
                              }}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">Loading...</span>
                )}
              </div>
            )}

            {/* Brands in Mobile */}
            <button
              onClick={() => setIsBrandOpen(!isBrandOpen)}
              className="text-sm font-medium text-orange-600 hover:text-orange-600 bg-transparent border-none cursor-pointer text-left flex items-center gap-1"
            >
              Brands
              <ChevronDown size={14}/>
            </button>

            {isBrandOpen && (
              <div className="pl-6 flex flex-col gap-2">
                {brands.length > 0 ? (
                  brands.map((brand, idx) => (
                    <Link
                      key={brand.id || idx}
                      href={`/products?brand=${brand.slug}`}
                      className="text-sm text-gray-700 hover:text-orange-600 no-underline"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsBrandOpen(false);
                      }}
                    >
                      {brand.name}
                    </Link>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">Loading...</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {showSearchBar && (
          <div className="absolute -bottom-[59px] left-1/2 transform -translate-x-1/2 shadow-lg ">
            <SearchBar />
          </div>
        )}
    </nav>
    </>
  );
};

export default Header;