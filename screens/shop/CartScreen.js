import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import BottomTabButton from "../../components/UI/BottomTabButton";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";

const CartScreen = (props) => {
  const shopId = props.navigation.getParam("shopId");
  const shops = useSelector((state) => state.shops.availableShops);
  const selectedShop = shops.find((shop) => shop.id === shopId);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        itemId: key,
        itemTitle: state.cart.items[key].itemTitle,
        itemPrice: state.cart.items[key].itemPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems;
  });
  let totalAmount = useSelector((state) => state.cart.totalAmount);
  totalAmount = totalAmount.toLocaleString("ko-KR");

  const dispatch = useDispatch();

  const increaseHnadler = (itemId) => {
    dispatch(cartActions.addOneToCart(itemId));
  };
  const decreaseHandler = (itemId) => {
    dispatch(cartActions.removeOneFromCart(itemId));
  };

  const deleteHandler = (itemId) => {
    Alert.alert("선택하신 메뉴를 삭제하시곘습니까?", "", [
      { text: "취소", style: "default" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          dispatch(cartActions.removeFromCart(itemId));
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <View style={styles.shopNameContainer}>
          <Text style={styles.shopName}>{selectedShop.shopName}</Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            style={styles.lists}
            data={cartItems}
            keyExtractor={(item) => item.itemId}
            renderItem={(itemData) => (
              <CartItem
                quantity={itemData.item.quantity}
                title={itemData.item.itemTitle}
                sum={itemData.item.sum}
                onRemove={deleteHandler.bind(this, itemData.item.itemId)}
                deletable
                onIncrease={increaseHnadler.bind(this, itemData.item.itemId)}
                onDecrease={() => decreaseHandler(itemData.item.itemId)}
              />
            )}
          />
        </View>
      </View>
      <BottomTabButton
        style={{
          backgroundColor: cartItems.length > 0 ? Colors.primary : "#BCAAA4",
        }}
        onPress={() => {
          if (cartItems.length > 0)
            dispatch(
              orderActions.addOrder(
                cartItems,
                totalAmount,
                selectedShop.shopName
              )
            );
        }}
      >
        <Text style={styles.orderButton}>{totalAmount}원 결제</Text>
      </BottomTabButton>
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "카트",
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
  },
  lists: {
    height: "100%",
  },
  summary: {
    backgroundColor: "white",
    marginVertical: 10,
    paddingTop: 20,
    height: "84.5%",
  },
  shopNameContainer: {
    borderBottomWidth: 0.25,
    borderBottomColor: "#888",
  },
  shopName: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  listContainer: {},
  orderButton: {
    color: "white",
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
});
