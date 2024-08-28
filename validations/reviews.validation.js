const Joi = require("joi");

const addReview = {
  body: Joi.object().keys({
    emp_status: Joi.string().required(),
    emp_thougts: Joi.string().required(),
    hide_emp_info: Joi.boolean().default(false),
    compensation: Joi.number().required(),
    work_balance: Joi.number().required(),
    career_opportunities: Joi.number().required(),
    cutlers: Joi.number().required(),
    recommendation: Joi.boolean().default(false),
    suggestions: Joi.string().required(),
    best_worst: Joi.string().required(),
    environment: Joi.string().required(),
    employment: Joi.string().required(),
    insurance: Joi.string().required(),
    residence: Joi.string().required(),
    benovland_fund: Joi.string().required(),
    medical: Joi.string().required(),
    other_benefit: Joi.string().required(),
    salary_range: Joi.string().required(),
    pay_on_time: Joi.string().required(),
    bonus: Joi.string().required(),
    increment: Joi.string().required(),
    increment_duration: Joi.string().required(),
    monthly_leaves: Joi.string().required(),
    annually_leaves: Joi.string().required(),
    public_review: Joi.string().required(),
    companyId: Joi.number().required(),
  }),
};

const veifyReview = {
  query: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
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
    }).required(),
  }),
};

const getReviewByCompany = {
  query: Joi.object().keys({
    companyId: Joi.number().required(),
  }),
};

module.exports = {
  addReview,
  veifyReview,
  getReviewByCompany,
};
