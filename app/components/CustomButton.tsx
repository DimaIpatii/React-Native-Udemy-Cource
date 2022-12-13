import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
} from "react-native";

interface IButtonProps {
  onPress: () => void;
  children?: React.ReactNode;
  label?: string;
  overrideStyles?: StyleProp<ViewStyle>;
  overrideLabelStyles?: StyleProp<TextStyle>;
}
const CustomButton = (props: IButtonProps) => {
  return (
    <View style={[styles.root, props.overrideStyles || {}]}>
      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          pressed ? styles.buttonPresset : {},
        ]}
        onPress={props.onPress}
        android_ripple={{ color: "#500329" }}
      >
        {props.label ? (
          <Text style={[styles.label, props.overrideLabelStyles || {}]}>
            {props.label}
          </Text>
        ) : props.children ? (
          props.children
        ) : null}
      </Pressable>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  root: {
    overflow: "hidden",
  },
  buttonContainer: {
    backgroundColor: "#71063b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  buttonPresset: {
    opacity: 0.75,
  },
  label: {
    fontFamily: "open-sans",
    color: "white",
    textAlign: "center",
  },
});
