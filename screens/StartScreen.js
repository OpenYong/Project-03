import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const StartScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loginFunc = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Mypage");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expDate } = transformedData;

      const expirationDate = new Date(expDate);

      if (!token || !userId || expirationDate <= new Date()) {
        props.navigation.navigate("Mypage");
        return;
      }

      props.navigation.navigate("Item");
      dispatch(authActions.authenticate(userId, token));
    };

    loginFunc();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size={"large"} color={Colors.primary} />
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
