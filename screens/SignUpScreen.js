import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../components/typography/Text";

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Sign up screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUpScreen;
