import { Dimensions } from "react-native";

export const getDynamicFontSize = (fontSize: number): number => {
  const fontScale = Dimensions.get("window").fontScale;

  return fontSize / fontScale;
};

export const getDynamicPercentage = (percentageValue: number): number => {
  const screenWidth = Dimensions.get("window").width;
  return (percentageValue * screenWidth) / 100;
};
