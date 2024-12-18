import axiosClient from "../services/axiosClient";
import { 
    API_GET_ORDER_FISH,
    API_CREATE_ORDER,
 } from "../constant";
const initialState = {
    isLoading: false,
    error: null,
    setOrderId: null,
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
    },

    postCreateOrder: async (requestBody) => {
        setLoading(set, true);
        try {
            const { data } = await axiosClient.post( API_CREATE_ORDER, requestBody );
            console.log("data", data);
            
            if (data?.result) {
                set({ setOrderId: data.result });
                console.log("orderId", data.result);
            }
            else {
                throw new Error("Order creation failed: Invalid response structure");
            }

            return data;
        }
        catch (error) {
            setError(set, error);
        }
        finally {
            setLoading(set, false);
        }
    }
})