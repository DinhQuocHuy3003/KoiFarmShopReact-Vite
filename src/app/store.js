import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { createKoiSlice } from "./KoiSlice";
import { createUserSlice } from "./UserSlice";

const useStore = create(
  devtools(
    persist(
      immer((set) => ({
        ...createKoiSlice(set),
        ...createUserSlice(set),

        reset: () =>
          set((state) => {
            if (state.auth !== false || state.userInfo !== null) {
            state.auth = false;
            state.userInfo = null;
            state.isLoading = false;
            state.response = null;
            state.error = null;
            state.userProfile = null;
            state.isDriverLogin = false;
            state.accountList = null;
            }
          }),

        toggleMode: () =>
          set((state) => ({
            colorMode: state.colorMode === "light" ? "dark" : "light",
          })),
      })),
      {
        // name: "goods-storage",
        // storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useStore;
