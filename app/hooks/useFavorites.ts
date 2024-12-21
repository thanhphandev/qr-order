import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const FAVORITES_COOKIE_KEY = 'favorite_items';

export function useFavorites() {
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);

  useEffect(() => {
    // Fetch initial favorites from cookies when the component mounts
    const favorites = Cookies.get(FAVORITES_COOKIE_KEY) || '[]';
    try {
      setFavoriteItems(JSON.parse(favorites));
    } catch (error) {
      console.error('Error parsing favorite items from cookie:', error);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Save favorites to cookie
  const saveFavoritesToCookie = (favorites: string[]) => {
    
    Cookies.set(FAVORITES_COOKIE_KEY, JSON.stringify(favorites), { expires: 7 });
  };

  const addFavorite = (itemId: string) => {
    if (!favoriteItems.includes(itemId)) {
      const updatedFavorites = [...favoriteItems, itemId];
      setFavoriteItems(updatedFavorites);
      saveFavoritesToCookie(updatedFavorites);
    }
  };

  const removeFavorite = (itemId: string) => {
    if (favoriteItems.includes(itemId)) {
      const updatedFavorites = favoriteItems.filter((id) => id !== itemId);
      setFavoriteItems(updatedFavorites);
      saveFavoritesToCookie(updatedFavorites);
    }
  };

  const toggleFavorite = (itemId: string) => {
    if (favoriteItems.includes(itemId)) {
      removeFavorite(itemId);
    } else {
      addFavorite(itemId)
    }
  };

  const isFavorite = (itemId: string) => favoriteItems.includes(itemId);

  return {
    favoriteItems,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}
