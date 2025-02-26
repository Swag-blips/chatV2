import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/user");
      set({ users: res.data });
    } catch (error) {
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error(error);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

export default useChatStore;
