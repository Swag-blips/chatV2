import Album from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    console.log("Error from getAllAlbums controller", error);
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;

    const album = await Album.findById(albumId).populate("songs");

    if (!album) {
      res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json(album);
  } catch (error) {
    console.log("Error from get album by id controller", error);
    next(error);
  }
};
