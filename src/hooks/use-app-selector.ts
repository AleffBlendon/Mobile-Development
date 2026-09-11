import { useSelector, type TypedUseSelectorHook } from 'react-redux';

import { RootState } from '@/store';

/**
 * Typed selector hook — use this instead of plain useSelector()
 * to get full type inference from the Redux store.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
