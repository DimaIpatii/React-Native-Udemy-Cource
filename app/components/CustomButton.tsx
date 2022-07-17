import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

interface IButtonProps {
  onPress: () => void;
  label: string;
}
const CustomButton = (props: IButtonProps) => {
  return (
    <Pressable style={styles.root} onPress={props.onPress}>
      <Text style={styles.label}>{props.label}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#71063b",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 100,
  },
  label: {
    color: "white",
    textAlign: "center",
  },
});
