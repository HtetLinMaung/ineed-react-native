import React, { createContext, useReducer } from "react";

export const appContext = createContext(null);

const initialState = {
  loading: false,
  token: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_LOADING":
      return { ...state, loading: !state.loading };
    case "TOKEN":
      return { ...state, token: action.payload };
    default:
      throw new Error();
  }
}

const AppProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppProvider;
