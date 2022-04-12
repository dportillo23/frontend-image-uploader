import axios from "axios";
import { useState, useEffect } from "react";

export default function usePost(file) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const url = 'http://127.0.0.1:8000/api/images/'

    useEffect(() => {
        async function postData() {
            setLoading(true);
            setError();
            const data = await axios.post(url, file)
            setData(data);
            setLoading(false);
            
        }

        try {
            postData()
        } catch (error) {
            setError(error);
        }

    }, [])
return [data, loading, error]
};