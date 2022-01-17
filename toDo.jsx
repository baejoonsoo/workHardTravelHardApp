import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import {
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome,
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
      <View style={styles.toDoBox}>
        {toDos[k].checked ? (
          <MaterialCommunityIcons
            onPress={onCheck}
            name="checkbox-marked"
            size={24}
            color="white"
          />
        ) : (
          <MaterialCommunityIcons
            onPress={onCheck}
            name="checkbox-blank-outline"
            size={24}
            color="white"
          />
        )}
        {patching ? (
          <TextInput
            style={styles.textPatch}
            value={text}
            onSubmitEditing={onPatching}
            autoCapitalize="none"
            returnKeyType="done"
            onChangeText={changeToDoText}
          />
        ) : (
          <Text
            style={{
              ...styles.toDoText,
              color: toDos[k].checked ? "grey" : "white",
            }}
          >
            {toDos[k].text}
          </Text>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <TouchableOpacity style={{ marginRight: 10 }} onPress={modeChange}>
          <FontAwesome name="pencil" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteToDo(k)}>
          <Fontisto name="trash" size={18} color="white"></Fontisto>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toDo: {
    backgroundColor: "#3a3d40",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  toDoBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 5,
  },
  textPatch: {
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 1,
    marginLeft: 10,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    color: "#f4f4f4",
    paddingBottom: 3,
    flex: 0.95,
  },
  toDoText: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    overflow: "hidden",
    flex: 0.98,
  },
});

export default ToDos;
