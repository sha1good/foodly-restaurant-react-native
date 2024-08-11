import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AssetImage from "../components/AssetImage";
import { BaseUrl, COLORS, SIZES } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeHeader = () => {
  const [data, setData] = useState(null);
  const navigation = useNavigation();

  const getTimeOfDay = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 0 && hour < 12) {
      return "☀️ ";
    } else if (hour >= 12 && hour < 17) {
      return "🌤️ ";
    } else {
      return "🌙 ";
    }
  };

  useEffect(() => {
    getRestaurantData();
  }, []);

  const getRestaurantData = async () => {
    const data = await AsyncStorage.getItem("restaurant");
    //get restaurant info
    setData(JSON.parse(data));
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" ,}}>
      <View style={styles.outerStyle}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("profile");
          }}
        >
          <AssetImage
            data={require("../../assets/images/profile.jpg")}
            mode={"cover"}
            width={45}
            height={45}
            radius={99}
          />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.heading}>Location</Text>
          {data === null ? (
            <Text numberOfLines={2} style={styles.location}>
              ....loading....
            </Text>
          ) : (
            <Text numberOfLines={2} style={styles.location}>
              {data.coords.address}
            </Text>
          )}
        </View>
      </View>

      <Text style={styles.time}>{getTimeOfDay()}</Text>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  outerStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    
  },

  headerText: {
    marginLeft: 15,
    width: "80%",
    justifyContent: "center",
  },

  heading: {
    fontFamily: "medium",
    fontSize: SIZES.medium - 3,
    color: COLORS.secondary,
  },

  time: {
    position: "absolute",
    right: 0,
    fontFamily: "medium",
    fontSize: SIZES.xxLarge - 8,
    color: COLORS.secondary,
    marginRight: 5,
  },

  location: {
    fontFamily: "regular",
    fontSize: SIZES.small - 2,
    color: COLORS.gray,
  },
});
