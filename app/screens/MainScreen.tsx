import { useEffect, useState } from "react";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";

import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
  AlertButton,
  Pressable,
} from "react-native";
import { useRootState, useDispatchApp } from "../store/hooks";
import { actions } from "../store/reducers/gameSettingsSlice";

import CustomButton from "../components/CustomButton";

const MainScreen = () => {
  const gameTarget = useRootState((state) => state.appSettings.tragetNumber);

  const [gameNumber, setGameNumber] = useState<string>(String(gameTarget));
  const dispatch = useDispatchApp();

  const confirmGame = () => {
    const { startGame } = actions;
    dispatch(startGame(gameNumber));
  };

  useEffect(() => {
    setGameNumber(String(gameTarget));
  }, [gameTarget]);
  return (
    <View>
      <Text>Game Number: {gameNumber}</Text>
      <TextInput
        value={gameNumber}
        defaultValue="0"
        keyboardType="number-pad"
        textAlign="center"
        textContentType="telephoneNumber"
        onChangeText={(value: string) => {
          setGameNumber(value);
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <CustomButton
          onPress={() =>
            Alert.alert(
              "Rest game range?",
              "You will reset current range to '0'.",
              [
                { onPress: () => setGameNumber("0"), text: "Ok" },
                { text: "No" },
              ]
            )
          }
          label="Reset"
        />
        <CustomButton onPress={confirmGame} label="Confirm" />
      </View>
    </View>
  );
};

export default MainScreen;
