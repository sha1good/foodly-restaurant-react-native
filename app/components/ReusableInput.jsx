import React, { useState } from "react"; // Use useState directly
import { TextInput } from "react-native";

export default function ReusableTextInput({ value, setValue, placeholder, numberOfLines, multiline }) {
  return (
    <TextInput
      style={{
        height: multiline ? 100 : 40, // Adjust height as necessary when using multiple lines
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        padding: 3,
      }}
      onChangeText={(text) => setValue(text)}
      value={value}
      placeholder={placeholder}
      placeholderTextColor="gray"
      multiline={multiline}
      numberOfLines={numberOfLines} 
    />
  );
}
