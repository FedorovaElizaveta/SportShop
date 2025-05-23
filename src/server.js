import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utilts/env.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

const PORT = Number(env('PORT', '4762'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
