import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/theme";

const order = [
  "New Orders",
  "Preparing",
  "Waiting",
  "Picked",
  "Cancelled",
  "Delivered",
  "",
  "",
];

const GridView = ({ onPress, selected }) => {
  const renderItem = ({item}) => (
    <TouchableOpacity style={[styles.order, selected === item && { backgroundColor: COLORS.primary }]} onPress={() => onPress(item)}>
      <Text style={[styles.text, selected === item && { color: COLORS.lightWhite }]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ height: 70, margin: 10 }}>
      <FlatList
        data={order}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        numColumns={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 0,
    marginHorizontal: 10,
  },
  order: {
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    padding: 2,
    margin: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 20, // Adjust the height as needed
  },
  text: {
    textAlign: "center",
    fontFamily: "regular",
    color: COLORS.gray,
    fontSize: 12,
  },
});

export default GridView;
