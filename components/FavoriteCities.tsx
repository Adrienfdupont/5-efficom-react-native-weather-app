import { View, Text, Pressable, StyleSheet } from "react-native";

interface FavoriteCitiesProps {
  favorites: string[];
  onCityPress: (city: string) => void;
}

export default function FavoriteCities({
  favorites,
  onCityPress,
}: FavoriteCitiesProps) {
  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No favorite cities yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {favorites.map((city, index) => (
        <Pressable key={index} onPress={() => onCityPress(city)}>
          <Text style={styles.cityText}>{city}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  cityText: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.5,
  },
});
