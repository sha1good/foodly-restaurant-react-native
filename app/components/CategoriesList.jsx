import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategoryTile from './CategoryTile'
import { COLORS, SIZES } from '../constants/theme'
import { useNavigation } from '@react-navigation/native'
// "https://d326fntlu7tb1e.cloudfront.net/uploads/fe6592c2-4f25-45e1-8eed-99036e3cb40b-deliver_food_240px.webp",
// "https://d326fntlu7tb1e.cloudfront.net/uploads/b48169ad-cd1d-4168-abba-898c60fd332c-paella_240px.webp",
// "https://d326fntlu7tb1e.cloudfront.net/uploads/314d171e-b353-48e3-b47a-d4ef84de8f1a-restaurant_menu_240px.webp",
// "https://d326fntlu7tb1e.cloudfront.net/uploads/55c92ba7-c553-4eb4-b355-dd811d96c46a-statistics_240px.webp"
const CategoriesList = () => {
  const navigation = useNavigation();
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
    <View
      style={{
        width: SIZES.width - 30,
        marginTop: 10,
        height: 90,
        backgroundColor: COLORS.offwhite,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          marginHorizontal: 10,
        }}
      >
        <CategoryTile title={"Add Foods"} source={'https://d326fntlu7tb1e.cloudfront.net/uploads/314d171e-b353-48e3-b47a-d4ef84de8f1a-restaurant_menu_240px.webp'} onPress={() => {navigation.navigate("add-foods")}}/>
        <CategoryTile title={"Foods"} source={'https://d326fntlu7tb1e.cloudfront.net/uploads/b48169ad-cd1d-4168-abba-898c60fd332c-paella_240px.webp'} onPress={() => {navigation.navigate("food")}}/>
        <CategoryTile title={"Wallet"} source={'https://d326fntlu7tb1e.cloudfront.net/uploads/55c92ba7-c553-4eb4-b355-dd811d96c46a-statistics_240px.webp'} onPress={() => {navigation.navigate("wallet")}}/>
        <CategoryTile title={"Deliveries"} source={'https://d326fntlu7tb1e.cloudfront.net/uploads/fe6592c2-4f25-45e1-8eed-99036e3cb40b-deliver_food_240px.webp'} onPress={() => {navigation.navigate("deliveries")}}/>
      </View>
    </View>
  </View>
  )
}

export default CategoriesList

const styles = StyleSheet.create({})