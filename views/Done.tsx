import { View, StyleSheet } from "react-native";
import Text from "../components/Text";

export default function Done() {
  return (
    <View style={styles.container}>
      <Text>Done</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
