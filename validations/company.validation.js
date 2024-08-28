const Joi = require("joi");

const createCompany = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const updateCompany = {
  query: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().allow(""),
    logo: Joi.object({
      originalname: Joi.string().required(),
      mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
      size: Joi.number()
        .max(1024 * 1024 * 5)
        .required(),
    }).allow(null || ""),
    web_url: Joi.string().allow(""),
    email: Joi.string().allow(""),
    industry: Joi.string().allow(""),
    country: Joi.string().allow(""),
    city: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    is_verified: Joi.boolean().default(false),
    ownerId: Joi.number().allow(""),
    verificaton_doc: Joi.object({
      originalname: Joi.string().required(),
      mimetype: Joi.string()
        .valid(
          "image/jpeg",
          "image/png",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        )
        .required(),
      size: Joi.number()
        .max(1024 * 1024 * 5)
        .required(),
    }).allow(null || ""),
  }),
};

const searchCompany = {
  query: Joi.object().keys({
    name: Joi.string().allow(""),
    industry: Joi.string().allow(""),
    country: Joi.string().allow(""),
    city: Joi.string().allow(""),
    searchText: Joi.string().allow(""),
  }),
};

const getSingleCompany = {
  query: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const companyVerfiy = {
  query: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    company_email: Joi.string().email().required(),
  }),
};

module.exports = {
  createCompany,
  updateCompany,
  searchCompany,
  getSingleCompany,
  companyVerfiy,
};
