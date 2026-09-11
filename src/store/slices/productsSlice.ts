import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  images: string[];
  category: string;
}

export type CategorySlug =
  | 'mens-shirts'
  | 'mens-shoes'
  | 'mens-watches'
  | 'fragrances'
  | 'sunglasses'
  | 'sports-accessories'
  | 'womens-bags'
  | 'womens-dresses'
  | 'womens-jewellery'
  | 'womens-shoes'
  | 'womens-watches'
  | 'tops'
  | 'skin-care'
  | 'beauty';

export type GenderTab = 'mens' | 'womens';

interface CategoryCache {
  items: Product[];
  loadedAt: number; // timestamp ms — used to avoid redundant fetches
}

interface ProductsState {
  // Cache keyed by category slug to avoid redundant API calls
  cache: Partial<Record<CategorySlug, CategoryCache>>;
  // Which category is currently displayed
  activeCategory: CategorySlug;
  // Which gender tab is selected
  activeGender: GenderTab;
  // Loading/error state per active fetch
  loading: boolean;
  error: string | null;
  // Detail screen state
  selectedProduct: Product | null;
  detailLoading: boolean;
  detailError: string | null;
}

// ---------------------------------------------------------------------------
// Constants — single source of truth for category slugs
// ---------------------------------------------------------------------------

export const MENS_CATEGORIES: CategorySlug[] = [
  'mens-shirts',
  'mens-shoes',
  'mens-watches',
  'fragrances',
  'sunglasses',
  'sports-accessories',
];

export const WOMENS_CATEGORIES: CategorySlug[] = [
  'womens-bags',
  'womens-dresses',
  'womens-jewellery',
  'womens-shoes',
  'womens-watches',
  'tops',
  'skin-care',
  'beauty',
];

export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  'mens-shirts': 'Camisas',
  'mens-shoes': 'Sapatos',
  'mens-watches': 'Relógios',
  'fragrances': 'Perfumes',
  'sunglasses': 'Óculos',
  'sports-accessories': 'Esportes',
  'womens-bags': 'Bolsas',
  'womens-dresses': 'Vestidos',
  'womens-jewellery': 'Joias',
  'womens-shoes': 'Calçados',
  'womens-watches': 'Relógios',
  'tops': 'Blusas',
  'skin-care': 'Skincare',
  'beauty': 'Maquiagem',
};

// ---------------------------------------------------------------------------
// Slice
// ---------------------------------------------------------------------------

const initialState: ProductsState = {
  cache: {},
  activeCategory: 'mens-shirts',
  activeGender: 'mens',
  loading: false,
  error: null,
  selectedProduct: null,
  detailLoading: false,
  detailError: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<CategorySlug>) {
      state.activeCategory = action.payload;
      state.error = null;
    },
    setActiveGender(state, action: PayloadAction<GenderTab>) {
      state.activeGender = action.payload;
      // Switch to first category of the new gender tab
      state.activeCategory =
        action.payload === 'mens' ? MENS_CATEGORIES[0] : WOMENS_CATEGORIES[0];
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCategoryProducts(
      state,
      action: PayloadAction<{ category: CategorySlug; products: Product[] }>,
    ) {
      const { category, products } = action.payload;
      state.cache[category] = { items: products, loadedAt: Date.now() };
      if (state.activeCategory === category) {
        state.loading = false;
        state.error = null;
      }
    },
    setError(
      state,
      action: PayloadAction<{ category: CategorySlug; message: string }>,
    ) {
      if (state.activeCategory !== action.payload.category) return;
      state.error = action.payload.message;
      state.loading = false;
    },
    clearCache(state) {
      state.cache = {};
      state.error = null;
    },
    // ── Detail screen actions ──
    setDetailLoading(state, action: PayloadAction<boolean>) {
      state.detailLoading = action.payload;
    },
    setSelectedProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
      state.detailLoading = false;
      state.detailError = null;
    },
    setDetailError(state, action: PayloadAction<string>) {
      state.detailError = action.payload;
      state.detailLoading = false;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
      state.detailError = null;
      state.detailLoading = true;
    },
  },
});

export const {
  setActiveCategory,
  setActiveGender,
  setLoading,
  setCategoryProducts,
  setError,
  clearCache,
  setDetailLoading,
  setSelectedProduct,
  setDetailError,
  clearSelectedProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
