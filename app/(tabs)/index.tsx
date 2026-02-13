import { View, StyleSheet } from "react-native";
import { useRef, useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import Logo from "../../components/Logo";
import SearchBar from "../../components/SearchBar";
import CityList from "../../components/CityList";
import FavoriteCities from "../../components/FavoriteCities";
import { getFavoriteCities } from "../../utils/favorites";

export default function HomeScreen() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const loadFavoriteCities = async () => {
    const favorites = await getFavoriteCities();
    setFavoriteCities(favorites);
  };

  useFocusEffect(
    useCallback(() => {
      loadFavoriteCities();
    }, []),
  );

  const searchCities = async () => {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`,
    );
    const data = await res.json();
    if (data.results) {
      setCities(data.results.map((result: any) => result.name));
    } else {
      setCities([]);
    }
  };

  const handleInput = () => {
    if (city.length) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(searchCities, 500);
    } else {
      setCities([]);
    }
  };

  const handleCityPress = (selectedCity: string) => {
    setCity("");
    setCities([]);
    router.push(`/(tabs)/explore?city=${encodeURIComponent(selectedCity)}`);
  };

  const handleSearchBarChange = (text: string) => {
    setCity(text);
    handleInput();
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Logo />
      </View>

      <View style={styles.section}>
        <SearchBar value={city} onChangeText={handleSearchBarChange} />
        <CityList cities={cities} onCityPress={handleCityPress} />
      </View>

      <View style={styles.section}>
        <FavoriteCities
          favorites={favoriteCities}
          onCityPress={handleCityPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#2596be",
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
