import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "../constants/theme";

const fetchOrderDetails = () => {
    const [orders, setOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const response = await axios.get(`${BaseUrl}/api/orders/restaurant_orders/${restaurantId}?status=${status}`);
            
            setOrders(response.data)

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


    return { orders, isLoading, error, refetch }
}

export default fetchOrderDetails