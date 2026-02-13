import { View, Text, Pressable, StyleSheet } from "react-native";

interface CityListProps {
  cities: string[];
  onCityPress: (city: string) => void;
}

export default function CityList({ cities, onCityPress }: CityListProps) {
  if (cities.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {cities.map((city, index) => (
          <Pressable key={index} onPress={() => onCityPress(city)}>
            <Text style={styles.cityText}>{city}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 340,
  },
  listContainer: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
  },
  cityText: {
    fontSize: 20,
    color: "#fff",
  },
});
