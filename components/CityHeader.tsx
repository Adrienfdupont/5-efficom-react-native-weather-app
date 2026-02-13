import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CityHeaderProps {
  city: string | null;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function CityHeader({
  city,
  isFavorite,
  onToggleFavorite,
}: CityHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.cityText}>{city}</Text>
        <TouchableOpacity onPress={onToggleFavorite}>
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={32}
            color={isFavorite ? "#FFD700" : "#fff"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cityText: {
    fontSize: 32,
    color: "#fff",
  },
});
