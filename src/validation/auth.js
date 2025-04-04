import Joi from 'joi';

export const registerLoginUserSchema = Joi.object({
  password: Joi.string().required().example('XXXXX'),
  email: Joi.string().required().example('jane@gmail.com'),
  name: Joi.string().required().example('Jane'),
});

export const patchUserSchema = Joi.object({
  password: Joi.string().example('XXXXX'),
  email: Joi.string().example('jane@gmail.com'),
  name: Joi.string().example('Jane'),
  phoneNumber: Joi.number().example(1111111111),
  location: Joi.string().example('Ukraine'),
  avatar: Joi.string().uri(),
});
