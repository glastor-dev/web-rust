'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
}

interface WishlistState {
  items: WishlistItem[];
  toggleItem: (id: string) => void;
  hasItem: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (id) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === id);
          if (exists) {
            return { items: state.items.filter((i) => i.id !== id) };
          }
          return { items: [...state.items, { id }] };
        }),
      hasItem: (id) => get().items.some((i) => i.id === id),
    }),
    {
      name: 'glastor-wishlist-storage',
    },
  ),
);
