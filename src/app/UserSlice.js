import axiosClient from "../services/axiosClient";
import {
  API_LOGIN,
  API_REGISTER,
  API_PROFILE,
} from "./../constant";
import Cookies from "js-cookie";

const initialState = {
  isLoading: false,
  error: null,
  userProfile: null,
  userInfo: null,
  auth: false,
  response: null,
  userId: null,
  userList: null,
  otherProfile: null,
};

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) =>
  set({ error: { message: error.message, code: error.code } });

export const createUserSlice = (set) => ({
  ...initialState,

  setAuth: (auth) => set({ auth }),

  setUserId: (id) => set({ userId: id }),

  logout: () => {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("token");
    set({
      auth: false,
      error: null,
      userProfile: null,
      userInfo: null,
      userId: null,
      otherProfile: null,
    });
  },

  postLogin: async (form) => {
    setLoading(set, true);
    try {
      console.log("Calling API with form data:", form);
      const { data } = await axiosClient.post(API_LOGIN, form);
      console.log("API response:", data);
      set({ userInfo: data });
      set({ auth: true });
    } catch (error) {
      console.error("API error:", error);
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  postRegister: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(API_REGISTER, form);
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  getProfile: async () => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.get(
        API_PROFILE
      );
      set({ userProfile: data.data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  getProfileOtherById: async (id) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.get(
        API_USER_PROFILE_ID.replace("{id}", id)
      );
      set({ otherProfile: data.data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  updateProfileUser: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.put(API_UPDATE_PROFILE, form);
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  changingPasswordOfCurrentlyUser: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.patch(API_CHANGING_PASSWORD, form);
      set({ response: data });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const validationErrors = error.response.data.errors;
        set({ error: validationErrors });
      } else {
        setError(set, error);
      }
    } finally {
      setLoading(set, false);
    }
  },

  // ADMIN API
  postListUser: async (pageIndex, pageSize) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(
        API_GET_ALL_USER_LIST.replace("{PageIndex}", pageIndex).replace(
          "{PageSize}",
          pageSize
        )
      );
      set({ userList: data.data.items, totalPages: data.data.totalPage });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  postCreateModeratorAccount: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(
        API_CREATE_MODERATOR_ACCOUNT,
        form
      );
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  // DEACTIVATE MODERATOR
  patchStatusModerator: async (id, isActive) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.patch(
        API_PATCH_STATUS_MODERATOR.replace("{id}", id).replace(
          "{status}",
          isActive
        )
      );
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },
});
