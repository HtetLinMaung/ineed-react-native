import React, { Fragment } from "react";
import AppProvider from "./contexts/AppProvider";
import NeedProvider from "./contexts/NeedProvider";
import { StyleSheet } from "react-native";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import Navigator from "./components/Navigator";
import { Ionicons } from "@expo/vector-icons";
import { MenuProvider } from "react-native-popup-menu";

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
    <AppProvider>
      <NeedProvider>
        <MenuProvider>
          <Navigator />
        </MenuProvider>
      </NeedProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
