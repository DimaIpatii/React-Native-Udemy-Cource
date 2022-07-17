import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./app/screens/MainScreen";
import GameScreen from "./app/screens/GameScreen";

import { Provider } from "react-redux";
import store from "./app/store/store";

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Text>Hello World!!</Text>
        <MainScreen />
        <GameScreen />
      </Provider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
