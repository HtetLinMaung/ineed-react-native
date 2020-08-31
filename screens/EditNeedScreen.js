import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Input, Item, Textarea, Icon, Button, CheckBox } from "native-base";
import Text from "../components/typography/Text";
import Tag from "../components/tag/Tag";
import Colors from "../constants/colors";

const EditNeedScreen = ({ navigation }) => {
  const [isSatisfied, setIsSatisfied] = useState(false);
  const [tagColors, setTagColors] = useState(
    Colors.tags.map((color, i) => ({ color, selected: i > 0 ? false : true }))
  );
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const colorTouchHandler = (i) => {
    setTagColors((currentState) =>
      currentState.map((v, index) => {
        let selected = false;
        if (index == i) {
          selected = true;
        }
        return { ...v, selected };
      })
    );
  };

  const enterHandler = (e) => {
    if (e.nativeEvent.key == "Enter") {
      setTags((currentState) => [
        ...currentState,
        {
          title: tag,
          color: tagColors.find((item) => item.selected).color,
          id: new Date().toISOString(),
        },
      ]);
      setTag("");
    }
  };

  const tagTouchHandler = (id) => {
    setTags((currentState) => currentState.filter((item) => item.id != id));
  };

  const updateHandler = () => {
    navigation.navigate("Home");
  };

  const ColorList = () =>
    tagColors.map((item, i) => (
      <TouchableOpacity
        key={i.toString()}
        onPress={colorTouchHandler.bind(this, i)}
      >
        <View style={{ ...styles.color, backgroundColor: item.color }}>
          {item.selected ? (
            <Icon style={styles.icon} name="ios-checkmark" />
          ) : null}
        </View>
      </TouchableOpacity>
    ));

  const TagList = () =>
    tags.map((tag, i) => (
      <Tag
        key={i.toString()}
        title={tag.title}
        color={tag.color}
        active
        style={styles.tag}
        onPress={tagTouchHandler.bind(this, tag.id)}
      />
    ));

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text bold style={styles.header}>
            Edit Need
          </Text>
          <CheckBox
            checked={isSatisfied}
            onPress={() => setIsSatisfied((state) => !state)}
            color={Colors.label}
            style={styles.checkbox}
          />
        </View>

        <Text style={styles.label}>Title</Text>
        <Item regular style={styles.inputContainer}>
          <Input style={styles.input} />
        </Item>

        <Text style={styles.label}>Need Detail</Text>
        <Textarea style={styles.textarea} rowSpan={5} bordered />

        <Text style={styles.label}>Tags</Text>
        <View style={styles.colorContainer}>
          <ColorList />
        </View>
        <Item regular style={styles.inputContainer}>
          <Input
            style={styles.input}
            value={tag}
            onChangeText={(text) => setTag(text)}
            onKeyPress={enterHandler}
          />
        </Item>
        <View style={styles.tagContainer}>
          <TagList />
        </View>
        <Button block rounded style={styles.button} onPress={updateHandler}>
          <Text style={styles.buttonText}>Update</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const size = 30;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 35,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: 24,
  },
  headerContainer: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 13,
  },
  inputContainer: {
    borderRadius: 15,
    height: 40,
    borderColor: Colors.label,
    marginBottom: 20,
  },
  input: {
    fontFamily: "Poppins",
    fontSize: 13,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    paddingLeft: 5,
  },
  textarea: {
    borderColor: Colors.label,
    borderRadius: 15,
    paddingVertical: 10,
    fontFamily: "Poppins",
    fontSize: 13,
    marginBottom: 20,
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  color: {
    width: size,
    height: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: Colors.label,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden",
    height: 200,
  },
  tag: {
    marginVertical: 5,
  },
  button: {
    backgroundColor: Colors.pink,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
  },
  checkbox: {
    transform: [
      {
        scale: 0.8,
      },
    ],
  },
});

export default EditNeedScreen;
