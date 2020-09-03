import React, { createContext, useReducer } from "react";
import { useAsyncStorage } from "@react-native-community/async-storage";

export const appContext = createContext(null);

const initialState = {
  loading: false,
  token: null,
  profileImage: "",
  username: "",
};

const AppProvider = ({ children }) => {
  const { setItem } = useAsyncStorage("token");
  const reducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_LOADING":
        return { ...state, loading: !state.loading };
      case "TOKEN":
        (async () => {
          try {
            await setItem(action.payload);
          } catch (err) {
            console.log(err);
          }
        })();
        return { ...state, token: action.payload };
      case "PROFILE_IMAGE":
        return { ...state, profileImage: action.payload };
      case "USERNAME":
        return { ...state, username: action.payload };
      default:
        throw new Error();
    }
  };
  const value = useReducer(reducer, initialState);

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
