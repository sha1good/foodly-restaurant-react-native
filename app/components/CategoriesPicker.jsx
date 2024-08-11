import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import fetchCategories from "../hooks/fetchCategories";
import HorizontalShimmer from "../components/Shimmers/HorizontalShimmer";
import { COLORS } from "../constants/theme";

const CategoriesPicker = ({onPress, setCategories }) => {
  const { categories, isLoading, error, refetch } = fetchCategories();

  if (isLoading) {
    return <HorizontalShimmer />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => {setCategories(item._id); onPress()}}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />

      <Text style={styles.title}>{item.title}</Text>

      
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default CategoriesPicker;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 6,
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  title: {
    fontFamily: "regular",
    fontSize: 12,
    paddingLeft: 30,
    color: COLORS.primary,
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
});
