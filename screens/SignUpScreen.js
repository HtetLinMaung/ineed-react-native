import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Item, Input, Button } from "native-base";
import Text from "../components/typography/Text";
import Colors from "../constants/colors";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const [isConfirm, setIsConfirm] = useState("");

  const emailChangeHandler = (text) => {
    setIsEmail(true);
    if (!text) {
      setIsEmail(false);
    }
    setEmail(text);
  };

  const passwordChangeHandler = (text) => {
    setIsPassword(true);
    if (!text) {
      setIsPassword(false);
    }
    setPassword(text);
  };

  const confirmChangeHandler = () => {
    setIsConfirm(true);
    if (!text) {
      setIsConfirm(false);
    }
    setConfirm(text);
  };

  const signupHandler = () => {
    navigation.navigate("BasicInfo");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/images/join.png")}
        />
        <Text bold style={styles.header}>
          Sign Up
        </Text>
        <Text style={styles.label}>Email</Text>
        <Item
          regular
          style={[
            styles.inputContainer,
            { borderColor: !isEmail ? "red" : Colors.label },
          ]}
        >
          <Input
            style={styles.input}
            value={email}
            onChangeText={emailChangeHandler}
          />
        </Item>
        <Text style={styles.label}>Password</Text>
        <Item
          regular
          style={[
            styles.inputContainer,
            { borderColor: !isPassword ? "red" : Colors.label },
          ]}
        >
          <Input
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={passwordChangeHandler}
          />
        </Item>
        <Text style={styles.label}>Confirm Password</Text>
        <Item
          regular
          style={[
            styles.inputContainer,
            { borderColor: !isConfirm ? "red" : Colors.label },
          ]}
        >
          <Input
            secureTextEntry
            style={styles.input}
            value={confirm}
            onChangeText={confirmChangeHandler}
          />
        </Item>
        <View style={styles.btnContainer}>
          <Button
            disabled={!email || !password || password != confirm}
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
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  inputContainer: {
    borderRadius: 15,
    height: 40,
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
  },
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
