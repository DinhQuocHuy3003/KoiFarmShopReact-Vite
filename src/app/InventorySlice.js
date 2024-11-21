import axiosClient from "../services/axiosClient";
import {
    API_GET_ALL_INVENTORIES,
} from "./../constant";

const initialState = {
    response: null,
    inventories: null,
    isLoading: false,
    error: null,
};

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) =>
  set({ error: { message: error.message, code: error.code } });

export const createInventorySlice = (set) => ({
    ...initialState,

    getAllInventories: async () => {
        setLoading(set, true);
        try {
            const { data } = await axiosClient.get(API_GET_ALL_INVENTORIES);
            console.log("Inventory data: ", data);
            set({ inventories: data});
        } catch (error) {
            setError(set, error);
        } finally {
            setLoading(set, false);
        }
    },
})