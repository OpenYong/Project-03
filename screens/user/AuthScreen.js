import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import React, { useCallback, useReducer, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../../components/UI/Input";

import Colors from "../../constants/Colors";

import * as authActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.validity,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
      name: "",
    },
    inputValidities: {
      email: false,
      password: false,
      name: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    const loginFunc = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expDate } = transformedData;

      const expirationDate = new Date(expDate);

      if (!token || !userId || expirationDate <= new Date()) {
        props.navigation.navigate("Auth");
        return;
      }

      props.navigation.navigate("Mypage");
      dispatch(authActions.authenticate(userId, token));
    };

    loginFunc();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert(isLogin ? "????????? ??????" : "???????????? ??????", error, [
        { text: "??????" },
      ]);
    }
  }, [error]);

  const changeHandler = useCallback(
    (inputId, inputValue, inputValiditiy) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        validity: inputValiditiy,
        input: inputId,
      });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    let action;
    if (isLogin) {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.name
      );
    } else {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.name
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      if (isLogin) {
        props.navigation.navigate("Mypage");
      } else {
        props.navigation.navigate("Auth");
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Input
        id="email"
        label="?????????"
        placeholder="????????? ?????? "
        errorText="????????? ???????????? ??????????????????."
        keyboardType="email-address"
        returnKeyType="next"
        autoCapitalize="none"
        onInputChange={changeHandler}
        // initialValue=""
        // initialValidity={true}
        email
      />
      <Input
        id="password"
        label="????????????"
        placeholder="???????????? ?????? "
        errorText="??????????????? ??????????????????."
        keyboardType="default"
        returnKeyType="next"
        onInputChange={changeHandler}
        required
        // initialValue=''
        // initialValidity={false}
      />
      {!isLogin && (
        <Input
          id="name"
          label="??????"
          placeholder="?????? ?????? "
          errorText="????????? ??????????????????."
          keyboardType="default"
          returnKeyType="done"
          onInputChange={changeHandler}
          required
          // initialValue=''
          // initialValidity={false}
        />
      )}
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Button
            title={isLogin ? "?????????" : "????????????"}
            style={styles.buttonContainer}
            color="white"
            onPress={authHandler}
          />
        )}
      </View>
      <Text>
        {isLogin ? `???????????????????` : `????????? ????????????????`}
        <Button
          title={isLogin ? `????????????` : `?????????`}
          onPress={() => {
            setIsLogin((prevState) => !prevState);
          }}
        />
      </Text>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: Colors.primary,
    marginBottom: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
