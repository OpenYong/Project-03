import AsyncStorage from "@react-native-async-storage/async-storage";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId, token };
};

export const signup = (enteredEmail, enteredPassword, enteredName) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      }),
    });

    if (response.status === 422) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();

    console.log(responseData);

    dispatch({ type: SIGNUP });
  };
};

export const login = (enteredEmail, enteredPassword) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    });

    if (response.status === 422) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    if (response.status === 401) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    if (response.status !== 200 && response.status !== 201) {
      throw new Error("로그인 실패");
    }

    const responseData = await response.json();

    console.log(responseData);

    dispatch(authenticate(responseData.userId, responseData.token));
    const expTime = new Date(
      new Date().getTime() + responseData.expiresIn * 1000
    );
    saveDataToStorage(responseData.token, responseData.userId, expTime);
  };
};

const saveDataToStorage = (token, userId, expTime) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expDate: expTime.toISOString(),
    })
  );
};
