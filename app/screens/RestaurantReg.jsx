import {
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Switch,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import PagerView from "react-native-pager-view";
import { BaseUrl, COLORS, GoogleApiKey } from "../constants/theme";
import { Button } from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import axios from "axios";
import { RestaurantRegistrationStore } from "../store";

const RestaurantReg = ({navigation}) => {
  const pagerRef = useRef(null);
  const mapRef = useRef(null);
  const [initialPage, setInitialPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(false);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [address, setAddress] = useState(null);
  const [postalCode, setCode] = useState();

  const reverseGeocode = async (longitude, latitude) => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: longitude,
      latitude: latitude,
    });
    setAddress(
      reverseGeocodedAddress[0].name +
        " " +
        reverseGeocodedAddress[0].city +
        " " +
        reverseGeocodedAddress[0].country
    );
    setCode(reverseGeocodedAddress[0].postalCode);
  };

  const goToNext = () => {
    navigation.navigate('submit', {region, address, postalCode, deliveryInstructions})
  };

 
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
    
  return (
 <View style={{ marginTop: 0, flex: 1 }}>
     <View style={{}}>
    <GooglePlacesAutocomplete
      placeholder={address === null ? "Search" : address}
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby: "distance",
      }}
      onPress={(data, details = null) => {
        if (details && details.address_components) {
          const postalCodeComponent = details.address_components.find(
            (component) => component.types.includes("postal_code")
          );
          const postalCode = postalCodeComponent
            ? postalCodeComponent.long_name
            : "";
            setCode(postalCode);
        }

        setAddress(data.description);
        setRegion({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        if (details) {
          const newRegion = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };

          mapRef.current.animateToRegion(newRegion, 1000);
        }
      }}
      query={{
        key: GoogleApiKey,
        language: "en",
        location: `${region.latitude}, ${region.longitude}`,
      }}
      styles={{
        container: {
          flex: 0,
          position: "absolute",
          width: "95%",
          zIndex: 1,
          top: 65,
          left: 10,
          right: 10,
        },
        listView: { backgroundColor: "white" },
      }}
    />

    <TouchableOpacity style={styles.button} onPress={goToNext}>
      <Text style={styles.buttonText}>Edit and Submit</Text>
    </TouchableOpacity>

    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider="google"
    >
      <Marker
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude,
        }}
      />
      <Marker
        coordinate={pin}
        pinColor="gray"
        draggable={true}
        onDragStart={(e) => {
          reverseGeocode(
            e.nativeEvent.coordinate.longitude,
            e.nativeEvent.coordinate.latitude
          );
        }}
        onDragEnd={(e) => {
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        <Callout>
          <Text>You're here</Text>
        </Callout>
      </Marker>
      <Circle center={pin} radius={10000} />
    </MapView>
  </View>
 </View>
  )
}

export default RestaurantReg

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 30,
    flex: 0,
    position: "absolute",
    zIndex: 1,
    bottom: 30,
    right: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "medium",
  },
 
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 0.6,
    borderBottomColor: COLORS.gray,
    padding: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
  },
});

const bkImg =
"https://d326fntlu7tb1e.cloudfront.net/uploads/8cd2cb78-c99c-4408-a333-91ec6c1bb9e3-restaurant_bk.png";

