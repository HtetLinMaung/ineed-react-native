import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { Icon, Fab } from "native-base";
import Tag from "../components/tag/Tag";
import NeedCard from "../components/home/NeedCard";
import Colors from "../constants/colors";
import { needContext } from "../contexts/NeedProvider";
import { appContext } from "../contexts/AppProvider";
import Text from "../components/typography/Text";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Spinner from "../components/spinner/Spinner";
import { useAsyncStorage } from "@react-native-community/async-storage";
import openSocket from "socket.io-client";
import { api, host } from "../constants/api";

const HomeScreen = ({ navigation }) => {
  const { setItem } = useAsyncStorage("user_info");
  const [state, dispatch] = useContext(appContext);
  const [needs, setNeeds] = useContext(needContext);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState(0);

  const loadData = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await fetch(`${api}/needs`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
      },
    }).then((res) => res.json());
    dispatch({ type: "SET_LOADING", payload: false });
    console.log(response);
    if (!response.status && response.message == "jwt expired") {
      logoutHandler();
      return;
    }

    setNeeds(response.data);
  };

  useEffect(() => {
    let initTags = [
      {
        title: "All",
        color: "white",
        active: true,
      },
    ];

    needs.forEach((need) => {
      initTags = [
        ...initTags,
        ...need.tags.map((tag) => ({ ...tag, active: false })),
      ];
    });
    const uniqueInitTags = [];
    for (const tag of initTags) {
      if (
        !uniqueInitTags.length ||
        !uniqueInitTags.map((v) => v.title).includes(tag.title)
      ) {
        uniqueInitTags.push(tag);
      }
    }

    setTags(uniqueInitTags.map((v, i) => ({ ...v, key: ++i + "" })));
  }, [needs]);

  useEffect(() => {
    const socket = openSocket(host);
    socket.on("needs", () => {
      loadData();
    });
    loadData();
  }, []);

  const pressHandler = (index) => {
    setTags((currentState) =>
      currentState.map((v, i) => {
        let active = false;
        if (index == i) {
          active = true;
        }
        return { ...v, active };
      })
    );
    setCurrentTag(index);
  };

  const logoutHandler = async () => {
    await setItem(JSON.stringify({}));

    dispatch({ type: "RESET", payload: "" });
  };

  const tagItem = ({ item, index }) => (
    <Tag
      title={item.title}
      onPress={pressHandler.bind(this, index)}
      color={item.color}
      active={item.active}
    />
  );

  const needItem = ({ item }) => <NeedCard item={item} />;

  const ImageComponent = () =>
    !state.profileImage ? (
      <Image
        style={styles.avatar}
        source={require("../assets/images/avatar-placeholder.webp")}
      />
    ) : (
      <Image
        style={styles.avatar}
        source={{
          uri: state.profileImage,
          width: 22,
          height: 22,
        }}
      />
    );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Icon name="ios-menu" style={styles.icon} />
        <Menu>
          <MenuTrigger>
            <ImageComponent />
          </MenuTrigger>
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption onSelect={() => navigation.navigate("EditProfile")}>
              <Text>Edit Profile</Text>
            </MenuOption>
            <MenuOption onSelect={logoutHandler}>
              <Text>Logout</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.tagContainer}>
        <FlatList
          horizontal
          data={tags}
          showsHorizontalScrollIndicator={false}
          renderItem={tagItem}
        />
      </View>

      <FlatList
        style={styles.cardContainer}
        data={[
          ...(!currentTag
            ? needs
            : needs.filter((need) =>
                need.tags
                  .map((tag) => tag.title)
                  .includes(tags[currentTag].title)
              )),
        ].reverse()}
        renderItem={needItem}
        keyExtractor={(item) => item._id}
      />
      <Fab
        style={styles.fab}
        position="bottomRight"
        onPress={() => navigation.navigate("CreateNeed")}
      >
        <Icon name="add" />
      </Fab>
      <Spinner />
    </View>
  );
};

const paddingHorizontal = 20;
const size = 22;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 35,
  },
  tagContainer: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
  cardContainer: {
    paddingHorizontal,
  },
  fab: {
    backgroundColor: Colors.fab,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  avatar: {
    width: size,
    height: size,
    borderRadius: size / 2,
  },
  icon: {
    color: Colors.label,
    fontSize: 22,
  },
});

const optionsStyles = {
  optionsContainer: {
    padding: 5,
    borderRadius: 15,
    width: 100,
  },
};

export default HomeScreen;
