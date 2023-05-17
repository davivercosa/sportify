import Joi from "joi";

const createAccountSchema = Joi.object({
  first_name: Joi.string().strip().max(20).required(),

  last_name: Joi.string().strip().max(20).required(),

  birthday: Joi.string()
    .strip()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required(),

  email: Joi.string()
    .strip()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "br"] },
    })
    .max(50)
    .required(),

  password: Joi.string().strip().required(),

  phone: Joi.string().strip().max(11).required(),

  document: Joi.string().strip().max(11).required(),
});

export { createAccountSchema };
