import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { background } from "../../constants/uidata";
import PagerView from "react-native-pager-view";
import CategoriesPicker from "../../components/CategoriesPicker";
import { BaseUrl, COLORS } from "../../constants/theme";
import Button from "../../components/Button";
import styles from "../../screens/login.style";
import TagsGrid from "../../components/TagsGrid";
import ReusableTextInput from "../../components/ReusableInput";
import { AddFoodStore, FoodsDataStore } from "../../store";
import AddImagesComponent from "../../components/AddImagesComponent";
import { generateIDs } from "../../../firebase-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddFoods = ({ navigation }) => {
  const {
    setCategories,
    categories,
    foodValue,
    foodPrice,
    // foodTags,
    foodDescription,
    preparationTime,
    additiveTitle,
    additivePrice,
    additiveList,
    setFoodValue,
    setFoodPrice,
    setFoodDescription,
    setPreparationTime,
    resetState,
    setAdditiveList,
    setAdditivePrice,
    setAdditiveTitle,
  } = FoodsDataStore((state) => ({
    setCategories: state.setCategories,
    additiveList: state.additiveList,
    setAdditiveList: state.setAdditiveList,
    categories: state.categories,
    foodValue: state.foodValue,
    foodPrice: state.foodPrice,
    resetState: state.resetState,
    foodDescription: state.foodDescription,
    additiveTitle: state.additiveTitle,
    additivePrice: state.additivePrice,
    setAdditivePrice: state.setAdditivePrice,
    setAdditiveTitle: state.setAdditiveTitle,
    preparationTime: state.preparationTime,
    setFoodValue: state.setFoodValue,
    setFoodPrice: state.setFoodPrice,
    setFoodDescription: state.setFoodDescription,
    setPreparationTime: state.setPreparationTime,
    // setFoodTags: state.setFoodTags
  }));
  const {imageList, resetImageStore} = AddFoodStore((state) => ({ imageList: state.imageList, resetImageStore: state.resetImageStore  }));
  const [foodTags, setFoodTags] = useState([]);
  const pagerRef = useRef(null);
  const initialPage = 0;

  const goToNext = () => {
    if (categories === null) return;
    pagerRef.current?.setPage(1);
  };

  const goToLast = () => {
    pagerRef.current?.setPage(3);
  };

  const goToTwo = () => {
    if (imageList.length < 2) {
      alert("Please upload at least two images");
    } else {
      pagerRef.current?.setPage(2);
    }
  };

  const handleAdditives = () => {
    const id = generateIDs();
    setAdditiveList([
      ...additiveList,
      {
        id: id,
        title: additiveTitle,
        price: additivePrice,
      },
    ]);
  };

  const goToPrev = () => {
    pagerRef.current?.setPage(initialPage - 1);
  };

  const addFoodItem = async () => {
    const token = await AsyncStorage.getItem("token");
    const accessToken = JSON.parse(token);

    const rest = await AsyncStorage.getItem("restaurant");
    const restaurant = JSON.parse(rest);
    const coords = JSON.parse(rest)["location"].coordinates;
    const data = {
      title: foodValue,
      foodTags: foodTags,
      foodType: foodTags,
      code: restaurant.code,
      category: categories,
      time: preparationTime,
      isAvailable: true,
      restaurant: restaurant._id,
      description: foodDescription,
      price: foodPrice,
      additives: additiveList,
      imageUrl: imageList,
      location: {
        coordinates: [
          coords[1],
          coords[0]
        ]
    },
    };

    const url = `${BaseUrl}/api/foods`;
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 201) {
        resetImageStore();
        resetState();
        navigation.navigate("home");
      }
    } catch (error) {
      console.log(error);
      alert(error)
    }
  };

  return (
    <PagerView ref={pagerRef} initialPage={0} style={{ flex: 1 }}>
      <View key="1" style={{ flex: 1 }}>
        <Image
          source={{
            uri: background,
          }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={0}
        />
        <View style={{ flex: 1, margin: 16 }}>
          <Text style={styles.header}>Pick Category</Text>
          <Text style={styles.subTitle}>
            You are required to pick a category for the food you are adding
          </Text>
          <CategoriesPicker setCategories={setCategories} onPress={goToNext} />
        </View>
      </View>

      <View key="2" style={{ flex: 1 }}>
        <Image
          source={{
            uri: background,
          }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={0}
        />
        <AddImagesComponent onPress={goToTwo} />
      </View>

      <View key="3" style={{ flex: 1 }}>
        <Image
          source={{
            uri: background,
          }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={0}
        />
        <View style={{ flex: 1, margin: 16 }}>
          <Text style={styles.header}>Fill Food Details</Text>
          <Text style={styles.subTitle}>
            You are required to fill all data for the food you are adding
          </Text>

          <ReusableTextInput
            value={foodValue}
            setValue={setFoodValue}
            placeholder={" Food Name"}
          />
          <ReusableTextInput
            value={preparationTime}
            setValue={setPreparationTime}
            placeholder={" Food Preparation Time"}
          />
          <ReusableTextInput
            value={foodPrice}
            setValue={setFoodPrice}
            placeholder={" Food Price"}
          />
          <ReusableTextInput
            value={foodDescription}
            numberOfLines={8}
            multiline={true}
            setValue={setFoodDescription}
            placeholder={" Food Description"}
          />

          <TagsGrid selected={foodTags} setSelected={setFoodTags} />

          <Button isValid={true} title={"N  E  X  T  "} onPress={goToLast} />
        </View>
      </View>

      <View key="4" style={{ flex: 1 }}>
        <Image
          source={{
            uri: background,
          }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={0}
        />
        <View style={{ flex: 1, margin: 16 }}>
          <Text style={styles.header}>Add Additives</Text>
          <Text style={styles.subTitle}>
            You are required to fill all additives related to the food item
          </Text>

          <ReusableTextInput
            value={additiveTitle}
            setValue={setAdditiveTitle}
            placeholder={" Additive Title"}
          />
          <ReusableTextInput
            value={additivePrice}
            setValue={setAdditivePrice}
            placeholder={" Additive Price"}
          />

          <View>
            {additiveList.map((additive, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: COLORS.offwhite,
                  borderRadius: 15,
                  padding: 3,
                  marginVertical: 5,
                }}
              >
                <Text
                  style={[
                    styles.text,
                    { marginHorizontal: 10, textAlign: "center" },
                  ]}
                  key={additive.id}
                >
                  {additive.title}
                </Text>

                <Text
                  style={[
                    styles.text,
                    { marginHorizontal: 10, textAlign: "center" },
                  ]}
                  key={index}
                >
                  $ {additive.price}
                </Text>
              </View>
            ))}
          </View>

          <Button
            isValid={true}
            title={"A  D  D  "}
            onPress={handleAdditives}
          />

          <Button
            isValid={true}
            title={" S  U  B M  I  T "}
            onPress={addFoodItem}
          />
        </View>
      </View>
    </PagerView>
  );
};

export default AddFoods;
