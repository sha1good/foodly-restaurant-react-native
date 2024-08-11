import axios from "axios";
import { useState, useEffect } from "react";
import { BaseUrl } from "../constants/theme";

const fetchCategories = (restaurantId, code) => {
    const [categories, setCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const response = await axios.get(`${BaseUrl}/api/category`);

            setCategory(response.data)

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


    return { categories, isLoading, error, refetch }
}

export default fetchCategories