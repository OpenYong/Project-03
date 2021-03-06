import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useCallback, useReducer } from "react";
import { useDispatch } from "react-redux";

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

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

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

  const loginHandler = () => {
    dispatch(
      authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      )
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Input
        id="email"
        label="이메일"
        placeholder="이메일 입력 "
        errorText="올바른 이메일을 입력해주세요."
        keyboardType="E-Mail"
        returnKeyType="next"
        autoCapitalize="none"
        onInputChange={changeHandler}
        // initialValue=""
        // initialValidity={true}
        email
      />
      <Input
        id="password"
        label="비밀번호"
        placeholder="비밀번호 입력 "
        errorText="비밀번호를 입력해주세요."
        keyboardType="default"
        returnKeyType="next"
        onInputChange={changeHandler}
        required
        // initialValue=''
        // initialValidity={false}
      />
      <View style={styles.buttonContainer}>
        <Button title="로그인" color="white" onPress={loginHandler} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="회원가입"
          style={styles.buttonContainer}
          color="white"
          onPress={() => {
            props.navigation.navigate({
              routeName: "Signup",
            });
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
