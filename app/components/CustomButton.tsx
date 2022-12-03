import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";

interface IButtonProps {
  onPress: () => void;
  label: string;
  overrideStyles?: StyleProp<ViewStyle>;
  overrideLabelStyles?: StyleProp<TextStyle>;
}
const CustomButton = (props: IButtonProps) => {
  return (
    <Pressable
      style={[styles.root, props.overrideStyles || {}]}
      onPress={props.onPress}
    >
      <Text style={[styles.label, props.overrideLabelStyles || {}]}>
        {props.label}
      </Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#71063b",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 100,
  },
  label: {
    color: "white",
    textAlign: "center",
  },
});
