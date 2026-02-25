import { cookies } from 'next/headers';
import HeroCarousel from '@/components/sections/HeroCarousel';
import Categories from '@/components/sections/Categories';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import NewProducts from '@/components/sections/NewProducts';
import BrandsCarousel from '@/components/sections/BrandsCarousel';
import { axiosInstance } from '@/utils/axiosInstance';
import axios from 'axios';

export const metadata = {
  title: 'Tzone Bangladesh - Premium Bike Helmets & Riding Gear | Shop Online',
  description: 'Shop the best bike helmets, motorcycle gear, and riding accessories in Bangladesh. Authentic branded products from LS2, AGV, MT, Shoei, HJC with warranty. Fast delivery across Dhaka and all over Bangladesh.',
  keywords: 'bike helmet Bangladesh, motorcycle helmet Dhaka, riding gear, bike accessories, LS2 helmet, AGV helmet, MT helmet, Shoei helmet, HJC helmet, Tzone Bangladesh',
  authors: [{ name: 'Tzone Bangladesh' }],
  openGraph: {
    title: 'Tzone Bangladesh - Premium Bike Helmets & Riding Gear',
    description: 'Shop authentic branded bike helmets and riding gear with warranty and fast delivery across Bangladesh',
    type: 'website',
    locale: 'en_US',
  },
};

/**
 * Landing Page Component (Server-Side Rendered)
 * 
 * Fetches homepage data from API and renders all sections:
 * 1. Hero Carousel (from API banners)
 * 2. Categories (static data)
 * 3. Featured Products (from API)
 * 4. New Products (from API)
 * 5. Brands Carousel (static data)
 */

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080",
  withCredentials: true  // 🔥 required for cookies to send
});

export async function getHomepageData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("user_token")?.value;
    const watchPref = cookieStore.get("watch_pref")?.value;

    // Build headers with token and watch_pref cookie
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    if (watchPref) {
      headers['X-Watch-Pref'] = watchPref;
    }

    const response = await api.get("/api/homepage", {
      headers
    });

    if (response.data && response.data.status) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching homepage data:", error.message);
    return null;
  }
}

// Fetch homepage data on the server
// async function getHomepageData() {
//   try {
//     // Get token from cookies (server-side)
//     const cookieStore = await cookies();
//     const token = cookieStore.get('user_token')?.value;
    
//     // Make request with token in headers
//     const response = await axiosInstance.get('/homepage', {
//       headers: token ? { Authorization: `Bearer ${token}` } : {}
//     });
    
//     if (response.data && response.data.status) {
//       return response.data.data;
//     }
    
//     // Return null if API fails
//     return null;
//   } catch (error) {
//     console.error('Error fetching homepage data:', error.message);
//     // Return null on error, fallback to static data
//     return null;
//   }
// }

export default async function Home() {
  // Fetch data from API
  const apiData = await getHomepageData();

  // Extract sections from API data
  const banners = apiData?.banners || [];
  const categories = apiData?.categories || [];
  const brands = apiData?.brands || [];
  const featuredSection = apiData?.featured_sections?.find(
    section => section.section_type === 'featured'
  );
  const newSection = apiData?.featured_sections?.find(
    section => section.section_type === 'new'
  );

  return (
    <main className="w-full">
      {/* Hero Carousel Section */}
      <section className="b-4 bg-white">
        <div className="">
          <HeroCarousel banners={banners} />
        </div>
      </section>

      {/* Categories Section */}
      <Categories categories={categories} />

      {/* Featured Products Section */}
      <FeaturedProducts featuredSection={featuredSection} />

      {/* New Products Section */}
      <NewProducts newSection={newSection} />

      {/* Brands Carousel Section */}
      <BrandsCarousel brands={brands} />
    </main>
  );
}
