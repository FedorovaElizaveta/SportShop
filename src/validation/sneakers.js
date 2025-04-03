import Joi from 'joi';
import joiObjectid from 'joi-objectid';

Joi.objectId = joiObjectid(Joi);

export const createSneakerSchema = Joi.object({
  brand: Joi.string().required().example('Nike'),
  model: Joi.string().required().example('Air Max'),
  price: Joi.number().required().example(150),
  size: Joi.array().items(Joi.number()).required().example([5, 7, 8]),
  color: Joi.string().required().example('Pink'),
  inStock: Joi.boolean().required().example(true),
  imageUrl: Joi.string().uri(),
});

export const patchSneakerSchema = Joi.object({
  brand: Joi.string().example('Nike'),
  model: Joi.string().example('Air Max'),
  price: Joi.number().example(150),
  size: Joi.array().items(Joi.number()).example([5, 7, 8]),
  color: Joi.string().example('Pink'),
  inStock: Joi.boolean().example(true),
  imageUrl: Joi.string().uri(),
});

export const addToFavouriteSneakers = Joi.object({
  sneakerId: Joi.objectId().required(),
});
