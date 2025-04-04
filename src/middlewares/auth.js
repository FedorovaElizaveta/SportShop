import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/session.js';
import { UserCollection } from '../db/models/user.js';

export const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (typeof authorization !== 'string') {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  if ((bearer !== 'Bearer', typeof accessToken !== 'string')) {
    return next(createHttpError(401, 'Auth header should be type of Bearer'));
  }

  const session = await SessionCollection.findOne({ accessToken });

  if (session === null) {
    return next(createHttpError(404, 'Session not found'));
  }

  if (new Date() > new Date(session.accessTokenValidUntil)) {
    return next(createHttpError(401, 'Access token is expired'));
  }

  const user = await UserCollection.findOne(session.userId);

  if (user === null) {
    return next(createHttpError(404, 'User not found'));
  }

  req.user = user;

  next();
};
