import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface Song {
  id: string;
}
interface Album {
  artist: string;
  createdAt: string;
  imageUrl: string;
  releaseYear: number;
  songs: Array<Song>;
  title: string;
  _id: string;
}
interface MusicStore {
  albums: Array<Album>;
  songs?: [];
  isLoading: boolean;
  error: string | null;
  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  fetchAlbums: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get("/albums");
      console.log(response);
      set({ albums: response.data });
    } catch (error: any) {
      set({
        error: error.response.data.message,
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));
