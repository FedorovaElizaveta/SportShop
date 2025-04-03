import createHttpError from 'http-errors';
import {
  getFavouriteSneakers,
  addFavouriteSneakers,
  deleteFavouriteSneakers,
} from '../services/favourite.js';

export const getFavouriteSneakersController = async (req, res, next) => {
  const sneakers = await getFavouriteSneakers();

  if (sneakers === null)
    return next(createHttpError(404, 'No favourite sneakers found'));

  if (sneakers === false)
    return next(createHttpError(404, 'No sneakers found'));

  res.status(200).json({
    status: 200,
    message: 'Favourite sneakers found',
    data: sneakers,
  });
};

export const addFavouriteSneakersController = async (req, res, next) => {
  const { sneakerId } = req.body;

  const newFavourite = await addFavouriteSneakers(sneakerId);

  if (newFavourite === null)
    return next(createHttpError(404, 'Sneakers not found'));

  if (newFavourite === false) {
    return next(
      createHttpError(400, 'Sneakers have been already added to favourites'),
    );
  }

  res.status(201).json({
    status: 201,
    message: 'Sneakers successfully added to favourites',
    data: newFavourite,
  });
};

export const deleteFavouriteSneakersController = async (req, res, next) => {
  const { id } = req.params;

  const result = await deleteFavouriteSneakers(id);

  if (!result) return next(createHttpError(404, 'Sneakers not found'));

  res.status(204).end();
};
