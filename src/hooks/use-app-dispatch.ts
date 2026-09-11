import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store';

/**
 * Typed dispatch hook — use this instead of plain useDispatch()
 * to get correct types for all slice actions.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
