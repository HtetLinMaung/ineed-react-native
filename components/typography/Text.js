import React from "react";
import { Text as TextNative } from "native-base";
import PropTypes from "prop-types";

const Text = (props) => {
  return (
    <TextNative
      {...props}
      style={{
        fontFamily: props.bold ? "Poppins-SemiBold" : "Poppins",
        fontSize: 12,
        ...props.style,
      }}
    ></TextNative>
  );
};

Text.propTypes = {
  bold: PropTypes.bool,
};

export default Text;
