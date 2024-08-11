import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AddFoodStore } from "../store";
import ImageUploader from "./ImageUploader";
import Button from "./Button";
import styles from "../screens/login.style";

const AddImagesComponent = ({onPress}) => {
  const {
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    imageList,
    setImageOne,
    setImageTwo,
    setImageThree,
    setImageFour,
  } = AddFoodStore((state) => ({
    imageOne: state.imageOne,
    imageTwo: state.imageTwo,
    imageThree: state.imageThree,
    imageFour: state.imageFour,
    imageList: state.imageList,
    setImageOne: state.setImageOne,
    setImageTwo: state.setImageTwo,
    setImageThree: state.setImageThree,
    setImageFour: state.setImageFour,
    addToList: state.addToList,
  }));
  return (
    <View style={{ flex: 1, margin: 16 }}>
      <Text style={styles.header}>Upload Images</Text>
      <Text style={styles.subTitle}>
        You are required to upload at least 2 images of the food
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ImageUploader
          selectedImage={imageOne}
          setSelectedImage={setImageOne}
          label={"Image One"}
        />
        <ImageUploader
          selectedImage={imageTwo}
          setSelectedImage={setImageTwo}
          label={"Image Two"}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ImageUploader
          selectedImage={imageThree}
          setSelectedImage={setImageThree}
          label={"Image Three"}
        />
        <ImageUploader
          selectedImage={imageFour}
          setSelectedImage={setImageFour}
          label={"Image Four"}
        />

      </View>
      <Button title={"N  E  X  T  "} onPress={onPress} isValid={true}/>

    </View>
  );
};

export default AddImagesComponent;


