import React from "react";

// Outer
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Global
import { Colors } from "../utils/variables";
import { getDynamicPercentage, getDynamicFontSize } from "../utils/styleMixins";

// Store
import { useDispatchApp, useRootState } from "../store/hooks";
import { actions } from "../store/reducers/gameSettingsSlice";

// Global

// Components
import {
  SafeAreaView,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ScreenTitle from "../components/ScreenTitle";
import CustomButton from "../components/CustomButton";

const GameOverScreen = (): JSX.Element => {
  const { answers, gameTargetNumber } = useRootState(
    (state) => state.appSettings
  );
  const navigation: NavigationProp<any> = useNavigation();
  const dispatch = useDispatchApp();
  /* ***************************** */
  const startNewGame = (): void => {
    dispatch(actions.newGame(null));
    navigation.navigate("Home", { name: "Home" });
  };

  /* ***************************** */

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={[Colors.primary400, Colors.secondary400]}
        style={{ flex: 1, width: "100%" }}
      >
        <SafeAreaView style={styles.mainContent}>
          <ScreenTitle title="Game Over!" />

          <Image
            style={styles.image}
            source={require("../../assets/success.png")}
            resizeMode="cover"
          />

          <Text style={styles.summaryText}>
            Your phone needed{" "}
            <Text style={styles.summaryTextValues}>{answers.length}</Text>{" "}
            rounds to guess the number{" "}
            <Text style={styles.summaryTextValues}>{gameTargetNumber}</Text>
          </Text>

          <CustomButton onPress={startNewGame} label="Start new game" />
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: getDynamicPercentage(5),
  },

  title: {
    marginBottom: 30,
  },
  image: {
    width: getDynamicPercentage(70),
    height: getDynamicPercentage(70),
    borderRadius: getDynamicPercentage(70) / 2,
    overflow: "hidden",
    marginTop: 30,
    marginBottom: 30,
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: getDynamicFontSize(20),
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 30,
  },
  summaryTextValues: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
    fontSize: getDynamicFontSize(18),
    fontWeight: "600",
  },
});
