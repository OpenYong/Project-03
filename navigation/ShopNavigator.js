import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ShopOverviewScreen from "../screens/shop/ShopOverviewScreen";
import ItemsOverviewScreen from "../screens/shop/ItemsOverviewScreen";
import ItemDetailScreen from "../screens/shop/ItemDetailScreen";
import Colors from "../constants/Colors";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import MypageScreen from "../screens/user/MypageScreen";
import AuthScreen from "../screens/user/AuthScreen";
import MyShopsScreen from "../screens/user/MyShopsScreen";
import ShopRegisterScreen from "../screens/user/ShopRegisterScreen";
import StartScreen from "../screens/StartScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ItemNavigator = createStackNavigator(
  {
    ShopOverview: {
      screen: ShopOverviewScreen,
      navigationOptions: { headerTitle: "매장" },
    },
    ItemsOverview: {
      screen: ItemsOverviewScreen,
      navigationOptions: { tabBarVisible: false },
    },
    ItemDetail: ItemDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

ItemNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

// const AuthNavigator = createStackNavigator({
//   Auth: AuthScreen,
// });

const MypageNavigator = createStackNavigator(
  {
    Mypage: {
      screen: MypageScreen,
      navigationOptions: { headerShown: false },
    },
    MyShops: {
      screen: MyShopsScreen,
      navigationOptions: {
        headerShown: true,
        headerTitle: "카페 관리",
        headerBackTitleVisible: false,
      },
    },
    ShopRegister: {
      screen: ShopRegisterScreen,
      navigationOptions: {
        headerShown: true,
        headerTitle: "카페 등록",
        headerBackTitleVisible: false,
      },
    },
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AuthCheckNavigator = createSwitchNavigator({
  Auth: AuthScreen,
  Mypage: MypageNavigator,
});

MypageNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const ShopOverviewNavigator = createBottomTabNavigator(
  {
    Item: {
      screen: ItemNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="ios-home" size={24} color="black" />;
        },
        tabBarColor: Colors.accent,
        tabBarLabel: Platform.OS === "android" ? <Text>홈</Text> : "홈",
      },
    },
    Orders: {
      screen: OrdersNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="ios-clipboard" size={24} color="black" />;
        },
        tabBarColor: Colors.accent,
        tabBarLabel:
          Platform.OS === "android" ? <Text>주문내역</Text> : "주문내역",
      },
    },
    Mypage: {
      screen: AuthCheckNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="ios-clipboard" size={24} color="black" />;
        },
        tabBarColor: Colors.accent,
        tabBarLabel:
          Platform.OS === "android" ? <Text>주문내역</Text> : "마이페이지",
      },
    },
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontFamily: "open-sans",
      },
      activeTintColor: Colors.accentColor,
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Start: StartScreen,
  Shop: ShopOverviewNavigator,
});

export default createAppContainer(MainNavigator);
