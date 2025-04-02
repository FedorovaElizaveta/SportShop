import createHttpError from 'http-errors';
import { createSneakers, getSneakers } from '../services/sneaker.js';

export const getSneakersController = async (req, res, next) => {
  const sneaker = await getSneakers();

  if (!sneaker) {
    next(createHttpError(404, 'Sneakers not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found sneakers',
    data: sneaker,
  });
};

export const createSneakersController = async (req, res) => {
  const { brand, model, price, size, color, inStock } = req.body;

  const sneakers = await createSneakers({
    brand,
    model,
    price,
    size,
    color,
    inStock,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a pair of sneakers!',
    data: sneakers,
  });
};
