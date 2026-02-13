import { View, TextInput, Pressable, Image, StyleSheet } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
      <Pressable style={styles.button}>
        <Image
          source={require("../assets/icons/search.png")}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: 300,
    color: "#fff",
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
