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
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ShopList
          image={itemData.item.imageUrl}
          shopName={itemData.item.shopName}
          description={itemData.item.description}
          hasParkingLot={itemData.item.hasParkingLot}
          hasTables={itemData.item.hasTables}
          onSelect={() => {
            props.navigation.navigate({
              routeName: "ItemsOverview",
              params: {
                shopId: itemData.item.id,
                shopName: itemData.item.shopName,
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
