import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useReducer, useEffect } from "react";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };

    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, disptch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initialValidity,
    touched: false,
  });

  const { onInputChange, placeholder, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange]);

  const inputChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    disptch({ type: INPUT_CHANGE, value: text, isValid });
  };

  const blurHandler = () => {
    disptch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{props.label}</Text>
        <TextInput
          {...props}
          style={styles.input}
          value={inputState.value}
          placeholder={placeholder}
          onChangeText={inputChangeHandler}
          onBlur={blurHandler}
        />
      </View>
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: "5%",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12.5,
    flexDirection: "row",
  },
  label: {
    width: "18%",
  },
  input: {
    width: "82%",
  },
  errorContainer: {
    marginVertical: 5,
  },
});
