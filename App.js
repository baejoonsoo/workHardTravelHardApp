import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToDos from "./toDo";

const STORAGE_KEY = "@toDos";
const WORK_STATE = "@workState";

export default function App() {
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const [working, setWorking] = useState(true);

  useEffect(() => {
    loadToDos();
    loadWorkState();
  }, []);

  const onTravel = async () => {
    setWorking(false);
    await AsyncStorage.setItem(WORK_STATE, JSON.stringify(false));
  };
  const onWork = async () => {
    setWorking(true);
    await AsyncStorage.setItem(WORK_STATE, JSON.stringify(true));
  };

  const onChangeText = (payload) => setText(payload);

  const loadWorkState = async () => {
    try {
      const workState = await AsyncStorage.getItem(WORK_STATE);
      const workStateBoolen = workState === "true";
      setWorking(workStateBoolen);
    } catch {}
  };

  const saveToDos = async (toSave) => {
    try {
      const toDosData = JSON.stringify(toSave);
      await AsyncStorage.setItem(STORAGE_KEY, toDosData);
    } catch {
      Alert.alert("목록 저장에 실패하였습니다", "", [
        {
          text: "Cancel",
        },
        {
          text: "Again",
          onPress: () => saveToDos(toSave),
        },
      ]);
    }
  };

  const loadToDos = async () => {
    try {
      const ToDosStr = await AsyncStorage.getItem(STORAGE_KEY);
      const ToDosJSON = JSON.parse(ToDosStr);
      setToDos(ToDosJSON);
    } catch {
      Alert.alert("목록 저장에 실패하였습니다", "", [
        {
          text: "Cancel",
        },
        {
          text: "Again",
          onPress: () => saveToDos(toSave),
        },
      ]);
    }
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working: working, checked: false },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onWork}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : "#3A3D40" }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onTravel}>
          <Text
            style={{ ...styles.btnText, color: working ? "#3A3D40" : "white" }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        returnKeyType="done"
        onSubmitEditing={addToDo}
        value={text}
        autoCapitalize="none"
        onChangeText={onChangeText}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        style={styles.input}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <ToDos
              key={key}
              k={key}
              toDos={toDos}
              saveToDos={saveToDos}
              setToDos={setToDos}
            />
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  btnText: {
    fontSize: 35,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
});
