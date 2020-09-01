import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
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

const EditProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);

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
        setImage(result.uri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateHandler = () => {
    navigation.navigate("Home");
  };

  const ImageComponent = () =>
    !image ? (
      <Image
        style={styles.avatar}
        source={require("../assets/images/avatar-placeholder.webp")}
      />
    ) : (
      <Image style={styles.avatar} source={{ uri: image }} />
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

        <Item regular style={styles.inputContainer}>
          <Input style={styles.input} placeholder="Enter your name" />
        </Item>

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
