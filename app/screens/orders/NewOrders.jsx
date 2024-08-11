import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { BaseUrl, COLORS } from "../../constants/theme";
import HorizontalShimmer from "../../components/Shimmers/HorizontalShimmer";

const NewOrders = () => {
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const status = "placed";
  const navigation = useNavigation();

  const fetchData = async (id) => {
    setIsLoading(true);
    console.log(`${BaseUrl}/api/orders/orderslist/${id}?status=${status}`);
    try {
      const response = await axios.get(
        `${BaseUrl}/api/orders/orderslist/${id}?status=${status}`
      );

      console.log("data ", response.data);
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

  const getRestaurantData = async () => {
    const data = await AsyncStorage.getItem("restaurant");
    const restaurant = JSON.parse(data);
    fetchData(restaurant._id);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate("order-details", item);
        
      }}
    >
      <Image
        source={{ uri: item.orderItems[0].foodId.imageUrl[0] }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.orderItems[0].foodId.title}</Text>
        <View style={styles.status}>
          {item.paymentStatus === "Pending" ? (
            <Text style={[styles.statusText, styles.pending]}>Pending</Text>
          ) : (
            <Text style={[styles.statusText, styles.completed]}>Completed</Text>
          )}
        </View>
        
        {item.orderItems[0].additives.length > 0 && (
          <View style={{ flexDirection: "row" }}>
            {item.orderItems[0].additives.map((additive, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.text}>{additive.title}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.price}>
          Qty * {item.orderItems[0].quantity}
        </Text>
        <Text style={styles.time}>{item.orderItems[0].foodId.time}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <HorizontalShimmer />;
  }

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

export default NewOrders;

const styles = StyleSheet.create({
  status:{
  backgroundColor: COLORS.secondary,
  borderRadius: 10,
  paddingHorizontal: 2,
  marginTop: 2,
  marginHorizontal: 2,
  width:75,
},

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
    marginHorizontal: 3,
  },
  text: {
    color: "white",
    fontSize: 11,
    fontFamily: "regular",
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "left",
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
  statusText: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 0,
  },
  pending: {
    backgroundColor: COLORS.orange,
    color: COLORS.white,
  },
  completed: {
    backgroundColor: COLORS.green,
    color: COLORS.white,
  },
});
