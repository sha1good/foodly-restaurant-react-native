import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants/theme";

const RowText = ({amount, subTitle}) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{fontSize: SIZES.large, color: COLORS.gray, fontFamily: 'medium'}}>{amount}</Text>
      <Text style={{ fontSize: SIZES.small, color: COLORS.black, fontFamily: 'regular'}}>{subTitle}</Text>
    </View>
  );
};

export default RowText;

const styles = StyleSheet.create({});
