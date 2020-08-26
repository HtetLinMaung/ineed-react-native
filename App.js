import React from "react";
import NeedProvider from "./contexts/NeedProvider";
import { StyleSheet } from "react-native";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import Navigator from "./components/Navigator";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NeedProvider>
      <Navigator />
    </NeedProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
