import axiosClient from "../services/axiosClient";
import {
    API_REQUEST_ACCEPTREQUESTBYMANAGER,
   API_REQUEST_CREATESALEREQUEST
} from "../constant";

const initialState = {
    isLoading: false,
    error: null,
    response: null,
};

const setLoading = (set, isLoading) => set({ isLoading});
const setError = (set, error) => 
    set({ error: { message: error.message, code: error.code } });

export const createConsignmentSlice = (set) => ({
    ...initialState,

    createNewConsignment: async (form) => {
        setLoading(set, true);
        try {
            const { data } = await axiosClient.post(API_REQUEST_CREATESALEREQUEST, form);
            set({ response: data });
        } catch (error) {
            setError(set, error);
        } finally {
            setLoading(set, false);
        }
    },

    acceptConsignment: async (requestId) => {
        setLoading(set, true);
        try{
            const {data} = await axiosClient.post(
                API_REQUEST_ACCEPTREQUESTBYMANAGER, requestId
            );
            set({ response: data })
        } catch (error) {
            setError(set, error);
        } finally {
            setLoading(set, false);
        }
    }
})