import { Text as ReactText, TextProps } from "react-native";
import { Scheme } from "../utils/color";

export default function Text(props: TextProps) {
  return (
    <ReactText
      {...props}
      style={{ color: Scheme.light, ...(props.style as Object) }}
    ></ReactText>
  );
}
