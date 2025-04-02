import { Router } from 'express';
import sneakerRouter from './sneaker.js';

const router = Router();

router.use('/sneakers', sneakerRouter);

export default router;
