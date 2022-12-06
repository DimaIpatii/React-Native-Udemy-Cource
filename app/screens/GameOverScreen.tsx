// Outer
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Global
import { Colors } from "../utils/variables";

// Store
import { useDispatchApp, useRootState } from "../store/hooks";
import { actions } from "../store/reducers/gameSettingsSlice";

// Global
import RN from "react-native";

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

const screenWidth = RN.Dimensions.get("screen").width;

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
  },

  title: {
    marginBottom: 30,
  },
  image: {
    width: (70 * screenWidth) / 100,
    height: (70 * screenWidth) / 100,
    borderRadius: (70 * screenWidth) / 100 / 2,
    overflow: "hidden",
    marginTop: 30,
    marginBottom: 30,
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 20,
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 30,
  },
  summaryTextValues: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
    fontSize: 18,
    fontWeight: "600",
  },
});
