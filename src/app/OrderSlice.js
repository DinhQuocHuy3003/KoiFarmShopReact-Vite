import axiosClient from "../services/axiosClient";
import { API_GET_ORDER_FISH } from "../constant";
const initialState = {
    isLoading: false,
    error: null,

};

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) => set({ error: {message: error.message, code: error.code } });

export const createOrderSlice = (set) => ({

    getCreateOrderFish: async (requestBody) => {
        setLoading(set, true);
        try {
            const { data } = await axiosClient.post( API_GET_ORDER_FISH, requestBody );
            set({ response: data });
        }
        catch (error) {
            setError(set, error);
        }
        finally {
            setLoading(set, false);
        }
    }
})