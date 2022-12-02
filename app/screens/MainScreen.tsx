import { useEffect, useState } from "react";

// Outer
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

// Store
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { useRootState, useDispatchApp } from "../store/hooks";
import { actions } from "../store/reducers/gameSettingsSlice";

// Components
import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
  AlertButton,
  Pressable,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TextInputFocusEventData,
} from "react-native";
import CustomButton from "../components/CustomButton";

// Types

const MainScreen = () => {
  const gameTarget = useRootState((state) => state.appSettings.tragetNumber);
  const navigation: NavigationProp<any> = useNavigation();

  const [gameNumber, setGameNumber] = useState<string>(
    gameTarget ? String(gameTarget) : "0"
  );
  const dispatch = useDispatchApp();

  const confirmGame = (): void => {
    const { startGame } = actions;
    dispatch(startGame(gameNumber));
    navigation.navigate("Game", { name: "Game" });
  };

  const resetGame = (): void => {
    Alert.alert("Rest game range?", "You will reset current range to '0'.", [
      {
        onPress: () => {
          setGameNumber("0");
          const { startGame } = actions;
          dispatch(startGame(0));
        },
        text: "Ok",
      },
      { text: "No" },
    ]);
  };

  useEffect(() => {
    if (gameTarget != 0) {
      setGameNumber(String(gameTarget));
    }
  }, [gameTarget]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/background.png")}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["#3b021e8e", "#ff95008d"]}
          style={{ flex: 1, width: "100%" }}
        >
          <SafeAreaView style={styles.mainContent}>
            <Text style={styles.title}>Guess My Number</Text>

            <View style={styles.numberContainer}>
              <Text style={styles.numberTitle}>Enter a Number</Text>
              <TextInput
                style={styles.numberFiled}
                value={gameNumber === "0" ? "" : gameNumber}
                keyboardType="numeric"
                textAlign="center"
                textContentType="telephoneNumber"
                //clearTextOnFocus={true}
                onChangeText={(value: string) => {
                  if (value.length === 0) {
                    setGameNumber(String(0));
                  } else {
                    const number = Number(value.replace(/[^0-9]/g, ""));

                    if (!isNaN(number) && number > 0 && number <= 99) {
                      setGameNumber(String(number));
                    } else if (!isNaN(number) && number > 99) {
                      setGameNumber("99");
                    }
                  }
                }}
                blurOnSubmit={true}
              />

              <View style={styles.numberButtonsWrapper}>
                {gameNumber &&
                  gameNumber.trim().length > 0 &&
                  gameNumber != "0" && (
                    <CustomButton
                      overrideStyles={styles.resetButton}
                      onPress={resetGame}
                      label="Reset"
                    />
                  )}
                <CustomButton
                  overrideStyles={styles.confirmButton}
                  onPress={() =>
                    gameNumber.length > 0 && gameNumber != "0"
                      ? confirmGame()
                      : null
                  }
                  label="Confirm"
                />
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: "center",
  },
  mainContent: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    padding: 10,
    color: "white",
    fontSize: 24,
    borderWidth: 2,
    borderColor: "white",
    marginTop: 80,
    marginBottom: 30,
  },
  numberContainer: {
    padding: 14,
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#3B021E",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  numberTitle: {
    color: "#D2A65E",
    fontSize: 20,
    marginBottom: 10,
  },
  numberFiled: {
    width: 40,
    borderBottomWidth: 2,
    color: "#D2A65E",
    fontSize: 20,
    borderBottomColor: "#D2A65E",
    marginBottom: 15,
  },
  numberButtonsWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  confirmButton: {
    flex: 1,
  },
  resetButton: {
    flex: 1,
    marginRight: 10,
  },
});
