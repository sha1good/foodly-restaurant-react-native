import {
  ScrollView,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import styles from "./login.style";
import LottieView from "lottie-react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  MaterialCommunityIcons,
  Ionicons,
  EvilIcons,
} from "@expo/vector-icons";
import { BaseUrl, COLORS, SIZES } from "../constants/theme";
import BackBtn from "../components/BackBtn";
import Button from "../components/Button";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ImageUploader from "../components/ImageUploader";
import { fbApp } from "../../firebase-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Password must be at least 8 character")
    .required("Required"),
  businessHrs: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  postalCode: Yup.string().required("This field is required"),
});

const Submitdata = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const [logoUrl, setLogoUrl] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);
  const [loader, setLoader] = useState(false);
  const addressData = router.params;

  const inValidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
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
  };

  const handleSubmit = async (values) => {
    console.log("my val ", JSON.stringify(values));
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    const owner = id ? JSON.parse(id) : null;
    const accessToken = token ? JSON.parse(token) : null;

    if (!accessToken || !owner) {
      console.error("Token or ID is missing");
      return;
    }

    setLoader(true);
    const data = {
      time: values.businessHrs,
      title: values.title,
      code: values.postalCode,
      logoUrl: logoUrl,
      owner: owner,
      imageUrl: coverUrl,
      coords: {
        id: 576576,
        latitude: addressData.region.latitude,
        longitude: addressData.region.longitude,
        address: values.address,
        title: values.title,
      },
      location: {
        coordinates: [

          addressData.region.longitude,
          addressData.region.latitude,
        ]
    }
    };
    console.log("my data ",data);
    try {
      const response = await axios.post(`${BaseUrl}/api/restaurant`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      

      if (response.status === 201) {
       
        await AsyncStorage.setItem(
          "restaurant",
          JSON.stringify(response.data._id)
        );
        await AsyncStorage.setItem(
          "restaurantStatus",
          JSON.stringify(response.data.verification)
        );
        await AsyncStorage.setItem(
          "userType", "Vendor"
        );
        navigation.navigate('pending');
      }
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      console.log(error.response ? error.response.data : error.message);

      if (error.message === "Restaurant with this code already exists") {
        console.log(error.response.data._id);
        await AsyncStorage.setItem(
          "userType",
          JSON.stringify(error.response.data.data.userType)
        );
        if (
          error.response.data.data.verification === "Pending" ||
          error.response.data.data.verification === "Rejected"
        ) {
          navigation.navigate("pending");
        } else if (error.response.data.data.verification === "Verified") {
          navigation.navigate("home");
        }
      }
    }
    setLoader(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView>
        <BackBtn onPress={() => navigation.goBack()} />
        <View style={{ marginHorizontal: 20, marginTop: 50 }}>
          <Text style={[styles.titleLogin, { fontSize: 20, marginLeft: 0 }]}>
            Complete Registration
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ImageUploader
              selectedImage={logoUrl}
              setSelectedImage={setLogoUrl}
              label={"Upload Logo"}
            />

            <ImageUploader
              selectedImage={coverUrl}
              setSelectedImage={setCoverUrl}
              label={"Upload Cover"}
            />
          </View>

          <Formik
            initialValues={{
              title: "",
              businessHrs: "",
              address: addressData.address,
              postalCode: addressData.postalCode,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
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
                  <Text style={styles.label}>Restaurant Title</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.title ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <Ionicons
                      name="fast-food-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder="Restaurant Title"
                      onFocus={() => {
                        setFieldTouched("title");
                      }}
                      onBlur={() => {
                        setFieldTouched("title", "");
                      }}
                      value={values.title}
                      onChangeText={handleChange("title")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.title && errors.title && (
                    <Text style={styles.errorMessage}>{errors.title}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Business Hours</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.businessHrs ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <Ionicons
                      name="time-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder="8:00 AM - 10:00 PM"
                      onFocus={() => {
                        setFieldTouched("businessHrs");
                      }}
                      onBlur={() => {
                        setFieldTouched("businessHrs", "");
                      }}
                      value={values.businessHrs}
                      onChangeText={handleChange("businessHrs")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.businessHrs && errors.businessHrs && (
                    <Text style={styles.errorMessage}>
                      {errors.businessHrs}
                    </Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Address</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.address ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder="Address"
                      onFocus={() => {
                        setFieldTouched("address");
                      }}
                      onBlur={() => {
                        setFieldTouched("address", "");
                      }}
                      value={values.address}
                      onChangeText={handleChange("address")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.address && errors.address && (
                    <Text style={styles.errorMessage}>{errors.address}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Postal Code</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.businessHrs ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder="Postal Code"
                      onFocus={() => {
                        setFieldTouched("postalCode");
                      }}
                      onBlur={() => {
                        setFieldTouched("postalCode", "");
                      }}
                      value={values.postalCode}
                      onChangeText={handleChange("postalCode")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.postalCode && errors.postalCode && (
                    <Text style={styles.errorMessage}>{errors.postalCode}</Text>
                  )}
                </View>

                <Button
                  loader={loader}
                  title={"R  E  G  I  S  T  E  R"}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Submitdata;
