import React, { useContext, useRef } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Vibration,
  Alert,
} from "react-native";
import Text from "../typography/Text";
import Tag from "../tag/Tag";
import SheetMenuBody from "../home/SheetMenuBody";
import PropTypes from "prop-types";
import moment from "moment";
import Colors from "../../constants/colors";
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { appContext } from "../../contexts/AppProvider";
import { api, host } from "../../constants/api";
import { needContext } from "../../contexts/NeedProvider";

const NeedCard = ({ item }) => {
  const [state, dispatch] = useContext(appContext);
  const [, setNeeds] = useContext(needContext);
  const navigation = useNavigation();
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const refRBSheet = useRef();

  const menus = [
    {
      icon: "ios-eye-off",
      text: "Hide",
      onPress: () => {
        setNeeds((currentState) =>
          currentState.filter((need) => need._id != item._id)
        );
        refRBSheet.current.close();
      },
    },
    {
      icon: "ios-arrow-dropdown",
      text: "Detail",
      onPress: () => {
        refRBSheet.current.close();
        navigation.navigate("NeedDetail");
      },
    },
    {
      icon: "ios-checkmark-circle",
      text: "Satisfy",
      onPress: async () => {
        try {
          refRBSheet.current.close();
          dispatch({ type: "SET_LOADING", payload: true });
          const response = await fetch(`${api}/needs/${state.id}`, {
            method: "PUT",
            body: JSON.stringify({
              ...item,
              status: true,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.token}`,
            },
          }).then((res) => res.json());
          dispatch({ type: "SET_LOADING", payload: false });
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      },
    },
    {
      icon: "ios-color-fill",
      text: "Edit",
      onPress: () => {
        refRBSheet.current.close();
        navigation.navigate("EditNeed");
      },
    },
    {
      icon: "ios-trash",
      text: "Delete",
      onPress: () => {
        refRBSheet.current.close();
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
                  await fetch(`${api}/needs/${state.id}`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${state.token}`,
                    },
                  });
                  dispatch({ type: "TOGGLE_LOADING" });
                } catch (err) {
                  console.log(err);
                }
              },
            },
          ],
          { cancelable: true }
        );
      },
    },
  ];

  const scaleStyle = {
    transform: [
      {
        scale: scaleAnimation,
      },
    ],
  };

  const TagList = () =>
    item.tags.map((tag, i) => (
      <Tag active style={styles.tag} {...tag} key={i.toString()} />
    ));

  const toDetail = () => {
    dispatch({ type: "ID", payload: item._id });
    Animated.timing(scaleAnimation, {
      toValue: 0.95,
      duration: 150,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start(({ finished }) => {
          navigation.navigate("NeedDetail");
        });
      }
    });
  };

  const resetAnimation = () => {
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const showSettings = () => {
    dispatch({ type: "ID", payload: item._id });
    Animated.timing(scaleAnimation, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
    Vibration.vibrate(1);
    refRBSheet.current.open();
  };

  const ImageComponent = () =>
    !item.user.profileImage ? (
      <Image
        style={styles.avatar}
        source={require("../../assets/images/avatar-placeholder.webp")}
      />
    ) : (
      <Image
        style={styles.avatar}
        source={{
          uri: `${host}/${item.user.profileImage}`,
          width: 30,
          height: 30,
        }}
      />
    );

  return (
    <TouchableWithoutFeedback
      onPress={toDetail}
      onPressOut={resetAnimation}
      onLongPress={showSettings}
    >
      <Animated.View style={[styles.card, scaleStyle]}>
        <View style={styles.cardHeader}>
          <ImageComponent />
          <Text style={styles.username}>{item.user.username}</Text>
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
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          height={70}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          <SheetMenuBody
            menus={item.user._id != state.userId ? menus.slice(0, 2) : menus}
          />
        </RBSheet>
      </Animated.View>
    </TouchableWithoutFeedback>
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
    marginRight: 5,
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
