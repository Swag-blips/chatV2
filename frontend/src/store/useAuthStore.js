import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const createAuthStore = create((set) => ({
  swag: "hello",
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log(`error in check auth, ${error}`);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

export default createAuthStore;
