import bcrypt from 'bcrypt';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshTokens,
  patchUser,
  deleteUser,
  getUserById,
  getAllUsers,
} from '../services/auth.js';
import { setupCookie } from '../utilts/setupCookie.js';

export const registerUserController = async (req, res) => {
  const user = {
    password: req.body.password,
    email: req.body.email,
    name: req.body.name,
  };

  const newUser = await registerUser(user);

  res.status(201).json({
    status: 201,
    message: 'User has been successfully created',
    data: newUser,
  });
};

export const loginUserController = async (req, res) => {
  const userData = {
    password: req.body.password,
    email: req.body.email,
    name: req.body.name,
  };

  const session = await loginUser(userData);

  setupCookie(res, session);

  res.status(200).json({
    status: 200,
    message: 'User has been successfully logged in',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;

  await logoutUser(sessionId);

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).end();
};

export const refreshTokenController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshTokens(sessionId, refreshToken);

  setupCookie(res, session);

  res.status(200).json({
    status: 200,
    message: 'Session has been successfully refreshed',
    data: { accessToken: session.accessToken },
  });
};

export const patchUserController = async (req, res) => {
  const { password, email, name, phoneNumber, location, avatar } = req.body;

  const userId = req.user._id;

  const userData = {
    password,
    email,
    name,
    phoneNumber,
    location,
    avatar,
  };

  if (password) {
    userData.password = await bcrypt.hash(password, 10);
  }

  const user = await patchUser(userId, userData);

  res.status(200).json({
    status: 200,
    message: 'User has been successfully updated',
    data: user,
  });
};

export const deleteUserController = async (req, res) => {
  const { id } = req.params;

  await deleteUser(id);

  res.status(204).end();
};

export const getUserByIdController = async (req, res) => {
  const { id } = req.params;

  const user = await getUserById(id);

  res.status(200).json({
    status: 200,
    message: 'User has been successfully found',
    data: user,
  });
};

export const getAllUsersController = async (req, res) => {
  const users = await getAllUsers();

  res.status(200).json({
    status: 200,
    message: 'Users have been successfully found',
    data: users,
  });
};
