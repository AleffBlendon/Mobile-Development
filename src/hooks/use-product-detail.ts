import { useCallback, useEffect } from 'react';

import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

import { isRequestCanceled } from '@/services/api';
import { fetchProductById } from '@/services/products.service';
import { store } from '@/store';
import {
    Product,
    setDetailError,
    setDetailLoading,
    setSelectedProduct
} from '@/store/slices/productsSlice';

function findCachedProduct(id: number): Product | undefined {
  const cache = store.getState().products.cache;
  for (const entry of Object.values(cache)) {
    const match = entry?.items.find((item) => item.id === id);
    if (match) return match;
  }
  return undefined;
}

export function useProductDetail(id: number) {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);
  const detailLoading = useAppSelector((state) => state.products.detailLoading);
  const detailError = useAppSelector((state) => state.products.detailError);

  const load = useCallback(async (signal: AbortSignal) => {
    if (!Number.isFinite(id) || id <= 0) {
      dispatch(setDetailError('Produto não encontrado.'));
      return;
    }

    const cached = findCachedProduct(id);
    if (cached) {
      dispatch(setSelectedProduct(cached));
      return;
    }

    dispatch(setDetailLoading(true));
    try {
      const product = await fetchProductById(id, signal);
      dispatch(setSelectedProduct(product));
    } catch (error) {
      if (isRequestCanceled(error) || signal.aborted) return;
      dispatch(
        setDetailError(
          'Não foi possível carregar o produto. Verifique sua conexão.',
        ),
      );
    }
  }, [dispatch, id]);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => {
      controller.abort();
    };
  }, [load]);

  const isCurrent = selectedProduct?.id === id;

  return {
    product: isCurrent ? selectedProduct : null,
    loading: detailLoading || (!isCurrent && !detailError),
    error: detailError,
    retry: () => {
      dispatch(setDetailLoading(true));
      load(new AbortController().signal);
    },
  };
}
