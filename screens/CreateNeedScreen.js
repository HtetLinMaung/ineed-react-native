import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Input, Item, Textarea, Icon, Button } from "native-base";
import Text from "../components/typography/Text";
import Tag from "../components/tag/Tag";
import Colors from "../constants/colors";

const CreateNeedScreen = ({ navigation }) => {
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

  const saveHandler = () => {
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
        <Text bold style={styles.header}>
          Propose Need
        </Text>

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
        <Button block rounded style={styles.button} onPress={saveHandler}>
          <Text style={styles.buttonText}>Save</Text>
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
    marginBottom: 15,
    color: Colors.label,
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
    color: Colors.label,
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
  },
});

export default CreateNeedScreen;
