import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ItemAmount = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>수량</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={props.onDecrease}>
          <Ionicons
            name={
              Platform.OS === "android"
                ? "md-remove-circle-outline"
                : "ios-remove-circle-outline"
            }
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <TouchableOpacity onPress={props.onIncrease}>
          <Ionicons
            name={
              Platform.OS === "android"
                ? "md-add-circle-outline"
                : "ios-add-circle-outline"
            }
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemAmount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {},
  text: {
    fontSize: 18,
    marginVertical: 20,
  },
  quantity: { fontSize: 18, marginHorizontal: 10 },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
