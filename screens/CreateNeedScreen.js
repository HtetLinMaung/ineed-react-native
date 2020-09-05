import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Textarea, Icon, Button } from "native-base";
import Text from "../components/typography/Text";
import Tag from "../components/tag/Tag";
import TextInput from "../components/form/TextInput";
import Colors from "../constants/colors";
import { appContext } from "../contexts/AppProvider";
import { host } from "../constants/api";
import Spinner from "../components/spinner/Spinner";

const CreateNeedScreen = ({ navigation }) => {
  const [state, dispatch] = useContext(appContext);
  const [tagColors, setTagColors] = useState(
    Colors.tags.map((color, i) => ({ color, selected: i > 0 ? false : true }))
  );
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [isHeader, setIsHeader] = useState(true);
  const [isBody, setIsBody] = useState(true);
  const [isTag, setIsTag] = useState(true);

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

  const endEditingHandler = () => {
    if (tag) {
      setTags((currentState) => [
        ...currentState,
        {
          title: tag,
          color: tagColors.find((item) => item.selected).color,
          _id: new Date().toISOString(),
        },
      ]);
      setTag("");
    }
  };

  const tagTouchHandler = (id) => {
    setTags((currentState) => currentState.filter((item) => item._id != id));
  };

  const headerChangeHandler = (text) => {
    setIsHeader(true);
    if (!text) {
      setIsHeader(false);
    }
    setHeader(text);
  };

  const bodyChangeHandler = (text) => {
    setIsBody(true);
    if (!text) {
      setIsBody(false);
    }
    setBody(text);
  };

  const tagChangeHandler = (text) => {
    setIsTag(true);
    if (!text) {
      setIsTag(false);
    }
    setTag(text);
  };

  const saveHandler = async () => {
    try {
      if (header && body) {
        dispatch({ type: "TOGGLE_LOADING" });
        const response = await fetch(`${host}/needs`, {
          method: "POST",
          body: JSON.stringify({
            header,
            body,
            tags,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        }).then((res) => res.json());
        dispatch({ type: "TOGGLE_LOADING" });
        console.log(response);
        navigation.navigate("Home");
      }
    } catch (err) {
      console.log(err);
    }
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
        onPress={tagTouchHandler.bind(this, tag._id)}
      />
    ));

  const ErrorText = () =>
    !isBody ? (
      <Text style={styles.errorLabel}>Detail must not be empty!</Text>
    ) : null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={styles.container}>
          <Text bold style={styles.header}>
            Propose Need
          </Text>

          <Text style={styles.label}>Title</Text>
          <TextInput
            value={header}
            onChangeText={headerChangeHandler}
            state={isHeader}
            errorLabel="Title must not be empty!"
          />

          <Text style={styles.label}>Need Detail</Text>
          <Textarea
            style={[
              styles.textarea,
              {
                borderColor: isBody ? Colors.label : "red",
                marginBottom: isBody ? 20 : 0,
              },
            ]}
            value={body}
            onChangeText={bodyChangeHandler}
            rowSpan={5}
            bordered
          />
          <ErrorText />

          <Text style={styles.label}>Tags</Text>
          <View style={styles.colorContainer}>
            <ColorList />
          </View>
          <TextInput
            value={tag}
            onChangeText={tagChangeHandler}
            onEndEditing={endEditingHandler}
            state={isTag}
            errorLabel="Tag name must not be empty!"
          />
          <View style={styles.tagContainer}>
            <TagList />
          </View>
          <Button
            disabled={!header || !body || state.loading}
            block
            rounded
            style={styles.button}
            onPress={saveHandler}
          >
            <Text style={styles.buttonText}>Save</Text>
          </Button>
          <Spinner style={styles.spinner} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const size = 30;
const styles = StyleSheet.create({
  spinner: {
    left: "50%",
  },
  container: {
    flex: 1,
    paddingVertical: 35,
    justifyContent: "space-around",
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: 24,
    marginBottom: 15,
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
    borderRadius: 15,
    paddingVertical: 10,
    fontFamily: "Poppins",
    fontSize: 13,
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
  errorLabel: {
    color: "red",
    marginTop: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default CreateNeedScreen;
