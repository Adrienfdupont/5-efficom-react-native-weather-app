import { View, StyleSheet } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useLocalSearchParams } from "expo-router";
import CityHeader from "../../components/CityHeader";
import WeatherDisplay from "../../components/WeatherDisplay";
import { isCityFavorite, toggleFavoriteCity } from "../../utils/favorites";

export default function TabTwoScreen() {
  const params = useLocalSearchParams<{ city: string }>();
  const city = Array.isArray(params.city) ? params.city[0] : params.city;
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const checkIfFavorite = useCallback(async () => {
    if (city) {
      const favorite = await isCityFavorite(city);
      setIsFavorite(favorite);
    }
  }, [city]);

  const searchWeather = useCallback(async () => {
    if (!city) return;

    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=86b213e747384342a67150923263001&q=${city}&days=7`,
    );
    const data = await res.json();
    setWeatherData(data);
  }, [city]);

  useEffect(() => {
    searchWeather();
    checkIfFavorite();
  }, [searchWeather, checkIfFavorite]);

  const handleToggleFavorite = async () => {
    if (city) {
      const newFavoriteState = await toggleFavoriteCity(city);
      setIsFavorite(newFavoriteState);
    }
  };

  return (
    <View style={styles.container}>
      <CityHeader
        city={city}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />

      <WeatherDisplay data={weatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#2596be",
  },
});
