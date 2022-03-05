import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const MypageScreen = (props) => {
  const userId = useSelector((state) => state.auth.userId);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>사용자 이름</Text>
        <Text style={styles.userEmail}>{userId}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({
            routeName: "MyShops",
          });
        }}
      >
        <View style={styles.lists}>
          <Text>카페 관리</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.lists}>
          <Text>설정</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MypageScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  userInfoContainer: {
    height: "25%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    justifyContent: "flex-end",
    padding: "7.5%",
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: "2.5%",
  },
  userEmail: {
    fontSize: 16,
    fontWeight: "400",
  },
  lists: {
    padding: "5%",
    paddingHorizontal: "7.5%",
  },
});
