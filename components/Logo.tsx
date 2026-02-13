import { View, Text, Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>METE</Text>
      <Image
        source={require("../assets/images/daisy.jpg")}
        style={styles.image}
      />
      <Text style={styles.text}>WWW</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    color: "#fff",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
