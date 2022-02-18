import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  StatusBar as StatusBarComponent,
  useColorScheme,
} from "react-native";
import BottomBar from "./components/BottomBar";
import ViewContainer from "./components/ViewContainer";
import Home from "./views/Home";
import Done from "./views/Done";
import { StatusBar } from "expo-status-bar";
import { Scheme } from "./utils/color";

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");

  const scheme = useColorScheme();
  console.log(scheme);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Scheme[scheme || "light"] }]}
    >
      <ViewContainer currentName={activeTab}>
        <Home />
        <Done />
      </ViewContainer>
      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <StatusBar style={scheme === "light" ? "dark" : "light"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform.OS === "android" ? StatusBarComponent.currentHeight : 0,
  },
});
