import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import CartItem from "./CartItem";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const totalAmount = props.totalAmount.toLocaleString("ko-KR");

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.shopName}>{props.shopName}</Text>
        <Text style={styles.date}>{props.date}</Text>
        <Text style={styles.totalAmount}>
          합계: <Text style={styles.totalAmountNumber}>{totalAmount}</Text>원
        </Text>
        <Button
          title={showDetails ? "간략히" : "더보기"}
          onPress={() => {
            setShowDetails((prevState) => !prevState);
          }}
        />
      </View>
      {showDetails && (
        <View style={styles.detail}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.itemId}
              quantity={cartItem.quantity}
              sum={cartItem.sum}
              title={cartItem.itemTitle}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    // alignItems: "center",
  },
  summary: {
    padding: 10,
  },
  shopName: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    marginVertical: 10,
  },
  date: { fontFamily: "open-sans", fontSize: 13 },
  totalAmount: {
    fontFamily: "open-sans",
    fontSize: 16,
    marginVertical: 10,
  },
  totalAmountNumber: {
    fontFamily: "open-sans-bold",
  },
  detail: {
    width: "100%",
  },
});
