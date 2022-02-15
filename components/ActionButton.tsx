import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Scheme } from "../utils/color";
import AntDesignIcons from "react-native-vector-icons/AntDesign";

export default function ActionButton(props: TouchableOpacityProps) {
  return (
    <View style={styles.actionButton}>
      <TouchableOpacity
        {...props}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <AntDesignIcons name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    position: "absolute",
    bottom: 80,
    right: 5,
    width: 54,
    height: 54,
    borderRadius: 100,
    backgroundColor: Scheme.blue,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0.9,
  },
});
