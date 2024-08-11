import {
  StyleSheet,
  SafeAreaView,
  Image,
  View
} from "react-native";
import React, { useState } from "react";
import HomeHeader from "../../components/HomeHeader";
import Heading from "../../components/Heading";
import CategoriesList from "../../components/CategoriesList";
import NewOrders from "../orders/NewOrders";
import GridView from "../../components/OrdersGrid";
import Preparing from "../orders/Preparing";
import Waiting from "../orders/Waiting";
import Picked from "../orders/Picked";
import Cancelled from "../orders/Cancelled";
import Delivered from "../orders/Delivered";
import { background } from '../../constants/uidata'

const Home = () => {
  const [selected, setSelected] = useState("New Orders");

  return (
    <SafeAreaView style={{ flex: 1 }}>
            

      <Image
        source={{ uri: background }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={0}
      />
      <View style={{marginTop: 50}}/>
      <HomeHeader />

      <CategoriesList />

      <Heading heading={"Orders"} />
      <GridView onPress={setSelected} selected={selected} />
      {selected === "New Orders" && <NewOrders />}
      {selected === "Preparing" && <Preparing />}
      {selected === "Waiting" && <Waiting />}
      {selected === "Picked" && <Picked />}
      {selected === "Cancelled" && <Cancelled />}
      {selected === "Delivered" && <Delivered />}
    </SafeAreaView>
  );
};

export default Home;

