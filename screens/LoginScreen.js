import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { Item, Input, Button } from "native-base";
import Text from "../components/typography/Text";
import Colors from "../constants/colors";

const LoginScreen = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header} bold>
          Login
        </Text>

        <Image
          style={styles.image}
          source={require("../assets/images/sign_in.png")}
        />
        <View style={styles.formContainer}>
          <Text style={styles.label}>Username</Text>
          <Item regular style={styles.inputContainer}>
            <Input style={styles.input} />
          </Item>
          <Text style={styles.label}>Password</Text>
          <Item regular style={styles.inputContainer}>
            <Input style={styles.input} />
          </Item>
          <Button transparent>
            <Text style={{ ...styles.label, fontSize: 12 }}>
              Forget Password?
            </Text>
          </Button>
          <Button rounded block style={styles.loginBtn}>
            <Text style={styles.btnText}>Login</Text>
          </Button>
          <Button rounded block bordered style={styles.signupBtn}>
            <Text style={styles.btnTextSignup}>SignUp</Text>
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
    // paddingTop: 30,
    // paddingHorizontal: 20,
    // justifyContent: "center",
    alignItems: "stretch",
  },
  header: {
    fontSize: 35,
    color: Colors.label,
    textAlign: "center",
    marginBottom: 20,
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
    fontSize: 14,
    marginBottom: 6,
    paddingLeft: 5,
    color: Colors.label,
  },
  loginBtn: {
    marginVertical: 10,
    backgroundColor: Colors.pink,
  },
  btnText: {
    fontSize: 15,
    color: "#fff",
  },
  signupBtn: {
    marginVertical: 10,
    borderColor: Colors.label,
  },
  btnTextSignup: {
    fontSize: 15,
    color: Colors.label,
  },
  image: {
    width: "100%",
    height: 300,
  },
  formContainer: {
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
