import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Spinner as SpinnerNative } from "native-base";
import Colors from "../../constants/colors";
import { appContext } from "../../contexts/AppProvider";

const Spinner = (props) => {
  const [state] = useContext(appContext);

  return state.loading ? (
    <SpinnerNative
      {...props}
      color={Colors.label}
      style={[styles.spinner, props.style]}
    />
  ) : null;
};

const styles = StyleSheet.create({
  spinner: {
    position: "absolute",
    left: "45%",
    top: "45%",
    transform: [
      {
        scale: 2,
      },
    ],
  },
});

export default Spinner;
