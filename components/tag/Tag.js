import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Badge } from "native-base";
import PropTypes from "prop-types";
import Text from "../typography/Text";

const Tag = ({ onPress, title, color, active, style }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...style }}
      onPress={onPress}
    >
      <Badge
        style={{
          backgroundColor: color,
          opacity: active ? 1 : 0.7,
        }}
      >
        <Text
          style={{ color: color == "white" ? "black" : "white", fontSize: 12 }}
        >
          {title}
        </Text>
      </Badge>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
});

Tag.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  color: PropTypes.string,
  active: PropTypes.bool,
};

export default Tag;
