import { json, Router } from 'express';
import {
  createSneakerSchema,
  patchSneakerSchema,
} from '../validation/sneakers.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utilts/ctrlWrapper.js';
import {
  getSneakersController,
  getSneakersByIdController,
  createSneakersController,
  patchSneakersController,
  deleteSneakersController,
} from '../controllers/sneaker.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();
const jsonParser = json();

router.get('/', ctrlWrapper(getSneakersController));

router.get('/:id', isValidId, ctrlWrapper(getSneakersByIdController));

router.post(
  '/',
  jsonParser,
  validateBody(createSneakerSchema),
  ctrlWrapper(createSneakersController),
);

router.patch(
  '/:id',
  isValidId,
  jsonParser,
  validateBody(patchSneakerSchema),
  ctrlWrapper(patchSneakersController),
);

router.delete('/:id', isValidId, ctrlWrapper(deleteSneakersController));

export default router;
