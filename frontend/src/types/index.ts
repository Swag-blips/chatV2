export interface Song {
  _id: string;
  title: string;
  artist: string;
  albumId: string | null;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Album {
  _id: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: Song[];
  title: string;
}
