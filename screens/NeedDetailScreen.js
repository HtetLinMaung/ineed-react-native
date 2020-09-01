import React from "react";
import { View, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { Icon } from "native-base";
import Text from "../components/typography/Text";
import Tag from "../components/tag/Tag";
import Colors from "../constants/colors";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const NeedDetailScreen = ({ navigation }) => {
  const deleteHandler = () => {
    Alert.alert(
      "Are you sure?",
      "This will delete permenantly from Database!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Home");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>August 31, 2020</Text>
        <Menu>
          <MenuTrigger>
            <Icon name="ios-more" style={styles.icon} />
          </MenuTrigger>
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption onSelect={() => navigation.navigate("EditNeed")}>
              <Text>Edit</Text>
            </MenuOption>
            <MenuOption onSelect={deleteHandler}>
              <Text>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <Text style={styles.header}>Time management</Text>
      <View style={styles.tagContainer}>
        <Tag title="Trainings" color={Colors.tags[2]} active />
      </View>
      <View style={styles.profileContainer}>
        <Image
          style={styles.avatar}
          source={require("../assets/images/avatar.jpg")}
        />
        <Text style={styles.username}>Htet Lin Maung</Text>
      </View>
      <Text style={styles.body}>
        HR department want to do "Time management" training for colleges. We
        already find some companies that specialize in this way. Below you can
        find a list blah blah blah
      </Text>
    </ScrollView>
  );
};

const optionsStyles = {
  optionsContainer: {
    padding: 5,
    borderRadius: 15,
    width: 100,
  },
};

const size = 30;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 35,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
  },
  date: {
    fontSize: 20,
  },
  body: {
    marginVertical: 20,
    fontSize: 16,
  },
  tagContainer: {
    flexDirection: "row",
  },
  dateContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 20,
    color: Colors.label,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 20,
    marginLeft: 6,
  },
  username: {
    paddingHorizontal: 7,
  },
  avatar: {
    width: size,
    height: size,
    borderRadius: size / 2,
  },
});

export default NeedDetailScreen;
