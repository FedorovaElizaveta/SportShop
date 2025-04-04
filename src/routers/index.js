import { Router } from 'express';
import sneakerRouter from './sneaker.js';
import favouriteRouter from './favourite.js';
import authRouter from './auth.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/sneakers/favourite', favouriteRouter);
router.use('/sneakers', sneakerRouter);

export default router;
