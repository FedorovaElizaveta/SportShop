import { SneakerCollection } from '../db/models/sneaker.js';

export const getSneakers = async () => {
  const sneakers = await SneakerCollection.find();

  if (sneakers.length === 0) return null;

  return sneakers;
};

export const getSneakersById = async (id) => {
  const sneakers = await SneakerCollection.findById({ _id: id });

  if (!sneakers) return null;

  return sneakers;
};

export const createSneakers = async (sneakers) => {
  return await SneakerCollection.create(sneakers);
};

export const patchSneakers = async (id, payload, options = {}) => {
  const patchedSneakers = await SneakerCollection.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true, ...options },
  );

  if (!patchedSneakers) return null;

  return patchedSneakers;
};

export const deleteSneakers = async (id) => {
  const result = await SneakerCollection.findByIdAndDelete({ _id: id });

  if (!result) return null;

  return result;
};
