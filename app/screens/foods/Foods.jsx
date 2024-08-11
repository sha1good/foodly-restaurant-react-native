import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";
import fetchFoodsByRest from "../../hooks/fetchFoodsByRest";
import HorizontalShimmer from "../../components/Shimmers/HorizontalShimmer";
import { background } from '../../constants/uidata'
import { COLORS, SIZES } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";

const Foods = ({navigation}) => {
  const { foods, isLoading, error, refetch } =
    fetchFoodsByRest();

  if (isLoading === true) {
    return <HorizontalShimmer />;
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      
    >
      <Image source={{ uri: item.imageUrl[0] }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subTitle} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View
        style={[
          styles.statusContainer,
          item.isAvailable ? styles.open : styles.closed,
        ]}
      >
        <Text style={styles.statusText}>
          {item.isAvailable ? item.time : item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{backgroundColor:COLORS.white }}>
       <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backbtn}
        >
        <Ionicons name="chevron-back-circle" size={30} color={COLORS.primary} />

        </TouchableOpacity>
      <View style={{ marginTop:70 }}></View>
      <FlatList
        data={foods}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={{marginTop: 10}}
      />
    </View>
  );
};

export default Foods;

const styles = StyleSheet.create({
  backbtn: {
    marginLeft: 12,
    alignItems: "center",
    position: "absolute",
    zIndex: 999,
    top: SIZES.xxLarge,
  },

  itemContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
    marginBottom: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  subTitle: {
    width: "90%",
    fontSize: 12,
    color: "gray",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
    position: "absolute",
    bottom: 0,
    right: 10,
  },
  statusContainer: {
    position: "absolute",
    top: 15,
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
