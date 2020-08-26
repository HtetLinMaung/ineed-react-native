import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../components/typography/Text";

const CreateNeedScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Create Need Screen</Text>
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

export default CreateNeedScreen;
