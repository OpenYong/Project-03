import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useReducer } from "react";

import Input from "../../components/UI/Input";

import Colors from "../../constants/Colors";

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

const LoginScreen = () => {
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

  return (
    <View style={styles.mainContainer}>
      <Input
        id="email"
        label="이메일"
        placeholder="이메일 입력 "
        errorText="올바른 이메일을 입력해주세요."
        keyboardType="default"
        returnKeyType="next"
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
      <TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>로그인</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: "5%",
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 15,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
