import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { BaseUrl, COLORS } from "../../constants/theme";
import HorizontalShimmer from "../../components/Shimmers/HorizontalShimmer";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cancelled = ({}) => {
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const status = "cancelled";
  const navigation = useNavigation();

  const fetchData = async (id) => {
    setIsLoading(true);

    try {
      console.log("1");
      const response = await axios.get(
        `${BaseUrl}/api/orders/orderslist/${id}?status=${status}`
      );
      console.log("2");


      setOrders(response.data);

      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRestaurantData();
  }, []);

  const getRestaurantData = async() => {
    const data = await AsyncStorage.getItem('restaurant');
    const restaurant = JSON.parse(data);
    fetchData(restaurant._id);
  }

  if (isLoading) {
    return <HorizontalShimmer />;
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => {
      navigation.navigate("order-details", item);
      
    }}>
      <Image
        source={{ uri: item.orderItems[0].foodId.imageUrl[0] }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.orderItems[0].foodId.title}</Text>
        <Text style={[styles.subTitle, { paddingTop: 3 }]} numberOfLines={2}>
          {item.orderItems[0].foodId._id}
        </Text>
        {/* <Text style={[styles.subTitle, { paddingTop: 3 }]} numberOfLines={2}>
          {item.deliveryAddress.addressLine1}
        </Text> */}

        <View style={{ flexDirection: "row" }}>
          {item.orderItems[0].additives.length > 0 &&
            item.orderItems[0].additives.map((item, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.text}>{item.title}</Text>
              </View>
            ))}
        </View>

       

        <Text style={styles.price}>Qty * {item.orderItems[0].quantity}</Text>
        <Text style={styles.time}> {item.orderItems[0].foodId.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default Cancelled;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 6,
    alignItems: "center",
    backgroundColor: COLORS.offwhite,
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  item: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingHorizontal: 5,
    marginTop: 5,
    marginHorizontal: 3
  },
  text: {
    color: "white",
    fontSize: 11, 
    fontFamily: "regular"
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  title: {
    fontFamily: "bold",
    fontSize: 15,
  },
  subTitle: {
    width: "90%",
    fontSize: 12,
    color: "gray",
  },
  price: {
    fontSize: 14,
    fontFamily: "bold",
    color: "gray",
    position: "absolute",
    top: 0,
    right: 0,
  },
  time: {
    fontSize: 14,
    fontFamily: "bold",
    color: COLORS.primary,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  statusContainer: {
    position: "absolute",
    right: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
  open: {
    backgroundColor: COLORS.primary,
  },
  closed: {
    backgroundColor: COLORS.red,
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
  },
  // Add other styles to match the design as needed
});
