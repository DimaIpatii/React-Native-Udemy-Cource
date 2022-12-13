import React, { useEffect, useState } from "react";

// Outer
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useHeaderHeight } from "@react-navigation/elements";

// Global
import { Colors } from "../utils/variables";
import { getDynamicPercentage, getDynamicFontSize } from "../utils/styleMixins";

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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import CustomButton from "../components/CustomButton";
import ScreenTitle from "../components/ScreenTitle";

const MainScreen = (): JSX.Element => {
  const gameTarget = useRootState(
    (state) => state.appSettings.gameTargetNumber
  );
  const navigation: NavigationProp<any> = useNavigation();
  const headerHeight = useHeaderHeight();
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
          style: "destructive",
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
    <KeyboardAvoidingView
      style={{ flex: 1, height: "100%" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{
            flex: 1,
            height: "100%",
          }}
        >
          <View style={styles.container}>
            <ImageBackground
              style={styles.image}
              source={require("../../assets/background.png")}
              resizeMode="cover"
            >
              <LinearGradient
                colors={[Colors.primary400, Colors.secondary400]}
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
                      maxLength={2}
                      keyboardType="number-pad"
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    height: Dimensions.get("window").height,
  },
  image: {
    flex: 1,
    alignItems: "center",
  },
  titleWrapper: {
    maxWidth: "80%",
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
    backgroundColor: Colors.primary600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  numberTitle: {
    fontFamily: "open-sans",
    color: Colors.secondary500,
    fontSize: getDynamicFontSize(20),
    marginBottom: 10,
  },
  numberFiled: {
    fontFamily: "open-sans",
    width: 40,
    borderBottomWidth: 2,
    color: Colors.secondary500,
    fontSize: getDynamicFontSize(20),
    borderBottomColor: Colors.secondary500,
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
