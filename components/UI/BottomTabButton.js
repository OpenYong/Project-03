import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import Colors from "../../constants/Colors";

const BottomTabButton = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.mainContainer, ...props.style }}
      onPress={props.onPress}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default BottomTabButton;

const styles = StyleSheet.create({
  mainContainer: {
    height: "12.5%",
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: "8.5%",
  },
});
