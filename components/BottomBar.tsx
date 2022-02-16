import { ReactNode, useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { Scheme } from "../utils/color";

type BottomBarProps = {
  setActiveTab: CallableFunction;
  activeTab: string;
};

export default function BottomBar(props: BottomBarProps) {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    setActiveTab(props.activeTab);
  }, [props.activeTab]);

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

  const TabItem = ({ name, children }: TabItemProps) => {
    return (
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => props.setActiveTab(name)}
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
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: "row",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0.9,
    backgroundColor: Scheme.gray,
    borderRadius: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
  },
});
