import React, { useContext, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAsyncStorage } from "@react-native-community/async-storage";
import { appContext } from "../contexts/AppProvider";

import routes from "../routes";

const Stack = createStackNavigator();

const Navigator = () => {
  const [state, dispatch] = useContext(appContext);
  const { getItem } = useAsyncStorage("user_info");

  useEffect(() => {
    (async () => {
      try {
        const user_info_json = await getItem();

        if (user_info_json) {
          const { token, profileImage, username } = JSON.parse(user_info_json);
          if (token && !state.token) {
            dispatch({ type: "TOKEN", payload: token });
          }
          if (profileImage && !state.profileImage) {
            dispatch({
              type: "PROFILE_IMAGE",
              payload: profileImage,
            });
          }
          if (username && !state.username) {
            dispatch({ type: "USERNAME", payload: username });
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const screens = routes
    .filter((route) =>
      state.token
        ? !route.name.match(/[Login][Signup]/)
        : route.name.match(/[Login][Signup]/)
    )
    .map((route) => (
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
        <Stack.Navigator initialRouteName={state.token ? "Home" : "Login"}>
          {screens}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigator;
