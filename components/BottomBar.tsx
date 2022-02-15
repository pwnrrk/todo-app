import { ReactNode, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { Scheme } from "../utils/color";

type BottomBarProps = {
  setActiveTab: CallableFunction;
};

export default function BottomBar(props: BottomBarProps) {
  const [activeTab, setActiveTab] = useState("Home");

  type TabIconProps = {
    name: string;
    icon: string;
  };

  const TabIcon = ({ name, icon }: TabIconProps) => {
    return (
      <AntDesignIcons
        name={icon}
        size={28}
        color={name === activeTab ? Scheme.blue : Scheme.light}
      />
    );
  };

  type TabItemProps = {
    name: string;
    children?: ReactNode;
  };

  const tabChangeHandler = (name: string) => {
    setActiveTab(name);
    props.setActiveTab(name);
  };

  const TabItem = ({ name, children }: TabItemProps) => {
    return (
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => tabChangeHandler(name)}
      >
        {children}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.bottomBarContainer}>
      <TabItem name="Home">
        <TabIcon name="Home" icon="home" />
      </TabItem>
      <TabItem name="Done">
        <TabIcon name="Done" icon="check" />
      </TabItem>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0.9,
    backgroundColor: Scheme.gray,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 18,
  },
});
