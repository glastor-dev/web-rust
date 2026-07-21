import { Product, DUMMY_PRODUCTS } from '../constants/dummyProducts';

export async function getBestsellers(category?: string, limit: number = 8): Promise<{ products: Product[]; total: number }> {
  const backendUrl = process.env.BACKEND_URL || (process.env.NODE_ENV === 'production' ? 'http://backend:3001' : 'http://127.0.0.1:3001');
  let fetchUrl = `${backendUrl}/api/products/bestsellers?limit=${limit}`;
  
  if (category && category.toUpperCase() !== 'TODO') {
    fetchUrl += `&category=${encodeURIComponent(category)}`;
  }

  try {
    const res = await fetch(fetchUrl, {
      next: { revalidate: 60 },
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object' && 'products' in data) {
        return {
          products: data.products,
          total: data.total || data.products.length,
        };
      } else if (Array.isArray(data)) {
        return {
          products: data,
          total: data.length,
        };
      }
    }
  } catch (error) {
    console.error('Failed to fetch bestsellers, returning dummy data', error);
  }

  // Fallback to dummy data
  return {
    products: DUMMY_PRODUCTS,
    total: DUMMY_PRODUCTS.length,
  };
}
