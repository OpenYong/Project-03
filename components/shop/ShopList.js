import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const ShopList = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.shop}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.shopName}>{props.shopName}</Text>
            <Text style={styles.description}>{props.description}</Text>
          </View>
          <View style={styles.optionContainer}>
            {props.hasParkingLot && (
              <FontAwesome5 name="parking" size={18} color="black" />
            )}
            {props.hasTables && (
              <FontAwesome5 name="chair" size={18} color="black" />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ShopList;

const styles = StyleSheet.create({
  shop: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 200,
    margin: 10,
  },
  imageContainer: {
    width: "100%",
    height: "70%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    height: "30%",
    marginHorizontal: 8,
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shopName: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 3,
  },
});
