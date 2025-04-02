import Joi from 'joi';

export const createSneakerSchema = Joi.object({
  brand: Joi.string().required().example('Nike'),
  model: Joi.string().required().example('Air Max'),
  price: Joi.number().required().example(150),
  size: Joi.array().items(Joi.number()).required().example([5, 7, 8]),
  color: Joi.string().required().example('Pink'),
  inStock: Joi.boolean().required().example(true),
  imageUrl: Joi.string().uri().required(),
});
