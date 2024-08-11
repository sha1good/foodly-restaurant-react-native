import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { OtpInput } from "react-native-otp-entry";
import { BaseUrl, COLORS } from "../constants/theme";
import BackBtn from "../components/BackBtn";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { VerificationStore } from "../store";

const bkImg =
  "https://d326fntlu7tb1e.cloudfront.net/uploads/8cd2cb78-c99c-4408-a333-91ec6c1bb9e3-restaurant_bk.png";

const VerificationPage = ({ navigation }) => {
  const [code, setCode] = useState("");

  const { isLoading, error, setError, email, setEmail } = VerificationStore(
    (state) => ({
      isLoading: state.isLoading,
      error: state.error,
      code: state.code,
      email: state.email,
      setEmail: state.setEmail,
      setError: state.setError,
    })
  );

  const verifyAccount = async () => {
    const token = await AsyncStorage.getItem("token");
    const accessToken = JSON.parse(token);

    VerificationStore.getState().toggleLoader(true);

    try {
      const response = await axios.get(`${BaseUrl}/api/users/verify/${code}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response.status);
      if (response.status === 200) {
        await AsyncStorage.setItem(
          "verification",
          JSON.stringify(response.data.verified)
        );
        await AsyncStorage.setItem("user", JSON.stringify(response.data));
        if (response.data.userType === "Client") {
          navigation.navigate("register");
        } else if (response.data.userType === "Vendor") {
          navigation.navigate("login");
        }

        VerificationStore.getState().toggleLoader(false);
      } else {
        setError(response.data);
        VerificationStore.getState().toggleLoader(false);
      }
    } catch (error) {
      VerificationStore.getState().toggleLoader(false);
      setError(error);
    }
  };

  useEffect(() => {
    getEmail();
  }, []);

  const getEmail = async () => {
    const data = await AsyncStorage.getItem("email");
    setEmail(JSON.parse(data));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: bkImg }}
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: 0.7,
          },
        ]}
      />

      <Text style={styles.otpText}>Verify Your Account</Text>

      <Text
        style={{
          fontSize: "regular",
          fontSize: 12,
          color: COLORS.gray,
          textAlign: "justify",
          margin: 12,
        }}
      >
        The email has been sent to {email}. If the email is correct, please
        delete this account and create a new one with the correct email.
        Alternatively, you can logout and browser the app without an account.
      </Text>

      <View style={{ alignItems: "center" }}>
        <OtpInput
          numberOfDigits={6}
          focusColor={COLORS.primary}
          focusStickBlinkingDuration={500}
          onFilled={(code) => setCode(code)}
          theme={{
            containerStyle: { margin: 10 },
            inputsContainerStyle: styles.inputsContainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          }}
        />

        <TouchableOpacity
          style={styles.sendCode}
          onPress={() => {
            verifyAccount(code);
          }}
        >
          {isLoading === true ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.buttonText}>Confirm Code</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerificationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    backgroundColor: COLORS.offwhite,
  },
  otpText: {
    fontSize: 30,
    color: COLORS.primary,
    fontWeight: "bold",
    margin: 10,
  },
  textInput: {
    padding: 5,
    width: 240,
    paddingHorizontal: 20,
    fontSize: 24,
    textAlign: "center",
    color: "#000",
  },
  sendVerification: {
    backgroundColor: "#3498db",
    padding: 20,
    borderRadius: 10,
  },
  sendCode: {
    padding: 14,
    width: "95%",
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: COLORS.primary,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    color: COLORS.secondary,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.primary,
  },
});
