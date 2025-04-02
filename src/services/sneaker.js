import { SneakerCollection } from '../db/models/sneaker.js';

export const getSneakers = async () => {
  const sneakers = await SneakerCollection.find();

  if (sneakers.length === 0) return null;

  return sneakers;
};

export const createSneakers = async (sneakers) => {
  const newSneakers = await SneakerCollection.create(sneakers);

  return newSneakers;
};
