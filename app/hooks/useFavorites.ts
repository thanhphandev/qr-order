import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface FavoritesState {
  favoriteItems: string[];
  addFavorite: (itemId: string) => void;
  removeFavorite: (itemId: string) => void;
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteItems: [],

      addFavorite: (itemId) => {
        const { favoriteItems } = get();
        if (!favoriteItems.includes(itemId)) {
          const updatedFavorites = [...favoriteItems, itemId];
          set({ favoriteItems: updatedFavorites });
        }
      },

      removeFavorite: (itemId) => {
        const { favoriteItems } = get();
        if (favoriteItems.includes(itemId)) {
          const updatedFavorites = favoriteItems.filter((id) => id !== itemId);
          set({ favoriteItems: updatedFavorites });
        }
      },

      toggleFavorite: (itemId) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(itemId)) {
          removeFavorite(itemId);
        } else {
          addFavorite(itemId);
        }
      },

      isFavorite: (itemId) => {
        const { favoriteItems } = get();
        return favoriteItems.includes(itemId);
      },
    }),
    {
      name: 'favorites-storage', // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage as the storage
    }
  )
);

export default useFavoritesStore;