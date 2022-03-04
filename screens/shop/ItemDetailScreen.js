import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ItemAmount from "../../components/shop/ItemAmount";

import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import BottomTabButton from "../../components/UI/BottomTabButton";

const ItemDetailScreen = (props) => {
  const itemId = props.navigation.getParam("itemId");
  const selectedItem = useSelector((state) =>
    state.items.availableItems.find((item) => item.id === itemId)
  );
  const price = selectedItem.price.toLocaleString("ko-KR");

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const decreaseHandler = () => {
    if (quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    } else {
      return;
    }
  };

  const increaseHandler = () => {
    setQuantity((prevState) => prevState + 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.image} source={{ uri: selectedItem.imageUrl }} />
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{selectedItem.title}</Text>
            <Text style={styles.description}>{selectedItem.description}</Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.price}>가격</Text>
            <Text style={styles.price}>{price}원</Text>
          </View>
          <View style={styles.subContainer}>
            <ItemAmount
              quantity={quantity}
              onDecrease={decreaseHandler}
              onIncrease={increaseHandler}
            />
          </View>
          <View style={styles.subContainer}></View>
        </View>
      </ScrollView>
      <BottomTabButton
        onPress={() => {
          dispatch(cartActions.addToCart(selectedItem, quantity));
          props.navigation.goBack();
        }}
      >
        <View>
          <Text style={styles.addCarTitle}>카트에 담기</Text>
        </View>
      </BottomTabButton>
    </View>
  );
};

ItemDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("itemTitle"),
  };
};

export default ItemDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 250,
  },
  mainContainer: {
    marginHorizontal: 15,
  },
  titleContainer: {
    borderBottomColor: "#888",
    borderBottomWidth: 0.35,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  description: {
    marginVertical: 10,
    marginHorizontal: 15,
    color: "#888",
  },
  price: {
    fontSize: 18,
    marginVertical: 20,
  },
  addCartButtonContainer: {
    height: "12.5%",
    backgroundColor: Colors.primary,
  },
  addCarTitle: {
    fontSize: 20,
    color: "white",
    fontFamily: "open-sans-bold",
    textAlign: "center",
  },
});
