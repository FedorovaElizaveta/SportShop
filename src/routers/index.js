import { Router } from 'express';
import sneakerRouter from './sneaker.js';
import favouriteRouter from './favourite.js';

const router = Router();

router.use('/sneakers/favourite', favouriteRouter);
router.use('/sneakers', sneakerRouter);

export default router;
