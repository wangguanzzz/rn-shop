import React, { useReducer, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Button
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
  const dispatch = useDispatch();
  const signupHandler = () => {
    console.log("trigger");
    dispatch(
      authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      )
    );
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
            <Button
              title="login"
              color={Colors.primary}
              onPress={signupHandler}
            />
            <Button
              title="Switch to Sign Up"
              color={Colors.accent}
              onPress={() => {}}
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
