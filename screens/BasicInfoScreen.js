import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Image,
  TouchableOpacity,
} from "react-native";
import { Item, Input, Button } from "native-base";
import Text from "../components/typography/Text";
import Colors from "../constants/colors";

const BasicInfoScreen = ({ navigation }) => {
  const continueHandler = () => {
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text bold style={styles.header}>
          Basic Info
        </Text>
        <View style={styles.avatarContainer}>
          <TouchableOpacity>
            <Image
              style={styles.avatar}
              source={require("../assets/images/avatar-placeholder.webp")}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>
          Enter the Username associated with your account
        </Text>

        <Item regular style={styles.inputContainer}>
          <Input style={styles.input} placeholder="Enter your name" />
        </Item>

        <View style={styles.btnContainer}>
          <Button
            rounded
            block
            style={styles.continueBtn}
            onPress={continueHandler}
          >
            <Text style={styles.btnText}>Continue</Text>
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const size = 150;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "white",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingHorizontal: 25,
  },
  inputContainer: {
    borderRadius: 15,
    height: 40,
    borderColor: Colors.label,
    marginBottom: 20,
  },
  input: {
    fontFamily: "Poppins",
    fontSize: 13,
  },
  label: {
    fontSize: 22,
    marginBottom: 6,
    paddingLeft: 5,
    textAlign: "center",
    color: Colors.label,
  },
  avatar: {
    width: size,
    height: size,
    borderRadius: size / 2,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 35,
    color: Colors.label,
    textAlign: "center",
    marginBottom: 10,
  },
  continueBtn: {
    marginVertical: 10,
    backgroundColor: Colors.label,
    width: "60%",
  },
  btnText: {
    fontSize: 15,
    color: "#fff",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default BasicInfoScreen;
