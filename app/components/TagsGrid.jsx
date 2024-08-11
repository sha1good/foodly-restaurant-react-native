import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/theme";
import { foodTags } from "../constants/uidata";


const TagsGrid = ({  selected, setSelected }) => {
 
  const renderItem = ({item}) => (
    <TouchableOpacity
    style={[
      styles.order,
      selected.includes(item) && { backgroundColor: COLORS.primary }
    ]}
    onPress={() => {
      const index = selected.indexOf(item);
      if (index > -1) {
        // Item exists in the array, remove it
        setSelected(selected.filter((tag) => tag !== item));
      } else {
        // Item doesn't exist, add it
        setSelected([...selected, item]);
      }
    }}
  >
    <Text
      style={[
        styles.text,
        selected.includes(item) && { color: COLORS.lightWhite }
      ]}
    >
      {item}
    </Text>
  </TouchableOpacity>
  
  );

  return (
    <View style={{ height: 150, margin: 10 }}>
      <FlatList
        data={foodTags}
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

export default TagsGrid;
