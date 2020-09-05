import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from "react-native";
import { Button, CheckBox } from "native-base";
import Text from "../components/typography/Text";
import Colors from "../constants/colors";
import Spinner from "../components/spinner/Spinner";
import { host } from "../constants/api";
import { appContext } from "../contexts/AppProvider";
import TextInput from "../components/form/TextInput";
import { useAsyncStorage } from "@react-native-community/async-storage";

const LoginScreen = ({ navigation }) => {
  const { setItem } = useAsyncStorage("user_info");
  const { setItem: setRemember, getItem: getRemember } = useAsyncStorage(
    "remember_me"
  );
  const [state, dispatch] = useContext(appContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmail, setIsEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    (async () => {
      const remember_me_json = await getRemember();
      if (remember_me_json) {
        const remember_me = JSON.parse(remember_me_json);
        setEmail(remember_me.email);
        setPassword(remember_me.password);
      }
    })();
  }, []);

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

  const loginHandler = async () => {
    try {
      if (email && password) {
        dispatch({ type: "TOGGLE_LOADING" });
        const response = await fetch(`${host}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        dispatch({ type: "TOGGLE_LOADING" });
        console.log(response);
        if (!response.status) {
          Alert.alert(response.message);
          return;
        }
        if (rememberMe) {
          await setRemember(
            JSON.stringify({
              email,
              password,
            })
          );
        }
        const { token, profileImage, username, id } = response;
        dispatch({
          type: "PROFILE_IMAGE",
          payload: profileImage
            ? `https://hlm-ineed.herokuapp.com/${profileImage}`
            : "",
        });
        dispatch({ type: "USERNAME", payload: username });
        dispatch({ type: "TOKEN", payload: token });
        dispatch({ type: "USER_ID", payload: id });
        setItem(
          JSON.stringify({
            profileImage: profileImage
              ? `https://hlm-ineed.herokuapp.com/${profileImage}`
              : "",
            username,
            token,
            userId: id,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          <View style={styles.rememberContainer}>
            <CheckBox
              checked={rememberMe}
              onPress={() => setRememberMe((state) => !state)}
              color={Colors.label}
              style={styles.checkbox}
            />
            <Text style={styles.rememberMe}>Remember me</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              disabled={!email || !password || state.loading}
              rounded
              block
              style={styles.loginBtn}
              onPress={loginHandler}
            >
              <Text style={styles.btnText}>Login</Text>
            </Button>
            <Button
              rounded
              block
              bordered
              style={styles.signupBtn}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.btnTextSignup}>SignUp</Text>
            </Button>
          </View>

          <Text style={styles.forgetPassword}>Forget Password?</Text>
        </View>
        <Spinner />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "stretch",
    justifyContent: "center",
  },
  rememberMe: {
    fontSize: 12,
    paddingLeft: 20,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  header: {
    fontSize: 35,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    paddingLeft: 5,
  },
  loginBtn: {
    marginVertical: 10,
    backgroundColor: Colors.label,
    width: "40%",
  },
  btnText: {
    fontSize: 15,
    color: "#fff",
  },
  signupBtn: {
    marginVertical: 10,
    borderColor: Colors.label,
    width: "40%",
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
    paddingHorizontal: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  forgetPassword: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
  checkbox: {
    transform: [
      {
        scale: 0.95,
      },
    ],
  },
});

export default LoginScreen;
