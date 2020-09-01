import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import Text from "../typography/Text";
import Colors from "../../constants/colors";

const SheetMenuBody = ({ menus }) => {
  const MenuList = () =>
    menus.map((menu) => (
      <TouchableOpacity onPress={menu.onPress} key={menu.icon}>
        <View style={styles.menuContainer}>
          <Icon name={menu.icon} style={styles.icon} />
          <Text style={styles.text}>{menu.text}</Text>
        </View>
      </TouchableOpacity>
    ));

  return (
    <View style={styles.container}>
      <MenuList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 22,
    color: Colors.label,
  },
  text: {
    fontSize: 13,
  },
});

export default SheetMenuBody;
