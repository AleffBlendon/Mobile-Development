import { useLocalSearchParams } from 'expo-router';

import { ProductDetailScreen } from '@/screens/products/ProductDetailScreen';

/**
 * Dynamic route: /product/[id]
 * Receives the product ID from the URL and passes it to the screen.
 */
export default function ProductDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = Number(id);

  return <ProductDetailScreen productId={productId} />;
}
