import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Item, Input, Button } from "native-base";
import Text from "../components/typography/Text";
import Colors from "../constants/colors";

const SignUpScreen = ({ navigation }) => {
  const signupHandler = () => {
    navigation.navigate("Login");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/images/join.png")}
        />
        {/* <View style={styles.avatarContainer}>
          <TouchableOpacity>
            <Image
              style={styles.avatar}
              source={require("../assets/images/avatar-placeholder.webp")}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Username</Text>
        <Item regular style={styles.inputContainer}>
          <Input style={styles.input} />
        </Item> */}
        <Text bold style={styles.header}>
          Sign Up
        </Text>
        <Text style={styles.label}>Email</Text>
        <Item regular style={styles.inputContainer}>
          <Input style={styles.input} />
        </Item>
        <Text style={styles.label}>Password</Text>
        <Item regular style={styles.inputContainer}>
          <Input secureTextEntry style={styles.input} />
        </Item>
        <Text style={styles.label}>Confirm Password</Text>
        <Item regular style={styles.inputContainer}>
          <Input secureTextEntry style={styles.input} />
        </Item>
        <View style={styles.btnContainer}>
          <Button
            rounded
            block
            style={styles.signupBtn}
            onPress={signupHandler}
          >
            <Text style={styles.btnText}>Sign Up</Text>
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const size = 100;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 35,
    color: Colors.label,
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  // avatar: {
  //   width: size,
  //   height: size,
  //   borderRadius: size / 2,
  // },
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
    fontSize: 14,
    marginBottom: 6,
    paddingLeft: 5,
    color: Colors.label,
  },
  // avatarContainer: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   marginBottom: 20,
  // },
  signupBtn: {
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

export default SignUpScreen;
