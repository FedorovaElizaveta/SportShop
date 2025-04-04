import { json, Router } from 'express';
import { ctrlWrapper } from '../utilts/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  patchUserSchema,
  registerLoginUserSchema,
} from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
  patchUserController,
  deleteUserController,
  getUserByIdController,
  getAllUsersController,
} from '../controllers/auth.js';
import { auth } from '../middlewares/auth.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();
const jsonParser = json();

router.post(
  '/register',
  jsonParser,
  validateBody(registerLoginUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  jsonParser,
  validateBody(registerLoginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshTokenController));

router.patch(
  '/user',
  auth,
  jsonParser,
  validateBody(patchUserSchema),
  ctrlWrapper(patchUserController),
);

router.delete('/user/:id', auth, isValidId, ctrlWrapper(deleteUserController));

router.get('/user/:id', isValidId, ctrlWrapper(getUserByIdController));

router.get('/user', ctrlWrapper(getAllUsersController));

export default router;
