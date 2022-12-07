import React from "react";

// Components
import { StyleProp, ViewStyle, StyleSheet, Text } from "react-native";

// Styles
import { getDynamicFontSize } from "../utils/styleMixins";

// Types
interface IScreenTitleProps {
  title: string;
  styleOverrview?: StyleProp<ViewStyle>;
}

const ScreenTitle: React.FunctionComponent<IScreenTitleProps> = (
  props: IScreenTitleProps
): JSX.Element => {
  return (
    <Text
      adjustsFontSizeToFit={true}
      style={[styles.title, props.styleOverrview || {}]}
    >
      {props.title}
    </Text>
  );
};

export default ScreenTitle;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    padding: 10,
    color: "white",
    fontSize: getDynamicFontSize(24),
    borderWidth: 2,
    borderColor: "white",
  },
});
