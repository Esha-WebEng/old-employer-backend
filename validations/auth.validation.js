const Joi = require("joi");
const { password } = require("./custom.validation");
const { userRoles, genderEnum } = require("../enums");

const register = {
  body: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    industry: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    phone: Joi.string().allow(''),
    role: Joi.string()
      .valid(...userRoles)
      .default("user"),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

const forgetPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const googleLogin = {
  body: Joi.object().keys({
    idToken: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  forgetPassword,
  resetPassword,
  googleLogin
};
