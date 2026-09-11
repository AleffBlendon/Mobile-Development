import api from './api';

import { Product } from '@/store/slices/productsSlice';

interface DummyJsonCategoryResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Fetch all products for a given DummyJSON category slug.
 * Uses the centralised Axios instance — do NOT use fetch() elsewhere.
 */
export async function fetchProductsByCategory(
  category: string,
  signal?: AbortSignal,
): Promise<Product[]> {
  const response = await api.get<DummyJsonCategoryResponse>(
    `/products/category/${category}`,
    { signal },
  );
  return response.data.products;
}

/**
 * Fetch a single product by its numeric ID.
 * Endpoint: GET https://dummyjson.com/products/{id}
 */
export async function fetchProductById(
  id: number,
  signal?: AbortSignal,
): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`, { signal });
  return response.data;
}
