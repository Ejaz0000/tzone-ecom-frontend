import { cookies } from 'next/headers';
import ProductDetailsPage from '@/components/products/ProductDetailsPage';
import { axiosInstance } from '@/utils/axiosInstance';

// Fetch product data server-side
async function getProductData(slug) {
  try {
    // Get token from cookies (server-side)
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;
    
    // Make request with token in headers
    const response = await axiosInstance.get(`/products/${slug}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    
    if (response.data && response.data.status) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching product data:', error.message);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductData(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  return {
    title: `${product.title} - Tzone Bangladesh`,
    description: product.description,
    keywords: `${product.title}, ${product.category?.name}, ${product.brand?.name}, bike helmet Bangladesh`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images?.length > 0 ? [
        {
          url: product.images[0].image,
          width: 800,
          height: 600,
          alt: product.images[0].alt_text || product.title,
        },
      ] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const productData = await getProductData(slug);
  
  if (!productData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--neutral-gray600)' }}>
            Product Not Found
          </h1>
          <p style={{ color: 'var(--neutral-gray600)' }}>
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return <ProductDetailsPage productData={productData} />;
}
