import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useState } from "react";

const ToDos = ({ toDos, saveToDos, setToDos, k }) => {
  const [patching, setPatching] = useState(false);
  const [text, setText] = useState(toDos[k].text);

  const deleteToDo = (key) => {
    Alert.alert("정말로 삭제하시겠습니까?", "이 행동은 되돌릴 수 없습니다", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };

  const onCheck = () => {
    const clickedToDo = toDos[k];
    const newToDo = {
      ...toDos,
    };
    newToDo[k] = {
      ...clickedToDo,
      checked: !clickedToDo.checked,
    };

    setToDos(newToDo);
  };

  const modeChange = () => {
    if (!patching) {
      setPatching(true);
    } else {
      onPatching();
    }
  };

  const changeToDoText = (payload) => {
    setText(payload);
  };

  const onPatching = () => {
    const clickedToDo = toDos[k];
    const newToDo = {
      ...toDos,
    };
    newToDo[k] = {
      ...clickedToDo,
      text: text,
    };
    setToDos(newToDo);
    setPatching(false);
  };

  return (
    <View style={styles.toDo}>
      {patching ? (
        <View style={{ flexDirection: "row" }}>
          <TouchableWithoutFeedback onPress={onCheck}>
            <View style={styles.toDoBox}>
              <TextInput
                style={styles.textPatch}
                value={text}
                onSubmitEditing={onPatching}
                autoCapitalize="none"
                returnKeyType="done"
                onChangeText={changeToDoText}
              />
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              flex: 1,
              paddingRight: 10,
            }}
          >
            <MaterialIcons
              name="cancel"
              size={24}
              color="white"
              onPress={modeChange}
            />
          </View>
        </View>
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableWithoutFeedback onPress={onCheck}>
            <View style={styles.toDoBox}>
              {toDos[k].checked ? (
                <MaterialCommunityIcons
                  name="checkbox-marked"
                  size={24}
                  color="white"
                />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={24}
                  color="white"
                />
              )}
              <Text
                style={{
                  ...styles.toDoText,
                  color: toDos[k].checked ? "grey" : "white",
                }}
              >
                {toDos[k].text}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: 10,
              flex: 1,
            }}
          >
            <TouchableOpacity style={{ paddingRight: 10 }} onPress={modeChange}>
              <FontAwesome name="pencil" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteToDo(k)}>
              <Fontisto name="trash" size={18} color="white"></Fontisto>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toDo: {
    //3a3d40
    backgroundColor: "#1b1b1b",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  toDoBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 10,
  },
  textPatch: {
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    color: "#f4f4f4",
    paddingBottom: 3,
    marginRight: 5,
    flex: 1,
  },
  toDoText: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    overflow: "hidden",
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    marginRight: 15,
    fontSize: 16,
  },
});

export default ToDos;
