import createHttpError from 'http-errors';
import { getSneakers } from '../services/sneaker.js';

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
  console.log(req);

  res.status(201).json({ message: 'Hello!' });
};
