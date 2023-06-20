import Joi from "joi";

const updateAccountSchema = Joi.object({
  id: Joi.number().required(),

  first_name: Joi.string().strip().max(20).optional(),

  last_name: Joi.string().strip().max(20).optional(),

  birthday: Joi.string()
    .strip()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),

  email: Joi.string()
    .strip()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "br"] },
    })
    .max(50)
    .optional(),

  password: Joi.string().strip().optional(),

  phone: Joi.string().strip().max(11).optional(),

  document: Joi.string().strip().max(11).optional(),
});

export { updateAccountSchema };
