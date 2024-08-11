import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import { fbApp, uploadToFirebase } from "./../../firebase-config";
import * as ImagePicker from "expo-image-picker";
import { COLORS, SIZES } from "../constants/theme";
import { AddFoodStore } from "../store";

const ImageUploader = ({selectedImage, setSelectedImage, label}) => {
  const {imageList, addToList} = AddFoodStore((state) => ({
    imageList: state.imageList,
    addToList: state.addToList
  }))
    function generateRandomTitle(length = 26) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const pickImageAsync = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const title = generateRandomTitle();

        const uploadResponse = await uploadToFirebase(uri, title);
        setSelectedImage(uploadResponse.downloadUrl)
        addToList(uploadResponse.downloadUrl)
      } else {
        alert("You did not select any image.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity
      onPress={pickImageAsync}
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: SIZES.width / 2.5,
        height: 100,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
      }}
    >
      {selectedImage === null ? (<Text style={{ color: COLORS.gray }}>{label}</Text>): (
        <Image source={{ uri: selectedImage }} style={{ width: SIZES.width / 2.5, height: 100, resizeMode: "cover", borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10, }} />
      )}
    </TouchableOpacity>
  );
};

export default ImageUploader;

