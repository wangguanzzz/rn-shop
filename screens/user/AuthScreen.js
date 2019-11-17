import React, { useReducer, useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedVales = { ...state.inputValues, [action.input]: action.value };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    const updatedFormValid = {
      ...state.formIsValid
    };

    let updatedFormIsValid = true;
    for (key in updatedValidities) {
      updatedFormIsValid = updatedValidities[key] && updatedFormIsValid;
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedVales,
      inputValidities: updatedValidities
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error occurred", error, [{ text: "Okay" }]);
    }
  }, [error]);
  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }

    setIsLoading(true);
    setError(null);
    try {
      await dispatch(action);
      props.navigation.navigate("Shop");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <View style={styles.buttonContainer}>
              <Input
                id="email"
                label="E-Mail"
                keyboardtype="email-address"
                required
                email
                autoCapitalized="none"
                errorText="please enter a valid email"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            </View>
            <View style={styles.buttonContainer}>
              <Input
                id="password"
                label="Password"
                keyboardtype="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalized="none"
                errorText="please enter a valid password"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Button
                title={isSignup ? "Signup" : "login"}
                color={Colors.primary}
                onPress={authHandler}
              />
            )}

            <Button
              title={`Switch to ${isSignup ? "login" : "signup"}`}
              color={Colors.accent}
              onPress={() => {
                setIsSignup(prev => {
                  return !prev;
                });
              }}
            />
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
AuthScreen.navigationOptions = {
  headerTitle: "Authenticate"
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  gradient: { flex: 1, justifyContent: "center", alignContent: "center" },
  authContainer: { width: "80%", maxWidth: 400, height: "50%", maxHeight: 400 },
  buttonContainer: { marginTop: 10 }
});
export default AuthScreen;
