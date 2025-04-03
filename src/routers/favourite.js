import { json, Router } from 'express';
import { ctrlWrapper } from '../utilts/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { addToFavouriteSneakers } from '../validation/sneakers.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  addFavouriteSneakersController,
  deleteFavouriteSneakersController,
  getFavouriteSneakersController,
} from '../controllers/favourite.js';

const router = Router();
const jsonParser = json();

router.get('/', ctrlWrapper(getFavouriteSneakersController));

router.post(
  '/',
  jsonParser,
  validateBody(addToFavouriteSneakers),
  ctrlWrapper(addFavouriteSneakersController),
);

router.delete(
  '/:id',
  isValidId,
  ctrlWrapper(deleteFavouriteSneakersController),
);

export default router;
