import { StyleSheet, Text, View, Button } from "react-native";
import React, { useCallback, useReducer, useState } from "react";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import ImageSelector from "../../components/UI/ImageSelector";

import * as shopActions from "../../store/actions/shops";

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

const ShopRegisterScreen = (props) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      shopName: "",
      description: "",
    },
    inputValidities: {
      shopName: false,
      description: false,
    },
    formIsValid: false,
  });

  const changeHandler = useCallback(
    (inputId, inputValue, inputValiditiy) => {
      console.log(inputId, inputValue);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        validity: inputValiditiy,
        input: inputId,
      });
    },
    [dispatchFormState]
  );

  const submitHandler = () => {
    dispatch(
      shopActions.createShop(
        formState.inputValues.shopName,
        formState.inputValues.description,
        selectedImage
      )
    );
    props.navigation.goBack();
  };

  const imagePickedHandler = (img) => {
    setSelectedImage(img);
  };

  return (
    <View style={styles.mainContainer}>
      <Input
        id="shopName"
        label="카페명"
        placeholder="카페 이름 "
        errorText="이름을 입력해주세요."
        keyboardType="default"
        returnKeyType="next"
        onInputChange={changeHandler}
        // initialValue=""
        // initialValidity={true}
        required
      />
      <Input
        id="description"
        label="카페 소개"
        placeholder="카페 소개 "
        errorText="카페 소개를 입력해주세요."
        keyboardType="default"
        returnKeyType="next"
        onInputChange={changeHandler}
        // initialValue=""
        // initialValidity={true}
        required
      />
      <ImageSelector onImagePicked={imagePickedHandler} />
      <Button title="확인" onPress={submitHandler} />
    </View>
  );
};

export default ShopRegisterScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
