import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { SessionCollection } from '../db/models/session.js';
import { createSession } from '../utilts/createSession.js';

export const registerUser = async (user) => {
  const isCreated = await UserCollection.findOne({ email: user.email });

  if (isCreated) throw createHttpError(400, 'Email is already in use');

  user.password = await bcrypt.hash(user.password, 10);

  return await UserCollection.create(user);
};

export const loginUser = async ({ password, email, name }) => {
  const user = await UserCollection.findOne({ email });

  if (!user) throw createHttpError(404, 'User not found');

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) throw createHttpError(401, 'Wrong password');
  if (name !== user.name) throw createHttpError(401, 'Wrong username');

  await SessionCollection.deleteOne({ userId: user._id });

  return await SessionCollection.create({
    userId: user._id,
    ...createSession(),
  });
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const refreshTokens = async (sessionId, refreshToken) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) throw createHttpError(404, 'Session not found');

  if (new Date() > new Date(session.accessTokenValidUntil)) {
    throw createHttpError(400, 'Refresh token is expired');
  }

  await SessionCollection.deleteOne({ _id: session._id });

  return await SessionCollection.create({
    userId: session.userId,
    ...createSession(),
  });
};

export const patchUser = async (id, payload, options = {}) => {
  const updatedUser = await UserCollection.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      ...options,
    },
  );

  if (!updatedUser) throw createHttpError(404, 'User not found');

  return updatedUser;
};

export const deleteUser = async (id) => {
  const result = await UserCollection.findOneAndDelete({ _id: id });

  if (!result) throw createHttpError('User not found');

  return result;
};

export const getUserById = async (id) => {
  const user = await UserCollection.findById(id);

  if (!user) throw createHttpError(404, 'User not found');

  return user;
};

export const getAllUsers = async () => {
  const users = await UserCollection.find();

  if (users.length === 0) throw createHttpError(404, 'Users not found');

  return users;
};
