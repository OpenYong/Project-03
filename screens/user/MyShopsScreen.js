import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import ShopList from "../../components/shop/ShopList";

const MyShopsScreen = (props) => {
  const userShops = useSelector((state) => state.shops.userShops);
  return (
    <FlatList
      data={userShops}
      keyExtractor={(shop) => shop.id}
      renderItem={(shopData) => (
        <ShopList
          image={shopData.item.imageUrl}
          shopName={shopData.item.shopName}
          description={shopData.item.description}
          hasParkingLot={shopData.item.hasParkingLot}
          hasTables={shopData.item.hasTables}
        />
      )}
    />
  );
};

MyShopsScreen.navigationOptions = (navigationData) => {
  return {
    headerRight: () => (
      <Button
        onPress={() => {
          navigationData.navigation.navigate({
            routeName: "ShopRegister",
            // params: {
            //   shopId: itemData.item.id,
            //   shopName: itemData.item.shopName,
            // },
          });
        }}
        title="등록"
        color="black"
      />
    ),
  };
};

export default MyShopsScreen;

const styles = StyleSheet.create({
  // mainContainer: {
  //   flex: 1,
  //   backgroundColor: "white",
  // },
});
