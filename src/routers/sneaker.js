import { json, Router } from 'express';
import { createSneakerSchema } from '../validation/sneakers.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utilts/ctrlWrapper.js';
import {
  getSneakersController,
  createSneakersController,
} from '../controllers/sneaker.js';

const router = Router();
const jsonParser = json();

router.get('/', ctrlWrapper(getSneakersController));

router.post(
  '/',
  jsonParser,
  validateBody(createSneakerSchema),
  ctrlWrapper(createSneakersController),
);

export default router;
