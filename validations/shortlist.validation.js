const Joi = require("joi");

const shortlist = {
  body: Joi.object().keys({
    candidateId: Joi.number().required(),
  }),
};

const updateShorlist = {
  query: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

module.exports = {
  shortlist,
  updateShorlist,
};
