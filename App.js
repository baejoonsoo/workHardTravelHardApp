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

const STORAGE_KEY = "@toDos";

export default function App() {
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const [working, setWorking] = useState(true);

  useEffect(() => {
    loadToDos();
  }, []);

  const onTravel = () => setWorking(false);
  const onWork = () => setWorking(true);

  const onChangeText = (payload) => setText(payload);

  const saveToDos = async (toSave) => {
    try {
      const toDosData = JSON.stringify(toSave);
      await AsyncStorage.setItem(STORAGE_KEY, toDosData);
    } catch {
      Alert.alert("목록 저장에 실패하였습니다", "", [
        {
          text: "확인",
        },
        {
          text: "다시 시도",
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
    } catch {}
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working: working },
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
            <View key={key} style={styles.toDo}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
            </View>
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
  toDo: {
    backgroundColor: "#3a3d40",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
