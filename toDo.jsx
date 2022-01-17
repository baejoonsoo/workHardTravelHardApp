import { Alert, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

const ToDos = ({ toDos, saveToDos, setToDos, k }) => {
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
    console.log("click");
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
        <Text
          style={{
            ...styles.toDoText,
            color: toDos[k].checked ? "grey" : "white",
          }}
        >
          {toDos[k].text}
        </Text>
      </View>
      <TouchableOpacity onPress={() => deleteToDo(k)}>
        <Fontisto name="trash" size={18} color="white"></Fontisto>
      </TouchableOpacity>
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
  },
  toDoBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  toDoText: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    overflow: "hidden",
    flex: 0.95,
  },
});

export default ToDos;
