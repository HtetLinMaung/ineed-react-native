import React from "react";
import { StyleSheet, View } from "react-native";
import { Item, Input } from "native-base";
import Colors from "../../constants/colors";
import PropTypes from "prop-types";
import Text from "../typography/Text";

const TextInput = (props) => {
  const ErrorText = () =>
    !props.state ? (
      <Text style={styles.errorLabel}>{props.errorLabel}</Text>
    ) : null;

  return (
    <View
      style={[
        styles.wrapper,
        props.wrapperStyle,
        { marginBottom: !props.state ? 0 : 20 },
      ]}
    >
      <Item
        regular
        style={[
          styles.inputContainer,
          { borderColor: !props.state ? "red" : Colors.label },
        ]}
      >
        <Input {...props} style={styles.input} />
      </Item>
      <ErrorText />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: "Poppins",
    fontSize: 13,
  },
  inputContainer: {
    borderRadius: 15,
    height: 40,
  },
  errorLabel: {
    color: "red",
    paddingHorizontal: 10,
    marginTop: 5,
  },
  wrapper: {},
});

TextInput.propTypes = {
  state: PropTypes.bool,
  errorLabel: PropTypes.string,
  wrapperStyle: PropTypes.object,
};

TextInput.defaultProps = {
  state: true,
};

export default TextInput;
