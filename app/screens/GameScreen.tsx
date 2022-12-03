import React, { useState, useEffect } from "react";

// Outer
import { useNavigation, NavigationProp } from "@react-navigation/native";

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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ScreenTitle from "../components/ScreenTitle";
import CustomButton from "../components/CustomButton";

const GameScreen = () => {
  const { gameTargetNumber, answers, suggestedNumber } = useRootState(
    (state) => state.appSettings
  );

  const dispatch = useDispatchApp();

  const navigator: NavigationProp<any> = useNavigation();

  /* ******************************* */
  const setSuggestedNumber = (): void => {
    const newTargetNumber = Math.floor(Math.random() * 99 + 1);
    dispatch(actions.updateSuggestedNumber(newTargetNumber));
  };
  const checkNumber = (): void => {
    const numbers = [...answers, suggestedNumber];
    if (numbers.length <= 4) {
      dispatch(actions.updateAnswers(suggestedNumber));
    }
    if (suggestedNumber != gameTargetNumber && numbers.length < 4) {
      setSuggestedNumber();
    } else {
      navigator.navigate("GameOver", { name: "GameOver" });
    }
  };

  /* ******************************* */
  useEffect(() => {
    setSuggestedNumber();
  }, []);
  /* ******************************* */

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["#3b021edf", "#ff9500a6"]}
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
                onPress={checkNumber}
                label="-"
              />
              <CustomButton
                overrideStyles={styles.buttonTrue}
                overrideLabelStyles={styles.buttonLable}
                onPress={checkNumber}
                label="+"
              />
            </View>
          </View>

          {answers.length > 0 && (
            <View style={styles.responsesContainer}>
              {answers.map((number, index) => (
                <View key={index} style={styles.responseItem}>
                  <Text>#{index + 1}</Text>
                  <Text>Oponent's Guess: {number}</Text>
                </View>
              ))}
            </View>
          )}
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
  },
  title: {
    width: "90%",
    textAlign: "center",
    marginBottom: 20,
  },
  suggestedNumber: {
    width: "70%",
    borderWidth: 4,
    borderColor: "#DCB047",
    color: "#DCB047",
    textAlign: "center",
    borderRadius: 4,
    fontSize: 30,
    fontWeight: "500",
    padding: 20,
    marginBottom: 30,
  },
  buttonsContainer: {
    padding: 14,
    width: "70%",
    borderRadius: 10,
    backgroundColor: "#3B021E",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainerTitle: {
    fontSize: 20,
    color: "#D4A27A",
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
    fontSize: 16,
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
  },
  responseItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    width: "100%",
    backgroundColor: "#DDB536",
    borderWidth: 1,
    borderColor: "#3B021E",
    borderRadius: 50,
    marginBottom: 15,
  },
});
