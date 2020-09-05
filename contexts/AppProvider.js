import React, { createContext, useReducer } from "react";

export const appContext = createContext(null);

const initialState = {
  loading: false,
  token: null,
  profileImage: "",
  username: "",
  id: null,
  userId: null,
};

const AppProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_LOADING":
        return { ...state, loading: !state.loading };
      case "TOKEN":
        return { ...state, token: action.payload };
      case "PROFILE_IMAGE":
        return { ...state, profileImage: action.payload };
      case "USERNAME":
        return { ...state, username: action.payload };
      case "ID":
        return { ...state, id: action.payload };
      case "USER_ID":
        return { ...state, userId: action.payload };
      case "RESET":
        return { ...state, ...initialState };
      default:
        throw new Error();
    }
  };
  const value = useReducer(reducer, initialState);

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
