import { useCallback, useEffect, useRef } from 'react';

import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

import { isRequestCanceled } from '@/services/api';
import { fetchProductsByCategory } from '@/services/products.service';
import { store } from '@/store';
import {
    CategorySlug,
    GenderTab,
    MENS_CATEGORIES,
    WOMENS_CATEGORIES,
    setActiveCategory,
    setActiveGender,
    setCategoryProducts,
    setError,
    setLoading,
} from '@/store/slices/productsSlice';

const CACHE_TTL_MS = 5 * 60 * 1000;

export function useProducts() {
  const dispatch = useAppDispatch();
  const abortRef = useRef<AbortController | null>(null);

  const activeCategory = useAppSelector((s) => s.products.activeCategory);
  const activeGender = useAppSelector((s) => s.products.activeGender);
  const loading = useAppSelector((s) => s.products.loading);
  const error = useAppSelector((s) => s.products.error);
  const products = useAppSelector(
    (s) => s.products.cache[activeCategory]?.items ?? [],
  );

  const loadCategory = useCallback(
    async (category: CategorySlug, forceRefresh = false) => {
      const cached = store.getState().products.cache[category];
      const isFresh =
        !forceRefresh && cached && Date.now() - cached.loadedAt < CACHE_TTL_MS;

      if (isFresh) {
        dispatch(setLoading(false));
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      dispatch(setLoading(true));
      try {
        const data = await fetchProductsByCategory(category, controller.signal);
        dispatch(setCategoryProducts({ category, products: data }));
      } catch (error) {
        if (isRequestCanceled(error)) return;
        dispatch(
          setError({
            category,
            message:
              'Não foi possível carregar os produtos. Verifique sua conexão.',
          }),
        );
      }
    },
    [dispatch],
  );

  useEffect(() => {
    loadCategory(activeCategory);
    return () => {
      abortRef.current?.abort();
    };
  }, [activeCategory, loadCategory]);

  function selectCategory(category: CategorySlug) {
    dispatch(setActiveCategory(category));
  }

  function selectGender(gender: GenderTab) {
    dispatch(setActiveGender(gender));
  }

  function retry() {
    loadCategory(activeCategory, true);
  }

  const categories =
    activeGender === 'mens' ? MENS_CATEGORIES : WOMENS_CATEGORIES;

  return {
    products,
    loading,
    error,
    activeCategory,
    activeGender,
    categories,
    selectCategory,
    selectGender,
    retry,
  };
}
