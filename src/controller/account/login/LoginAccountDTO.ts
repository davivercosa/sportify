import Joi from "joi";

const loginAccountSchema = Joi.object({
  email: Joi.string()
    .strip()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "br"] },
    })
    .max(50)
    .required(),

  password: Joi.string().strip().required(),
});

export { loginAccountSchema };
