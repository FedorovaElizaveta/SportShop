import createHttpError from 'http-errors';
import {
  getSneakers,
  getSneakersById,
  createSneakers,
  patchSneakers,
  deleteSneakers,
} from '../services/sneaker.js';

export const getSneakersController = async (req, res, next) => {
  const sneaker = await getSneakers();

  if (!sneaker) return next(createHttpError(404, 'Sneakers not found'));

  res.status(200).json({
    status: 200,
    message: 'Successfully found sneakers',
    data: sneaker,
  });
};

export const getSneakersByIdController = async (req, res, next) => {
  const { id } = req.params;

  const sneakers = await getSneakersById(id);

  if (!sneakers)
    return next(createHttpError(404, `Sneakers with id ${id} are not found`));

  res.status(200).json({
    status: 200,
    message: `Sneakers with id ${id} successfully found`,
    data: sneakers,
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

export const patchSneakersController = async (req, res, next) => {
  const { id } = req.params;
  const sneakersData = { ...req.body };

  const sneakers = await patchSneakers(id, sneakersData);

  if (!sneakers)
    return next(createHttpError(404, `Sneakers with id ${id} are not found`));

  res.status(200).json({
    status: 200,
    message: 'Successfully updated the sneakers',
    data: sneakers,
  });
};

export const deleteSneakersController = async (req, res, next) => {
  const { id } = req.params;

  const result = await deleteSneakers(id);

  if (!result)
    return next(createHttpError(404, `Sneakers with id ${id} are not found`));

  res.status(204).end();
};
