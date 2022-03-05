import React from "react";
import { StyleSheet, FlatList, Platform } from "react-native";
import { useSelector } from "react-redux";

import ShopList from "../../components/shop/ShopList";
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const ShopOverviewScreen = (props) => {
  const shops = useSelector((state) => state.shops.availableShops);
  return (
    <FlatList
      data={shops}
      keyExtractor={(shop) => shop.id}
      renderItem={(shopData) => (
        <ShopList
          image={shopData.item.imageUrl}
          shopName={shopData.item.shopName}
          description={shopData.item.description}
          hasParkingLot={shopData.item.hasParkingLot}
          hasTables={shopData.item.hasTables}
          onSelect={() => {
            props.navigation.navigate({
              routeName: "ItemsOverview",
              params: {
                shopId: shopData.item.id,
                shopName: shopData.item.shopName,
              },
            });
          }}
        />
      )}
    />
  );
};

export default ShopOverviewScreen;

const styles = StyleSheet.create({});
