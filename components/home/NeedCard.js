import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Text from "../typography/Text";
import Tag from "../tag/Tag";
import PropTypes from "prop-types";
import moment from "moment";
import Colors from "../../constants/colors";

const NeedCard = ({ item }) => {
  const TagList = () =>
    item.tags.map((tag, i) => (
      <Tag active style={styles.tag} {...tag} key={i} />
    ));

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image
          style={styles.avatar}
          source={require("../../assets/images/avatar.jpg")}
        />
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.createDate}>
          {moment(item.createdAt).format("DD.MM.YYYY")}
        </Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.tagContainer}>
          <TagList />
        </View>
        <Text style={styles.header} bold>
          {item.header}
        </Text>
        <Text>{item.body}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={{ ...styles.status, color: Colors.Status[item.status] }}>
          {item.status}
        </Text>
      </View>
    </View>
  );
};

const size = 30;
const styles = StyleSheet.create({
  avatar: {
    width: size,
    height: size,
    borderRadius: size / 2,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    height: 250,
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
    borderBottomColor: Colors.underlined,
    borderBottomWidth: 2,
  },
  cardBody: {
    height: 160,
    overflow: "hidden",
  },
  cardFooter: {},
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  tag: {
    paddingHorizontal: 0,
  },
  username: {
    paddingHorizontal: 7,
  },
  createDate: {
    flex: 1,
    textAlign: "right",
  },
  status: {
    fontSize: 14,
  },
});

NeedCard.propTypes = {
  item: PropTypes.object,
};

export default NeedCard;
