import { useState } from "react";
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  StatusBar as StatusBarComponent,
} from "react-native";
import BottomBar from "./components/BottomBar";
import ViewContainer from "./components/ViewContainer";
import Home from "./views/Home";
import Done from "./views/Done";
import { StatusBar } from "expo-status-bar";
import { Scheme } from "./utils/color";

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = {
    Home,
    Done,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ViewContainer components={tabs} currentName={activeTab} />
      <BottomBar setActiveTab={setActiveTab} />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Scheme.dark,
    paddingTop:
      Platform.OS === "android" ? StatusBarComponent.currentHeight : 0,
  },
});
