import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { getFontScale } from "react-native/Libraries/Utilities/PixelRatio";

export default function App() {
  const [text, setText] = useState("");
  const [working, setWorking] = useState(true);
  const onTravel = () => setWorking(false);
  const onWork = () => setWorking(true);

  const onChangeText = (payload) => setText(payload);

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
        value={text}
        autoCapitalize="none"
        onChangeText={onChangeText}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        style={styles.input}
      />
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
    marginTop: 20,
    fontSize: 18,
  },
});
