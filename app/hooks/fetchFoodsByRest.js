
import axios from "axios";
import { useState, useEffect } from "react";
import { BaseUrl } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchFoodsByRest = () => {
    const [foods, setRestaurantFood] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchData = async () => {
        console.log("----fetching food----");
        const data = await AsyncStorage.getItem('restaurant')
        const restaurant =  JSON.parse(data)
        console.log("----fetching restaurant----", restaurant);
        setIsLoading(true)

        try {
            const response = await axios.get(`${BaseUrl}/api/foods/restaurant-foods/${restaurant._id}`);
            //console.log(response);
            setRestaurantFood(response.data)

            setIsLoading(false)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setIsLoading(true)
        fetchData();
    }


    return { foods, isLoading, error, refetch }
}

export default fetchFoodsByRest