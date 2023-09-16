import {
  registerUserValidation,
  loginUserValidation,
  updateUserValidation,
  usernameValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  const { value } = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: value.username,
    },
  });

  if (countUser == 1) {
    throw new ResponseError(400, "User already exists");
  }

  value.password = await bcrypt.hash(value.password, 10);

  return await prismaClient.user.create({
    data: value,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (request) => {
  const { value } = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: value.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(400, "Incorrect username or password");
  }

  const isPasswordValid = await bcrypt.compare(value.password, user.password);

  if (!isPasswordValid) {
    throw new ResponseError(400, "Incorrect username or password");
  }

  return await prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: {
      token: uuid(),
    },
    select: {
      token: true,
    },
  });
};

const update = async (request) => {
  const { value } = validate(updateUserValidation, request.body);
  const username = request.user;

  return await prismaClient.user.update({
    where: {
      username: username,
    },
    data: value,
    select: {
      username: true,
      name: true,
    },
  });
};

const get = async (request) => {
  const username = validate(usernameValidation, request);

  return await prismaClient.user.findUnique({
    where: {
      username: username.value,
    },
    select: {
      username: true,
      name: true,
    },
  });
};

const logout = async (request) => {
  const username = validate(usernameValidation, request);

  await prismaClient.user.update({
    where: {
      username: username.value,
    },
    data: {
      token: null,
    },
  });

  return "Ok";
};

export default { register, login, get, update, logout };
