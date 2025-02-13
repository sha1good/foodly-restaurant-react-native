import {StyleSheet, View, Text, Image } from 'react-native'
import React from 'react'
import { COLORS, SHADOWS } from '../constants/theme';


const CategoryItem = ({category, selected}) => {
  return (
    <View
      style={{
        marginLeft: 12,
        padding: 5,
        alignItems: "center",
        margin: 5,
        width: 80,
        height: 55,
        justifyContent: "center",
        borderRadius: 15,
        borderWidth: 0.5,
      
        shadowColor: SHADOWS.small
      }}
    >
      <Image source={{uri: category.image}} style={{ width: 30, height: 30 }} />
      <Text style={{ fontSize: 13, fontFamily: 'regular'}}>
        {category.title}
      </Text>
    </View>
  );
};
export default CategoryItem;


