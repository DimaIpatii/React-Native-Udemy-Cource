import React, { useState, useEffect } from "react";

// Outer
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Global
import { Colors } from "../utils/variables";
import { generateRundomNumberRange } from "../utils/functions";
import { getDynamicPercentage, getDynamicFontSize } from "../utils/styleMixins";

// Store
import { useDispatchApp, useRootState } from "../store/hooks";
import { actions } from "../store/reducers/gameSettingsSlice";

// Components
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Alert,
  FlatList,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ScreenTitle from "../components/ScreenTitle";
import CustomButton from "../components/CustomButton";
import { Feather } from "@expo/vector-icons";

let minNumber = 1;
let maxNumber = 100;

const GameScreen = () => {
  const { gameTargetNumber, answers } = useRootState(
    (state) => state.appSettings
  );
  const dispatch = useDispatchApp();
  const [suggestedNumber, setSuggestedNumber] = useState<number>(0);

  const navigator: NavigationProp<any> = useNavigation();

  /* ******************************* */

  const checkNumber = (numberIs: "lower" | "higher"): void => {
    if (
      (numberIs === "lower" && suggestedNumber < gameTargetNumber) ||
      (numberIs === "higher" && suggestedNumber > gameTargetNumber)
    ) {
      Alert.alert("False!", "You know this is not true!", [
        { text: "Oh, crap!", style: "cancel" },
      ]);
    } else {
      if (numberIs === "lower") {
        maxNumber = suggestedNumber;
      } else if (numberIs === "higher") {
        minNumber = suggestedNumber + 1;
      }

      const newRandomNumber = generateRundomNumberRange(
        minNumber,
        maxNumber,
        suggestedNumber
      );
      setSuggestedNumber(newRandomNumber);
      dispatch(actions.updateAnswers(suggestedNumber));
    }
  };

  /* ******************************* */

  useEffect(() => {
    const randomNumber = generateRundomNumberRange(1, 100, gameTargetNumber);
    setSuggestedNumber(randomNumber);
  }, []);

  useEffect(() => {
    if (gameTargetNumber == suggestedNumber) {
      minNumber = 1;
      maxNumber = 100;
      navigator.navigate("GameOver", { name: "GameOver" });
    }
  }, [gameTargetNumber, suggestedNumber]);
  /* ******************************* */

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={[Colors.primary400, Colors.secondary400]}
        style={{ flex: 1, width: "100%" }}
      >
        <SafeAreaView style={styles.mainContent}>
          <ScreenTitle styleOverrview={styles.title} title="Oponent's Guess" />

          <Text style={styles.suggestedNumber}>{suggestedNumber}</Text>

          <View style={styles.buttonsContainer}>
            <Text style={styles.buttonsContainerTitle}>Higher or lower?</Text>
            <View style={styles.buttonsWrapper}>
              <CustomButton
                overrideStyles={styles.buttonFalse}
                overrideLabelStyles={styles.buttonLable}
                onPress={() => checkNumber("lower")}
              >
                <Feather
                  name="minus"
                  size={getDynamicFontSize(16)}
                  color="white"
                  style={{ textAlign: "center" }}
                />
              </CustomButton>
              <CustomButton
                overrideStyles={styles.buttonTrue}
                overrideLabelStyles={styles.buttonLable}
                onPress={() => checkNumber("higher")}
              >
                <Feather
                  name="plus"
                  size={getDynamicFontSize(16)}
                  color="white"
                  style={{ textAlign: "center" }}
                />
              </CustomButton>
            </View>
          </View>

          <FlatList
            data={answers}
            style={styles.responsesContainer}
            renderItem={(answer) => (
              <View key={answer.index} style={styles.responseItem}>
                <Text>#{answer.index + 1}</Text>
                <Text>Oponent's Guess: {answer.item}</Text>
              </View>
            )}
          />
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  mainContent: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  title: {
    width: "70%",
    textAlign: "center",
    marginBottom: 20,
  },
  suggestedNumber: {
    fontFamily: "open-sans-bold",
    //width: "70%",
    width: 100,
    borderWidth: 4,
    borderColor: Colors.secondary500,
    color: Colors.secondary500,
    borderRadius: 4,
    fontSize: getDynamicFontSize(30),
    fontWeight: "500",
    padding: 20,
    marginBottom: 30,
    textAlign: "center",
    textAlignVertical: "center",
  },
  buttonsContainer: {
    padding: 14,
    width: "70%",
    borderRadius: 10,
    backgroundColor: Colors.primary600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainerTitle: {
    fontFamily: "open-sans",
    fontSize: getDynamicFontSize(20),
    color: Colors.secondary500,
    marginBottom: 15,
    textAlign: "center",
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonLable: {
    fontSize: getDynamicFontSize(16),
  },
  buttonFalse: {
    padding: 1,
    flex: 1,
    marginRight: 10,
  },
  buttonTrue: {
    padding: 5,
    flex: 1,
  },
  responsesContainer: {
    marginTop: 20,
    width: "70%",
    maxHeight: "55%",

    paddingBottom: 50,
  },
  responseItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    width: "100%",
    backgroundColor: Colors.secondary500,
    borderWidth: 1,
    borderColor: Colors.primary600,
    borderRadius: 50,
    marginBottom: 15,
  },
});
