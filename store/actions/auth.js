export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const signup = (email, password) => {
  return async dispatch => {
    console.log("signup!!!");
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwfRtGUjQpWYASiU9ldDfH3j6G5-KKy60",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );
    if (!response.ok) {
      throw new Error("something went wrong");
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
  };
};
export const login = (email, password) => {
  return async dispatch => {
    console.log("login!!!");
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwfRtGUjQpWYASiU9ldDfH3j6G5-KKy60",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );
    if (!response.ok) {
      // throw new Error("something went wrong");
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "something went wrong";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "this email could not be found";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};
