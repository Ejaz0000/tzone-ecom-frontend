import { cookies } from 'next/headers';
import ProductsPage from '@/components/products/ProductsPage';
import { axiosInstance } from '@/utils/axiosInstance';

export const metadata = {
  title: 'All Products - Tzone Bangladesh | Helmets, Riding Gear & Accessories',
  description: 'Browse our complete collection of premium bike helmets, riding gear, and motorcycle accessories. Shop authentic branded products with warranty and fast delivery across Bangladesh.',
  keywords: 'bike helmets, motorcycle gear, riding accessories, helmet brands Bangladesh',
  openGraph: {
    title: 'All Products - Tzone Bangladesh',
    description: 'Browse premium bike helmets, riding gear, and motorcycle accessories',
    type: 'website',
  },
};

/**
 * Fetch products data from API with filters and pagination
 */
async function getProductsData(searchParams) {
  try {
    // Get token and watch_pref from cookies (server-side)
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;
    const watchPref = cookieStore.get('watch_pref')?.value;

    // Build query params from searchParams
    const params = new URLSearchParams();
    
    // Pagination
    if (searchParams.page) params.append('page', searchParams.page);
    if (searchParams.page_size) params.append('page_size', searchParams.page_size);
    
    // Filters
    if (searchParams.category) params.append('category', searchParams.category);
    if (searchParams.brand) params.append('brand', searchParams.brand);
    if (searchParams.min_price) params.append('min_price', searchParams.min_price);
    if (searchParams.max_price) params.append('max_price', searchParams.max_price);
    if (searchParams.search) params.append('search', searchParams.search);
    if (searchParams.is_featured) params.append('is_featured', searchParams.is_featured);
    if (searchParams.on_sale) params.append('on_sale', searchParams.on_sale);
    
    // Sorting
    if (searchParams.ordering) params.append('ordering', searchParams.ordering);

    const queryString = params.toString();
    const url = queryString ? `/products/?${queryString}` : '/products/';

    // Build headers with token and watch_pref
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    if (watchPref) {
      headers['X-Watch-Pref'] = watchPref;
    }

    const response = await axiosInstance.get(url, { headers });

    console.log('Products API response:', response.data.data);

    if (response.data && response.data.status) {
      // Handle nested data structure: data.data.items and data.data.pagination
      const nestedData = response.data.data;
      
      if (!nestedData) {
        console.error('nestedData is undefined');
        return { data: [], pagination: {}, meta: {} };
      }

      // Extract items from nestedData.data.items
      const items = nestedData.data?.items || nestedData.items || [];
      const pagination = nestedData.data?.pagination || nestedData.pagination || {};

      return {
        data: items,
        pagination: pagination,
        meta: pagination
      };
    }

    console.error('Invalid response status:', response.data);
    return { data: [], pagination: {}, meta: {} };
  } catch (error) {
    console.error('Error fetching products data:', error.message);
    console.error('Error details:', error.response?.data);
    return { data: [], pagination: {}, meta: {} };
  }
}

/**
 * Fetch categories and brands for filters
 */
async function getFiltersData() {
  try {
    // Get token and watch_pref from cookies (server-side)
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;
    const watchPref = cookieStore.get('watch_pref')?.value;

    // Build headers with token and watch_pref
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    if (watchPref) {
      headers['X-Watch-Pref'] = watchPref;
    }

    // Fetch categories
    const categoriesResponse = await axiosInstance.get('/categories/', { headers });

    console.log('Categories API response:', categoriesResponse.data);

    // Fetch brands
    const brandsResponse = await axiosInstance.get('/brands/', { headers });

    return {
      categories: categoriesResponse.data?.data?.items || categoriesResponse.data?.data || [],
      brands: brandsResponse.data?.data?.items || brandsResponse.data?.data || []
    };
  } catch (error) {
    console.error('Error fetching filters data:', error.message);
    return { categories: [], brands: [] };
  }
}

export default async function ProductsRoute({ searchParams }) {
  // Await searchParams as it's a promise in Next.js 15
  const params = await searchParams;
  
  // Fetch products and filters data
  const productsData = await getProductsData(params);
  const filtersData = await getFiltersData();

  return (
    <ProductsPage 
      initialProductsData={productsData}
      categoriesData={filtersData.categories}
      brandsData={filtersData.brands}
      initialSearchParams={params}
    />
  );
}
