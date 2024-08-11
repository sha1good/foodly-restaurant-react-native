import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
  } from "react-native";
  import axios from "axios";

  import { useState, useEffect } from "react";
  import { useRoute } from "@react-navigation/native";
  import { BaseUrl,COLORS, SIZES } from "../../constants/theme";
  import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
  import { RatingInput, Rating } from "react-native-stock-star-rating";
  import GoogleApiService from "../../services/GoogleApiService";
  import AsyncStorage from "@react-native-async-storage/async-storage";


  const OrderDetails = ({ navigation, onPress, }) => {
    const route = useRoute();
    const [distanceTime, setDistanceTime] = useState({});
    const [loading, setLoading] = useState(false);
    const data = route.params;

    useEffect(() => {
    setLoading(false);
    calculateDistanceAndTime();
    setLoading(true);
    }, []);

    const processOrder = async (orderId, status) => {
      try {
        const token = await AsyncStorage.getItem('token');
        const accessToken = JSON.parse(token);
        setLoading(true);
        const url = `${BaseUrl}/api/orders/process/${orderId}/${status}`;
        const response = await axios.put(url, {}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (response.status === 200) {
          setLoading(false);
          // Navigate to Home Page or perform any other action upon successful processing of the order
          navigation.navigate("home");
        } else {
          const data = response.data;
    
          // Show error message
          console.error(data.message);
        }
      } catch (error) {
        setLoading(false);
    
        // Log the error thrown by axios.put
        console.error(error);
      }
    };
    

   
  const calculateDistanceAndTime = async()=>{
    const lat = await AsyncStorage.getItem('latitude');
    const lng = await AsyncStorage.getItem('longitude');
    GoogleApiService.calculateDistanceAndTime(
        data.deliveryAddress.latitude,
        data.deliveryAddress.longitude,
        lat,
        lng,

      ).then((result) => {
        if (result) {
          setDistanceTime(result);
          setApiCaller(true);
        }
      });
  }

  const extractNumbers = (inputStr) =>{
    if (typeof inputStr !== 'string') {
        return [];
    }
    const matched = inputStr.match(/\d+/g);
    return matched ? matched.map(num => parseInt(num, 10)) : [];
}

const totalMins = extractNumbers("25 minutes")[0] + extractNumbers(distanceTime.duration)[0];

  
    return (
      <View style={{ backgroundColor: COLORS.lightWhite }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backbtn}
        >
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.primary} />
        </TouchableOpacity>
  
        <TouchableOpacity
          onPress={() => navigation.navigate("orders-page")}
          style={styles.shareBtn}
        >
          <MaterialCommunityIcons
            name="share-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
  
        <View>
          <Image
            source={
              {
                uri:data.orderItems[0].imageUrl
              }
            }
            width={SIZES.width}
            height={SIZES.height / 3.4}
            radius={20}
          />
  
          <View style={styles.rating}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 12,
              }}
            >
              <RatingInput
                rating={Number(5)}
                setRating={5}
                size={20}
                maxStars={5}
                color={COLORS.lightWhite}
              />
  
            </View>
          </View>
        </View>
  
        <View style={{ marginTop: 8, marginHorizontal: 8, marginBottom: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.title, { fontFamily: "medium" }]}>Food</Text>
  
            <Text style={[styles.title, { marginLeft: 10 }]}>
           {data.orderItems[0].title} 
            </Text>
          </View>
               <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.small, { fontFamily: "medium" }]}>ID</Text>
  
            <Text style={[styles.itemVal, { marginLeft: 10 }]}>
           {data._id} 
            </Text>
          </View>
           <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.small, { fontFamily: "medium" }]}>Distance</Text>
            <Text style={styles.small}>{distanceTime.distance }</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.small, { fontFamily: "medium" }]}>Delivery cost</Text>
  
           {loading===false? '' :<Text style={[styles.small, { marginLeft: 10 }]}>
            {distanceTime.finalPrice}
            </Text>}
          </View> 
     
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.small, { fontFamily: "medium" }]}>Prep and delivery time</Text>
  
            {<Text style={[styles.small, { marginLeft: 10 }]}>
           {extractNumbers(data.orderItems[0].time)[0] + extractNumbers(distanceTime.duration)[0]} mins
            </Text> }
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.small, { fontFamily: "medium" }]}>Quantity</Text>
  
            <Text style={[styles.itemVal, { marginLeft: 10 }]}>
           {data.orderItems[0].quantity} 

            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.small, { fontFamily: "medium" }]}>Price</Text>
  
            <Text style={[styles.itemVal, { marginLeft: 10 }]}>
           {`$${data.orderItems[0].price}`} 
            </Text>
          </View>
          
           <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.small, { fontFamily: "medium" }]}>Payment status</Text>
  
            <Text style={[`${data.paymentStatus}`==="Pending"?styles.status:styles.small, { marginLeft: 10 }]}>
           {data.paymentStatus} 
            </Text>
          </View> 
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.small, { fontFamily: "medium" }]}>Order status</Text>
  
            <Text style={[styles.itemVal, { marginLeft: 10 }]}>
           {data.orderStatus} 
            </Text>
          </View>
        </View> 
        <View style={{marginHorizontal: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
    <Text style={[styles.small, { fontFamily: "medium" }]}>Additives</Text>
    <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1 }}>
      {data.orderItems[0].additives.map((additive, index) => (
        <View key={index} style={[styles.additive, { marginLeft: 10 }]}>
          <Text style={styles.additiveText}>{additive.title}</Text>
        </View>
      ))}
    </View>
  </View>
<View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
  {data.paymentStatus !== "Pending" ? (
    <>
      {
      data.orderStatus === "Cancelled" ?(
        <Text style={[styles.button, styles.acceptButton]}>
          So bad
        </Text>
    
          ):
      data.orderStatus === "Delivered" ?(
    <Text style={[styles.button, styles.acceptButton]}>
      Well done
    </Text>

      ):
      
      data.orderStatus === "Out_for_Delivery" ? (
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={() => {
            console.log(data.orderStatus);
            processOrder(data._id, "Delivered");
          }}
        >
          <Text style={[styles.buttonText, styles.buttonTextAccept]}>
            Mark as delivered
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={() => {
              console.log(data.orderStatus);
              if (data.orderStatus === "Preparing") {
                processOrder(data._id, "Ready");
              } else if(data.orderStatus==="Out_for_Delivery"){
                processOrder(data._id, "Waiting");
              }else if(data.orderStatus==="Ready"){
                processOrder(data._id, "Out_for_Delivery")
              }else if(data.orderStatus==="Placed"){
                processOrder(data._id, "Cancelled")
              }
            }}
          >
            <Text style={[styles.buttonText, styles.buttonTextReject]}>
              {data.orderStatus === "Preparing"
                ? "Push to currier"
                :data.orderStatus=== "Ready" 
                ?"Self delivery"
                : "Reject"
                }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={() => {
              console.log(data.orderStatus);
              if (data.orderStatus === "Placed") {
                processOrder(data._id, "Preparing");
              } else if (data.orderStatus === "Preparing") {
                processOrder(data._id, "Ready");
              } else if(data.orderStatus==="Out_for_Delivery"){
                processOrder(data._id, "Waiting");
              }
            }}
          >
            <Text style={[styles.buttonText, styles.buttonTextAccept]}>
              {data.orderStatus === "Placed"
                ? "Accept"
                : data.orderStatus ==="Out_for_delivery"?
                "Mark as delivered"
                : data.orderStatus === "Preparing"
                ? "Manual delivery"
                : data.orderStatus=="Ready"
                ?"Waiting picked"
                :"Picked"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </>
  ) : (
    <View style={{ flex: 1 }} />
  )}
</View>


      </View>
    ); 
  };
  
  export default OrderDetails;
  
  const styles = StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      borderColor: COLORS.primary,
    },
    rejectButton: {
      backgroundColor: COLORS.red,
    },
    acceptButton: {
      backgroundColor: COLORS.green,
    },
    buttonText: {
      fontFamily: "bold",
      fontSize: 16,
      textAlign: "center",
    },
    buttonTextReject: {
      color: COLORS.white, // Text color for reject button
    },
    buttonTextAccept: {
      color: COLORS.black, // Text color for accept button
    },
    additive: {
      backgroundColor: COLORS.secondary,
      borderRadius: 10,
      paddingHorizontal: 8,
      marginRight: 5,
    },
    additiveText: {
      color: COLORS.white,
      fontSize: 13,
      fontFamily: "regular",
    },
    backbtn: {
      marginLeft: 12,
      alignItems: "center",
      position: "absolute",
      zIndex: 999,
      top: SIZES.xxLarge,
    },
  
    shareBtn: {
      marginRight: 12,
      position: "absolute",
      right: 0,
      zIndex: 999,
      top: SIZES.xxLarge,
    },
    wrapper: {
      marginRight: 15,
      backgroundColor: COLORS.lightWhite,
      padding: 8,
      borderRadius: 16,
    },
    title: {
      fontSize: 22,
      fontFamily: "medium",
      marginVertical: 5,
    },
    tile: {
      fontSize: 14,
      fontFamily: "medium",
      color: COLORS.gray,
      paddingHorizontal: 25,
      paddingVertical: 10,
    },
    itemVal: {
        fontSize: 14,
        fontFamily: "bold",
        color: COLORS.primary,
        position: "absolute",
        bottom: 0,
        right: 0,
      },
    textContainer: {
      marginTop: 16,
      width: SIZES.width,
      borderRadius: 8,
      borderColor: COLORS.black,
      borderWidth: 1,
    },
  
    small: {
      fontSize: 13,
      fontFamily: "regular",
      color: COLORS.gray,
    },
    status: {
      fontSize: 13,
      fontFamily: "regular",
      color: COLORS.red,
    },
    rating: {
      height: 50,
      justifyContent: "center",
      width: "100%",
      // alignItems: "center",
      position: "absolute",
      backgroundColor: "#00fff53c",
      zIndex: 999,
      bottom: 0,
      borderRadius: 18,
    },
    rateBtn: {
      borderColor: COLORS.white,
      borderWidth: 1,
      borderRadius: 12,
      padding: 6,
    },
  });
  