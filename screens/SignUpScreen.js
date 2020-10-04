import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Button } from "native-base";
import Text from "../components/typography/Text";
import Colors from "../constants/colors";
import TextInput from "../components/form/TextInput";
import { api } from "../constants/api";
import { appContext } from "../contexts/AppProvider";
import Spinner from "../components/spinner/Spinner";

const SignUpScreen = ({ navigation }) => {
  const [state, dispatch] = useContext(appContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isEmail, setIsEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirm, setIsConfirm] = useState(true);
  const [confirmErrLabel, setConfirmErrLabel] = useState("");

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

  const confirmChangeHandler = (text) => {
    setIsConfirm(true);
    if (text != password) {
      setIsConfirm(false);
      setConfirmErrLabel("Password does not match!");
    }
    setConfirm(text);
  };

  const signupHandler = async () => {
    try {
      if (email && password && password == confirm) {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await fetch(`${api}/auth/signup`, {
          method: "PUT",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        dispatch({ type: "SET_LOADING", payload: false });
        console.log(response);
        if (!response.status) {
          Alert.alert(response.message);
          return;
        }

        dispatch({ type: "TOKEN", payload: response.token });
        // TODO => save token to async storage
        navigation.navigate("BasicInfo");
      }
    } catch (err) {
      console.log(err);
    }
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
        <TextInput
          state={isEmail}
          value={email}
          onChangeText={emailChangeHandler}
          errorLabel="Email must not be empty!"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry
          state={isPassword}
          value={password}
          onChangeText={passwordChangeHandler}
          errorLabel="Password must not be empty!"
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          secureTextEntry
          state={isConfirm}
          value={confirm}
          onChangeText={confirmChangeHandler}
          errorLabel={confirmErrLabel}
        />
        <View style={styles.btnContainer}>
          <Button
            disabled={
              !email || !password || password != confirm || state.loading
            }
            rounded
            block
            style={styles.signupBtn}
            onPress={signupHandler}
          >
            <Text style={styles.btnText}>Sign Up</Text>
          </Button>
        </View>
        <Spinner style={styles.spinner} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  spinner: {
    left: "50%",
  },
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
