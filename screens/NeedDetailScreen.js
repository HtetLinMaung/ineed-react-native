import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { Icon } from "native-base";
import Text from "../components/typography/Text";
import Tag from "../components/tag/Tag";
import Colors from "../constants/colors";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { appContext } from "../contexts/AppProvider";
import { host } from "../constants/api";
import Spinner from "../components/spinner/Spinner";
import moment from "moment";

const NeedDetailScreen = ({ navigation }) => {
  const [state, dispatch] = useContext(appContext);
  const [date, setDate] = useState();
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      dispatch({ type: "TOGGLE_LOADING" });
      const response = await fetch(`${host}/needs/${state.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      }).then((res) => res.json());
      dispatch({ type: "TOGGLE_LOADING" });
      console.log(response);
      const { createdAt, body, header, tags, user } = response.data;
      setDate(createdAt);
      setBody(body);
      setHeader(header);
      setTags(tags);
      setUser(user);
    })();
  }, []);

  const editHandler = () => {
    navigation.navigate("EditNeed");
  };

  const deleteHandler = () => {
    Alert.alert(
      "Are you sure?",
      "This will delete permenantly from Database!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              dispatch({ type: "TOGGLE_LOADING" });
              await fetch(`${host}/needs/${state.id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${state.token}`,
                },
              });
              dispatch({ type: "TOGGLE_LOADING" });
              navigation.navigate("Home");
            } catch (err) {
              console.log(err);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const MenuComponent = () =>
    user && user._id == state.userId ? (
      <Menu>
        <MenuTrigger>
          <Icon name="ios-more" style={styles.icon} />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption onSelect={editHandler}>
            <Text>Edit</Text>
          </MenuOption>
          <MenuOption onSelect={deleteHandler}>
            <Text>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    ) : null;

  const ImageComponent = () =>
    user ? (
      user.profileImage ? (
        <Image
          style={styles.avatar}
          source={{
            uri: `https://hlm-ineed.herokuapp.com/${user.profileImage}`,
            width: 30,
            height: 30,
          }}
        />
      ) : (
        <Image
          style={styles.avatar}
          source={require("../assets/images/avatar-placeholder.webp")}
        />
      )
    ) : null;

  const TagList = () =>
    tags.map((tag, i) => (
      <Tag key={i} title={tag.title} color={tag.color} active />
    ));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          {date ? moment(date).format("MMMM DD, YYYY") : ""}
        </Text>
        <MenuComponent />
      </View>
      <Text style={styles.header}>{header}</Text>
      <View style={styles.tagContainer}>
        <TagList />
      </View>
      <View style={styles.profileContainer}>
        <ImageComponent />
        <Text style={styles.username}>{user && user.username}</Text>
      </View>
      <Text style={styles.body}>{body}</Text>
      <Spinner style={styles.spinner} />
    </ScrollView>
  );
};

const optionsStyles = {
  spinner: {},
  optionsContainer: {
    padding: 5,
    borderRadius: 15,
    width: 100,
  },
};

const size = 30;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 35,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
  },
  date: {
    fontSize: 20,
  },
  body: {
    marginVertical: 20,
    fontSize: 16,
    marginBottom: 500,
  },
  tagContainer: {
    flexDirection: "row",
  },
  dateContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 20,
    color: Colors.label,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 20,
    marginLeft: 6,
  },
  username: {
    paddingHorizontal: 7,
  },
  avatar: {
    width: size,
    height: size,
    borderRadius: size / 2,
  },
});

export default NeedDetailScreen;
