import { API_GET_FISHES } from "../constant";
import axiosClient from "../services/axiosClient";


const initialState = {
  isLoading: false,
  error: null,
  response: null,
  fishDetail: null,
  otherUserProductList: null,
  searchResult: null,
  fishList: null,
};

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) =>
  set({ error: { message: error.message, code: error.code } });

export const createKoiSlice = (set) => ({
  ...initialState,

  getFishes: async (pageIndex, pageSize) => {
   setLoading(set, true);
   try{
    const { data } = await axiosClient.get(
      API_GET_FISHES.replace("{PageIndex", pageIndex).replace(
        "{PageSize", pageSize
      )
    )
    console.log("data", data);
    set({ fishList: data, fishDetail: null});
   } catch (error) {
    setError(set, error);
   } finally {
    setLoading(set, false);
   }
  },

  getProductsForHomePage: async (pageIndex, pageSize) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(
        API_GET_PRODUCTS_HOMEPAGE.replace("{PageIndex}", pageIndex).replace(
          "{PageSize}",
          pageSize
        )
      );
      console.log("data", data);
      set({ productList: data, productDetail: null });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  getProductById: async (id) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.get(
        API_GET_PRODUCT_BY_ID.replace("{id}", id)
      );
      set({ productDetail: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  createNewProduct: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(API_CREATE_PRODUCT, form);
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  postAllProduct: async (pageIndex, pageSize) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(
        API_GET_ALL_PRODUCT_MOD.replace("{PageIndex}", pageIndex).replace(
          "{PageSize}",
          pageSize
        )
      );
      set({ productList: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  approveProduct: async (productId) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.patch(
        API_APPROVE_PRODUCT_MOD.replace("{id}", productId),
        { status: 1 }
      );
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  denyProduct: async (productId) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.patch(
        API_DENY_PRODUCT_MOD.replace("{id}", productId)
      );
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  getSellerProduct: async () => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(API_GET_PRODUCT_SELLER);
      set({ sellerProductList: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  getSearchProductForUser: async (keyword) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(
        API_SEARCH_PRODUCTS_FOR_USER.replace("{keyword}", keyword)
      );
      set({ searchResult: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  updateProduct: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.put(API_UPDATE_PRODUCT, form);
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  getOtherUserProduct: async (id) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(
        API_GET_OTHER_PRODUCT.replace("{id}", id)
      );
      set({ otherUserProductList: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },
  deleteProduct: async (id) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.delete(
        API_DELETE_PRODUCT.replace("{id}", id)
      );
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },
});
