import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAVORITES_KEY } from "../constants/storage";

export const getFavoriteCities = async (): Promise<string[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error("Error getting favorite cities:", error);
    return [];
  }
};

export const isCityFavorite = async (city: string): Promise<boolean> => {
  try {
    const favorites = await getFavoriteCities();
    return favorites.includes(city);
  } catch (error) {
    console.error("Error checking if city is favorite:", error);
    return false;
  }
};

export const addFavoriteCity = async (city: string): Promise<void> => {
  try {
    const favorites = await getFavoriteCities();
    if (!favorites.includes(city)) {
      favorites.push(city);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error("Error adding favorite city:", error);
  }
};

export const removeFavoriteCity = async (city: string): Promise<void> => {
  try {
    const favorites = await getFavoriteCities();
    const updatedFavorites = favorites.filter((fav) => fav !== city);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Error removing favorite city:", error);
  }
};

export const toggleFavoriteCity = async (city: string): Promise<boolean> => {
  try {
    const favorites = await getFavoriteCities();
    const isFavorite = favorites.includes(city);

    if (isFavorite) {
      await removeFavoriteCity(city);
      return false;
    } else {
      await addFavoriteCity(city);
      return true;
    }
  } catch (error) {
    console.error("Error toggling favorite city:", error);
    return false;
  }
};
