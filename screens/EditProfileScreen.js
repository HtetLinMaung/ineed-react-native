import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button } from "native-base";
import Text from "../components/typography/Text";
import Colors from "../constants/colors";
import TextInput from "../components/form/TextInput";
import { appContext } from "../contexts/AppProvider";
import { host } from "../constants/api";
import Spinner from "../components/spinner/Spinner";

const EditProfileScreen = ({ navigation }) => {
  const [state, dispatch] = useContext(appContext);
  const [filename, setFilename] = useState("");
  const [type, setType] = useState("");

  const pickImage = async () => {
    try {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        setFilename(result.uri.split("/").pop());
        const match = /\.(\w+)$/.exec(result.uri.split("/").pop());
        setType(match ? `image/${match[1]}` : `image`);
        dispatch({ type: "PROFILE_IMAGE", payload: result.uri });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const usernameChangeHandler = (text) => {
    dispatch({ type: "USERNAME", payload: text });
  };

  const updateHandler = async () => {
    try {
      const formData = new FormData();
      const profileImage = {
        uri: state.profileImage,
        type,
        name: filename,
      };
      formData.append("profileImage", profileImage);
      formData.append("username", state.username);
      dispatch({ type: "TOGGLE_LOADING" });
      const response = await fetch(`${host}/auth/edit-profile`, {
        method: "PUT",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${state.token}`,
        },
      }).then((res) => res.json());
      dispatch({ type: "TOGGLE_LOADING" });
      console.log(response);
      if (!response.status) {
        Alert.alert(response.message);
      }
      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
    }
  };

  const ImageComponent = () =>
    !state.profileImage ? (
      <Image
        style={styles.avatar}
        source={require("../assets/images/avatar-placeholder.webp")}
      />
    ) : (
      <Image style={styles.avatar} source={{ uri: state.profileImage }} />
    );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text bold style={styles.header}>
          Profile
        </Text>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={pickImage}>
            <ImageComponent />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>
          Enter the Username associated with your account
        </Text>

        <TextInput
          placeholder="Enter your name"
          value={state.username}
          onChangeText={usernameChangeHandler}
        />

        <View style={styles.btnContainer}>
          <Button
            rounded
            block
            style={styles.continueBtn}
            onPress={updateHandler}
          >
            <Text style={styles.btnText}>Update</Text>
          </Button>
        </View>
        <Spinner />
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
  label: {
    fontSize: 22,
    marginBottom: 6,
    paddingLeft: 5,
    textAlign: "center",
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

export default EditProfileScreen;
