import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import Button from "../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BaseUrl, COLORS, SIZES } from "../constants/theme";
import styles from "./login.style";
import LottieView from "lottie-react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginStore } from "../store";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 character")
    .required("Required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
});

const LoginPage = ({ navigation }) => {
  const {
    isLoading,
    toggleObsecure,
    isObsecure,
    isLoggedIn,
    setLoggedIn,
    restaurantId,
    setUserToken,
  } = LoginStore((state) => ({
    isLoading: state.isLoading,
    isLoggedIn: state.isLoggedIn,
    toggleObsecure: state.toggleObsecure,
    isObsecure: state.isObsecure,
    setLoggedIn: state.setLoggedIn,
    setUserToken: state.setUserToken,
    restaurantId: state.userToken,
  }));

  const checkStatus = async () => {
    const token = await AsyncStorage.getItem("token");
    const userType = JSON.parse(await AsyncStorage.getItem("userType"));
    const verification =
      JSON.parse(await AsyncStorage.getItem("verification")) ?? false;

    if (token !== null && verification === false) {
      setLoggedIn("NOT_VERIFIED");
      navigation.navigate("verification_page");
    } else if (token === null) {
      setLoggedIn("LOGGED_OUT");
    } else if (token !== null && userType === "Vendor") {
      navigation.navigate("home");

      if (userType === "Vendor") {
        setLoggedIn("LOGGED_IN");
      } else {
        setLoggedIn("NOT_REGISTERED");
        navigation.navigate("register");
      }
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const inValidForm = () => {
    alert("Please provide all required fields");
  };

  const loginFunc = async (values) => {
    LoginStore.getState().toggleLoader();
    try {
      const endpoint = `${BaseUrl}/login`;
      const data = values;
      const response = await axios.post(endpoint, data);
      console.log("my rest ", response);
      if (response.status === 200) {
        console.log("my res1 ",response.data);
        await AsyncStorage.setItem("latitude", JSON.stringify(response.data.latitude));
        await AsyncStorage.setItem("longitude", JSON.stringify(response.data.longitude));

        if (response.data.verified === false) {
          LoginStore.getState().toggleLoader();
          navigation.navigate("verification_page");
        }

        await AsyncStorage.setItem("id", JSON.stringify(response.data._id));
        await AsyncStorage.setItem(
          "token",
          JSON.stringify(response.data.userToken)
        );
        setUserToken(response.data.userToken);

        await AsyncStorage.setItem(
          "verification",
          JSON.stringify(response.data.verified)
        );

        await AsyncStorage.setItem(
          "userType",
          JSON.stringify(response.data.userType)
        );
        await AsyncStorage.setItem(
          "email",
          JSON.stringify(response.data.email)
        );

        await AsyncStorage.setItem("user", JSON.stringify(response.data));
        LoginStore.getState().toggleLoader();

        if (response.data.userType === "Vendor") {
          await AsyncStorage.setItem(
            "restaurant",
            JSON.stringify(response.data)
          );
          console.log(response.data);
          await AsyncStorage.setItem("latitude", JSON.stringify(response.data.latitude));
          await AsyncStorage.setItem("longitude", JSON.stringify(response.data.longitude));
          const x =  await AsyncStorage.getItem("restaurant");
          console.log(JSON.parse(x)["latitude"]);
          await getRestaurant();
        }
      } else {
        Alert.alert("Error Logging in ", "Please provide valid credentials ", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {},
          },
          { defaultIndex: 1 },
        ]);
      }
    } catch (error) {
      LoginStore.getState().toggleLoader();
      Alert.alert("Error ", "Oops, " + error.message, [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Continue",
          onPress: () => {},
        },
        { defaultIndex: 1 },
      ]);
    } finally {
      LoginStore.getState().toggleLoader();
    }
  };

  async function getRestaurant() {
    const token = await AsyncStorage.getItem("token");
    const accessToken = JSON.parse(token);

    try {
      const response = await axios.get(
        `${BaseUrl}/api/restaurant/owner/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        if (response.data.verification === "Pending") {
          LoginStore.getState().toggleLoader();
          navigation.navigate("pending");
        } else if (response.data.verification === "Verified") {
          console.log("--verified1--");
          await AsyncStorage.setItem(
            "restaurant",
            JSON.stringify(response.data)
          );
          LoginStore.getState().toggleLoader();
          console.log("--verified2--");
          navigation.navigate("home");
          console.log("--verified3--");
        }
      }
    } catch (error) {}
  }

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <View style={{ marginHorizontal: 20, marginTop: 50 }}>
        <LottieView
          autoPlay
          style={{ width: "100%", height: SIZES.height / 3.2 }}
          source={require("../../assets/anime/delivery.json")}
        />

        <Text style={styles.titleLogin}>Foodly Family</Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => loginFunc(values)}
        >
          {({
            handleChange,
            handleBlur,
            touched,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched,
          }) => (
            <View>
              <View style={styles.wrapper}>
                <Text style={styles.label}>Email</Text>
                <View
                  style={styles.inputWrapper(
                    touched.email ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />

                  <TextInput
                    placeholder="Enter email"
                    onFocus={() => {
                      setFieldTouched("email");
                    }}
                    onBlur={() => {
                      setFieldTouched("email", "");
                    }}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorMessage}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Password</Text>
                <View
                  style={styles.inputWrapper(
                    touched.password ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />

                  <TextInput
                    secureTextEntry={isObsecure}
                    placeholder="Password"
                    onFocus={() => {
                      setFieldTouched("password");
                    }}
                    onBlur={() => {
                      setFieldTouched("password", "");
                    }}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      toggleObsecure(!isObsecure);
                    }}
                  >
                    <MaterialCommunityIcons
                      name={isObsecure ? "eye-outline" : "eye-off-outline"}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>

              <Button
                loader={isLoading}
                title={"L O G I N"}
                onPress={isValid ? handleSubmit : inValidForm}
                isValid={isValid}
              />

              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text
                  style={[styles.registration, { color: COLORS.primary }]}
                  onPress={() => {
                    navigation.navigate("signup");
                  }}
                >
                  Register client account
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default LoginPage;
