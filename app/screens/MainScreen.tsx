import { useEffect, useState } from "react";

// Outer
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

// Store
import { useRootState, useDispatchApp } from "../store/hooks";
import { actions } from "../store/reducers/gameSettingsSlice";

// Components
import {
  View,
  Text,
  TextInput,
  Alert,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import CustomButton from "../components/CustomButton";
import ScreenTitle from "../components/ScreenTitle";

const MainScreen = (): JSX.Element => {
  const gameTarget = useRootState(
    (state) => state.appSettings.gameTargetNumber
  );
  const navigation: NavigationProp<any> = useNavigation();

  const [gameNumber, setGameNumber] = useState<string>(
    gameTarget ? String(gameTarget) : "0"
  );
  const dispatch = useDispatchApp();

  const startGame = (): void => {
    const { startGame } = actions;
    dispatch(startGame(gameNumber));
    navigation.navigate("Game", { name: "Game" });
  };

  const confirmGame = (): void => {
    if (gameNumber.length > 0 && gameNumber != "0") {
      startGame();
    } else {
      Alert.alert("Oooppps", "Enter a number between 1 and 99", [
        {
          text: "Ok",
        },
      ]);
    }
  };

  const resetGame = (): void => {
    Alert.alert("Rest game?", "You will reset the game range to '0'.", [
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

  /* ******************************* */

  useEffect(() => {
    setGameNumber(String(gameTarget));
  }, [gameTarget]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/background.png")}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["#3b021edf", "#ff9500a6"]}
          style={{ flex: 1, width: "100%" }}
        >
          <SafeAreaView style={styles.mainContent}>
            <ScreenTitle
              styleOverrview={styles.titleWrapper}
              title="Guess My Number"
            />

            <View style={styles.numberContainer}>
              <Text style={styles.numberTitle}>Enter a Number</Text>
              <TextInput
                style={styles.numberFiled}
                value={gameNumber === "0" ? "" : gameNumber}
                keyboardType="numeric"
                textAlign="center"
                textContentType="telephoneNumber"
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
                  onPress={confirmGame}
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
  titleWrapper: {
    marginTop: 80,
    marginBottom: 30,
  },
  mainContent: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
