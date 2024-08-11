import axios from "axios";
import { useState, useEffect } from "react";
import { BaseUrl } from "../constants/theme";

const fetchOrders = (restaurantId, status) => {
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

export default fetchOrders