import { StyleSheet, FlatList, View, Text } from "react-native";
import { useSelector } from "react-redux";

import CoffeeItem from "../../components/shop/CoffeeItem";
import Colors from "../../constants/Colors";
import BottomTabButton from "../../components/UI/BottomTabButton";

const ItemsOverviewScreen = (props) => {
  const shopId = props.navigation.getParam("shopId");
  const items = useSelector((state) => state.items.availableItems);
  const cart = useSelector((state) => state.cart.items);
  let totalAmount = useSelector((state) => state.cart.totalAmount);

  totalAmount = totalAmount.toLocaleString("ko-KR");

  const selectedItems = items.filter(
    (item) => item.shopId.indexOf(shopId) >= 0
  );

  const cartLength = Object.keys(cart).length;

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={selectedItems}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <CoffeeItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {
              props.navigation.navigate({
                routeName: "ItemDetail",
                params: {
                  itemId: itemData.item.id,
                  itemTitle: itemData.item.title,
                },
              });
            }}
          />
        )}
      />
      <BottomTabButton
        style={styles.viewCartContainer}
        onPress={() =>
          props.navigation.navigate({
            routeName: "Cart",
            params: {
              shopId: shopId,
            },
          })
        }
      >
        <View style={styles.leftViewCartContainer}>
          <View style={styles.viewCartCountContainer}>
            <Text style={styles.viewCartCount}>{cartLength}</Text>
          </View>
          <Text style={styles.viewCartText}>카트 보기</Text>
        </View>
        <View>
          <Text style={styles.viewCartText}>{totalAmount}원</Text>
        </View>
      </BottomTabButton>
    </View>
  );
};

ItemsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("shopName"),
  };
};

export default ItemsOverviewScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  viewCartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  leftViewCartContainer: {
    flexDirection: "row",
  },
  viewCartCountContainer: {
    borderRadius: 30,
    width: 25,
    backgroundColor: "white",
    marginVertical: 2,
    marginHorizontal: 5,
    alignItems: "center",
  },
  viewCartCount: {
    fontFamily: "open-sans-bold",
    color: Colors.primary,
    textAlign: "center",
  },
  viewCartText: {
    color: "white",
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
});
