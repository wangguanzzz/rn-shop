export const SIGNUP = "SIGNUP";
export const signup = (email, password) => {
  return async dispatch => {
    console.log("her!!!");
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
    dispatch({ type: SIGNUP });
  };
};
