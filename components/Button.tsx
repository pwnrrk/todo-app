import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Scheme } from "../utils/color";

export default function Button(props: TouchableOpacityProps) {
  return (
    <View style={{ ...styles.button, ...(props.style as Object) }}>
      <TouchableOpacity
        {...props}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",

          paddingVertical: 12,
          paddingHorizontal: 18,
        }}
      >
        {props.children}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Scheme.blue,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0.8,
  },
});
