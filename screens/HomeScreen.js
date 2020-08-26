import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Icon, Fab } from "native-base";
import Tag from "../components/tag/Tag";
import NeedCard from "../components/home/NeedCard";
import Colors from "../constants/colors";
import { needContext } from "../contexts/NeedProvider";

const initTags = [
  {
    title: "All",
    color: "white",
    active: true,
  },
  {
    title: "Office",
    color: Colors.purple,
    active: false,
  },
].map((v, i) => ({ ...v, key: ++i }));

const HomeScreen = ({ navigation }) => {
  const [needs] = useContext(needContext);
  const [tags, setTags] = useState(initTags);
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

    setTags(uniqueInitTags.map((v, i) => ({ ...v, key: (++i).toString() })));
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
});

export default HomeScreen;
