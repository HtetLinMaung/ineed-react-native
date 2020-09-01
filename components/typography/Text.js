import React from "react";
import { Text as TextNative } from "native-base";
import PropTypes from "prop-types";
import Colors from "../../constants/colors";

const Text = (props) => {
  return (
    <TextNative
      {...props}
      style={{
        fontFamily: props.bold ? "Poppins-SemiBold" : "Poppins",
        fontSize: 12,
        color: Colors.label,
        ...props.style,
      }}
    ></TextNative>
  );
};

Text.propTypes = {
  bold: PropTypes.bool,
};

export default Text;
