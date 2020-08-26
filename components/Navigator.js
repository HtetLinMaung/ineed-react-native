import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "../routes";

const Stack = createStackNavigator();

const Navigator = () => {
  const screens = routes.map((route) => (
    <Stack.Screen
      key={route.name}
      name={route.name}
      options={route.options}
      component={route.component}
    />
  ));
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">{screens}</Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigator;
