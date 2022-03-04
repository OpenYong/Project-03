import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const CoffeeItem = (props) => {
  const price = props.price.toLocaleString("ko-KR");
  return (
    <TouchableOpacity onPress={props.onViewDetail}>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>{price}원</Text>
          </View>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CoffeeItem;

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 0.4,
    borderBottomColor: "#888",
    // marginHorizontal: 10,
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",

    height: 100,
    margin: 10,
  },
  titleContainer: {
    justifyContent: "center",
    margin: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 16,
    color: "#888",
    fontFamily: "open-sans-bold",
  },
  image: {
    width: "30%",
    height: "100%",
    borderRadius: 15,
  },
});
