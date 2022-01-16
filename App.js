import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const [working, setWorking] = useState(true);
  const onTravel = () => setWorking(false);
  const onWork = () => setWorking(true);
  const count = useRef(0);

  const onChangeText = (payload) => setText(payload);

  const addToDo = () => {
    if (text === "") {
      return;
    }
    const newToDos = { ...toDos, [count.current++]: { text, work: working } };
    setToDos(newToDos);
    setText("");
  };
  console.log(toDos);

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
        {Object.keys(toDos).map((key) => (
          <View key={key} style={styles.toDo}>
            <Text style={styles.toDoText}>{toDos[key].text}</Text>
          </View>
        ))}
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
