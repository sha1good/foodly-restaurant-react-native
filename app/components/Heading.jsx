import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

const Heading = ({ heading }) => {
  return (
      <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 7,  justifyContent: "space-between", marginRight: 16 }}>
        <Text
          style={{
            marginLeft: 16,
            fontSize: 18,
            fontFamily: "bold",
          }}
        >
          {heading}
        </Text>
       
      </View>
  );
};

export default Heading;
