import { SneakerCollection } from '../db/models/sneaker.js';
import { favouriteSneakerCollection } from '../db/models/favouriteSneaker.js';

export const getFavouriteSneakers = async () => {
  const favouriteSneakers = await favouriteSneakerCollection.find();

  if (favouriteSneakers.length === 0) return null;

  const sneakerIdArr = favouriteSneakers.map((item) => item.sneakerId);

  const sneakers = await SneakerCollection.find({ _id: { $in: sneakerIdArr } });

  if (!sneakers) return false;

  return sneakers;
};

export const addFavouriteSneakers = async (sneakerId) => {
  const sneakers = await SneakerCollection.findById(sneakerId);

  if (!sneakers) return null;

  const isAdded = await favouriteSneakerCollection.exists({ sneakerId });

  if (isAdded) return false;

  return await favouriteSneakerCollection.create({ sneakerId });
};

export const deleteFavouriteSneakers = async (sneakerId) => {
  const result = await favouriteSneakerCollection.findOneAndDelete({
    sneakerId,
  });

  if (!result) return null;

  return result;
};
