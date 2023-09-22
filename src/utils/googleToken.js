import axios from "axios"
import { get } from "lodash";

export const getGoogleToken = async (payload) => {
    try {
        const { data } = await axios.post(`http://localhost:3001/oauth/google`, {
            ...payload,
        });
        return { error: "", data };
    } catch (error) {
        return {
            error: get(error, "response.data.message") || get(error, "response.data.message.0") || get(error, "message", "Unknown"),
        };
    }
};