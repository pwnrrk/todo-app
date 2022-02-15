import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { Scheme } from "../utils/color";

export default function Input(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      style={{ ...styles.input, ...(props.style as Object) }}
      placeholderTextColor="#717171"
      selectionColor={Scheme.blue}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: Scheme.lightGray,
    height: 40,
    color: Scheme.light,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0.8,
  },
});
