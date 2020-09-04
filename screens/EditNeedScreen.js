import React, { useContext, useEffect, useState } from "react";
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
import { appContext } from "../contexts/AppProvider";
import { host } from "../constants/api";
import { ScrollView } from "react-native-gesture-handler";
import TextInput from "../components/form/TextInput";
import Spinner from "../components/spinner/Spinner";
import { loadData } from "../share";
import { needContext } from "../contexts/NeedProvider";

const EditNeedScreen = ({ navigation }) => {
  const [state, dispatch] = useContext(appContext);
  const [, setNeeds] = useContext(needContext);
  const [isSatisfied, setIsSatisfied] = useState(false);
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
      setHeader(response.data.header);
      setBody(response.data.body);
      setTags(response.data.tags);
      setIsSatisfied(response.data.status != "In progress");
    })();
  }, []);

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

  const updateHandler = async () => {
    try {
      dispatch({ type: "TOGGLE_LOADING" });
      const response = await fetch(`${host}/needs/${state.id}`, {
        method: "PUT",
        body: JSON.stringify({
          header,
          body,
          tags,
          status: isSatisfied,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      }).then((res) => res.json());
      dispatch({ type: "TOGGLE_LOADING" });
      console.log(response);
      loadData(state, setNeeds, dispatch);

      navigation.navigate("Home");
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
            onKeyPress={enterHandler}
            state={isTag}
            errorLabel="Tag name must not be empty!"
          />
          <View style={styles.tagContainer}>
            <TagList />
          </View>
          <Button
            disabled={!header || !body}
            block
            rounded
            style={styles.button}
            onPress={updateHandler}
          >
            <Text style={styles.buttonText}>Update</Text>
          </Button>
        </View>
        <Spinner />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const size = 30;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 35,
    justifyContent: "space-around",
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
  checkbox: {
    transform: [
      {
        scale: 0.8,
      },
    ],
  },
  errorLabel: {
    color: "red",
    marginTop: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default EditNeedScreen;
