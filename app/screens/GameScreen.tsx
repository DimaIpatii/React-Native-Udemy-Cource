import React from "react";
import { View, Text } from "react-native";
import { useDispatchApp, useRootState } from "../store/hooks";

const GameScreen = () => {
  const gameTargetNumber = useRootState(
    (state) => state.appSettings.tragetNumber
  );

  return (
    <View>
      <Text>Game Screen</Text>
      <Text>Target Number is: {gameTargetNumber}</Text>
    </View>
  );
};

export default GameScreen;
