import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  name: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

const updateUserValidation = Joi.object({
  name: Joi.string().max(100).optional(),
  password: Joi.string().max(100).optional(),
});

const usernameValidation = Joi.string().max(100).required();

export {
  registerUserValidation,
  loginUserValidation,
  updateUserValidation,
  usernameValidation,
};
