import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import NetworkImage from './NetworkImage'


const CategoryTile = ({title, source, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <NetworkImage source={source} width={50} height={50}/>
    <Text style={{ textAlign: 'center',marginTop: 10, fontFamily: 'regular', fontSize: 11, color: COLORS.gray}}>{title}</Text>
  </TouchableOpacity>
  )
}

export default CategoryTile

const styles = StyleSheet.create({})