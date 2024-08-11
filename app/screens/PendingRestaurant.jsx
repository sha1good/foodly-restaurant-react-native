import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
const bkImg =
  "https://d326fntlu7tb1e.cloudfront.net/uploads/8cd2cb78-c99c-4408-a333-91ec6c1bb9e3-restaurant_bk.png";

const PendingRestaurant = ({navigation}) => {
  const [email, setMail] = useState("");
  useEffect(() => {
    getEmail();
  }, []);

  const getEmail = async () => {
    const data = await AsyncStorage.getItem("email");
    setMail(JSON.parse(data));
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

      <Text style={styles.otpText}>Restaurant Under Review</Text>

      <Text
        style={{
          fontSize: "regular",
          fontSize: 12,
          color: COLORS.gray,
          textAlign: "justify",
          margin: 12,
        }}
      >
        Your restaurant is currently under review. Please allow up to 24 hours
        for the verification process to be completed. An email notification will
        be sent to your {email} email address as soon as your restaurant is
        verified.
      </Text>

      <View style={{justifyContent: "center", alignItems: "center"}}>
      <Button
        loader={false}
        title={"G O   T O   L O G I N  "}
        onPress={()=> {navigation.navigate('login')}}
        isValid={true}
      />
      </View>
      
    </SafeAreaView>
  );
};

export default PendingRestaurant;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    backgroundColor: COLORS.offwhite,
  },
  otpText: {
    fontSize: 24,
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
