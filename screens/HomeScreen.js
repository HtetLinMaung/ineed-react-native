import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { Icon, Fab } from "native-base";
import Tag from "../components/tag/Tag";
import NeedCard from "../components/home/NeedCard";
import Colors from "../constants/colors";
import { needContext } from "../contexts/NeedProvider";

const HomeScreen = ({ navigation }) => {
  const [needs] = useContext(needContext);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState(0);

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

  const tagItem = ({ item, index }) => (
    <Tag
      title={item.title}
      onPress={pressHandler.bind(this, index)}
      color={item.color}
      active={item.active}
    />
  );

  const needItem = ({ item }) => <NeedCard item={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Icon name="ios-menu" style={styles.icon} />
        <Image
          style={styles.avatar}
          source={require("../assets/images/avatar-placeholder.webp")}
        />
      </View>
      <View style={styles.tagContainer}>
        <FlatList horizontal data={tags} renderItem={tagItem} />
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
    </View>
  );
};

const paddingHorizontal = 20;
const size = 30;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 35,
  },
  tagContainer: {
    marginBottom: 10,
    paddingLeft: paddingHorizontal,
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
  },
});

export default HomeScreen;
