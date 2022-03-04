import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.option}>옵션</Text>
        <Text style={styles.sum}>{props.sum}원</Text>
      </View>
      <View style={styles.rightContainer}>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Ionicons name="close" size={23} color="#795548" />
          </TouchableOpacity>
        )}
        <View style={styles.buttonContainer}>
          {props.deletable && (
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
          )}
          <Text style={styles.quantity}>{props.quantity}</Text>
          {props.deletable && (
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
          )}
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.25,
    borderBottomColor: "#888",
    paddingHorizontal: 20,
  },
  itemData: {
    width: "78%",
  },
  title: {
    fontFamily: "open-sans",
    fontSize: 16,
    marginVertical: 1,
  },
  option: {
    fontFamily: "open-sans",
    fontSize: 15,
    color: "#888",
    marginVertical: 1,
  },
  sum: {
    fontFamily: "open-sans",
    fontSize: 16,
    marginVertical: 1,
  },
  rightContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "22%",
  },
  deleteButton: {
    marginLeft: "60%",
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
